"use client";

import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { NavigationMenu } from "./NavigationMenu";
import { SearchBar } from "./SearchBar";
import { NotificationCenter } from "./NotificationCenter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function DesktopNavbar() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="hidden lg:flex sticky top-0 z-40 w-full h-14 bg-background/80 backdrop-blur-md border-b border-border/60 px-6 items-center justify-between">
      {/* Left: Brand Logo & 4 Top Nav Items */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-foreground">StackForge</span>
        </Link>

        <NavigationMenu />
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-[320px] mx-4 flex justify-center">
        <SearchBar />
      </div>

      {/* Right: Utilities & User Dropdown */}
      <div className="flex items-center gap-3">
        {isAuthenticated && <NotificationCenter />}
        <ThemeToggle />

        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
        ) : isAuthenticated ? (
          <UserDropdown />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
