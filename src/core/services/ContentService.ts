import { ContentDoc, ContentFrontmatter, ContentMetadata, ContentType, TocItem } from '../types/content';

class ContentService {
  private contentIndex: Map<string, ContentDoc> = new Map();

  /**
   * Parses frontmatter from the content string
   */
  private parseFrontmatter(content: string): { frontmatter: ContentFrontmatter, body: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return {
        frontmatter: {
          title: 'Untitled',
          description: '',
          category: 'General',
          tags: [],
          date: new Date().toISOString().split('T')[0],
          level: 'Beginner'
        },
        body: content
      };
    }

    const frontmatterRaw = match[1];
    const body = content.slice(match[0].length);
    const frontmatter: any = {};

    frontmatterRaw.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        
        // Handle tags array [tag1, tag2]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(t => t.trim().replace(/['"]/g, ''));
        }
        
        frontmatter[key.trim()] = value;
      }
    });

    return {
      frontmatter: frontmatter as ContentFrontmatter,
      body
    };
  }

  /**
   * Calculates reading time based on word count
   */
  private calculateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  /**
   * Generates Table of Contents from markdown headings
   */
  private generateTOC(content: string): TocItem[] {
    const toc: TocItem[] = [];
    const headingRegex = /^(#{1,6})\s+(.*)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      toc.push({ text, slug, level });
    }

    return toc;
  }

  /**
   * Initialize content index by loading all mdx files from the content directory
   */
  async initialize() {
    const modules = import.meta.glob('src/content/**/*.mdx', { as: 'raw', eager: true });
    this.indexContent(modules);
  }

  /**
   * Index content from a set of files
   */
  async indexContent(files: Record<string, string>) {
    for (const [path, content] of Object.entries(files)) {
      const { frontmatter, body } = this.parseFrontmatter(content);
      const slug = path.split('/').pop()?.replace('.mdx', '').replace('.md', '') || 'untitled';
      
      const doc: ContentDoc = {
        frontmatter,
        content: body,
        metadata: {
          slug,
          path,
          readingTime: this.calculateReadingTime(body),
          toc: this.generateTOC(body)
        }
      };

      this.contentIndex.set(slug, doc);
    }
  }

  getAllContent(): ContentDoc[] {
    return Array.from(this.contentIndex.values());
  }

  getContentBySlug(slug: string): ContentDoc | undefined {
    return this.contentIndex.get(slug);
  }

  getContentByTag(tag: string): ContentDoc[] {
    return this.getAllContent().filter(doc => 
      doc.frontmatter.tags.includes(tag)
    );
  }

  getRelatedContent(slug: string, limit = 3): ContentDoc[] {
    const current = this.getContentBySlug(slug);
    if (!current) return [];

    return this.getAllContent()
      .filter(doc => doc.metadata.slug !== slug)
      .filter(doc => {
        const commonTags = doc.frontmatter.tags.filter(tag => 
          current!.frontmatter.tags.includes(tag)
        );
        return commonTags.length > 0 || doc.frontmatter.category === current!.frontmatter.category;
      })
      .slice(0, limit);
  }
}

export const contentService = new ContentService();
