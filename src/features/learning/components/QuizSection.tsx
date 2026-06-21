import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizSectionProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => Promise<void>;
  quizId: string;
}

export function QuizSection({ title, questions, onComplete, quizId }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNext = () => {
    const isCorrect = questions[currentQuestion].options[selectedOption!] === questions[currentQuestion].answer;
    if (isCorrect) setScore(s => s + 1);
    
    setShowExplanation(true);
  };

  const handleConfirm = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  if (isFinished) {
    return (
      <div className="mb-8 p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Completed!</h3>
        <p className="text-muted-foreground mb-6">Your score: <span className="font-bold text-foreground">{score} / {questions.length}</span></p>
        <Button variant="primary" onClick={() => { setIsFinished(false); setCurrentQuestion(0); setScore(0); }}>
          Retry Quiz
        </Button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="mb-8 p-6 rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-foreground mb-4">{q.question}</p>
        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              disabled={showExplanation}
              onClick={() => setSelectedOption(i)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedOption === i 
                  ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                  : 'border-border bg-secondary/20 hover:border-primary/50'
              } ${showExplanation && option === q.answer ? 'border-green-500 bg-green-500/10 ring-1 ring-green-500' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-2">
            {q.options[selectedOption!] === q.answer ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
            <span className="font-bold text-foreground">Explanation</span>
          </div>
          {q.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {!showExplanation ? (
          <Button 
            disabled={selectedOption === null} 
            onClick={handleNext} 
            variant="primary" 
            size="sm"
          >
            Verify Answer
          </Button>
        ) : (
          <Button 
            onClick={handleConfirm} 
            variant="primary" 
            size="sm"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
}
