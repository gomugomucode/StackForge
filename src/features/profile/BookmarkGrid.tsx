"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function BookmarkGrid() {
  const bookmarks = [
    { id: 1, title: "React Hooks Guide", type: "Cheatsheet", category: "React" },
    { id: 2, title: "Advanced TypeScript Patterns", type: "Article", category: "TypeScript" },
    { id: 3, title: "System Design Fundamentals", type: "Roadmap", category: "Architecture" },
  ];

  return (
    <Card variant="default" padding="md" className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Bookmarks</h2>
      <div className="grid grid-cols-1 gap-2.5">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{bm.title}</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <Badge variant="outline">{bm.type}</Badge>
                  <span className="text-[11px] text-muted-foreground">• {bm.category}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
