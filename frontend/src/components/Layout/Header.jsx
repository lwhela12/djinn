import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-panel backdrop-blur-xl animate-slideInFromLeft">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-accent text-2xl text-ethereal-gold animate-mysticalGlow">
          Manifestation Journal
        </h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-sage-mist">{user.email}</span>
            <button onClick={handleLogout} className="text-sm text-error-crimson hover:underline">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}