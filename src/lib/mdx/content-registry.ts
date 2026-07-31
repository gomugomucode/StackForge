import fs from "fs";
import path from "path";
import { parseMDXContent, ParsedMDXFile } from "./parser";

export type { ParsedMDXFile };

export class ContentRegistry {
  private static contentDir = path.join(process.cwd(), "content");

  /**
   * Recursively discovers and parses all MDX files in the content directory.
   */
  public static getAllContentFiles(): ParsedMDXFile[] {
    if (!fs.existsSync(this.contentDir)) {
      return [];
    }

    const files = this.walkDirectory(this.contentDir);
    const parsedFiles: ParsedMDXFile[] = [];

    for (const file of files) {
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        try {
          const raw = fs.readFileSync(file, "utf-8");
          const parsed = parseMDXContent(raw, file);
          parsedFiles.push(parsed);
        } catch (err) {
          console.error(`[ContentRegistry] Failed to parse file ${file}:`, err);
        }
      }
    }

    return parsedFiles;
  }

  /**
   * Discovers content files filtered by technology domain.
   */
  public static getContentByTechnology(technology: string): ParsedMDXFile[] {
    const all = this.getAllContentFiles();
    const targetTech = technology.toLowerCase();

    return all.filter((item) => item.frontmatter.technology?.toLowerCase() === targetTech);
  }

  /**
   * Finds a specific content file by slug.
   */
  public static getContentBySlug(slug: string): ParsedMDXFile | null {
    const all = this.getAllContentFiles();
    const targetSlug = slug.toLowerCase();

    return all.find((item) => item.frontmatter.slug.toLowerCase() === targetSlug) || null;
  }

  /**
   * Recursively walks a directory returning array of absolute filepaths.
   */
  private static walkDirectory(dirPath: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dirPath);

    for (const file of list) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.walkDirectory(fullPath));
      } else {
        results.push(fullPath);
      }
    }

    return results;
  }
}
