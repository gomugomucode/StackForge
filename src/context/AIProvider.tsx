import React, { createContext, useContext, useState } from 'react';

export interface AIResponse {
  text: string;
  examples?: string[];
  useCases?: string[];
  mistakes?: string[];
  roadmap?: { step: string; detail: string }[];
  quiz?: { question: string; options: string[]; answer: string }[];
}

interface AIContextType {
  askAI: (prompt: string, context: 'explain' | 'quiz' | 'coach' | 'resume' | 'interview') => Promise<AIResponse>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const askAI = async (prompt: string, context: string): Promise<AIResponse> => {
    // Mock AI delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (context) {
      case 'explain':
        return {
          text: `Here is a detailed explanation of ${prompt}. It is a powerful concept used in modern development to solve specific problems.`,
          examples: [`Example 1: Using ${prompt} in a real-world app`, `Example 2: Optimizing ${prompt} for performance`],
          useCases: [`Case A: When you need high scalability`, `Case B: When you want to decouple components`],
          mistakes: [`Mistake 1: Over-engineering the implementation`, `Mistake 2: Ignoring edge cases`]
        };
      case 'quiz':
        return {
          text: `I've generated a quiz for ${prompt}.`,
          quiz: Array.from({ length: 5 }).map((_, i) => ({
            question: `Question ${i + 1} about ${prompt}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            answer: 'Option A'
          }))
        };
      case 'coach':
        return {
          text: `Based on your current knowledge, here is the recommended path for ${prompt}:`,
          roadmap: [
            { step: 'Step 1: Basics', detail: 'Understand the core syntax and concepts.' },
            { step: 'Step 2: Intermediate', detail: 'Learn advanced patterns and optimization.' },
            { step: 'Step 3: Master', detail: 'Build a large-scale project using this technology.' },
          ]
        };
      case 'resume':
        return {
          text: `I've reviewed your resume for ${prompt} roles. Overall, it's strong, but I suggest focusing more on quantified results (e.g., "Improved performance by 20%") instead of just listing tools.`
        };
      case 'interview':
        return {
          text: `Let's start the mock interview for ${prompt}. Question 1: Can you explain how this technology handles state management?`
        };
      default:
        return { text: 'I am not sure how to help with that.' };
    }
  };

  return <AIContext.Provider value={{ askAI }}>{children}</AIContext.Provider>;
}

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
