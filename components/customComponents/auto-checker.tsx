// components/auth-checker.tsx
'use client';

import { useAuth } from '@/app/context/auth-context';
// import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthChecker() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, router]);

  return null;
}