import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const technology = searchParams.get("technology");
    const slug = searchParams.get("slug");

    if (!technology && !slug) {
      return NextResponse.json(
        { error: "Either 'technology' or 'slug' query parameter is required" },
        { status: 400 }
      );
    }

    // Fetch a single topic by technology + slug
    if (technology && slug) {
      const topic = await prisma.topic.findFirst({
        where: {
          technology: technology.toLowerCase(),
          slug: slug.toLowerCase(),
        },
        include: {
          content: true,
          examples: { orderBy: { createdAt: "asc" } },
          challenges: { orderBy: { difficulty: "asc" } },
          quizzes: {
            include: {
              questions: true,
            },
          },
          interviews: { orderBy: { difficulty: "asc" } },
        },
      });

      if (!topic) {
        return NextResponse.json(
          { error: `Topic '${slug}' not found for technology '${technology}'` },
          { status: 404 }
        );
      }

      return NextResponse.json(topic);
    }

    // Fetch all topics for a technology
    if (technology) {
      const topics = await prisma.topic.findMany({
        where: { technology: technology.toLowerCase() },
        orderBy: { createdAt: "asc" },
        include: {
          content: true,
          _count: {
            select: {
              examples: true,
              challenges: true,
              quizzes: true,
              interviews: true,
            },
          },
        },
      });

      return NextResponse.json(topics);
    }

    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[API /learning/topic] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
