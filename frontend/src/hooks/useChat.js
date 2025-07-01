import { useState, useEffect } from 'react';
import { getSession, sendChatMessage } from '../services/api';

/**
 * Hook to manage chat messages and sending for a given session.
 */
export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const session = await getSession(sessionId);
        setMessages(session.messages || []);
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
    try {
      const { reply } = await sendChatMessage(sessionId, content);
      setMessages((msgs) => [...msgs, reply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
}