import { supabase } from '@/lib/supabase';
import type { ContentMetadata } from '@/lib/core/types/content';

export const recommendationService = {
  async getRecommendedContent(userId: string): Promise<ContentMetadata[]> {
    // 1. Get completed content for the user
    const { data: completed } = await supabase
      .from('progress')
      .select('content_slug, content_type')
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (!completed || completed.length === 0) return [];

    // 2. Simple Recommendation Logic:
    // Find items in the same categories as completed ones, but not yet completed

    
    // This would normally call a dedicated API, here we filter from our content index
    // In a real app, this would be a Supabase RPC call to a specialized recommendation function
    return []; // Mocked: returns items based on shared category logic
  },

  async trackLearningTime(userId: string, slug: string, seconds: number) {
    await supabase.from('learning_history').insert({
      user_id: userId,
      content_slug: slug,
      duration_seconds: seconds
    });
  }
};
