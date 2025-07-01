import api from '../hooks/useApi';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

function getToken() {
  return localStorage.getItem('token');
}

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return res.json();
}

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function signup(email, password) {
  const response = await api.post('/auth/signup', { email, password });
  return response.data;
}

/** Session APIs */
export async function getSessions() {
  const response = await api.get('/sessions');
  return response.data;
}

export async function createSession(title) {
  const response = await api.post('/sessions', { title });
  return response.data;
}

export async function deleteSession(sessionId) {
  const response = await api.delete(`/sessions/${sessionId}`);
  return response.data;
}

export async function getSession(sessionId) {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}

export async function saveAssistantMessage(sessionId, content) {
  const res = await fetch(`${API_BASE}/chat/${sessionId}/message/assistant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
}

export async function updateSessionTitle(sessionId, title) {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title }),
  });
  return handleResponse(res);
}

export async function generateSessionName(sessionId) {
  const res = await fetch(`${API_BASE}/chat/${sessionId}/name`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return handleResponse(res);
}