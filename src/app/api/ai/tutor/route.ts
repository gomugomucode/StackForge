import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { AIService } from "@/features/ai/services/aiService";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const steps = await AIService.generateExecutionTrace(code);
    return NextResponse.json({ steps });
  } catch (error) {
    console.error("[API /ai/tutor] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
