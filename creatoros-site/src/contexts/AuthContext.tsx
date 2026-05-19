/// <reference types="vite/client" />
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const STORAGE_KEY = 'creatoros_owner_session';
const OWNER_CODE = import.meta.env.VITE_OWNER_ACCESS_CODE as string | undefined;

type AuthState = {
  isOwner: boolean;
  signIn: (code: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && OWNER_CODE && stored === OWNER_CODE) {
        setIsOwner(true);
      } else if (stored) {
        // Stored code no longer matches (e.g. secret was rotated) — clear it.
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage might be blocked — fail closed
    }
  }, []);

  const signIn = (code: string): boolean => {
    if (!OWNER_CODE) {
      console.warn('[auth] VITE_OWNER_ACCESS_CODE is not configured.');
      return false;
    }
    if (code.trim() === OWNER_CODE) {
      try {
        localStorage.setItem(STORAGE_KEY, code.trim());
      } catch {
        // ignore storage errors
      }
      setIsOwner(true);
      return true;
    }
    return false;
  };

  const signOut = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsOwner(false);
  };

  return (
    <AuthContext.Provider value={{ isOwner, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
