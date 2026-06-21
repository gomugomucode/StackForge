"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/**
 * Supabase-backed AuthProvider. This is the single source of truth for
 * the client's authentication state.
 *
 * - Reads the session from Supabase on mount and on every auth change.
 * - On sign-in, fetches the caller's Profile row from /api/user/profile
 *   so consumers can render XP, level, avatar, etc.
 * - Exposes `signIn`, `signUp`, `signOut` helpers that proxy to the
 *   Supabase client. Errors are returned in `{ data, error }` shape.
 * - Persists the session across page refreshes via Supabase's built-in
 *   localStorage handling (the @supabase/ssr cookie-based session also
 *   keeps the API routes authenticated; see /src/lib/supabase-server.ts).
 */
export interface AppProfile {
  id?: string;
  userId: string;
  email?: string | null;
  username?: string | null;
  /** Convenience accessor for the user's display name. */
  name?: string | null;
  avatar?: string | null;
  xp: number;
  streak: number;
  level: number;
  totalHours?: number;
  lastActive?: string;
  joinedAt?: string;
  user?: {
    id: string;
    email: string | null;
    name: string | null;
    avatar: string | null;
    plan?: string;
    createdAt?: string;
  };
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: AppProfile | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: { user: User | null; session: Session | null } | null; error: any }>;
  signUp: (
    email: string,
    password: string,
    metadata: Record<string, any>
  ) => Promise<{ data: { user: User | null; session: Session | null } | null; error: any }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProfile(userId: string) {
    try {
      const response = await fetch("/api/user/profile", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setProfile(data as AppProfile);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("[auth] fetchProfile error:", error);
      setProfile(null);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn: AuthContextType["signIn"] = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp: AuthContextType["signUp"] = async (email, password, metadata) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const refreshSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshSession,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within an AuthProvider");
  }
  return context;
}
