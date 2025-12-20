import { useEffect, useRef } from 'react';

interface AnimatedFlagProps {
  country: 'jordan' | 'palestine';
  className?: string;
}

const AnimatedFlag = ({ country, className = '' }: AnimatedFlagProps) => {
  const flagRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const flag = flagRef.current;
    if (!flag) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = flag.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;
      
      flag.style.transform = `perspective(500px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (country === 'jordan') {
    return (
      <svg
        ref={flagRef}
        viewBox="0 0 120 60"
        className={`flag-wave transition-transform duration-300 ${className}`}
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}
      >
        <defs>
          <linearGradient id="jordanSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        {/* Black stripe */}
        <rect x="0" y="0" width="120" height="20" fill="#000000" />
        {/* White stripe */}
        <rect x="0" y="20" width="120" height="20" fill="#FFFFFF" />
        {/* Green stripe */}
        <rect x="0" y="40" width="120" height="20" fill="#007A3D" />
        {/* Red triangle */}
        <polygon points="0,0 40,30 0,60" fill="#CE1126" />
        {/* White star */}
        <polygon
          points="15,30 17.5,25 20,30 17.5,32 20,37 15,34 10,37 12.5,32 10,30 12.5,25"
          fill="#FFFFFF"
          transform="translate(5, 0)"
        />
        {/* Sheen overlay */}
        <rect x="0" y="0" width="120" height="60" fill="url(#jordanSheen)" />
      </svg>
    );
  }

  return (
    <svg
      ref={flagRef}
      viewBox="0 0 120 60"
      className={`flag-wave transition-transform duration-300 ${className}`}
      style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}
    >
      <defs>
        <linearGradient id="palestineSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>
      {/* Black stripe */}
      <rect x="0" y="0" width="120" height="20" fill="#000000" />
      {/* White stripe */}
      <rect x="0" y="20" width="120" height="20" fill="#FFFFFF" />
      {/* Green stripe */}
      <rect x="0" y="40" width="120" height="20" fill="#009736" />
      {/* Red triangle */}
      <polygon points="0,0 40,30 0,60" fill="#EE2A35" />
      {/* Sheen overlay */}
      <rect x="0" y="0" width="120" height="60" fill="url(#palestineSheen)" />
    </svg>
  );
};

export default AnimatedFlag;
