"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, Search, User, LogOut, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NotificationCenter } from "./NotificationCenter";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserAvatar } from "@/hooks/useUserAvatar";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();
  const { displayName, email } = useUserAvatar();

  const closeSheet = () => setIsOpen(false);

  const triggerSearch = () => {
    closeSheet();
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full h-14 bg-background/90 backdrop-blur-md border-b border-border/60 px-4 flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" onClick={closeSheet} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-sm tracking-tight text-foreground">StackForge</span>
      </Link>

      {/* Hamburger Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="p-2 rounded-lg hover:bg-secondary text-foreground focus:outline-none"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Full-screen Mobile Navigation Sheet */}
      {isOpen && (
        <div className="fixed inset-0 top-14 bg-background z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            {/* Quick Search Bar */}
            <button
              onClick={triggerSearch}
              className="w-full h-10 px-4 flex items-center justify-between rounded-xl bg-secondary/80 border border-border text-muted-foreground text-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Search StackForge...
              </span>
              <kbd className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono">⌘K</kbd>
            </button>

            {/* Navigation Groups */}
            <nav className="space-y-6">
              {/* Section 1: Learn */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Learn</div>
                <div className="space-y-1">
                  <Link href="/roadmaps" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Roadmaps <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href="/learn" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Lessons <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href="/tutor" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    AI Mentor <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Section 2: Practice */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Practice</div>
                <div className="space-y-1">
                  <Link href="/projects" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Projects <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href="/interview" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Mock Interviews <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href="/quizzes" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Quizzes <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Section 3: Explore */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Explore</div>
                <div className="space-y-1">
                  <Link href="/blog" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Articles & Tutorials <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href="/cheatsheets" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-medium text-foreground border-b border-border/40">
                    Cheatsheets & Resources <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              {/* Section 4: Community */}
              <div>
                <Link href="/community" onClick={closeSheet} className="flex items-center justify-between py-2 text-sm font-semibold text-primary">
                  Community Hub <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </nav>
          </div>

          {/* Bottom Section: Profile, Utilities, Theme */}
          <div className="pt-6 border-t border-border space-y-4">
            {isAuthenticated ? (
              <div className="flex items-center justify-between bg-card p-3 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Avatar size="md" />
                  <div>
                    <div className="text-xs font-semibold text-foreground">{displayName}</div>
                    <div className="text-[11px] text-muted-foreground">{email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeSheet();
                    signOut();
                  }}
                  aria-label="Sign out"
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={closeSheet}
                  className="w-full py-2.5 rounded-xl border border-border text-center text-xs font-semibold text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  onClick={closeSheet}
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-center text-xs font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">Theme & Notifications</span>
              <div className="flex items-center gap-3">
                {isAuthenticated && <NotificationCenter />}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
