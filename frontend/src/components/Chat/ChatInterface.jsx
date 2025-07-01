import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import InputForm from './InputForm';

export default function ChatInterface({ sessionId }) {
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, isLoading, sessionTitle } = useChat(sessionId);
  const endRef = useRef(null);


  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const atBottom = scrollHeight - scrollTop <= clientHeight + 1; // +1 for a small buffer
    setIsAtBottom(atBottom);
  };


  return (
    <div className="flex-1 flex flex-col relative h-full">
      <div className="mystical-bg" />
      <div className="p-4 flex-shrink-0">
        <h2 className="font-accent text-xl text-ethereal-gold">{sessionTitle}</h2>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
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