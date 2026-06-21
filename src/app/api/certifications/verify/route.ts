import { NextRequest, NextResponse } from "next/server";
import { verifyCertificate } from "@/features/certifications/services/certificateService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
    }

    const certificate = await verifyCertificate(code);

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("[API /certifications/verify] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
