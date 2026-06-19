import React from 'react';
import type { Risk } from '../utils/simulator';
import { AlertTriangle, ShieldCheck, TrendingDown, Target, HardDrive, DollarSign } from 'lucide-react';

interface RiskAssessmentProps {
  risks: Risk[];
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ risks }) => {
  const getRiskTagClass = (score: number) => {
    if (score >= 70) return 'risk-tag risk-tag-high';
    if (score >= 40) return 'risk-tag risk-tag-med';
    return 'risk-tag risk-tag-low';
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return '#ef4444'; // Red
    if (score >= 40) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'Market': return <TrendingDown size={18} color="var(--accent-cyan)" />;
      case 'Product': return <HardDrive size={18} color="var(--accent-purple)" />;
      case 'Financial': return <DollarSign size={18} color="var(--accent-green)" />;
      case 'Competitive': return <Target size={18} color="var(--accent-pink)" />;
      default: return <AlertTriangle size={18} />;
    }
  };

  return (
    <div className="dashboard-pane animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Risk Assessment & Mitigation</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Identify potential threats across operational dimensions and review structural mitigation safeguards.
        </p>
      </div>

      <div className="risk-grid">
        {risks.map((risk, idx) => (
          <div key={idx} className="risk-card glass-panel" style={{
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div>
              {/* Risk Category Header */}
              <div className="risk-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getRiskIcon(risk.category)}
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {risk.category} Risk
                  </span>
                </div>
                <span className={getRiskTagClass(risk.score)}>
                  Score: {risk.score}/100
                </span>
              </div>

              {/* Title & Description */}
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{risk.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {risk.description}
              </p>

              {/* Visual Score Meter */}
              <div className="risk-bar-bg">
                <div className="risk-bar-fill" style={{
                  width: `${risk.score}%`,
                  backgroundColor: getRiskColor(risk.score),
                  boxShadow: `0 0 8px ${getRiskColor(risk.score)}`
                }}></div>
              </div>
            </div>

            {/* Mitigation Strategy */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.12)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <ShieldCheck size={16} color="var(--accent-green)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'block', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Mitigation Strategy
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {risk.mitigation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
