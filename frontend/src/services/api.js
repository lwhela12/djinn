import api from '../hooks/useApi';

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

export async function getSession(sessionId) {
  const response = await api.get(`/sessions/${sessionId}`);
  return response.data;
}

/** Chat APIs */
export async function sendChatMessage(sessionId, content) {
  const response = await api.post(`/chat/${sessionId}/message`, { content });
  return response.data;
}