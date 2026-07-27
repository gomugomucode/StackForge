import { NextRequest, NextResponse } from "next/server";
import { learningCollections } from "@/data/learningCollections";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const collection = learningCollections.find((c) => c.slug === slug);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, collection });
  }

  return NextResponse.json({
    success: true,
    count: learningCollections.length,
    collections: learningCollections,
  });
}
