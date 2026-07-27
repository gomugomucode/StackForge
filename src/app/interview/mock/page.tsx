'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Trophy, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { interviewCategories } from '@/data/interviews';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { SectionHeader } from '@/components/ui/SectionHeader';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categorySlug: category.slug,
          questionId: category.questions[currentQuestionIdx].id,
          userResponse
        })
      });
      const data = await res.json();
      
      const newHistory = [...history, { 
        question: category.questions[currentQuestionIdx].question, 
        userResponse, 
        score: data.score || 85, 
        feedback: data.feedback || "Good response! Structure your answer with the STAR method for max impact."
      }];
      setHistory(newHistory);

      if (currentQuestionIdx < category.questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setUserResponse('');
      } else {
        const totalScore = newHistory.reduce((acc, curr) => acc + curr.score, 0) / newHistory.length;
        setResult({ ...data, totalScore });
      }
    } catch {
      alert("Error analyzing response. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      {!category ? (
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionHeader 
            title="AI Mock Interviewer" 
            subtitle="Simulate a real technical interview. Get AI-powered feedback on your responses and refine your delivery."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviewCategories.map(cat => (
              <motion.div 
                key={cat.id}
                whileHover={{ y: -3 }}
                onClick={() => startInterview(cat)}
              >
                <Card variant="default" padding="md" className="group cursor-pointer hover:border-primary/50 transition-colors h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <Badge variant="primary">SIMULATION</Badge>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-primary font-semibold text-xs gap-1.5 pt-2 border-t border-border/40">
                    <span>Start Simulation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : result ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <Card variant="default" padding="lg" className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">Simulation Complete!</h2>
              <p className="text-xs text-muted-foreground">Session feedback and performance summary</p>
            </div>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-5xl font-bold text-primary">{Math.round(result.totalScore)}%</span>
              <span className="text-xs text-muted-foreground font-semibold">Overall Accuracy</span>
            </div>
            <div className="p-3.5 rounded-lg bg-secondary/60 border border-border/40 text-xs text-muted-foreground max-w-lg mx-auto italic">
              "Your performance indicates a strong grasp of the fundamentals, but there's room for improvement in architectural depth."
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCategory(null)}>Return to Categories</Button>
              <Button variant="primary" size="sm" onClick={() => startInterview(category)}>Retry Session</Button>
            </div>
          </Card>
          
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Review Your Performance</h3>
            {history.map((item, i) => (
              <Card key={i} variant="default" padding="md" className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-xs font-bold text-foreground">{item.question}</h4>
                  <Badge variant={item.score >= 80 ? "success" : "warning"}>
                    {item.score}%
                  </Badge>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-xs italic text-muted-foreground border-l-2 border-primary">
                  "{item.userResponse}"
                </div>
                <div className="flex gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground leading-normal">{item.feedback}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setCategory(null)} className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> End Simulation
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Question {currentQuestionIdx + 1} of {category.questions.length}
              </span>
              <div className="h-1.5 w-28 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIdx + 1) / category.questions.length) * 100}%` }} 
                />
              </div>
            </div>
          </div>

          <Card variant="default" padding="lg" className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Mic className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Interviewer Question</span>
              </div>
              <h2 className="text-xl font-bold text-foreground leading-normal">
                {category.questions[currentQuestionIdx].question}
              </h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                <Send className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-wider">Your Response</span>
              </div>
              <Textarea 
                className="w-full h-44 text-xs p-3.5"
                placeholder="Type your answer here... Use technical terms and explain your architectural reasoning."
                value={userResponse}
                onChange={e => setUserResponse(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button 
                variant="primary" 
                size="md"
                className="gap-2" 
                disabled={isAnalyzing || !userResponse.trim()}
                isLoading={isAnalyzing}
                onClick={submitAnswer}
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
