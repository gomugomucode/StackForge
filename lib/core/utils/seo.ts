import type { ContentMetadata } from '../types/content';

export const seoService = {
  generateMetaTags(item: ContentMetadata) {
    return {
      title: `${item.title} | StackForge Academy`,
      description: `Master ${item.category} with our ${item.difficulty} level ${item.type}. Estimated reading time: ${item.estimatedTime} min.`,
      openGraph: {
        title: item.title,
        description: `Learn ${item.category} on StackForge Academy`,
        type: 'article',
        url: `https://stackforge.academy/${item.type}s/${item.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: item.title,
        description: `Read our guide on ${item.category}`,
      },
      breadcrumbs: [
        { label: 'Home', path: '/' },
        { label: item.category, path: `/${item.category.toLowerCase()}` },
        { label: item.title, path: `/${item.type}s/${item.slug}` },
      ]
    };
  },

  generateSitemap(content: ContentMetadata[]) {
    return content.map(item => ({
      url: `/${item.type}s/${item.slug}`,
      lastmod: item.lastUpdated,
      changefreq: 'monthly',
      priority: item.featured ? '1.0' : '0.8',
    }));
  }
};
