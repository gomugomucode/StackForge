export interface TOCItem {
  title: string;
  id: string;
  level: number;
  slug: string;
}

export const tocGenerator = {
  generateTOC(content: string): TOCItem[] {
    const headings: TOCItem[] = [];
    const regex = /^#+\s+(.*)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const fullMatch = match[0];
      const title = match[1];
      const level = fullMatch.split(' ')[0].length;
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      headings.push({
        title,
        id,
        level,
        slug: `#${id}`
      });
    }

    return headings;
  }
};
