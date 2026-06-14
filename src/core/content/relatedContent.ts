import { ContentIndexer } from './contentIndexer';
import type { ContentMetadata } from '../types/content';

export const relatedContentService = {
  getRelatedContent(currentSlug: string, currentType: string, limit = 4): ContentMetadata[] {
    const currentItem = ContentIndexer.getMetadataBySlug(currentType, currentSlug);
    if (!currentItem) return [];

    const allContent = ContentIndexer.getAllMetadata();
    
    return allContent
      .filter(item => item.slug !== currentSlug)
      .map(item => {
        let score = 0;
        
        // Same category gets high priority
        if (item.category === currentItem.category) score += 3;
        
        // Shared tags
        const sharedTags = item.tags.filter(tag => currentItem.tags.includes(tag));
        score += sharedTags.length * 2;
        
        // Same type
        if (item.type === currentItem.type) score += 1;

        return { ...item, score };
      })
      .filter(item => (item as any).score > 0)
      .sort((a, b) => (b as any).score - (a as any).score)
      .slice(0, limit) as ContentMetadata[];
  }
};
