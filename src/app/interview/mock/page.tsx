'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, RotateCcw, Trophy, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { interviewCategories } from '@/data/interviews';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function MockInterviewPage() {
  const [category, setCategory] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const startInterview = (cat: any) => {
    setCategory(cat);
    setCurrentQuestionIdx(0);
    setHistory([]);
    setResult(null);
    setUserResponse('');
  };

  const submitAnswer = async () => {
    if (!userResponse.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        body: JSON.stringify({
          categorySlug: category.slug,
          questionId: category.questions[currentQuestionIdx].id,
          userResponse
        })
      });
      const data = await res.json();
      
      setHistory([...history, { 
        question: category.questions[currentQuestionIdx].question, 
        userResponse, 
        score: data.score, 
        feedback: data.feedback 
      }]);

      if (currentQuestionIdx < category.questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setUserResponse('');
      } else {
        const totalScore = history.reduce((acc, curr) => acc + curr.score, 0) / (history.length || 1);
        setResult({ ...data, totalScore: (totalScore + data.score) / (history.length + 1) });
      }
    } catch (err) {
      alert("Error analyzing response. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {!category ? (
        <div className="max-w-4xl mx-auto space-y-12">
          <SectionHeader 
            title="AI Mock Interviewer" 
            subtitle="Simulate a real technical interview. Get AI-powered feedback on your responses and refine your delivery."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewCategories.map(cat => (
              <motion.div 
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl border border-border bg-card hover:border-primary transition-all cursor-pointer group"
                onClick={() => startInterview(cat)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{cat.description}</p>
                <div className="flex items-center text-primary font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                  Start Simulation <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : result ? (
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-12 rounded-3xl bg-card border border-border text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black">Simulation Complete!</h2>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-6xl font-black text-primary">{Math.round(result.totalScore)}%</span>
              <span className="text-xl text-muted-foreground font-medium">Overall Accuracy</span>
            </div>
            <div className="p-4 rounded-2xl bg-secondary text-sm text-muted-foreground max-w-lg mx-auto italic">
              "Your performance indicates a strong grasp of the fundamentals, but there's room for improvement in architectural depth."
            </div>
            <div className="flex justify-center gap-4 pt-6">
              <Button variant="outline" onClick={() => setCategory(null)}>Return to Categories</Button>
              <Button variant="primary" onClick={() => startInterview(category)}>Retry Session</Button>
            </div>
          </motion.div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Review Your Performance</h3>
            {history.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-bold text-foreground">{item.question}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.score >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {item.score}%
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-sm italic text-muted-foreground border-l-4 border-primary">
                  "{item.userResponse}"
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-muted-foreground">{item.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setCategory(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> End Simulation
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Question {currentQuestionIdx + 1} of {category.questions.length}
              </span>
              <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${((currentQuestionIdx + 1) / category.questions.length) * 100}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-card border border-border space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary font-bold">
                <Mic className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest">Interviewer Question</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight">
                {category.questions[currentQuestionIdx].question}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground font-bold">
                <Send className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest">Your Response</span>
              </div>
              <textarea 
                className="w-full p-6 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all h-48 text-lg leading-relaxed" 
                placeholder="Type your expert answer here... Use technical terms and explain your reasoning."
                value={userResponse}
                onChange={e => setUserResponse(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button 
                variant="primary" 
                className="gap-2 px-8" 
                disabled={isAnalyzing || !userResponse.trim()}
                onClick={submitAnswer}
              >
                {isAnalyzing ? 'Analyzing Response...' : 'Submit Answer'} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
