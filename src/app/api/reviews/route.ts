import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerUser } from "@/lib/supabase-server";
import { addXP } from "@/features/gamification/services/xpService";

/**
 * Reviews on project submissions. Anyone can READ submissions (these are
 * public portfolio pieces), but only authenticated callers can WRITE a
 * review — and the reviewer id is always the caller's Supabase user id.
 */
export async function GET() {
  const submissions = await prisma.projectSubmission.findMany({
    include: {
      user: { select: { name: true, avatar: true } },
      reviews: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(submissions);
}

export async function POST(req: Request) {
  const user = await getSupabaseServerUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { submissionId, rating, comment } = await req.json();
    if (!submissionId || rating === undefined) {
      return NextResponse.json(
        { error: "submissionId and rating are required" },
        { status: 400 }
      );
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        submissionId,
        rating,
        comment: comment || "",
      },
    });

    // Reward the reviewer (10 XP). addXP writes to the Profile table.
    try {
      await addXP(user.id, "BOOKMARK_CONTENT"); // light reward; reviewer UX is ancillary
    } catch (e) {
      // Best-effort; not fatal for the review write.
      console.warn("[reviews] xp reward skipped:", e);
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Review Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
