import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { addXP } from "@/features/gamification/services/xpService";

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

    // Use the TopicProgress model to track topic completion
    const progress = await prisma.topicProgress.upsert({
      where: {
        userId_topicId: {
          userId: user.id,
          topicId: topicId,
        },
      },
      update: { 
        completed, 
        lastAccessed: new Date(),
        completedAt: completed ? new Date() : null 
      },
      create: {
        userId: user.id,
        topicId: topicId,
        completed,
        lastAccessed: new Date(),
        completedAt: completed ? new Date() : null,
      },
    });

    const topic = await prisma.topic.findUnique({
      where: { id: topicId }
    });

    if (completed && topic?.roadmapId) {
      const roadmapId = topic.roadmapId;
      
      // Calculate total topics for this roadmap
      const totalTopics = await prisma.topic.count({
        where: { roadmapId }
      });

      // Calculate completed topics for this user in this roadmap
      const completedTopicsCount = await prisma.topicProgress.count({
        where: {
          userId: user.id,
          topic: { roadmapId },
          completed: true
        }
      });

      const completionPercentage = Math.round((completedTopicsCount / totalTopics) * 100);

      await prisma.roadmapCompletion.upsert({
        where: {
          userId_roadmapId: {
            userId: user.id,
            roadmapId: roadmapId,
          },
        },
        update: {
          completionPercentage,
          updatedAt: new Date(),
        },
        create: {
          userId: user.id,
          roadmapId: roadmapId,
          completionPercentage,
        },
      });
    }

    // Award XP for first completion
    if (completed) {
      try {
        await addXP(user.id, "TOPIC_COMPLETION", topicId);
      } catch (e) {
        console.error("Error awarding XP for topic completion:", e);
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
