import React from 'react';
import type { Competitor, CompetitorComparison } from '../utils/simulator';
import { ExternalLink, ShieldAlert, Award, Star, Compass } from 'lucide-react';

interface CompetitorPanelProps {
  direct: Competitor[];
  indirect: string[];
  comparison: CompetitorComparison[];
  advantage: string;
  weaknesses: string;
  gaps: string;
  differentiation: string;
}

export const CompetitorPanel: React.FC<CompetitorPanelProps> = ({
  direct,
  indirect,
  comparison,
  advantage,
  weaknesses,
  gaps,
  differentiation
}) => {
  return (
    <div className="dashboard-pane animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Competitor Analysis</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review direct competitors, indirect alternatives, and identified market gaps where you can differentiate.
        </p>
      </div>

      {/* Direct Competitors Cards */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={18} color="var(--accent-cyan)" /> Direct Competitors
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {direct.map((comp, idx) => (
            <div key={idx} className="glass-panel" style={{ 
              background: 'var(--bg-card)', 
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{comp.name}</h4>
                  {comp.website && (
                    <a 
                      href={`https://${comp.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}
                    >
                      Visit site <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {comp.description}
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.4rem', 
                fontSize: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-glass)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Funding:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{comp.funding}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pricing:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{comp.pricing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid Table */}
      {comparison && comparison.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={18} color="var(--accent-purple)" /> Feature Comparison Matrix
          </h3>
          <div className="comp-table-wrapper">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>Key Feature / Criteria</th>
                  <th style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.08)' }}>Our Startup</th>
                  <th>{direct[0]?.name || 'Competitor A'}</th>
                  <th>{direct[1]?.name || 'Competitor B'}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td className="startup-cell">{row.startup}</td>
                    <td>{row.competitorA}</td>
                    <td>{row.competitorB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Indirect Alternatives & Market Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Indirect Competitors */}
        <div className="glass-panel" style={{ background: 'var(--bg-card)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <ShieldAlert size={16} color="var(--accent-pink)" /> Indirect Competitors & Subsitutes
          </h4>
          <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
            Solutions target users currently deploy, showing existing behavior habits:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {indirect.map((ind, idx) => (
              <li key={idx}>{ind}</li>
            ))}
          </ul>
        </div>

        {/* Advantage & Gaps */}
        <div className="glass-panel" style={{ background: 'var(--bg-card)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <Award size={16} color="var(--accent-green)" /> Strategic Positioning
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: 'var(--accent-green)' }}>Our Core Advantage:</strong>
              <p style={{ marginTop: '0.15rem' }}>{advantage}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--accent-pink)' }}>Market Weaknesses & Barriers:</strong>
              <p style={{ marginTop: '0.15rem' }}>{weaknesses}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--accent-cyan)' }}>Identified Gaps:</strong>
              <p style={{ marginTop: '0.15rem' }}>{gaps}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--accent-purple)' }}>Differentiation Opportunity:</strong>
              <p style={{ marginTop: '0.15rem' }}>{differentiation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
