"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  MessageSquare,
  ArrowRight,
  Trophy,
  Flame,
  X,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { roadmaps } from "@/data/roadmaps";

interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  username: string;
  image?: string | null;
  level: number;
  xp: number;
  streak: number;
  skillLevel: string;
}

export default function CommunityPage() {
  const [circles, setCircles] = useState<any[]>([]);
  const [myCircles, setMyCircles] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    roadmapId: "",
  });

  useEffect(() => {
    const loadCommunityData = async () => {
      setIsLoading(true);
      try {
        const [res, resMe, resLeaderboard] = await Promise.all([
          fetch("/api/circles"),
          fetch("/api/circles/me"),
          fetch("/api/user/leaderboard?limit=10"),
        ]);

        if (res.ok) {
          const circlesData = await res.json();
          setCircles(Array.isArray(circlesData) ? circlesData : []);
        }

        if (resMe.ok) {
          const myCirclesData = await resMe.json();
          setMyCircles(Array.isArray(myCirclesData) ? myCirclesData : []);
        }

        if (resLeaderboard.ok) {
          const lbData = await resLeaderboard.json();
          setLeaderboard(Array.isArray(lbData.leaderboard) ? lbData.leaderboard : []);
        }
      } catch (err) {
        console.error("Failed to load community data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCommunityData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/circles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCircle),
      });
      if (res.ok) {
        const created = await res.json();
        setCircles([created, ...circles]);
        setMyCircles([...myCircles, { circle: created, role: "ADMIN" }]);
        setIsCreateOpen(false);
        setNewCircle({ name: "", description: "", roadmapId: "" });
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to create circle");
      }
    } catch (err) {
      console.error("Create circle error:", err);
      alert("An unexpected error occurred");
    }
  };

  const joinCircle = async (id: string) => {
    try {
      const res = await fetch("/api/circles/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ circleId: id }),
      });
      if (res.ok) {
        const membership = await res.json();
        setMyCircles([...myCircles, membership]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to join circle");
      }
    } catch (err) {
      console.error("Join circle error:", err);
      alert("An unexpected error occurred");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-12 max-w-7xl">
      <SectionHeader
        title="Community Circles & Leaderboard"
        subtitle="Learning is a team sport. Join study circles, compare rankings on the global leaderboard, and view developer profiles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* My Circles Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-indigo-400" /> My Circles
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="gap-1.5 text-xs border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" /> Create New
            </Button>
          </div>

          <div className="space-y-3">
            {myCircles.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 text-center text-zinc-500 text-xs">
                You haven't joined any circles yet.
              </div>
            ) : (
              myCircles.map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 3 }}
                  className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {m.circle?.name || "Study Circle"}
                      </p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-zinc-400 hover:text-white">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              ))
            )}
          </div>

          {/* Global Leaderboard Card */}
          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" /> Top Developers
              </h3>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Live Rankings</span>
            </div>

            {leaderboard.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-500">No leaderboard ranks established yet.</div>
            ) : (
              <div className="space-y-2.5">
                {leaderboard.map((user) => (
                  <Link
                    key={user.userId}
                    href={`/profile/${user.username}`}
                    className="p-3 rounded-xl border border-zinc-900 bg-zinc-900/60 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 text-center text-xs font-extrabold ${
                        user.rank === 1 ? "text-yellow-400 text-sm" : user.rank === 2 ? "text-slate-300" : user.rank === 3 ? "text-amber-600" : "text-zinc-500"
                      }`}>
                        {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                          <span>Lv.{user.level}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-orange-400"><Flame className="w-3 h-3" /> {user.streak}d</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-indigo-400">{user.xp} XP</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Discover Circles Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <Search className="w-5 h-5 text-indigo-400" /> Discover Study Circles
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {roadmaps.map((r) => (
                <span
                  key={r.slug}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {r.title}
                </span>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-36 rounded-3xl bg-zinc-900/60 border border-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {circles.map((circle) => (
                <motion.div
                  key={circle.id}
                  whileHover={{ y: -2 }}
                  className="p-6 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-base text-white">{circle.name}</h4>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                        <Users className="w-3 h-3" /> {circle._count?.members || 0}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {circle.description || "Interactive peer study circle for building project milestones."}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs"
                    onClick={() => joinCircle(circle.id)}
                  >
                    Join Study Circle <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Circle Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-8 space-y-6 relative"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Create a Circle</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    Circle Name *
                  </label>
                  <input
                    required
                    className="w-full p-3 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                    placeholder="e.g. Next.js Mastery Group"
                    value={newCircle.name}
                    onChange={(e) =>
                      setNewCircle({ ...newCircle, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 text-xs"
                    placeholder="What is this circle focusing on?"
                    value={newCircle.description}
                    onChange={(e) =>
                      setNewCircle({
                        ...newCircle,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  variant="primary"
                  className="w-full gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  type="submit"
                >
                  Forge Circle <Plus className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
