'use client';
import { auth } from '@/lib/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, AuthError } from 'firebase/auth';

export async function Login() {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (e: any) {
    if (e.code === "auth/popup-closed-by-user")
      console.info("Google popup closed by user");
    else
      throw e;
  }
}