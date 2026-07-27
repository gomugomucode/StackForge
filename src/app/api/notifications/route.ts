import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const notificationDelegate = (prisma as any).notification;
    if (!notificationDelegate) {
      return NextResponse.json({ success: true, unreadCount: 0, notifications: [] });
    }

    const notifications = await notificationDelegate.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const unreadCount = await notificationDelegate.count({
      where: { userId: user.id, read: false },
    });

    return NextResponse.json({ success: true, unreadCount, notifications });
  } catch (error: any) {
    logger.error("Failed to fetch notifications", error, { userId: user.id });
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { notificationId, markAllRead } = await req.json();
    const notificationDelegate = (prisma as any).notification;

    if (!notificationDelegate) {
      return NextResponse.json({ success: true });
    }

    if (markAllRead) {
      await notificationDelegate.updateMany({
        where: { userId: user.id, read: false },
        data: { read: true },
      });
      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    if (!notificationId) {
      return NextResponse.json({ error: "notificationId is required" }, { status: 400 });
    }

    const updated = await notificationDelegate.update({
      where: { id: notificationId },
      data: { read: true },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    logger.error("Failed to update notification", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
