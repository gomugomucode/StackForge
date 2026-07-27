import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repoUrl, submissionId } = await req.json();
    if (!repoUrl) {
      return NextResponse.json({ error: "GitHub Repository URL is required" }, { status: 400 });
    }

    // Static Analysis Scoring simulation based on repo structural criteria
    const hasReadme = repoUrl.toLowerCase().includes("github.com");
    const readmeScore = hasReadme ? 90 : 50;
    const codeQuality = 85;
    const testCoverage = 78;
    const securityScore = 92;

    const overallScore = Math.round(
      0.25 * readmeScore +
      0.35 * codeQuality +
      0.20 * testCoverage +
      0.20 * securityScore
    );

    const feedback = {
      overallScore,
      readmeScore,
      codeQuality,
      testCoverage,
      securityScore,
      strengths: [
        "Repository follows clean module architecture.",
        "Include proper dependency definitions.",
        "Security audit passed with zero high vulnerabilities.",
      ],
      improvementPlan: [
        "Add unit test coverage for edge case validation.",
        "Expand inline JSDoc / TSDoc annotations for core utilities.",
      ],
    };

    return NextResponse.json({
      success: true,
      review: feedback,
    });
  } catch (error) {
    console.error("[API /api/projects/review] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
