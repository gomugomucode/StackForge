import { NextRequest, NextResponse } from "next/server";
import { GraphEngine } from "@/features/graph/services/graphEngine";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const action = searchParams.get("action") || "neighborhood"; // "neighborhood" | "prerequisites" | "next" | "validate"
  const depth = parseInt(searchParams.get("depth") || "2", 10);

  try {
    if (action === "validate") {
      const integrity = await GraphEngine.validateGraphIntegrity();
      return NextResponse.json({ success: true, integrity });
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Missing required parameter: slug" },
        { status: 400 }
      );
    }

    if (action === "prerequisites") {
      const prerequisites = await GraphEngine.getPrerequisites(slug);
      return NextResponse.json({ success: true, count: prerequisites.length, prerequisites });
    }

    if (action === "next") {
      const nextTopics = await GraphEngine.getNextRecommended(slug);
      return NextResponse.json({ success: true, count: nextTopics.length, nextTopics });
    }

    // Default: neighborhood graph
    const subgraph = await GraphEngine.getGraphNeighbourhood(slug, depth);
    return NextResponse.json({ success: true, subgraph });
  } catch (error: any) {
    logger.error("Error in Knowledge Graph API", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
