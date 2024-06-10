'use client';
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from '@/lib/firebaseConfig';

interface AuthContextType {
  user: User | null;
}
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user));

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);