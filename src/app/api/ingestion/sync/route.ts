import { NextRequest, NextResponse } from "next/server";
import { SyncEngine } from "@/features/content/services/syncEngine";
import { IngestionService } from "@/features/content/services/ingestionService";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target") || "all"; // "mdx" | "external" | "all"

  try {
    let mdxStats = null;
    let ingestionStats = null;

    if (target === "mdx" || target === "all") {
      logger.info("[IngestionAPI] Triggering Git MDX metadata sync");
      mdxStats = await SyncEngine.syncGitMDXToDatabase();
    }

    if (target === "external" || target === "all") {
      logger.info("[IngestionAPI] Triggering external sources ingestion pipeline");
      ingestionStats = await IngestionService.runIngestionPipeline();
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      mdxSync: mdxStats,
      externalIngestion: ingestionStats,
    });
  } catch (error: any) {
    logger.error("[IngestionAPI] Ingestion sync failed", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
