import jwt from 'jsonwebtoken';
import { deleteCookie, setCookie } from 'cookies-next';

const SECRET_KEY = 'your-secret-key-here';

// Get JWT token from localStorage
export const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};

// Generate and store token
export const generateToken = (user: { id: string; email: string }) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '30s' }
  );

  // Store in both cookie and localStorage
  setCookie('token', token, {
    maxAge: 30, // 30 seconds
    path: '/',
  });
  localStorage.setItem("jwtToken", token);

  return token;
};

// Verify token
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    // Clear token if invalid
    deleteCookie('token');
    localStorage.removeItem("jwtToken");
    return null;
  }
};

// Refresh token function
export const refreshToken = async () => {
  try {
    const token = getJwtToken();
    if (!token) return null;

    const decoded = jwt.decode(token);
    if (!decoded) return null;

    // Generate new token
    const newToken = jwt.sign(
      { id: (decoded as any).id, email: (decoded as any).email },
      SECRET_KEY,
      { expiresIn: '60s' }
    );

    // Store new token
    setCookie('token', newToken, {
      maxAge: 30,
      path: '/',
    });
    localStorage.setItem("jwtToken", newToken);

    return newToken;
  } catch (error) {
    return null;
  }
};