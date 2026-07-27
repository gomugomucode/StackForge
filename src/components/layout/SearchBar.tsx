"use client";

import React from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const triggerCommandMenu = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={triggerCommandMenu}
      aria-label="Search StackForge (Ctrl+K)"
      className="w-full max-w-[320px] min-w-[260px] h-9 px-3 flex items-center justify-between rounded-lg bg-secondary/60 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-xs font-normal">Search StackForge...</span>
      </div>
      <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] border border-border/80 font-mono text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}
