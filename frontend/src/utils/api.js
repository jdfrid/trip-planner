// API Base URL - uses environment variable in production, empty string for dev (uses proxy)
export const API_URL = import.meta.env.VITE_API_URL || '';

// Helper to build full API URL
export const apiUrl = (path) => `${API_URL}${path}`;

// Fetch wrapper with default options
export async function apiFetch(path, options = {}) {
  const url = apiUrl(path);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

