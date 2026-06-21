import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type"); // 'topics', 'challenges', 'interviews', 'quizzes'
    const technology = searchParams.get("technology");
    const difficulty = searchParams.get("difficulty");
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Query parameter 'q' must be at least 2 characters" },
        { status: 400 }
      );
    }

    const searchTerm = query.toLowerCase();

    // Build the where clause for filtering
    const baseWhere: Record<string, unknown> = {};
    if (technology) {
      baseWhere.technology = technology.toLowerCase();
    }
    if (difficulty) {
      baseWhere.difficulty = difficulty;
    }

    const results: Record<string, unknown[]> = {};

    // Search Topics
    if (!type || type === "topics") {
      const topics = await prisma.topic.findMany({
        where: {
          ...baseWhere,
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { slug: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: limit,
        skip: offset,
        orderBy: { title: "asc" },
        select: {
          id: true,
          slug: true,
          technology: true,
          title: true,
          description: true,
          difficulty: true,
          estimatedTime: true,
        },
      });
      results.topics = topics;
    }

    // Search Challenges
    if (!type || type === "challenges") {
      const challenges = await prisma.challenge.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(difficulty ? { difficulty } : {}),
          ...(technology
            ? { topic: { technology: technology.toLowerCase() } }
            : {}),
        },
        take: limit,
        skip: offset,
        orderBy: { title: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          topic: {
            select: { slug: true, technology: true, title: true },
          },
        },
      });
      results.challenges = challenges;
    }

    // Search Interview Questions
    if (!type || type === "interviews") {
      const interviews = await prisma.interviewQuestion.findMany({
        where: {
          OR: [
            { question: { contains: searchTerm, mode: "insensitive" } },
            { answer: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(difficulty ? { difficulty } : {}),
          ...(technology
            ? { topic: { technology: technology.toLowerCase() } }
            : {}),
        },
        take: limit,
        skip: offset,
        orderBy: { question: "asc" },
        select: {
          id: true,
          question: true,
          difficulty: true,
          tags: true,
          companyFrequency: true,
          topic: {
            select: { slug: true, technology: true, title: true },
          },
        },
      });
      results.interviews = interviews;
    }

    // Search Quizzes
    if (!type || type === "quizzes") {
      const quizzes = await prisma.quiz.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(difficulty ? { difficulty } : {}),
          ...(technology
            ? { topic: { technology: technology.toLowerCase() } }
            : {}),
        },
        take: limit,
        skip: offset,
        orderBy: { title: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          _count: { select: { questions: true } },
          topic: {
            select: { slug: true, technology: true, title: true },
          },
        },
      });
      results.quizzes = quizzes;
    }

    return NextResponse.json({
      query: searchTerm,
      filters: { type, technology, difficulty },
      results,
    });
  } catch (error) {
    console.error("[API /learning/search] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
