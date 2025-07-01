import React from 'react';

export default function MessageBubble({ role, content }) {
  const base = 'p-3 my-1 rounded-xl max-w-md shadow';

  const userClasses = 'self-end bg-gradient-to-br from-amber-glow to-ethereal-gold text-void-black p-3 my-1 rounded-xl max-w-md shadow';
  const djinnClasses = 'self-start glass-panel text-moonlight';

  return (
    <div className={role === 'user' ? userClasses : `${djinnClasses} p-3 my-1 rounded-xl max-w-md`}>
      {content}
    </div>
  );
}