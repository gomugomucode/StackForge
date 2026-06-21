'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

/**
 * Bookmark context. The previous implementation kept a localStorage
 * fallback that allowed anonymous visitors to silently accumulate state
 * and even authenticated users to see inconsistent UI on auth failures.
 *
 * Per the spec, Supabase Auth is the single source of truth and the
 * server-side Prisma `Bookmark` table is the durable store. This version:
 *
 *   - Only fetches bookmarks when the caller is authenticated.
 *   - Only writes through the API when authenticated.
 *   - Exposes `isLoading` and never falls back to localStorage.
 */
interface BookmarkContextType {
  bookmarkedIds: Set<string>;
  toggleBookmark: (resourceId: string, type: string) => Promise<void>;
  isLoading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (authLoading) return;
      if (!isAuthenticated) {
        if (!cancelled) {
          setBookmarkedIds(new Set());
          setIsLoading(false);
        }
        return;
      }
      try {
        const res = await fetch('/api/bookmarks', { credentials: 'include' });
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setBookmarkedIds(new Set(data.map((b: any) => b.resourceId)));
        } else {
          setBookmarkedIds(new Set());
        }
      } catch (e) {
        console.error('[bookmarks] failed to load:', e);
        setBookmarkedIds(new Set());
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  const toggleBookmark = async (resourceId: string, type: string) => {
    if (!isAuthenticated) return; // silently ignore — UI hides this affordance
    const current = new Set(bookmarkedIds);
    const isAdding = !current.has(resourceId);
    if (isAdding) current.add(resourceId);
    else current.delete(resourceId);
    setBookmarkedIds(current);

    try {
      const res = await fetch('/api/bookmarks', {
        method: isAdding ? 'POST' : 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId, type }),
      });
      if (!res.ok) {
        // Revert optimistic update on failure.
        const revert = new Set(bookmarkedIds);
        setBookmarkedIds(revert);
        console.error('[bookmarks] toggle failed:', await res.text());
      }
    } catch (e) {
      const revert = new Set(bookmarkedIds);
      setBookmarkedIds(revert);
      console.error('[bookmarks] toggle error:', e);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark, isLoading }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
}
