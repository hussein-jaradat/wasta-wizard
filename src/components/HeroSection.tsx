import { useEffect, useState } from 'react';
import AnimatedFlag from './AnimatedFlag';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Flags */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div 
            className={`w-24 md:w-32 opacity-0 ${mounted ? 'animate-slide-in-right' : ''}`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <AnimatedFlag country="jordan" className="w-full" />
          </div>
          <div 
            className={`w-24 md:w-32 opacity-0 ${mounted ? 'animate-slide-in-left' : ''}`}
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <AnimatedFlag country="palestine" className="w-full" />
          </div>
        </div>

        {/* Main title */}
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-black mb-4 opacity-0 ${mounted ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <span className="text-glow bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            حاسبة الواسطة
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-xl md:text-2xl text-muted-foreground mb-12 opacity-0 ${mounted ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          احسب فرصك… قبل ما تضيع وقتك ⏱️
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className={`
            glass-card pulse-glow
            px-12 py-5 text-xl font-bold
            bg-gradient-to-r from-primary/20 to-primary/10
            border border-primary/30
            hover:border-primary/60 hover:from-primary/30 hover:to-primary/20
            transition-all duration-500
            hover:scale-105 active:scale-95
            opacity-0 ${mounted ? 'animate-fade-in-scale' : ''}
          `}
          style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
        >
          <span className="flex items-center gap-3">
            ابدأ الحساب الآن
            <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

        {/* Scroll indicator */}
        <div 
          className={`mt-16 opacity-0 ${mounted ? 'animate-fade-in-up' : ''} animate-float`}
          style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
        >
          <svg className="w-8 h-8 text-muted-foreground mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
