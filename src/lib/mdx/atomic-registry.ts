import fs from "node:fs";
import path from "node:path";
import { parseMDXContent } from "./parser";

export interface AtomicUnit {
  unitId: string;
  type: "concept" | "example" | "exercise" | "quiz" | "interview" | "reference";
  conceptId: string;
  technology: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
}

export class AtomicRegistry {
  private static contentDir = path.join(process.cwd(), "content");
  private static unitsCache: Map<string, AtomicUnit[]> = new Map();

  public static getUnitsForConcept(conceptId: string): AtomicUnit[] {
    if (this.unitsCache.has(conceptId)) {
      return this.unitsCache.get(conceptId)!;
    }

    const units: AtomicUnit[] = [];
    const unitsDir = path.join(this.contentDir, "units");

    if (!fs.existsSync(unitsDir)) {
      return units;
    }

    const unitTypes = ["concepts", "examples", "exercises", "quizzes", "interviews", "references"];

    for (const type of unitTypes) {
      const typeDir = path.join(unitsDir, type);
      if (fs.existsSync(typeDir)) {
        const files = fs.readdirSync(typeDir);
        for (const file of files) {
          if (file.endsWith(".mdx") || file.endsWith(".json")) {
            const filepath = path.join(typeDir, file);
            const rawContent = fs.readFileSync(filepath, "utf-8");
            const fileBase = path.parse(file).name;

            if (fileBase.startsWith(conceptId)) {
              let parsedContent = rawContent;
              let metadata: Record<string, any> = {};

              if (file.endsWith(".mdx")) {
                const parsed = parseMDXContent(rawContent);
                parsedContent = parsed.body;
                metadata = parsed.frontmatter;
              } else if (file.endsWith(".json")) {
                metadata = JSON.parse(rawContent);
              }

              units.push({
                unitId: `${type}_${fileBase}`,
                type: type.slice(0, -1) as AtomicUnit["type"],
                conceptId,
                technology: metadata.technology || "general",
                title: metadata.title || fileBase,
                content: parsedContent,
                metadata,
              });
            }
          }
        }
      }
    }

    this.unitsCache.set(conceptId, units);
    return units;
  }

  public static clearCache() {
    this.unitsCache.clear();
  }
}
