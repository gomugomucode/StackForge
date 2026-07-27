import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ success: true, results: [] });
  }

  try {
    const query = q.trim();

    const [lessons, roadmaps, projects, cheatsheets] = await Promise.all([
      prisma.lesson.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
          status: "PUBLISHED",
        },
        take: 5,
        select: { id: true, title: true, slug: true, difficulty: true },
      }),
      prisma.roadmap.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, category: true },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, difficulty: true },
      }),
      prisma.cheatSheet.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true },
      }),
    ]);

    const results = [
      ...lessons.map((l) => ({
        id: `lesson-${l.id}`,
        title: l.title,
        type: "lesson",
        category: "Lesson",
        url: `/roadmaps/full-stack/lesson/${l.slug}`,
      })),
      ...roadmaps.map((r) => ({
        id: `roadmap-${r.id}`,
        title: r.title,
        type: "roadmap",
        category: r.category || "Roadmap",
        url: `/roadmaps/${r.slug}`,
      })),
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        title: p.title,
        type: "project",
        category: "Project",
        url: `/projects`,
      })),
      ...cheatsheets.map((c) => ({
        id: `cheatsheet-${c.id}`,
        title: c.title,
        type: "cheatsheet",
        category: "CheatSheet",
        url: `/cheatsheets`,
      })),
    ];

    return NextResponse.json({ success: true, count: results.length, results });
  } catch (error: any) {
    logger.error("Failed global search", error, { query: q });
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
