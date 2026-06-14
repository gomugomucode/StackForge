import { useState, useEffect, useMemo } from 'react';
import { Search, Command, X, FileText, Map } from 'lucide-react';
import { contentService } from '../../core/content/contentService';
import type { ContentMetadata } from '../../core/types/content';

interface SearchResult {
  title: string;
  slug: string;
  type: string;
  description: string;
}
// Using SearchResult interface to ensure it's not removed
export type { SearchResult };

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query) return [];
    
    const allContent = contentService.getAllContent();
    return allContent
      .filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .map(item => ({
        title: item.title,
        slug: item.slug,
        type: item.type,
        description: item.category
      }));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-lg text-slate-900 dark:text-white"
            placeholder="Search for tutorials, roadmaps, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500 font-medium border border-slate-200 dark:border-slate-700">
              <Command className="w-3 h-3" /> K
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {query === '' ? (
            <div className="py-4">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Popular Topics</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'Next.js'].map(topic => (
                  <button 
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {results.length > 0 ? (
                results.map(result => (
                  <button 
                    key={result.slug}
                    onClick={() => {
                      window.location.href = `/docs/${result.slug}`;
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors group"
                  >
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                      {result.type === 'Roadmaps' ? <Map className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{result.title}</div>
                      <div className="text-xs text-slate-500">{result.type} • {result.description}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-10 text-center text-slate-500">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
