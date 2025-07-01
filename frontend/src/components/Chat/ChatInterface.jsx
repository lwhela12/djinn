import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import InputForm from './InputForm';

export default function ChatInterface({ sessionId }) {
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, isLoading } = useChat(sessionId);
  const endRef = useRef(null);


  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex flex-col h-full bg-white rounded shadow">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={endRef} />
      </div>
      <InputForm value={inputValue} onChange={setInputValue} onSend={() => sendMessage(inputValue)} disabled={isLoading} />
    </div>
  );
}