import { useState, useEffect } from 'react';
import ResultGauge from './ResultGauge';
import Confetti from './Confetti';
import { toast } from '@/hooks/use-toast';

interface ResultPageProps {
  percentage: number;
  scenarioName: string;
  onTryAnother: () => void;
}

const getTitle = (percentage: number): { title: string; emoji: string } => {
  if (percentage <= 25) return { title: 'عالسستم', emoji: '😅' };
  if (percentage <= 50) return { title: 'بدها دفشة', emoji: '🤔' };
  if (percentage <= 75) return { title: 'أمورك ماشية', emoji: '👌' };
  return { title: 'واسطة VIP', emoji: '😎' };
};

const getExplanation = (percentage: number): string => {
  if (percentage <= 25) {
    return 'للأسف، علاقاتك ضعيفة في هالمجال. ممكن تحتاج تبني شبكة معارف أقوى أو تتعامل بالطريقة الرسمية.';
  }
  if (percentage <= 50) {
    return 'عندك بعض المعارف بس مش كافية. حاول تفعّل علاقاتك أكثر أو اطلب من حد يساعدك بالتواصل.';
  }
  if (percentage <= 75) {
    return 'علاقاتك كويسة! عندك ناس ممكن يساعدوك. استغل هالعلاقات بذكاء.';
  }
  return 'مبروك! أنت واسطة VIP - عندك علاقات قوية ومباشرة. أمورك ماشية إن شاء الله!';
};

const ResultPage = ({ percentage, scenarioName, onTryAnother }: ResultPageProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { title, emoji } = getTitle(percentage);

  useEffect(() => {
    if (percentage >= 75) {
      setTimeout(() => setShowConfetti(true), 1000);
    }
  }, [percentage]);

  const handleCopy = () => {
    const text = `🎯 حاسبة الواسطة - ${scenarioName}\n\nنتيجتي: ${percentage}%\nاللقب: ${title} ${emoji}\n\nجرّب حظك: [الرابط]`;
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ! ✨",
      description: "شاركها مع أصحابك",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 text-center">
      <Confetti active={showConfetti} />
      
      {/* Result card */}
      <div className="glass-card p-8 mb-6 animate-fade-in-scale">
        <h2 className="text-xl text-muted-foreground mb-4">{scenarioName}</h2>
        
        <ResultGauge percentage={percentage} />
        
        {/* Title */}
        <div className="mt-6 mb-4">
          <span className="text-5xl">{emoji}</span>
          <h3 className="text-3xl font-black mt-2 text-glow" style={{ 
            color: percentage >= 75 ? 'hsl(var(--primary))' : 
                   percentage >= 50 ? 'hsl(145 60% 50%)' :
                   percentage >= 25 ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))'
          }}>
            {title}
          </h3>
        </div>
        
        {/* Explanation */}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {getExplanation(percentage)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onTryAnother}
          className="glass-card px-8 py-4 font-bold hover:glow-green transition-all duration-300 hover:scale-105"
        >
          🔄 جرّب سيناريو ثاني
        </button>
        
        <button
          onClick={handleCopy}
          className="glass-card px-8 py-4 font-bold hover:border-accent/50 transition-all duration-300 hover:scale-105"
        >
          📋 انسخ النتيجة
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
