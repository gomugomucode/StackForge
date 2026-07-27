import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const timestamp = new Date().toISOString();
  let dbStatus = "HEALTHY";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = "UNHEALTHY";
  }

  return NextResponse.json({
    status: dbStatus === "HEALTHY" ? "OK" : "DEGRADED",
    timestamp,
    services: {
      database: dbStatus,
      auth: "HEALTHY",
      cache: "HEALTHY",
    },
    version: "16.0.0",
  });
}
