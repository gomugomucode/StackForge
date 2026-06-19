"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BookmarkGrid() {
  const bookmarks = [
    { id: 1, title: "React Hooks Guide", type: "Cheatsheet", category: "React" },
    { id: 2, title: "Advanced TypeScript Patterns", type: "Article", category: "TypeScript" },
    { id: 3, title: "System Design Fundamentals", type: "Roadmap", category: "Architecture" },
  ];

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold">Bookmarks</h2>
      <div className="grid grid-cols-1 gap-3">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{bm.title}</p>
                <p className="text-xs text-muted-foreground">{bm.type} • {bm.category}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
