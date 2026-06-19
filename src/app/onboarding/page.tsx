"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { User, BookOpen, Target } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const completeOnboarding = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to StackForge!</h1>
          <p className="text-gray-500">Let's personalize your learning experience</p>
          
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 w-12 rounded-full transition-colors ${i === step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} 
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Tell us about yourself</h2>
              <p className="text-gray-500">How would you describe your current level?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map((level) => (
                <Button 
                  key={level} 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="py-6 text-lg"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">What are you learning?</h2>
              <p className="text-gray-500">Select your primary interests</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Rust', 'Go', 'DevOps'].map((tech) => (
                <Button 
                  key={tech} 
                  variant="outline" 
                  className="py-4"
                  onClick={() => {}} 
                >
                  {tech}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setStep(3)}>Continue</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Set your goals</h2>
              <p className="text-gray-500">What is your main objective?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {['Get a Job', 'Build a Project', 'Learn a New Language', 'Upskill for Promotion'].map((goal) => (
                <Button 
                  key={goal} 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="py-6 text-lg"
                >
                  {goal}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={completeOnboarding}>Get Started!</Button>
          </div>
        )}
      </div>
    </div>
  );
}
