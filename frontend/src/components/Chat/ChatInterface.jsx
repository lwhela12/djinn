import React, { useState, useEffect, useRef } from 'react';
import { getSession, sendChatMessage } from '../../services/api';
import MessageBubble from './MessageBubble';
import InputForm from './InputForm';

export default function ChatInterface({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: inputValue };
    setMessages((msgs) => [...msgs, userMsg]);
    setInputValue('');
    setIsLoading(true);
    try {
      const { reply } = await sendChatMessage(sessionId, userMsg.content);
      setMessages((msgs) => [...msgs, reply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded shadow">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={endRef} />
      </div>
      <InputForm value={inputValue} onChange={setInputValue} onSend={handleSend} disabled={isLoading} />
    </div>
  );
}