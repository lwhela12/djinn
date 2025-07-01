import React from 'react';
import SessionList from '../History/SessionList';

export default function Sidebar() {
  return (
    <aside className="w-80 glass-panel border-r border-amber-glow/20 flex flex-col">
      <SessionList />
    </aside>
  );
}