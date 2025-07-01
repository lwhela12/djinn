import React from 'react';
import { Link } from 'react-router-dom';

export default function SessionItem({ session, onDelete }) {
  return (
    <div className="p-2 border-b flex justify-between items-center">
      <Link to={`/sessions/${session.id}`} className="flex-1 cursor-pointer">
        <div className="font-semibold">{session.title || 'Untitled Session'}</div>
        <div className="text-sm text-gray-600">{session.status}</div>
      </Link>
      <button
        onClick={() => onDelete(session.id)}
        className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Delete session"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}