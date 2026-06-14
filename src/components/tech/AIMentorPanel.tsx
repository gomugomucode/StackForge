import React, { useState } from 'react';
import { useAI, AIResponse } from '../../context/AIProvider';
import { MessageSquare, BookOpen, Brain, FileText, UserCheck, Send, Sparkles } from 'lucide-react';

type AIContextType = 'explain' | 'quiz' | 'coach' | 'resume' | 'interview';

export default function AIMentorPanel() {
  const { askAI } = useAI();
  const [input, setInput] = useState('');
  const [context, setContext] = useState<AIContextType>('explain');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const res = await askAI(input, context);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-indigo-600 text-white">
        <div className="flex items-center gap-2 font-bold">
          <Sparkles className="w-5 h-5" />
          AI Mentor
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {response ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-slate-800 dark:text-slate-200">
              <p className="whitespace-pre-wrap">{response.text}</p>
            </div>

            {response.examples && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Examples</h4>
                {response.examples.map((ex, i) => (
                  <div key={i} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300">
                    {ex}
                  </div>
                ))}
              </div>
            )}

            {response.useCases && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Use Cases</h4>
                {response.useCases.map((uc, i) => (
                  <div key={i} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300">
                    {uc}
                  </div>
                ))}
              </div>
            )}

            {response.mistakes && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">Common Mistakes</h4>
                {response.mistakes.map((m, i) => (
                  <div key={i} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-300">
                    {m}
                  </div>
                ))}
              </div>
            )}

            {response.roadmap && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Path</h4>
                {response.roadmap.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-slate-900 dark:text-white">{step.step}</div>
                      <div className="text-slate-500 dark:text-slate-400">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {response.quiz && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Knowledge Check</h4>
                {response.quiz.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{q.question}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, j) => (
                        <button key={j} className="px-3 py-2 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-indigo-500 transition-colors">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Brain className="w-12 h-12 text-slate-300" />
            <p className="text-slate-500 max-w-xs">
              Ask me anything about coding, career paths, or request a mock interview.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-5 gap-2">
          <button 
            onClick={() => setContext('explain')} 
            className={`p-2 rounded-lg transition-colors ${context === 'explain' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            title="Explain"
          >
            <BookOpen className="w-4 h-4 mx-auto" />
          </button>
          <button 
            onClick={() => setContext('quiz')} 
            className={`p-2 rounded-lg transition-colors ${context === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            title="Quiz"
          >
            <Brain className="w-4 h-4 mx-auto" />
          </button>
          <button 
            onClick={() => setContext('coach')} 
            className={`p-2 rounded-lg transition-colors ${context === 'coach' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            title="Coach"
          >
            <Target className="w-4 h-4 mx-auto" />
          </button>
          <button 
            onClick={() => setContext('resume')} 
            className={`p-2 rounded-lg transition-colors ${context === 'resume' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            title="Resume"
          >
            <FileText className="w-4 h-4 mx-auto" />
          </button>
          <button 
            onClick={() => setContext('interview')} 
            className={`p-2 rounded-lg transition-colors ${context === 'interview' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            title="Interview"
          >
            <UserCheck className="w-4 h-4 mx-auto" />
          </button>
        </div>
        
        <div className="relative">
          <input 
            className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder={`Ask me to ${context === 'explain' ? 'explain' : context === 'quiz' ? 'quiz' : context === 'coach' ? 'coach' : context === 'resume' ? 'review' : 'interview'}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function Target(props: any) {
  return <div {...props} className={`${props.className} w-5 h-5 inline-block`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  </div>
}
