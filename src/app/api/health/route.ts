import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "disconnected";
  let dbLatencyMs = 0;

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    dbStatus = "connected";
  } catch (err: any) {
    dbStatus = `error: ${err.message}`;
  }

  const overallHealthy = dbStatus === "connected";

  return NextResponse.json(
    {
      status: overallHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - startTime,
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
      system: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "development",
        memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    },
    { status: overallHealthy ? 200 : 503 }
  );
}
