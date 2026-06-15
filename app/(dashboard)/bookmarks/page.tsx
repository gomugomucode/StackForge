import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/core/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Bookmark, Trash2, BookOpen } from 'lucide-react';
import { ContentCard } from '@/components/ui/ContentCard';
import type { ContentMetadata } from '@/lib/core/types/content';

const BookmarksPage = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<ContentMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user?.id);

    if (error) console.error(error);
    
    const resolved = data?.map(b => ({
      title: b.content_slug.replace(/-/g, ' '),
      slug: b.content_slug,
      category: b.content_type,
      difficulty: 'Intermediate' as any,
      tags: [],
      estimatedTime: 20,
      author: 'StackForge',
      featured: false,
      lastUpdated: new Date().toISOString(),
      type: b.content_type
    })) || [];

    setBookmarks(resolved);
    setLoading(false);
  };

  const toggleBookmark = async (slug: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user?.id)
      .eq('content_slug', slug);

    if (error) alert(error.message);
    else fetchBookmarks();
  };

  if (!user) return <div className="py-20 text-center text-slate-500">Please sign in to view bookmarks.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookmarks</h1>
          <p className="text-slate-500">Your curated library of learning resources</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-sm font-medium">
          <Bookmark className="w-4 h-4" /> {bookmarks.length} Saved
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(item => (
            <div key={item.slug} className="group relative">
              <ContentCard item={item} link={`/${item.type}s/${item.slug}`} />
              <button 
                onClick={() => toggleBookmark(item.slug)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && bookmarks.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">No bookmarks yet</h3>
          <p className="text-slate-500 mb-6">Save tutorials, projects, and guides to access them later.</p>
          <a href="/tutorials" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            Explore Tutorials
          </a>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
