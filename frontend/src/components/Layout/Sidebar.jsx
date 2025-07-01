import React from 'react';
import SessionList from '../History/SessionList';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 border-r flex flex-col">
      <SessionList />
    </aside>
  );
}