import { supabase } from '../../lib/supabase';

export const syncService = {
  async syncProgress(userId: string, localProgress: any[]) {
    // Bulk upsert local progress to cloud
    const { error } = await supabase.from('progress').upsert(
      localProgress.map(p => ({
        user_id: userId,
        content_slug: p.slug,
        content_type: p.type,
        status: p.status,
        progress_percent: p.progress,
      }))
    );
    if (error) console.error('Sync Error:', error);
  },

  async syncBookmarks(userId: string, localBookmarks: string[]) {
    // 1. Get current cloud bookmarks
    const { data } = await supabase
      .from('bookmarks')
      .select('content_slug')
      .eq('user_id', userId);

    const cloudSlugs = data?.map((b: any) => b.content_slug) || [];
    
    // 2. Find what to add (in local, not in cloud)
    const toAdd = localBookmarks.filter(slug => !cloudSlugs.includes(slug));
    
    // 3. Find what to remove (in cloud, not in local)
    const toRemove = cloudSlugs.filter((slug: string) => !localBookmarks.includes(slug));

    if (toAdd.length > 0) {
      await supabase.from('bookmarks').insert(
        toAdd.map(slug => ({ user_id: userId, content_slug: slug, content_type: 'unknown' }))
      );
    }

    if (toRemove.length > 0) {
      await supabase.from('bookmarks').delete().in('content_slug', toRemove);
    }
  },

  async getCloudUserData(userId: string) {
    const [
      { data: progress },
      { data: bookmarks },
      { data: achievements }
    ] = await Promise.all([
      supabase.from('progress').select('*').eq('user_id', userId),
      supabase.from('bookmarks').select('*').eq('user_id', userId),
      supabase.from('user_achievements').select('*').eq('user_id', userId),
    ]);

    return { progress, bookmarks, achievements };
  }
};
