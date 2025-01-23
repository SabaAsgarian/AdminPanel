import { getJwtToken, refreshToken } from './auth';
import jwt from 'jsonwebtoken';
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  let token = getJwtToken();
  
  if (!token) {
    window.location.href = '/';
    return null;
  }

  try {
    // Check if token is expired
    const decoded = jwt.decode(token as string);
    if (decoded && typeof decoded === 'object' && decoded.exp) {
      if (decoded.exp * 1000 < Date.now()) {
        // Try to refresh token
        token = await refreshToken();
        if (!token) {
          window.location.href = '/';
          return null;
        }
      }
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Try to refresh token on 401
      token = await refreshToken();
      if (token) {
        // Retry request with new token
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (retryResponse.ok) return retryResponse;
      }
      window.location.href = '/';
      return null;
    }

    return response;
  } catch (error) {
    window.location.href = '/';
    return null;
  }
};