import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await prisma.tutorSession.findMany({
      where: { userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("[API /api/tutor/history] GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { topic, messages, sessionId } = body;

    let session;
    if (sessionId) {
      session = await prisma.tutorSession.update({
        where: { id: sessionId },
        data: {
          updatedAt: new Date(),
          messages: {
            create: messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          },
        },
        include: { messages: true },
      });
    } else {
      session = await prisma.tutorSession.create({
        data: {
          userId: user.id,
          topic: topic || "General Programming",
          messages: {
            create: (messages || []).map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          },
        },
        include: { messages: true },
      });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("[API /api/tutor/history] POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
