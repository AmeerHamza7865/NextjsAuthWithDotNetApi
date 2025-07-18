// components/protected-route.tsx
'use client';

import { useAuth } from '@/app/context/auth-context';
// import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isClient, router]);

  if (!isClient) return null; // Don't render during SSR

  return isAuthenticated ? children : null;
}