import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { roadmaps } from "@/data/roadmaps";
import { Award, ShieldCheck, Share2, ArrowLeft, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificationPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Query Prisma DB for verified certificate by id or verificationCode
  let cert = await prisma.certification.findFirst({
    where: {
      OR: [
        { id },
        { verificationCode: id },
      ],
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      roadmap: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  }).catch(() => null);

  // 2. Fallback check for roadmap slug preview if no DB record found
  const matchingRoadmap = !cert ? roadmaps.find((r) => r.slug === id) : null;

  if (!cert && !matchingRoadmap) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Invalid Certificate</h1>
          <p className="text-xs text-zinc-400">
            No verified certificate record found for credential identifier <span className="text-indigo-400 font-mono">{id}</span>.
          </p>
          <Button variant="outline" asChild className="w-full mt-4">
            <Link href="/roadmaps">Explore Learning Roadmaps</Link>
          </Button>
        </div>
      </div>
    );
  }

  const recipientName = cert?.user?.name || cert?.user?.email?.split("@")[0] || "Verified Learner";
  const courseTitle = cert?.roadmap?.title || matchingRoadmap?.title || "Full Stack Engineering";
  const issuedDate = cert?.issuedAt
    ? new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const credentialCode = cert?.verificationCode || id;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 py-16 relative overflow-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header Action Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 px-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Verified Credential
        </div>
      </div>

      {/* Main Certificate Frame */}
      <div className="w-full max-w-4xl bg-zinc-950 text-white rounded-3xl border-2 border-indigo-500/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Award className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          {/* Badge & Title */}
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 shadow-xl">
              <Award className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Certificate of Completion
            </h1>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-zinc-400 italic">This is to certify that</p>
          </div>

          {/* Recipient Name & Course Detail */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl font-bold text-white border-b border-zinc-800 pb-3 px-8 inline-block">
              {recipientName}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed pt-2">
              has successfully completed all required modules, assessments, and technical projects for the{" "}
              <span className="font-bold text-indigo-400">{courseTitle}</span> professional learning track on StackForge.
            </p>
          </div>

          {/* Verification Details Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-end gap-6 pt-8 border-t border-zinc-900 text-left">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Issued Date
              </p>
              <p className="text-xs font-semibold text-zinc-300">{issuedDate}</p>
            </div>

            <div className="text-center space-y-1">
              <div className="flex justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">StackForge Verified</p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Credential Code</p>
              <p className="font-mono text-xs text-indigo-400 font-semibold">{credentialCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
