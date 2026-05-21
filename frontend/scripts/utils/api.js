// Base URL — đổi thành EC2 public IP sau khi deploy
export const API_BASE = 'http://3.0.21.70:5000/api';

export function getToken() {
  return localStorage.getItem('token');
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || err.error || 'Request failed');
  }
  return res.json();
}