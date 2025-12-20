import { useEffect, useState } from 'react';

interface ResultGaugeProps {
  percentage: number;
}

const ResultGauge = ({ percentage }: ResultGaugeProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getGaugeColor = () => {
    if (percentage <= 25) return 'hsl(var(--muted-foreground))';
    if (percentage <= 50) return 'hsl(var(--accent))';
    if (percentage <= 75) return 'hsl(145 60% 50%)';
    return 'hsl(var(--primary))';
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r="45"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
          className="opacity-50"
        />
        {/* Progress circle */}
        <circle
          cx="96"
          cy="96"
          r="45"
          fill="none"
          stroke={getGaugeColor()}
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease',
          }}
        />
        {/* Glow effect */}
        <circle
          cx="96"
          cy="96"
          r="45"
          fill="none"
          stroke={getGaugeColor()}
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'blur(8px)',
            opacity: 0.5,
          }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-4xl font-black text-foreground transition-all duration-300"
          style={{ color: getGaugeColor() }}
        >
          {animatedPercentage}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">نسبة الواسطة</span>
      </div>
    </div>
  );
};

export default ResultGauge;
