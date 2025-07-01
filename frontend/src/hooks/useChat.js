import { useState } from 'react';

export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const sendMessage = async (content) => {
    // TODO: implement chat send
  };
  return { messages, sendMessage };
}