"use client";

import React from "react";
import Link from "next/link";
import { 
  Award, BookOpen, Bot, Bookmark, Code2, 
  HelpCircle, FileText, ExternalLink, Sparkles, Layers, MessageSquare, CheckSquare 
} from "lucide-react";

export type MenuCategory = "learn" | "practice" | "explore";

interface MegaMenuProps {
  category: MenuCategory;
  onClose: () => void;
}

export function MegaMenu({ category, onClose }: MegaMenuProps) {
  if (category === "learn") {
    return (
      <div className="w-[320px] p-4 rounded-xl bg-card border border-border shadow-xl backdrop-blur-md space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-2">
          Learn Engine
        </div>
        <Link
          href="/roadmaps"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Award className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Roadmaps</div>
            <div className="text-[11px] text-muted-foreground">Guided learning career paths</div>
          </div>
        </Link>

        <Link
          href="/learn"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <BookOpen className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Lessons</div>
            <div className="text-[11px] text-muted-foreground">Interactive concept tutorials</div>
          </div>
        </Link>

        <Link
          href="/tutor"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Bot className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">AI Mentor</div>
            <div className="text-[11px] text-muted-foreground">Personalized AI learning assistant</div>
          </div>
        </Link>

        <Link
          href="/profile#bookmarks"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Bookmark className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Bookmarks</div>
            <div className="text-[11px] text-muted-foreground">Saved topics & reference items</div>
          </div>
        </Link>
      </div>
    );
  }

  if (category === "practice") {
    return (
      <div className="w-[320px] p-4 rounded-xl bg-card border border-border shadow-xl backdrop-blur-md space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-2">
          Practice & Evaluation
        </div>
        <Link
          href="/learn/javascript/closure-scope"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Code2 className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Challenges</div>
            <div className="text-[11px] text-muted-foreground">Interactive code exercises</div>
          </div>
        </Link>

        <Link
          href="/projects"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Layers className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Projects</div>
            <div className="text-[11px] text-muted-foreground">Production-grade portfolio apps</div>
          </div>
        </Link>

        <Link
          href="/interview"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Mock Interviews</div>
            <div className="text-[11px] text-muted-foreground">AI technical interview practice</div>
          </div>
        </Link>

        <Link
          href="/quizzes"
          onClick={onClose}
          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <CheckSquare className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Quizzes</div>
            <div className="text-[11px] text-muted-foreground">Topic knowledge checks</div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[520px] p-5 rounded-xl bg-card border border-border shadow-xl backdrop-blur-md grid grid-cols-2 gap-5">
      {/* Column 1: Learning Resources */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-2">
          Learning Resources
        </div>
        <Link
          href="/blog"
          onClick={onClose}
          className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <BookOpen className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Articles</div>
            <div className="text-[11px] text-muted-foreground">Engineering deep-dives</div>
          </div>
        </Link>

        <Link
          href="/cheatsheets"
          onClick={onClose}
          className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <FileText className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Cheatsheets</div>
            <div className="text-[11px] text-muted-foreground">Syntax & API references</div>
          </div>
        </Link>
      </div>

      {/* Column 2: Reference Documentation */}
      <div className="space-y-2 border-l border-border/40 pl-5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2 mb-2">
          Reference Documentation
        </div>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground flex items-center gap-1 group-hover:text-primary">
              Official Docs <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="text-[11px] text-muted-foreground">React & Next.js docs</div>
          </div>
        </a>

        <a
          href="https://developer.mozilla.org"
          target="_blank"
          rel="noreferrer"
          className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-foreground group-hover:text-primary">External References</div>
            <div className="text-[11px] text-muted-foreground">MDN Specifications</div>
          </div>
        </a>
      </div>
    </div>
  );
}
