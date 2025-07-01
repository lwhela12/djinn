import React from 'react';

export default function MessageBubble({ role, content }) {
  return (
    <div className={`p-2 my-1 rounded ${role === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
      {content}
    </div>
  );
}