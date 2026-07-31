import { NextRequest, NextResponse } from "next/server";
import { SearchService } from "@/features/search/services/searchService";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const technology = searchParams.get("technology") || undefined;
  const difficulty = searchParams.get("difficulty") || undefined;
  const entityType = searchParams.get("type") || undefined;
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ success: true, count: 0, results: [] });
  }

  try {
    const results = await SearchService.executeSearch({
      query,
      technology,
      difficulty,
      entityType,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error: any) {
    logger.error("Failed global search execution in API route", error, { query });
    return NextResponse.json(
      { success: false, error: "Search execution failed", results: [] },
      { status: 500 }
    );
  }
}
