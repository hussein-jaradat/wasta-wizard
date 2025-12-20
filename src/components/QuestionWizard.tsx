import { useState } from 'react';
import ProgressBar from './ProgressBar';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}

interface QuestionWizardProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

const QuestionWizard = ({ questions, onComplete, onBack }: QuestionWizardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [animationClass, setAnimationClass] = useState('animate-fade-in-scale');

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setAnimationClass('');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimationClass('animate-fade-in-scale');
      }, 150);
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);
      const maxScore = questions.length * 3; // Assuming max value per question is 3
      const percentage = Math.round((totalScore / maxScore) * 100);
      onComplete(percentage);
    }
  };

  const getButtonClass = (value: number) => {
    const baseClass = "glass-card w-full p-4 text-right transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";
    
    if (value >= 2) {
      return `${baseClass} hover:glow-green hover:border-primary/50`;
    }
    return `${baseClass} hover:border-muted-foreground/30`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      
      <div className={`${animationClass}`} style={{ animationDuration: '0.4s' }}>
        {/* Question */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {currentQuestion.text}
          </h2>
          <p className="text-muted-foreground text-sm">
            اختر الإجابة الأقرب لوضعك
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value)}
              className={getButtonClass(option.value)}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className="text-lg">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-8 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        ارجع للخيارات
      </button>
    </div>
  );
};

export default QuestionWizard;
