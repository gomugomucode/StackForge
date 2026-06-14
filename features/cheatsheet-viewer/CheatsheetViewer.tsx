import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, BookOpen } from 'lucide-react';
import type { Cheatsheet, CheatsheetItem } from '@/lib/core/types/content-extensions';
import { motion, AnimatePresence } from 'framer-motion';

interface CheatsheetViewerProps {
  cheatsheet: Cheatsheet;
}

const CheatsheetViewer: React.FC<CheatsheetViewerProps> = ({ cheatsheet }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    cheatsheet.items.forEach((item: CheatsheetItem) => cats.add(item.category));
    return Array.from(cats);
  }, [cheatsheet]);

  const filteredItems = useMemo(() => {
    return cheatsheet.items.filter((item: CheatsheetItem) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, cheatsheet]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search snippets..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cheatsheet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item: CheatsheetItem) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-indigo-400" />
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {item.category}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">{item.description}</p>
              
              <div className="relative group/code">
                <pre className="p-3 rounded-lg bg-black/40 text-xs font-mono text-indigo-300 overflow-x-auto border border-white/5">
                  <code>{item.code}</code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(item.code, item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all opacity-0 group-hover/code:opacity-100"
                >
                  {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p>No snippets found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default CheatsheetViewer;
