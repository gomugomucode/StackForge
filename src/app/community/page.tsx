"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  MessageSquare,
  ArrowRight,
  Trophy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { roadmaps } from "@/data/roadmaps";

export default function CommunityPage() {
  const [circles, setCircles] = useState<any[]>([]);
  const [myCircles, setMyCircles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    roadmapId: "",
  });

  useEffect(() => {
    const loadCircles = async () => {
      setIsLoading(true);
      try {
        const [res, resMe] = await Promise.all([
          fetch("/api/circles"),
          fetch("/api/circles/me"),
        ]);

        if (!res.ok) throw new Error(`Failed to fetch circles: ${res.statusText}`);
        const circlesData = await res.json();
        setCircles(Array.isArray(circlesData) ? circlesData : []);

        if (!resMe.ok) {
          if (resMe.status === 401) {
            setMyCircles([]);
          } else {
            throw new Error(`Failed to fetch my circles: ${resMe.statusText}`);
          }
        } else {
          const myCirclesData = await resMe.json();
          setMyCircles(Array.isArray(myCirclesData) ? myCirclesData : []);
        }
      } catch (err) {
        console.error("Failed to load community data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCircles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/circles", {
        method: "POST",
        body: JSON.stringify(newCircle),
      });
      if (res.ok) {
        const created = await res.json();
        setCircles([created, ...circles]);
        // Since the user is the creator, they are the ADMIN
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
    <div className="container mx-auto px-4 py-20 space-y-12">
      <SectionHeader
        title="Community Circles"
        subtitle="Learning is a team sport. Join study circles, share resources, and forge your path with fellow developers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* My Circles Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> My Circles
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> Create New
            </Button>
          </div>

          <div className="space-y-3">
            {myCircles.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-border text-center text-muted-foreground text-sm">
                You haven't joined any circles yet.
              </div>
            ) : (
              myCircles.map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {m.circle.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Discover Circles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" /> Discover Circles
            </h3>
            <div className="flex gap-2">
              {roadmaps.map((r) => (
                <span
                  key={r.id}
                  className="text-[10px] font-bold px-2 py-1 rounded-full bg-secondary text-muted-foreground cursor-pointer hover:text-primary transition-colors"
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
                  className="h-32 rounded-3xl bg-secondary animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {circles.map((circle) => (
                <motion.div
                  key={circle.id}
                  whileHover={{ y: -2 }}
                  className="p-6 rounded-3xl border border-border bg-card space-y-4 hover:border-primary/50 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{circle.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {circle.description || "No description provided."}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      <Users className="w-3 h-3" /> {circle._count.members}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => joinCircle(circle.id)}
                  >
                    Join Study Circle <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Create a Circle</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Circle Name *
                  </label>
                  <input
                    required
                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="e.g. Next.js Mastery Group"
                    value={newCircle.name}
                    onChange={(e) =>
                      setNewCircle({ ...newCircle, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all h-24"
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
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Associated Roadmap
                  </label>
                  <select
                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={newCircle.roadmapId}
                    onChange={(e) =>
                      setNewCircle({ ...newCircle, roadmapId: e.target.value })
                    }
                  >
                    <option value="">General Discussion</option>
                    {roadmaps.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="primary"
                  className="w-full gap-2"
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

// Remove the custom X component at the bottom

