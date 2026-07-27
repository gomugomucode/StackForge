"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MegaMenu, MenuCategory } from "./MegaMenu";

export function NavigationMenu() {
  const [activeMenu, setActiveMenu] = useState<MenuCategory | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (cat: MenuCategory) => {
    setActiveMenu((prev) => (prev === cat ? null : cat));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setActiveMenu(null);
  };

  return (
    <nav aria-label="Main Navigation" ref={menuRef} onKeyDown={handleKeyDown} className="relative flex items-center gap-1">
      {/* Learn Nav Item */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("learn")}
          aria-expanded={activeMenu === "learn"}
          aria-controls="mega-menu-learn"
          aria-current={pathname?.startsWith("/learn") || pathname?.startsWith("/roadmaps") ? "page" : undefined}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-foreground cursor-pointer ${
            activeMenu === "learn" || pathname?.startsWith("/learn") || pathname?.startsWith("/roadmaps")
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Learn
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "learn" ? "rotate-180 text-primary" : ""}`} />
        </button>
        {activeMenu === "learn" && (
          <div id="mega-menu-learn" className="absolute top-full left-0 mt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <MegaMenu category="learn" onClose={() => setActiveMenu(null)} />
          </div>
        )}
      </div>

      {/* Practice Nav Item */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("practice")}
          aria-expanded={activeMenu === "practice"}
          aria-controls="mega-menu-practice"
          aria-current={pathname?.startsWith("/projects") || pathname?.startsWith("/quizzes") || pathname?.startsWith("/interview") ? "page" : undefined}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-foreground cursor-pointer ${
            activeMenu === "practice" || pathname?.startsWith("/projects") || pathname?.startsWith("/quizzes")
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Practice
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "practice" ? "rotate-180 text-primary" : ""}`} />
        </button>
        {activeMenu === "practice" && (
          <div id="mega-menu-practice" className="absolute top-full left-0 mt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <MegaMenu category="practice" onClose={() => setActiveMenu(null)} />
          </div>
        )}
      </div>

      {/* Explore Nav Item */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("explore")}
          aria-expanded={activeMenu === "explore"}
          aria-controls="mega-menu-explore"
          aria-current={pathname?.startsWith("/blog") || pathname?.startsWith("/cheatsheets") ? "page" : undefined}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-foreground cursor-pointer ${
            activeMenu === "explore" || pathname?.startsWith("/blog") || pathname?.startsWith("/cheatsheets")
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Explore
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "explore" ? "rotate-180 text-primary" : ""}`} />
        </button>
        {activeMenu === "explore" && (
          <div id="mega-menu-explore" className="absolute top-full left-0 mt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <MegaMenu category="explore" onClose={() => setActiveMenu(null)} />
          </div>
        )}
      </div>

      {/* Community Link */}
      <Link
        href="/community"
        aria-current={pathname === "/community" ? "page" : undefined}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-foreground ${
          pathname === "/community" ? "text-primary font-semibold" : "text-muted-foreground"
        }`}
      >
        Community
      </Link>
    </nav>
  );
}
