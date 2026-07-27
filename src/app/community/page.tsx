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
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Skeleton } from "@/components/ui/Skeleton";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
      <SectionHeader
        title="Community Circles & Leaderboard"
        subtitle="Learning is a team sport. Join study circles, compare rankings on the global leaderboard, and view developer profiles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Circles Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2 text-foreground">
              <Users className="w-4.5 h-4.5 text-primary" /> My Circles
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="gap-1 text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Create
            </Button>
          </div>

          <div className="space-y-2.5">
            {myCircles.length === 0 ? (
              <Card variant="subtle" padding="sm" className="text-center text-xs text-muted-foreground">
                You haven't joined any circles yet.
              </Card>
            ) : (
              myCircles.map((m, i) => (
                <Card
                  key={i}
                  variant="default"
                  padding="sm"
                  className="flex items-center justify-between group hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        {m.circle?.name || "Study Circle"}
                      </p>
                      <Badge variant="outline">{m.role}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Card>
              ))
            )}
          </div>

          {/* Global Leaderboard Card */}
          <Card variant="default" padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Top Developers
              </h3>
              <Badge variant="primary">Live Rankings</Badge>
            </div>

            {leaderboard.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">No leaderboard ranks established yet.</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((user) => (
                  <Link
                    key={user.userId}
                    href={`/profile/${user.username}`}
                    className="p-2.5 rounded-lg border border-border/40 bg-secondary/30 hover:bg-secondary transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-center text-xs font-bold">
                        {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                          <span>Lv.{user.level}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-500"><Flame className="w-3 h-3" /> {user.streak}d</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary">{user.xp} XP</span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Discover Circles Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold flex items-center gap-2 text-foreground">
              <Search className="w-4.5 h-4.5 text-primary" /> Discover Study Circles
            </h3>
            <div className="flex flex-wrap gap-1">
              {roadmaps.slice(0, 4).map((r) => (
                <Badge key={r.slug} variant="outline" className="cursor-pointer">
                  {r.title}
                </Badge>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {circles.map((circle) => (
                <Card
                  key={circle.id}
                  variant="default"
                  padding="md"
                  className="flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-foreground">{circle.name}</h4>
                      <Badge variant="info">
                        <Users className="w-3 h-3" /> {circle._count?.members || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {circle.description || "Interactive peer study circle for building project milestones."}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => joinCircle(circle.id)}
                  >
                    <span>Join Circle</span> <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Circle Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-md bg-popover text-popover-foreground border border-border rounded-2xl shadow-2xl p-6 space-y-5"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-3">
                <h3 className="text-base font-bold text-foreground">Create a Circle</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCreateOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Circle Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Next.js Mastery Group"
                    value={newCircle.name}
                    onChange={(e) =>
                      setNewCircle({ ...newCircle, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Description
                  </label>
                  <Textarea
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
                  size="md"
                  className="w-full gap-2"
                  type="submit"
                >
                  <span>Forge Circle</span> <Plus className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
