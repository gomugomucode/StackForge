import React from "react";
import { Clock, ShieldCheck, Award, BookOpen } from "lucide-react";

export interface TrustHeaderProps {
  title: string;
  updatedDate: string;
  difficulty: "Beginner" | "Intermediate" | "Senior";
  estimatedMinutes: number;
  qualityScore: number;
  prerequisitesCount: number;
}

export const ProductTrustHeader: React.FC<TrustHeaderProps> = ({
  title,
  updatedDate,
  difficulty,
  estimatedMinutes,
  qualityScore,
  prerequisitesCount,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 text-white">
      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <ShieldCheck className="w-4 h-4" />
        <span>✓ Expert Reviewed & Verified</span>
      </div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Updated {updatedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{difficulty} • {estimatedMinutes} mins</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>{prerequisitesCount} Prerequisites</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-800 text-emerald-300 px-3 py-1.5 rounded-lg font-semibold">
          <span>Score: {qualityScore}/100</span>
        </div>
      </div>
    </div>
  );
};
