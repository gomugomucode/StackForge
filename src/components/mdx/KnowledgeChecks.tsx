import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuizProps {
  question: string;
  options: Option[];
  explanation: string;
}

export const Quiz = ({ question, options, explanation }: QuizProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="my-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
      <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400 font-semibold uppercase text-xs tracking-wider">
        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50">Knowledge Check</span>
      </div>
      <h4 className="text-lg font-medium mb-4 text-slate-900 dark:text-slate-100">{question}</h4>
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={submitted}
            onClick={() => setSelected(index)}
            className={`w-full p-3 text-left rounded-lg border transition-all ${
              selected === index 
                ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            } ${
              submitted && option.isCorrect 
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                : submitted && selected === index 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option.text}</span>
              {submitted && option.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {submitted && selected === index && !option.isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
            </div>
          </button>
        ))}
      </div>
      {!submitted ? (
        <button 
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm disabled:opacity-50 hover:bg-blue-700 transition-colors"
        >
          Check Answer
        </button>
      ) : (
        <div className="p-4 rounded-lg bg-slate-200 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-top-1">
          <strong>Explanation:</strong> {explanation}
        </div>
      )}
    </div>
  );
};

interface ExerciseProps {
  title: string;
  task: string;
  goal: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const Exercise = ({ title, task, goal, difficulty }: ExerciseProps) => {
  return (
    <div className="my-8 p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold flex items-center gap-2">
          <span className="p-1 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">🛠️</span>
          Hands-on Exercise: {title}
        </h4>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
          difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {difficulty}
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase mb-1">The Task</p>
          <p className="text-slate-700 dark:text-slate-300">{task}</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-l-4 border-blue-500">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">Expected Outcome</p>
          <p className="text-slate-700 dark:text-slate-300">{goal}</p>
        </div>
      </div>
    </div>
  );
};
