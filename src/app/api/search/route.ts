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

    let lessons: any[] = [];
    let roadmaps: any[] = [];
    let projects: any[] = [];
    let cheatsheets: any[] = [];
    let externalArticles: any[] = [];
    let externalProjects: any[] = [];

    try {
      lessons = await prisma.lesson.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, difficulty: true },
      });
    } catch {}

    try {
      roadmaps = await prisma.roadmap.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, category: true },
      });
    } catch {}

    try {
      projects = await prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, difficulty: true },
      });
    } catch {}

    try {
      cheatsheets = await prisma.cheatSheet.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true },
      });
    } catch {}

    const externalArticleDelegate = (prisma as any).externalArticle;
    if (externalArticleDelegate) {
      try {
        externalArticles = await externalArticleDelegate.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          },
          take: 5,
        });
      } catch {}
    }

    const externalProjectDelegate = (prisma as any).externalProject;
    if (externalProjectDelegate) {
      try {
        externalProjects = await externalProjectDelegate.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          },
          take: 5,
        });
      } catch {}
    }

    const results = [
      ...lessons.map((l: any) => ({
        id: `lesson-${l.id}`,
        title: l.title,
        type: "lesson",
        category: "Lesson",
        url: `/roadmaps/full-stack/lesson/${l.slug}`,
      })),
      ...roadmaps.map((r: any) => ({
        id: `roadmap-${r.id}`,
        title: r.title,
        type: "roadmap",
        category: r.category || "Roadmap",
        url: `/roadmaps/${r.slug}`,
      })),
      ...projects.map((p: any) => ({
        id: `project-${p.id}`,
        title: p.title,
        type: "project",
        category: "Project",
        url: `/projects`,
      })),
      ...cheatsheets.map((c: any) => ({
        id: `cheatsheet-${c.id}`,
        title: c.title,
        type: "cheatsheet",
        category: "CheatSheet",
        url: `/cheatsheets`,
      })),
      ...externalArticles.map((a: any) => ({
        id: `ext-article-${a.id}`,
        title: a.title,
        type: "article",
        category: `Article (${a.source})`,
        url: a.sourceUrl || `/blog`,
      })),
      ...externalProjects.map((p: any) => ({
        id: `ext-repo-${p.id}`,
        title: `${p.title} (${p.stars} ★)`,
        type: "github-repo",
        category: "GitHub Repo",
        url: p.repoUrl || `/projects`,
      })),
    ];

    return NextResponse.json({ success: true, count: results.length, results });
  } catch (error: any) {
    logger.error("Failed global search", error, { query: q });
    return NextResponse.json({ success: true, count: 0, results: [] });
  }
}
