import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import InputForm from './InputForm';

export default function ChatInterface({ sessionId }) {
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, isLoading, sessionTitle } = useChat(sessionId);
  const endRef = useRef(null);


  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex-1 flex flex-col relative">
      <div className="mystical-bg" />
      <div className="p-4">
        <h2 className="font-accent text-xl text-ethereal-gold">{sessionTitle}</h2>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={endRef} />
      </div>
      <InputForm
        value={inputValue}
        onChange={setInputValue}
        onSend={() => {
          sendMessage(inputValue);
          setInputValue('');
        }}
        disabled={isLoading}
      />
    </div>
  );
}