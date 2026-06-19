import React from 'react';

interface ScoreProps {
  label: string;
  value: number;
  description: string;
  colorTypeClass?: 'cyan' | 'purple' | 'green' | 'amber' | 'rainbow';
}

const CircularGauge: React.FC<{ value: number; strokeColor: string; isRainbow?: boolean }> = ({ 
  value, 
  strokeColor, 
  isRainbow 
}) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="8"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={isRainbow ? 'url(#rainbowGrad)' : strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {isRainbow && (
          <defs>
            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-cyan)" />
              <stop offset="50%" stopColor="var(--accent-purple)" />
              <stop offset="100%" stopColor="var(--accent-pink)" />
            </linearGradient>
          </defs>
        )}
      </svg>
      <div style={{ 
        position: 'absolute', 
        fontSize: '1.35rem', 
        fontWeight: 700, 
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)'
      }}>
        {value}
      </div>
    </div>
  );
};

export const ScoreCard: React.FC<ScoreProps> = ({ 
  label, 
  value, 
  description, 
  colorTypeClass = 'cyan' 
}) => {
  let strokeColor = 'var(--accent-cyan)';
  let glowColor = 'var(--accent-cyan-glow)';

  if (colorTypeClass === 'purple') {
    strokeColor = 'var(--accent-purple)';
    glowColor = 'var(--accent-purple-glow)';
  } else if (colorTypeClass === 'green') {
    strokeColor = 'var(--accent-green)';
    glowColor = 'var(--accent-green-glow)';
  } else if (colorTypeClass === 'amber') {
    // High competition is red/orange, low competition is green/blue. Let's color code it
    if (label.toLowerCase().includes('competition')) {
      strokeColor = value > 75 ? '#ef4444' : value > 40 ? '#f59e0b' : 'var(--accent-green)';
      glowColor = value > 75 ? 'rgba(239, 68, 68, 0.2)' : value > 40 ? 'rgba(245, 158, 11, 0.2)' : 'var(--accent-green-glow)';
    } else {
      strokeColor = 'var(--accent-amber)';
      glowColor = 'rgba(245, 158, 11, 0.2)';
    }
  }

  const isRainbow = colorTypeClass === 'rainbow';

  return (
    <div className="gauge-card" style={{
      boxShadow: isRainbow ? '0 0 20px rgba(139, 92, 246, 0.15)' : `0 0 15px ${glowColor}`,
      borderColor: isRainbow ? 'rgba(139, 92, 246, 0.2)' : 'var(--border-glass)'
    }}>
      <CircularGauge value={value} strokeColor={strokeColor} isRainbow={isRainbow} />
      
      <h3 style={{ 
        fontSize: '1rem', 
        marginTop: '1.25rem', 
        marginBottom: '0.4rem',
        color: isRainbow ? 'var(--accent-cyan)' : 'var(--text-primary)'
      }}>
        {label}
      </h3>
      
      <p style={{ 
        fontSize: '0.75rem', 
        color: 'var(--text-secondary)',
        lineHeight: 1.4
      }}>
        {description}
      </p>
    </div>
  );
};
