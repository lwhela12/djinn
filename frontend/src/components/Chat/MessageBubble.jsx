import React from 'react';

export default function MessageBubble({ role, content }) {
  const base = 'p-3 my-1 rounded-xl max-w-md shadow';

  const userClasses = 'self-end bg-gradient-to-br from-amber-glow to-ethereal-gold text-deep-earth';
  const djinnClasses = 'self-start bg-deep-earth border border-amber-glow text-moonlight';

  return (
    <div className={`glass-panel p-3 my-1 rounded-xl max-w-md ${role === 'user' ? userClasses : djinnClasses}`}>
      {content}
    </div>
  );
}