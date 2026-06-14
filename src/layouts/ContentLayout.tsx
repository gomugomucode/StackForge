import React from 'react';
import { 
  Share2, 
  Bookmark, 
  Clock, 
  BarChart3, 
  Calendar, 
  User,
  ChevronRight
} from 'lucide-react';
import { tocGenerator } from '../core/content/tocGenerator';
import type { ContentMetadata } from '../core/types/content';

interface ContentLayoutProps {
  metadata: ContentMetadata;
  content: string;
  children: React.ReactNode;
  relatedContent: ContentMetadata[];
}

export const ContentLayout = ({ metadata, content, children, relatedContent }: ContentLayoutProps) => {
  const toc = tocGenerator.generateTOC(content);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-blue-600 transition-all duration-150" style={{ width: '0%' }} id="reading-progress" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span>{metadata.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{metadata.type}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              {metadata.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 py-4 border-y border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{metadata.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{metadata.estimatedTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  metadata.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  metadata.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {metadata.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{new Date(metadata.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* MDX Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </article>

          {/* Related Content Section */}
          <section className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">Continue Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedContent.map(item => (
                <a 
                  key={item.slug} 
                  href={`/${item.type}s/${item.slug}`} 
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{item.category} • {item.estimatedTime} min</p>
                </a>
              ))}
            </div>
          </section>
        </main>

        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              On this page
            </h3>
            <nav className="space-y-1">
              {toc.map((item, idx) => (
                <a
                  key={idx}
                  href={item.slug}
                  className={`block py-1 px-3 text-sm transition-colors rounded-md ${
                    item.level === 2 ? 'font-medium text-slate-700 dark:text-slate-300' : 'pl-6 text-slate-500 dark:text-slate-400'
                  } hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};
