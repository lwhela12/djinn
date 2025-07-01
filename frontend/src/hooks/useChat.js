import { useState, useEffect } from 'react';
import { getSession, saveAssistantMessage, generateSessionName, API_BASE } from '../services/api';

/**
 * Hook to manage chat messages and sending for a given session.
 */
export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        console.log('Fetching session:', sessionId);
        const session = await getSession(sessionId);
        console.log('Session data:', session);
        setMessages(session.messages || []);
        setSessionTitle(session.title);
      } catch (err) {
        console.error(err);
      }
    };
    if (sessionId) load();
  }, [sessionId]);

  const sendMessage = async (content) => {
    if (!content || !content.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content };
    setMessages((msgs) => [...msgs, userMsg]);
    setIsLoading(true);

    // Check if we need to generate a chat name
    if (sessionTitle === 'New Manifestation' && messages.length >= 2) {
      try {
        const { title } = await generateSessionName(sessionId);
        setSessionTitle(title);
      } catch (err) {
        console.error('Failed to generate session name:', err);
      }
    }

    const response = await fetch(`${API_BASE}/chat/${sessionId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      console.error('Failed to send message');
      setIsLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = { id: `a-${Date.now()}`, role: 'assistant', content: '' };
    setMessages((msgs) => [...msgs, assistantMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsLoading(false);
        await saveAssistantMessage(sessionId, assistantMessage.content);
        break;
      }
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = JSON.parse(line.substring(5));
          if (data.type === 'text_delta') {
            assistantMessage.content += data.text;
            setMessages((msgs) => [...msgs.slice(0, -1), { ...assistantMessage }]);
          }
        }
      }
    }
  };

  return { messages, sendMessage, isLoading, sessionTitle };
}