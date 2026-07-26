import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Award, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  // Search user by email prefix or ID
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { startsWith: username } },
        { id: username },
      ],
    },
    include: {
      profile: true,
      topicProgress: {
        where: { completed: true },
        take: 10,
      },
    },
  });

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-400">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">User Not Found</h1>
          <p className="text-xs text-zinc-400">
            No developer profile found matching <span className="text-indigo-400">@{username}</span>.
          </p>
          <Button variant="outline" asChild className="w-full mt-4">
            <Link href="/community">Back to Community</Link>
          </Button>
        </div>
      </div>
    );
  }

  const profile: any = user.profile;
  const displayName = user.name || user.email?.split("@")[0] || "Developer";
  const handle = user.email?.split("@")[0] || "developer";
  const joinedDate = profile?.joinedAt 
    ? new Date(profile.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Recently";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black relative overflow-hidden p-4 sm:p-8 pt-8 pb-16">
      {/* Dynamic Background Mesh Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Community
          </Link>
          <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Developer Profile
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Avatar Badge */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl">
                <div className="w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center text-white font-bold text-2xl uppercase">
                  {displayName.substring(0, 2)}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold border-2 border-zinc-950 shadow-md">
                Lv.{profile?.level || 1}
              </div>
            </div>

            {/* User Meta Details */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">{displayName}</h1>
                <span className="text-xs font-medium text-indigo-400">@{handle}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Joined {joinedDate}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-[11px]">
                  {profile?.skillLevel || "Developer"}
                </span>
              </div>

              {/* Interests Tags */}
              {profile?.interests && Array.isArray(profile.interests) && profile.interests.length > 0 && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
                  {profile.interests.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
              <Trophy className="w-4 h-4 text-yellow-500" /> Total XP
            </div>
            <div className="text-2xl font-black text-white">{profile?.xp || 0}</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-orange-500" /> Current Streak
            </div>
            <div className="text-2xl font-black text-white">{profile?.streak || 0} Days</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Completed Topics
            </div>
            <div className="text-2xl font-black text-white">{user.topicProgress.length}</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
              <Award className="w-4 h-4 text-purple-400" /> Level
            </div>
            <div className="text-2xl font-black text-white">Level {profile?.level || 1}</div>
          </div>
        </div>

        {/* Learning Achievements Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Verified Achievements
            </h2>
            <span className="text-xs text-zinc-500">Public Transcript</span>
          </div>

          {user.topicProgress.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 text-xs">
              This developer is currently completing their first learning modules.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.topicProgress.map((tp) => (
                <div
                  key={tp.id}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Completed Module</div>
                      <div className="text-[10px] text-zinc-400">Verified via StackForge Engine</div>
                    </div>
                  </div>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
