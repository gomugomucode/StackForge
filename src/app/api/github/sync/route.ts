import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { GithubSyncService } from "@/features/github/services/githubSyncService";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const user = await getSupabaseServerUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { username, avatarUrl } = await req.json();
    if (!username) {
      return NextResponse.json({ error: "username is required" }, { status: 400 });
    }

    const syncRecord = await GithubSyncService.syncUserProfile(user.id, username, avatarUrl);

    logger.info("GitHub profile synced successfully", { userId: user.id, username });

    return NextResponse.json({ success: true, syncRecord });
  } catch (error: any) {
    logger.error("GitHub sync failed", error, { userId: user.id });
    return NextResponse.json({ error: "Sync failed", details: error.message }, { status: 500 });
  }
}
