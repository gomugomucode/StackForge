import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { topicId, completed } = body;

    if (!topicId || typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "topicId (string) and completed (boolean) are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Use the Progress model to track topic completion
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: topicId, // We reuse lessonId field as a generic content ID
        },
      },
      update: { completed },
      create: {
        userId: user.id,
        lessonId: topicId,
        completed,
      },
    });

    // Award XP for first completion
    if (completed) {
      const existingXp = await prisma.xpTransaction.findFirst({
        where: {
          userId: user.id,
          reason: `READ_TOPIC:${topicId}`,
        },
      });

      if (!existingXp) {
        await prisma.xpTransaction.create({
          data: {
            userId: user.id,
            amount: 10,
            reason: `READ_TOPIC:${topicId}`,
          },
        });

        await prisma.profile.upsert({
          where: { userId: user.id },
          update: { xp: { increment: 10 } },
          create: { userId: user.id, xp: 10 },
        });
      }
    }

    return NextResponse.json({
      success: true,
      completed: progress.completed,
    });
  } catch (error) {
    console.error("[API /learning/topic/complete] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
