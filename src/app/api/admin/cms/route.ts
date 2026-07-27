import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck instanceof NextResponse) return adminCheck;

  const { searchParams } = new URL(req.url);
  const entity = searchParams.get("entity") || "topic";
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status");
  const difficulty = searchParams.get("difficulty");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;

  try {
    let items: any[] = [];
    let total = 0;

    switch (entity.toLowerCase()) {
      case "topic": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };
        if (difficulty) where.difficulty = difficulty;

        total = await prisma.topic.count({ where });
        items = await prisma.topic.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
          include: { content: true },
        });
        break;
      }
      case "lesson": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };
        if (status) where.status = status as any;
        if (difficulty) where.difficulty = difficulty;

        total = await prisma.lesson.count({ where });
        items = await prisma.lesson.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
        });
        break;
      }
      case "quiz": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };
        if (difficulty) where.difficulty = difficulty;

        total = await prisma.quiz.count({ where });
        items = await prisma.quiz.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
          include: { questions: true },
        });
        break;
      }
      case "challenge": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };
        if (difficulty) where.difficulty = difficulty;

        total = await prisma.challenge.count({ where });
        items = await prisma.challenge.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
        });
        break;
      }
      case "project": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };
        if (difficulty) where.difficulty = difficulty;

        total = await prisma.project.count({ where });
        items = await prisma.project.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
        });
        break;
      }
      case "roadmap": {
        const where: any = {};
        if (search) where.title = { contains: search, mode: "insensitive" };

        total = await prisma.roadmap.count({ where });
        items = await prisma.roadmap.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
        });
        break;
      }
      default:
        return NextResponse.json({ error: `Unsupported entity type: ${entity}` }, { status: 400 });
    }

    return NextResponse.json({
      entity,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    });
  } catch (error: any) {
    logger.error("Failed to fetch CMS content", error, { entity });
    return NextResponse.json({ error: "Failed to fetch content", details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck instanceof NextResponse) return adminCheck;
  const { dbUser } = adminCheck;

  try {
    const body = await req.json();
    const { entity, title, description, difficulty, slug, ...extraData } = body;

    if (!entity || !title) {
      return NextResponse.json({ error: "entity and title are required" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    let createdItem: any = null;

    switch (entity.toLowerCase()) {
      case "topic": {
        createdItem = await prisma.topic.create({
          data: {
            title,
            description: description || "",
            slug: generatedSlug,
            technology: extraData.technology || "General",
            difficulty: difficulty || "beginner",
            tags: extraData.tags || [],
            learningObjectives: extraData.learningObjectives || [],
            prerequisites: extraData.prerequisites || [],
          },
        });
        break;
      }
      case "lesson": {
        createdItem = await prisma.lesson.create({
          data: {
            title,
            description: description || "",
            slug: generatedSlug,
            moduleId: extraData.moduleId || "",
            whatIsIt: extraData.whatIsIt || "",
            whyItMatters: extraData.whyItMatters || "",
            syntax: extraData.syntax || "",
            declaration: extraData.declaration || "",
            example: extraData.example || "",
            commonMistakes: extraData.commonMistakes || "",
            practiceTask: extraData.practiceTask || "",
            difficulty: difficulty || "beginner",
            status: "DRAFT",
            version: 1,
            skillsGained: extraData.skillsGained || [],
            xpAwarded: extraData.xpAwarded ? Number(extraData.xpAwarded) : 50,
            seoTitle: extraData.seoTitle || title,
            seoDescription: extraData.seoDescription || description,
          },
        });
        break;
      }
      case "quiz": {
        createdItem = await prisma.quiz.create({
          data: {
            title,
            description: description || "",
            difficulty: difficulty || "beginner",
            topicId: extraData.topicId || null,
          },
        });
        break;
      }
      case "challenge": {
        createdItem = await prisma.challenge.create({
          data: {
            title,
            description: description || "",
            difficulty: difficulty || "beginner",
            solution: extraData.solution || "",
            hints: extraData.hints || [],
            expectedOutput: extraData.expectedOutput || "",
            topicId: extraData.topicId || "",
          },
        });
        break;
      }
      case "project": {
        createdItem = await prisma.project.create({
          data: {
            title,
            description: description || "",
            difficulty: difficulty || "beginner",
            topicId: extraData.topicId || null,
            resources: extraData.resources || [],
          },
        });
        break;
      }
      case "roadmap": {
        createdItem = await prisma.roadmap.create({
          data: {
            title,
            description: description || "",
            slug: generatedSlug,
            category: extraData.category || "Development",
            color: extraData.color || "#3b82f6",
            icon: extraData.icon || "Code",
            overview: extraData.overview || description || "",
          },
        });
        break;
      }
      default:
        return NextResponse.json({ error: `Unsupported entity type: ${entity}` }, { status: 400 });
    }

    // Versioning snapshot
    await prisma.contentVersion.create({
      data: {
        entityType: entity,
        entityId: createdItem.id,
        version: 1,
        dataJson: createdItem,
        createdById: dbUser.id,
      },
    });

    // Audit log
    await prisma.adminAuditLog.create({
      data: {
        userId: dbUser.id,
        action: "CREATE",
        entityType: entity,
        entityId: createdItem.id,
        details: { title, slug: generatedSlug },
      },
    });

    logger.audit(dbUser.id, "CREATE", entity, createdItem.id, { title });

    return NextResponse.json({ success: true, item: createdItem }, { status: 201 });
  } catch (error: any) {
    logger.error("Failed to create CMS item", error);
    return NextResponse.json({ error: "Failed to create content", details: error.message }, { status: 500 });
  }
}
