import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const flags = await prisma.featureFlag.findMany();
    return NextResponse.json({ success: true, flags });
  } catch (error: any) {
    logger.error("Failed to fetch feature flags", error);
    return NextResponse.json({ error: "Failed to fetch feature flags" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck instanceof NextResponse) return adminCheck;
  const { dbUser } = adminCheck;

  try {
    const { key, enabled, description } = await req.json();
    if (!key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    const flag = await prisma.featureFlag.upsert({
      where: { key },
      create: {
        key,
        enabled: Boolean(enabled),
        description: description || null,
      },
      update: {
        enabled: Boolean(enabled),
        description: description !== undefined ? description : undefined,
      },
    });

    logger.audit(dbUser.id, "UPDATE_FEATURE_FLAG", "FeatureFlag", flag.id, { key, enabled });

    return NextResponse.json({ success: true, flag });
  } catch (error: any) {
    logger.error("Failed to update feature flag", error);
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
