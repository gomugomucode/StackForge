import fs from "fs";
import path from "path";

export interface MDXFrontmatter {
  title: string;
  slug: string;
  technology: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  summary?: string;
  description?: string;
  tags?: string[];
  prerequisites?: string[];
  nextTopics?: string[];
  readingTime?: number;
  author?: string;
  canonicalUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  qualityScore?: number;
  isPinned?: boolean;
}

export interface ParsedMDXFile {
  filepath: string;
  relativeSlug: string;
  frontmatter: MDXFrontmatter;
  rawContent: string;
  body: string;
  headings: { level: number; text: string; slug: string }[];
  readingTimeMinutes: number;
}

/**
 * Parses raw MDX file content, extracting YAML frontmatter and document outline structure.
 */
export function parseMDXContent(rawContent: string, filepath: string = ""): ParsedMDXFile {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = frontmatterRegex.exec(rawContent);

  let frontmatterRaw = "";
  let body = rawContent;

  if (match) {
    frontmatterRaw = match[1];
    body = rawContent.slice(match[0].length).trim();
  }

  const frontmatter = parseYAMLFrontmatter(frontmatterRaw, filepath);

  // Calculate estimated reading time (~200 words per minute)
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Extract headings (# Heading)
  const headings = extractHeadings(body);

  const defaultSlug = path.basename(filepath, path.extname(filepath));

  return {
    filepath,
    relativeSlug: frontmatter.slug || defaultSlug,
    frontmatter: {
      ...frontmatter,
      title: frontmatter.title || defaultSlug,
      slug: frontmatter.slug || defaultSlug,
      technology: frontmatter.technology || extractTechnologyFromPath(filepath),
      readingTime: frontmatter.readingTime || readingTimeMinutes,
    },
    rawContent,
    body,
    headings,
    readingTimeMinutes,
  };
}

/**
 * Parses raw YAML key-value frontmatter block.
 */
function parseYAMLFrontmatter(yamlString: string, filepath: string): MDXFrontmatter {
  const res: Record<string, any> = {};

  if (!yamlString) return res as MDXFrontmatter;

  const lines = yamlString.split(/\r?\n/);
  let currentKey = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check for inline key-value pair
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && !line.startsWith(" ")) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      // Clean quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }

      if (val.startsWith("[") && val.endsWith("]")) {
        // Simple inline array parse
        const items = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
          .filter(Boolean);
        res[key] = items;
      } else if (val === "true") {
        res[key] = true;
      } else if (val === "false") {
        res[key] = false;
      } else if (!isNaN(Number(val)) && val !== "") {
        res[key] = Number(val);
      } else {
        res[key] = val;
      }

      currentKey = key;
    } else if (line.trim().startsWith("- ") && currentKey) {
      // List item
      const item = line.trim().slice(2).trim().replace(/^['"]|['"]$/g, "");
      if (!Array.isArray(res[currentKey])) {
        res[currentKey] = [];
      }
      res[currentKey].push(item);
    }
  }

  return res as MDXFrontmatter;
}

/**
 * Extracts headings for outline/TOC generation.
 */
function extractHeadings(markdown: string): { level: number; text: string; slug: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string; slug: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_~`]/g, "");
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level, text, slug });
  }

  return headings;
}

/**
 * Fallback technology detection based on path folder structure.
 */
function extractTechnologyFromPath(filepath: string): string {
  if (!filepath) return "general";
  const normalized = filepath.replace(/\\/g, "/").toLowerCase();

  if (normalized.includes("/react")) return "react";
  if (normalized.includes("/next") || normalized.includes("/nextjs")) return "nextjs";
  if (normalized.includes("/node") || normalized.includes("/nodejs")) return "nodejs";
  if (normalized.includes("/typescript")) return "typescript";
  if (normalized.includes("/javascript")) return "javascript";
  if (normalized.includes("/prisma")) return "prisma";
  if (normalized.includes("/supabase")) return "supabase";
  if (normalized.includes("/docker")) return "docker";
  if (normalized.includes("/frontend")) return "frontend";
  if (normalized.includes("/backend")) return "backend";
  if (normalized.includes("/devops")) return "devops";

  return "general";
}
