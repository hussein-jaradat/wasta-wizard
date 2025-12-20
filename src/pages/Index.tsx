import { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import ScenariosSection from '@/components/ScenariosSection';
import QuestionWizard from '@/components/QuestionWizard';
import ResultPage from '@/components/ResultPage';
import { scenarios } from '@/data/scenarios';

type AppState = 'hero' | 'scenarios' | 'questions' | 'result';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [resultPercentage, setResultPercentage] = useState(0);
  const scenariosRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setAppState('scenarios');
    setTimeout(() => {
      scenariosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setAppState('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuestionComplete = (score: number) => {
    setResultPercentage(score);
    setAppState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAnother = () => {
    setAppState('scenarios');
    setSelectedScenario(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToScenarios = () => {
    setAppState('scenarios');
    setSelectedScenario(null);
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  return (
    <main className="min-h-screen">
      {/* SEO Meta - handled by index.html */}
      
      {appState === 'hero' && (
        <HeroSection onStart={handleStart} />
      )}

      {appState === 'scenarios' && (
        <div ref={scenariosRef}>
          <ScenariosSection onSelectScenario={handleSelectScenario} />
        </div>
      )}

      {appState === 'questions' && currentScenario && (
        <section className="min-h-screen py-20">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">{currentScenario.icon}</span>
            <h2 className="text-2xl font-bold">{currentScenario.title}</h2>
          </div>
          <QuestionWizard
            questions={currentScenario.questions}
            onComplete={handleQuestionComplete}
            onBack={handleBackToScenarios}
          />
        </section>
      )}

      {appState === 'result' && currentScenario && (
        <section className="min-h-screen py-20">
          <ResultPage
            percentage={resultPercentage}
            scenarioName={currentScenario.title}
            onTryAnother={handleTryAnother}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/30">
        <p>صُنع بـ ❤️ للضحك — لا تأخذها جد 😉</p>
        <p className="mt-2 flex items-center justify-center gap-2">
          🇯🇴 🇵🇸
        </p>
      </footer>
    </main>
  );
};

export default Index;
