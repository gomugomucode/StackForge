import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { HiringReadinessEngine } from "@/features/career/services/hiringReadinessEngine";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const readiness = await HiringReadinessEngine.calculateHiringReadiness(user.id);
    return NextResponse.json({ success: true, readiness });
  } catch (error: any) {
    logger.error("Failed to calculate hiring readiness", error, { userId: user.id });
    return NextResponse.json({ error: "Failed to calculate hiring readiness" }, { status: 500 });
  }
}
