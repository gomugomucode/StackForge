/**
 * Optimizes Unsplash image URLs by setting output width, height, fit, quality, and modern webp format.
 */
export function optimizeUnsplashUrl(url: string, width = 400, height?: number): string {
  if (!url || !url.includes('images.unsplash.com')) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('w', width.toString());
    if (height) {
      parsed.searchParams.set('h', height.toString());
      parsed.searchParams.set('fit', 'crop');
      if (url.includes('crop=face')) {
        parsed.searchParams.set('crop', 'face');
      }
    }
    parsed.searchParams.set('fm', 'webp');
    parsed.searchParams.set('q', '80');
    return parsed.toString();
  } catch {
    return url;
  }
}
