// context/auth-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This effect runs only on client-side after hydration
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    
    // If no token but on protected route, redirect
    if (!token && window.location.pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    console.log("Login successful, token set:", token);
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    console.log("Logout successful, token removed");
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}