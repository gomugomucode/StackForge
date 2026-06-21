'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

/**
 * Progress context. The previous implementation kept a localStorage
 * fallback that allowed anonymous visitors to track progress locally and
 * silently masked API failures. Per the spec, server-side Prisma is the
 * single source of truth. This version:
 *
 *   - Only fetches when the caller is authenticated.
 *   - Only writes through the API when authenticated.
 *   - Never falls back to localStorage.
 */
interface ProgressContextType {
  completedNodes: Set<string>;
  toggleNode: (nodeId: string) => Promise<void>;
  getProgress: (roadmapId: string, nodes: string[]) => number;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (authLoading) return;
      if (!isAuthenticated) {
        if (!cancelled) {
          setCompletedNodes(new Set());
          setIsLoading(false);
        }
        return;
      }
      try {
        const res = await fetch('/api/progress', { credentials: 'include' });
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setCompletedNodes(new Set(data.completedNodes ?? []));
        } else {
          setCompletedNodes(new Set());
        }
      } catch (e) {
        console.error('[progress] failed to load:', e);
        setCompletedNodes(new Set());
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  const toggleNode = async (nodeId: string) => {
    if (!isAuthenticated) return;
    const snapshot = new Set(completedNodes);
    const isAdding = !snapshot.has(nodeId);
    const next = new Set(snapshot);
    if (isAdding) next.add(nodeId);
    else next.delete(nodeId);
    setCompletedNodes(next);

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: nodeId }),
      });
      if (!res.ok) {
        // Revert optimistic update on failure.
        setCompletedNodes(snapshot);
        console.error('[progress] toggle failed:', await res.text());
      }
    } catch (e) {
      setCompletedNodes(snapshot);
      console.error('[progress] toggle error:', e);
    }
  };

  const getProgress = (_roadmapId: string, nodes: string[]) => {
    if (nodes.length === 0) return 0;
    const done = nodes.filter((id) => completedNodes.has(id)).length;
    return Math.round((done / nodes.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{ completedNodes, toggleNode, getProgress, isLoading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
