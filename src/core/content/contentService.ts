import { ContentIndexer } from './contentIndexer';
import { ContentItem, ContentMetadata } from '../types/content';

export const contentService = {
  async init() {
    // This is where we would use import.meta.glob to load all MDX files
    // For this implementation, we assume the indexing is handled or simulated
    // in a production environment via a build script or Vite plugin.
  },

  getAllContent(): ContentMetadata[] {
    return ContentIndexer.getAllMetadata();
  },

  getContentBySlug(type: string, slug: string): ContentItem | undefined {
    const metadata = ContentIndexer.getMetadataBySlug(type, slug);
    if (!metadata) return undefined;
    return ContentIndexer.getContentItem(`${type}-${slug}`);
  },

  getContentByTag(tag: string): ContentMetadata[] {
    return ContentIndexer.getAllMetadata().filter(item => 
      item.tags.includes(tag)
    );
  },

  getFeaturedContent(): ContentMetadata[] {
    return ContentIndexer.getAllMetadata().filter(item => item.featured);
  },

  getLatestContent(limit = 5): ContentMetadata[] {
    return [...ContentIndexer.getAllMetadata()]
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, limit);
  },

  getContentByType(type: string): ContentMetadata[] {
    return ContentIndexer.getAllMetadata().filter(item => item.type === type);
  }
};
