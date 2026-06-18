'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress');
        if (res.ok) {
          const data = await res.json();
          setCompletedNodes(new Set(data.completedNodes));
        } else {
          // Fallback to localStorage if not logged in
          const saved = localStorage.getItem('stackforge-progress');
          if (saved) setCompletedNodes(new Set(JSON.parse(saved)));
        }
      } catch (e) {
        console.error("Failed to fetch progress", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const toggleNode = async (nodeId: string) => {
    const current = new Set(completedNodes);
    const isAdding = !current.has(nodeId);
    
    if (isAdding) {
      current.add(nodeId);
    } else {
      current.delete(nodeId);
    }
    setCompletedNodes(current);

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId })
      });
    } catch (e) {
      // Fallback to localStorage
      localStorage.setItem('stackforge-progress', JSON.stringify(Array.from(current)));
    }
  };

  const getProgress = (roadmapId: string, nodes: string[]) => {
    const completedInRoadmap = nodes.filter(id => completedNodes.has(id));
    return Math.round((completedInRoadmap.length / nodes.length) * 100);
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
