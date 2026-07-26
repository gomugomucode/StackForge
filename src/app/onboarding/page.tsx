"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { User, BookOpen, Target, Check, Loader2, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<string>("Beginner");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["React", "TypeScript"]);
  const [selectedGoal, setSelectedGoal] = useState<string>("Build a Project");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const toggleInterest = (tech: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech]
    );
  };

  const handleComplete = async (overrideGoal?: string) => {
    const finalGoal = overrideGoal || selectedGoal;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillLevel: selectedLevel,
          interests: selectedInterests,
          goal: finalGoal,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save onboarding settings");
      }

      router.replace("/dashboard");
    } catch (err: any) {
      console.error("[Onboarding] Submission error:", err);
      setErrorMessage(err?.message || "Failed to complete onboarding. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black relative overflow-hidden p-4 sm:p-6 pt-12 sm:pt-16 pb-12 sm:pb-16">
      {/* Background Mesh Accents */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-2xl p-8 sm:p-10 space-y-8 bg-zinc-950/80 border border-zinc-800/80 rounded-3xl shadow-2xl backdrop-blur-2xl relative z-10">
        
        {/* Header & Step Progress Indicator */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-indigo-400 mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome to StackForge</h1>
          <p className="text-sm text-zinc-400">Let's personalize your interactive learning path</p>
          
          <div className="flex justify-center gap-2 pt-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? "w-12 bg-indigo-500 shadow-md shadow-indigo-500/30" : "w-6 bg-zinc-800"
                }`} 
              />
            ))}
          </div>
        </div>

        {errorMessage && (
          <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-300 text-center">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: Experience Level */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <User className="w-7 h-7 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Tell us about yourself</h2>
              <p className="text-xs text-zinc-400">What is your current programming experience level?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { level: 'Beginner', desc: 'New to coding or building first projects' },
                { level: 'Intermediate', desc: 'Familiar with syntax & algorithms' },
                { level: 'Advanced', desc: 'Building fullstack production apps' },
                { level: 'Professional', desc: 'Industry software engineer upskilling' },
              ].map(({ level, desc }) => {
                const isSelected = selectedLevel === level;
                return (
                  <button 
                    key={level} 
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`w-full p-4 text-left rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10' 
                        : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{level}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{desc}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Button 
              variant="primary" 
              onClick={() => setStep(2)} 
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* STEP 2: Technology Interests */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white">What do you want to learn?</h2>
              <p className="text-xs text-zinc-400">Select technologies you want to master (multi-select)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'React', 'Next.js', 'TypeScript', 'Node.js', 
                'Python', 'Rust', 'Go', 'DevOps',
                'Tailwind CSS', 'PostgreSQL', 'Docker', 'GraphQL'
              ].map((tech) => {
                const isSelected = selectedInterests.includes(tech);
                return (
                  <button 
                    key={tech} 
                    type="button"
                    onClick={() => toggleInterest(tech)}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-500/10' 
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700'
                    }`}
                  >
                    <span>{tech}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)} 
                className="w-1/3 py-3 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 gap-2 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setStep(3)} 
                className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Learning Goals (Fixed BUG-01 & BUG-02) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Set your primary goal</h2>
              <p className="text-xs text-zinc-400">What is your main objective on StackForge?</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { goal: 'Get a Job', desc: 'Prepare for technical interviews & coding challenges' },
                { goal: 'Build a Project', desc: 'Create production-ready fullstack applications' },
                { goal: 'Learn a New Language', desc: 'Master new syntax, tools, and paradigms' },
                { goal: 'Upskill for Promotion', desc: 'Deepen architecture and system design skills' },
              ].map(({ goal, desc }) => {
                const isSelected = selectedGoal === goal;
                return (
                  <button 
                    key={goal} 
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setSelectedGoal(goal);
                    }}
                    className={`w-full p-4 text-left rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/10' 
                        : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{goal}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{desc}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button 
                variant="outline" 
                disabled={isSubmitting}
                onClick={() => setStep(2)} 
                className="w-1/3 py-3 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 gap-2 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
              
              <Button 
                disabled={isSubmitting}
                onClick={() => handleComplete()} 
                className="w-2/3 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs gap-2 shadow-lg shadow-purple-600/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Saving Preferences...</span>
                  </>
                ) : (
                  <>
                    <span>Complete & Start Learning</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
