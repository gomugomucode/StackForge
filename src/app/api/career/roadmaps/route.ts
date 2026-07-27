import { NextRequest, NextResponse } from "next/server";
import { careerRoadmaps } from "@/data/careerRoadmaps";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const roadmap = careerRoadmaps.find((r) => r.slug === slug);
    if (!roadmap) {
      return NextResponse.json({ error: "Career roadmap not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, roadmap });
  }

  return NextResponse.json({
    success: true,
    count: careerRoadmaps.length,
    roadmaps: careerRoadmaps,
  });
}
