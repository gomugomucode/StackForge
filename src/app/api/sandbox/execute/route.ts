import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { CodeExecutionService } from "@/features/sandbox/services/codeExecutionService";

export async function POST(req: NextRequest) {
  try {
    const user = await getSupabaseServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code, language } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code string is required" }, { status: 400 });
    }

    if (!language || typeof language !== "string") {
      return NextResponse.json({ error: "Language is required" }, { status: 400 });
    }

    const result = await CodeExecutionService.executeCode(code, language);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /sandbox/execute] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
