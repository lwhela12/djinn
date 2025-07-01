import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSessions, createSession } from '../../services/api';

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNew = async () => {
    try {
      const data = await createSession('');
      navigate(`/sessions/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Sessions</h2>
        <button onClick={handleNew} className="text-blue-600 hover:underline">
          + New
        </button>
      </div>
      <ul className="overflow-auto flex-1">
        {sessions.map((session) => (
          <li key={session.id} className="mb-2">
            <Link
              to={`/sessions/${session.id}`}
              className={`block p-2 rounded hover:bg-gray-200 ${
                pathname === `/sessions/${session.id}` ? 'bg-gray-300' : ''
              }`}
            >
              {session.title || 'Untitled'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}