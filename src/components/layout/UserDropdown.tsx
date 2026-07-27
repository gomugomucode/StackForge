"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, User, Trophy, Award, Bookmark, 
  Settings, LogOut, LayoutDashboard, CreditCard 
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserAvatar } from "@/hooks/useUserAvatar";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const { displayName, email } = useUserAvatar();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User Account Menu"
        className="flex items-center gap-1.5 p-1 rounded-full hover:bg-secondary transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <Avatar size="sm" />
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-60 rounded-xl bg-card border border-border shadow-xl z-50 overflow-hidden py-1 text-card-foreground animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border/60">
            <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
            <p className="text-sm font-semibold text-foreground truncate">{email || displayName}</p>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              Workspace
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              Profile
            </Link>

            <Link
              href="/profile#achievements"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              Achievements
            </Link>

            <Link
              href="/cert"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <Award className="w-4 h-4 text-muted-foreground" />
              Certificates
            </Link>

            <Link
              href="/profile#bookmarks"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <Bookmark className="w-4 h-4 text-muted-foreground" />
              Bookmarks
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
              role="menuitem"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              Settings
            </Link>

            <div className="flex items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground/60 cursor-not-allowed">
              <span className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                Billing
              </span>
              <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">Soon</span>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-border/60 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
              role="menuitem"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
