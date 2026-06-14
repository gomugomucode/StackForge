import { useState, useMemo } from 'react';

export function useContentSearch<T extends { title: string; tags: string[]; category: string }>(items: T[]) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query) return items;
    
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.category.toLowerCase().includes(lowerQuery) || 
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query, items]);

  return {
    query,
    setQuery,
    filteredItems,
  };
}
