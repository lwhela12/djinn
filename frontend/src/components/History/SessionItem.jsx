import React from 'react';

export default function SessionItem({ session }) {
  return (
    <div className="p-2 border-b cursor-pointer">
      <div className="font-semibold">{session.title || 'Untitled Session'}</div>
      <div className="text-sm text-gray-600">{session.status}</div>
    </div>
  );
}