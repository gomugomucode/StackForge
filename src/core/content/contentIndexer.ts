import { ContentItem, ContentMetadata } from '../../core/types/content';

export class ContentIndexer {
  private static contentMap = new Map<string, ContentItem>();
  private static metadataMap = new Map<string, ContentMetadata>();

  static async indexContent(files: Record<string, any>) {
    const entries = Object.entries(files);
    
    for (const [path, module] of entries) {
      const content = module.default || module;
      const type = this.extractTypeFromPath(path);
      const slug = this.extractSlugFromPath(path);
      
      // In a real scenario, we'd parse frontmatter here.
      // Assuming the MDX plugin provides frontmatter in the module.
      const frontmatter = content.frontmatter || {};
      
      const item: ContentItem = {
        id: `${type}-${slug}`,
        slug,
        content: content.body || '',
        frontmatter,
        type
      };

      const metadata: ContentMetadata = {
        title: frontmatter.title || 'Untitled',
        slug,
        category: frontmatter.category || 'General',
        difficulty: frontmatter.difficulty || 'Beginner',
        tags: frontmatter.tags || [],
        estimatedTime: frontmatter.estimatedTime || 0,
        author: frontmatter.author || 'StackForge',
        featured: frontmatter.featured || false,
        lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
        type
      };

      this.contentMap.set(item.id, item);
      this.metadataMap.set(item.id, metadata);
    }
  }

  private static extractTypeFromPath(path: string): ContentItem['type'] {
    if (path.includes('tutorials')) return 'tutorial';
    if (path.includes('roadmaps')) return 'roadmap';
    if (path.includes('cheatsheets')) return 'cheatsheet';
    if (path.includes('projects')) return 'project';
    if (path.includes('interview')) return 'interview';
    if (path.includes('blog')) return 'blog';
    if (path.includes('docs')) return 'doc';
    return 'tutorial';
  }

  private static extractSlugFromPath(path: string): string {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace(/\.mdx$/, '').replace(/\.md$/, '');
  }

  static getContentItem(id: string) {
    return this.contentMap.get(id);
  }

  static getAllMetadata() {
    return Array.from(this.metadataMap.values());
  }

  static getMetadataBySlug(type: string, slug: string) {
    const id = `${type}-${slug}`;
    return this.metadataMap.get(id);
  }
}
