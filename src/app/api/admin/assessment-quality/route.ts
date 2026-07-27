import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { AssessmentQualityService } from "@/features/assessment/services/assessmentQualityService";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck instanceof NextResponse) return adminCheck;

  try {
    const report = await AssessmentQualityService.auditAllAssessments();
    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    logger.error("Failed to audit assessment quality", error);
    return NextResponse.json({ error: "Failed to audit assessment quality", details: error.message }, { status: 500 });
  }
}
