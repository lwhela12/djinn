import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

import { useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token, ...data.user });
    return data;
  };

  const signup = async (email, password) => {
    const data = await apiSignup(email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token, ...data.user });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}