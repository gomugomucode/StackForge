import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onComplete(score);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-4"
      >
        <Trophy size={48} className="mx-auto text-yellow-500" />
        <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
        <p className="text-gray-400">You scored {score} out of {questions.length}</p>
        <Button onClick={() => { setCurrentQuestion(0); setScore(0); setIsFinished(false); setIsAnswered(false); }} className="mx-auto">
          <RotateCcw size={16} className="mr-2" /> Retry Quiz
        </Button>
      </motion.div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="my-8 p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Question {currentQuestion + 1}/{questions.length}</span>
        <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
        </div
      </div>

      <h3 className="text-xl font-bold text-white leading-tight">{q.text}</h3>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={isAnswered}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              isAnswered 
                ? (idx === q.correctAnswer ? 'border-emerald-500 bg-emerald-500/10 text-white' : idx === selectedOption ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-white/5 text-gray-500')
                : 'border-white/10 bg-white/5 text-gray-300 hover:border-indigo-500/50 hover:bg-white/10'
            }`}
          >
            <span className="text-sm font-medium">{option}</span>
            {isAnswered && idx === q.correctAnswer && <CheckCircle2 className="text-emerald-500" size={18} />}
            {isAnswered && idx === selectedOption && idx !== q.correctAnswer && <XCircle className="text-rose-500" size={18} />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-200"
          >
            <strong>Explanation:</strong> {q.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && (
        <Button onClick={nextQuestion} className="w-full py-4">
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      )}
    </div>
  );
};

// Added a missing import for Trophy and Button
import { Trophy } from 'lucide-react';
import { Button } from '../../components/ui/Button';
