'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface BookmarkContextType {
  bookmarkedIds: Set<string>;
  toggleBookmark: (resourceId: string, type: string) => Promise<void>;
  isLoading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.ok) {
          const data = await res.json();
          setBookmarkedIds(new Set(data.map((b: any) => b.resourceId)));
        } else {
          const saved = localStorage.getItem('stackforge-bookmarks');
          if (saved) setBookmarkedIds(new Set(JSON.parse(saved)));
        }
      } catch (e) {
        console.error("Failed to fetch bookmarks", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (resourceId: string, type: string) => {
    const current = new Set(bookmarkedIds);
    const isAdding = !current.has(resourceId);
    
    if (isAdding) {
      current.add(resourceId);
    } else {
      current.delete(resourceId);
    }
    setBookmarkedIds(current);

    try {
      if (isAdding) {
        await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resourceId, type })
        });
      } else {
        await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resourceId })
        });
      }
    } catch (e) {
      localStorage.setItem('stackforge-bookmarks', JSON.stringify(Array.from(current)));
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
