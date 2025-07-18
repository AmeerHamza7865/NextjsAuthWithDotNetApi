// lib/api.ts
export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem('authToken');
  
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    // Handle token expiration
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return response;
}