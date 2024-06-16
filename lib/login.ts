'use client';
import { auth } from '@/lib/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, User, signOut } from 'firebase/auth';

export async function GoogleLogin(): Promise<User | null> {
  const provider = new GoogleAuthProvider();
  try {
    return (await signInWithPopup(auth, provider)).user;
  } catch (e: any) {
    if (e.code === "auth/popup-closed-by-user") {
      console.info("Google popup closed by user");
      return null;
    }
    throw e;
  }
}

export async function logout() {
  await signOut(auth);
}