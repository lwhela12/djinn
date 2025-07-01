import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSessions, createSession, deleteSession } from '../../services/api';
import SessionItem from './SessionItem';

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
      const data = await createSession('New Manifestation');
      console.log('New session created:', data);
      navigate(`/sessions/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      fetchSessions(); // Refresh the list after deletion
      if (pathname === `/sessions/${sessionId}`) {
        navigate('/sessions'); // Navigate away if the deleted session was active
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full space-y-4">
      <div className="p-6">
        <button onClick={handleNew} className="liquid-button w-full p-4 text-deep-earth font-medium">
          ✨ New Manifestation
        </button>
      </div>
      <ul className="overflow-auto flex-1 space-y-2">
        {sessions.map((session) => (
          <li key={session.id} className="">
            <SessionItem session={session} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}