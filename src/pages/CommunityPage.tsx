import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, ThumbsUp, Share2, Send } from 'lucide-react';

interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  profiles?: { username: string; avatar_url: string };
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*, profiles(username, avatar_url)')
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Please login to post');

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title: 'New Discussion',
        content: newPost,
        category: 'General'
      });

    if (!error) {
      setNewPost('');
      // Refresh posts
      const { data } = await supabase
        .from('posts')
        .select('*, profiles(username, avatar_url)')
        .order('created_at', { ascending: false });
      if (data) setPosts(data);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading community...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Community Hub</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Connect with other developers and share your learning journey.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              placeholder="Share a question, a project or a tip..."
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
          </div>
          <button 
            onClick={handleCreatePost}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all self-end flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={post.profiles?.avatar_url || 'https://via.placeholder.com/40'} 
                className="w-10 h-10 rounded-full" 
                alt={post.profiles?.username} 
              />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{post.profiles?.username || 'Anonymous'}</div>
                <div className="text-xs text-slate-400">{new Date(post.created_at).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="text-slate-600 dark:text-slate-300 mb-6 whitespace-pre-wrap">{post.content}</div>
            <div className="flex items-center gap-6 text-slate-400">
              <button className="flex items-center gap-2 text-xs hover:text-indigo-500 transition-colors">
                <ThumbsUp className="w-4 h-4" /> Upvote
              </button>
              <button className="flex items-center gap-2 text-xs hover:text-indigo-500 transition-colors">
                <MessageSquare className="w-4 h-4" /> Comment
              </button>
              <button className="flex items-center gap-2 text-xs hover:text-indigo-500 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
