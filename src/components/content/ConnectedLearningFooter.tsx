import React from "react";
import NextLink from "next/link";
import { ArrowRight, BookOpen, Briefcase, HelpCircle, Code, ShieldAlert, Sparkles } from "lucide-react";
import { FallbackContentService } from "@/features/content/services/fallbackContentService";

export interface ConnectedLearningFooterProps {
  technology: string;
  topicSlug: string;
  topicTitle: string;
  nextTopics?: string[];
  prerequisites?: string[];
}

export const ConnectedLearningFooter: React.FC<ConnectedLearningFooterProps> = ({
  technology,
  topicSlug,
  topicTitle,
  nextTopics = [],
  prerequisites = [],
}) => {
  const fallbackProjects = FallbackContentService.getRecommendedProjects(technology || topicSlug);
  const searchSuggestions = FallbackContentService.getSmartSearchSuggestions(topicTitle);

  return (
    <div className="space-y-12 border-t border-border/60 pt-12 mt-16">
      {/* SECTION 1: 360-DEGREE RELATED CONTENT GRAPH */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Next Learning Step & Interconnected Graph</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Connected Ecosystem & Recommended Path</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Related / Next Topics */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" /> Next Topic Progression
            </div>
            {nextTopics.length > 0 ? (
              <ul className="space-y-2">
                {nextTopics.map((slug) => (
                  <li key={slug}>
                    <NextLink
                      href={`/learn/${technology}/${slug}`}
                      className="text-sm font-medium text-foreground hover:text-primary flex items-center justify-between group"
                    >
                      <span className="capitalize">{slug.replace(/-/g, " ")}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </NextLink>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <NextLink href={`/learn/${technology}/overview`} className="hover:underline">Mastery Overview</NextLink></li>
                <li>• <NextLink href={`/cheatsheets/${technology}`} className="hover:underline">{technology} Cheatsheet</NextLink></li>
              </ul>
            )}
          </div>

          {/* Recommended Capstone / Starter Projects */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Briefcase className="w-4 h-4" /> Practical Projects
            </div>
            <ul className="space-y-2">
              {fallbackProjects.slice(0, 3).map((proj) => (
                <li key={proj.id}>
                  <NextLink
                    href={`/projects/${proj.slug}`}
                    className="text-sm font-medium text-foreground hover:text-primary flex items-center justify-between group"
                  >
                    <span>{proj.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary">{proj.difficulty}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview & Architecture Exploration */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <HelpCircle className="w-4 h-4" /> Interview & Architecture
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <NextLink href={`/interview/${technology}`} className="font-medium text-foreground hover:text-primary flex items-center justify-between group">
                  <span>{technology.toUpperCase()} FAANG Screening Questions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </NextLink>
              </li>
              <li>
                <NextLink href={`/cheatsheets/${technology}`} className="font-medium text-foreground hover:text-primary flex items-center justify-between group">
                  <span>Syntax & Memory Model Cheatsheet</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: SMART SUGGESTIONS ("DID YOU MEAN / RELATED SEARCH") */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Explore Further Concepts</p>
          <p className="text-sm font-medium text-white">Suggested search topics related to {topicTitle}:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {searchSuggestions.map((sug) => (
            <NextLink
              key={sug}
              href={`/learn?search=${encodeURIComponent(sug)}`}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            >
              {sug}
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
};
