import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import type { ContentMetadata } from '../../core/types/content';
import { ContentCard } from '../../components/ui/ContentCard';

interface ContentBrowserProps {
  title: string;
  description: string;
  content: ContentMetadata[];
  type: string;
}

export const ContentBrowser = ({ title, description, content, type }: ContentBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(content.map(item => item.category)))], 
  [content]);

  const filteredContent = useMemo(() => {
    return content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'All' || item.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, difficultyFilter, categoryFilter, content]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search guides, projects, tools..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium">
              <Filter className="w-4 h-4" /> Difficulty <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-40 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                <button 
                  key={level} 
                  onClick={() => setDifficultyFilter(level)}
                  className={`w-full text-left px-4 py-2 text-sm ${difficultyFilter === level ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium">
              <Filter className="w-4 h-4" /> Category <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left px-4 py-2 text-sm ${categoryFilter === cat ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map(item => (
          <ContentCard 
            key={item.slug} 
            item={item} 
            link={`/${type}s/${item.slug}`} 
          />
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No content found matching your filters.</p>
        </div>
      )}
    </div>
  );
};
