import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { SyncScheduler } from "@/lib/sync/syncScheduler";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const historyDelegate = (prisma as any).syncHistory;
    const history = historyDelegate
      ? await historyDelegate.findMany({
          orderBy: { timestamp: "desc" },
          take: 10,
        })
      : [];

    const externalArticleDelegate = (prisma as any).externalArticle;
    const totalArticles = externalArticleDelegate ? await externalArticleDelegate.count() : 0;

    const externalProjectDelegate = (prisma as any).externalProject;
    const totalProjects = externalProjectDelegate ? await externalProjectDelegate.count() : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalArticles,
        totalProjects,
      },
      syncHistory: history,
    });
  } catch (error: any) {
    logger.error("Failed to fetch content sync status", error);
    return NextResponse.json({ error: "Failed to fetch sync status" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await SyncScheduler.runFullSync();
    return NextResponse.json({
      success: true,
      message: "Content synchronization completed",
      result,
    });
  } catch (error: any) {
    logger.error("Manual content sync failed", error);
    return NextResponse.json({ error: "Manual sync failed" }, { status: 500 });
  }
}
