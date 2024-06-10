'use client';
import React from 'react';
import GoogleLoginButton from '@/app/components/GoogleLoginButton';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  if (user !== null) // user already signed in
    router.push("/");

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <p className="text-4xl mb-6">Please sign in.</p>
      <GoogleLoginButton />
    </div>
  );
}