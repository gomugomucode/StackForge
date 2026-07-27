"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Award, CheckCircle2, GitBranch, ShieldCheck, 
  Code2, ExternalLink, Zap, Star, AlertCircle, RefreshCw, Lock
} from "lucide-react";

interface EvidenceData {
  username: string;
  avatar: string | null;
  joinedAt: string;
  stats: {
    xp: number;
    streak: number;
    level: number;
    skillLevel: string;
  };
  certifications: Array<{
    id: string;
    roadmapTitle: string;
    issuedAt: string;
    score: number;
    verificationCode: string;
    verifyUrl: string;
  }>;
  skillProficiencies: Array<{
    technology: string;
    score: number;
    confidence: string;
  }>;
  projectReviews: Array<{
    projectTitle: string;
    repoUrl: string;
    demoUrl?: string;
    submittedAt: string;
    review: {
      overallScore: number;
      readmeScore: number;
      codeQuality: number;
      testCoverage: number;
      securityScore: number;
      feedback: {
        strengths: string[];
        improvements: string[];
      } | null;
    } | null;
  }>;
  githubActivity: {
    username: string;
    publicRepos: number;
    totalCommits: number;
    totalPRs: number;
    languages: Record<string, number>;
  } | null;
  learningTimeline: Array<{ date: string; xpEarned: number }>;
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [evidence, setEvidence] = useState<EvidenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/p/${username}`);
      if (res.ok) {
        const data = await res.json();
        setEvidence(data.evidence);
      } else {
        const err = await res.json();
        setError(err.error || "Failed to load public profile");
      }
    } catch (e: any) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-4">
        <RefreshCw className="w-10 h-10 animate-spin text-sky-400" />
        <p className="text-sm font-medium">Verifying proof-of-work records for @{username}...</p>
      </div>
    );
  }

  if (error || !evidence) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-400">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">{error || "Profile Unavailable"}</h2>
        <p className="text-sm text-slate-400 max-w-md">
          This user profile either does not exist or has set their recruiter proof-of-work visibility to private.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 space-y-10 max-w-6xl mx-auto">
      {/* Recruiter Banner Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-1 shadow-lg">
            <img
              src={evidence.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${evidence.username}`}
              alt={evidence.username}
              className="w-full h-full object-cover rounded-xl bg-slate-950"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-extrabold text-white">{evidence.username}</h1>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Candidate
              </span>
            </div>
            <p className="text-sm text-slate-400">
              StackForge Proof-of-Work Portfolio • Member since {new Date(evidence.joinedAt).getFullYear()}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
              <div>
                <div className="text-xs uppercase text-slate-500 font-semibold">Total XP</div>
                <div className="text-xl font-bold text-sky-400">{evidence.stats.xp.toLocaleString()} XP</div>
              </div>
              <div>
                <div className="text-xs uppercase text-slate-500 font-semibold">Learning Streak</div>
                <div className="text-xl font-bold text-amber-400">{evidence.stats.streak} Days 🔥</div>
              </div>
              <div>
                <div className="text-xs uppercase text-slate-500 font-semibold">Level</div>
                <div className="text-xl font-bold text-indigo-400">Lvl {evidence.stats.level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Verified Certifications & Skill Proficiencies */}
        <div className="space-y-8 lg:col-span-1">
          {/* Verified Certificates */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Verified Certificates
            </h2>
            {evidence.certifications.length === 0 ? (
              <p className="text-xs text-slate-500">No public certificates completed yet.</p>
            ) : (
              <div className="space-y-3">
                {evidence.certifications.map((cert) => (
                  <div key={cert.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="font-semibold text-sm text-slate-200">{cert.roadmapTitle}</div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Score: {cert.score}%</span>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        Verify #{cert.verificationCode.substring(0, 8)} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skill Radar / Proficiencies */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-400" /> Verified Skill Matrix
            </h2>
            <div className="space-y-3">
              {evidence.skillProficiencies.length === 0 ? (
                <p className="text-xs text-slate-500">Skill diagnostics in progress.</p>
              ) : (
                evidence.skillProficiencies.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>{skill.technology}</span>
                      <span className="text-sky-400">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, skill.score)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Reviews & GitHub Activity */}
        <div className="space-y-8 lg:col-span-2">
          {/* Automated Multi-Dimensional Project Reviews */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" /> Multidimensional Code Reviews
            </h2>

            {evidence.projectReviews.length === 0 ? (
              <p className="text-xs text-slate-500">No project submissions available for recruiter review.</p>
            ) : (
              evidence.projectReviews.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-100">{item.projectTitle}</h3>
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono mt-0.5"
                      >
                        <GitBranch className="w-3.5 h-3.5" /> {item.repoUrl}
                      </a>
                    </div>
                    {item.review && (
                      <div className="bg-sky-500/10 border border-sky-500/20 text-sky-400 font-extrabold text-lg px-3 py-1 rounded-lg text-center">
                        {item.review.overallScore}/100
                      </div>
                    )}
                  </div>

                  {item.review && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">README</div>
                        <div className="text-sm font-bold text-emerald-400">{item.review.readmeScore}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Code Quality</div>
                        <div className="text-sm font-bold text-sky-400">{item.review.codeQuality}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Coverage</div>
                        <div className="text-sm font-bold text-amber-400">{item.review.testCoverage}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Security</div>
                        <div className="text-sm font-bold text-indigo-400">{item.review.securityScore}%</div>
                      </div>
                    </div>
                  )}

                  {item.review?.feedback?.strengths && (
                    <div className="space-y-1.5 text-xs">
                      <div className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                      </div>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {item.review.feedback.strengths.map((str, sIdx) => (
                          <li key={sIdx}>{str}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
