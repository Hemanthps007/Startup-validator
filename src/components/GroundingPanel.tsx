import React from 'react';
import { Database, ExternalLink, RefreshCw, BarChart3, CheckCircle, Info } from 'lucide-react';

interface GroundingPanelProps {
  grounding?: {
    matchedCompetitors: any[];
    benchmark: any;
    metadata: any;
  };
  fallbackIndustry: string;
}

export const GroundingPanel: React.FC<GroundingPanelProps> = ({ grounding, fallbackIndustry }) => {
  if (!grounding) {
    return (
      <div className="dashboard-pane animate-fade-in">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--bg-card)' }}>
          <Info size={40} color="var(--accent-purple)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Grounding Data Available</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            This validation result was computed using default rules. Run a new validation scan to load records from the market intelligence database.
          </p>
        </div>
      </div>
    );
  }

  const { matchedCompetitors, benchmark, metadata } = grounding;
  const ltvCacRatio = benchmark ? (benchmark.avgLtv / benchmark.avgCac).toFixed(1) : 'N/A';

  return (
    <div className="dashboard-pane animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.50rem' }}>
          <Database size={22} color="var(--accent-cyan)" /> Market Intelligence Grounding
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review the real-world dataset queries and metrics compiled from Kaggle repositories that drove this validation.
        </p>
      </div>

      {/* Kaggle Sources Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Source Datasets Card */}
        <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={16} color="var(--accent-purple)" /> Queried Kaggle Repositories
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {metadata.sources.map((src: any, idx: number) => (
              <div key={idx} style={{
                background: 'rgba(0,0,0,0.15)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{src.name}</strong>
                  <a 
                    href={src.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}
                  >
                    View <ExternalLink size={10} />
                  </a>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{src.description}</p>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                  Indexed Registry Size: {src.totalRecords.toLocaleString()} rows
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Benchmarks Card */}
        {benchmark ? (
          <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={16} color="var(--accent-green)" /> Sector Operational Benchmarks
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Market Growth Rate (CAGR):</span>
                <strong style={{ color: 'var(--accent-cyan)' }}>+{benchmark.growthRateCagr}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>TAM Sector Benchmark:</span>
                <strong style={{ color: 'var(--text-primary)' }}>${benchmark.tamEstimateBillions} Billion</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Avg Customer Acquisition Cost (CAC):</span>
                <strong style={{ color: 'var(--text-primary)' }}>${benchmark.avgCac}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Avg Customer Lifetime Value (LTV):</span>
                <strong style={{ color: 'var(--text-primary)' }}>${benchmark.avgLtv}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Derived LTV / CAC Ratio:</span>
                <strong style={{ color: parseFloat(ltvCacRatio) >= 3 ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
                  {ltvCacRatio}x {parseFloat(ltvCacRatio) >= 3 ? '(Healthy)' : '(Low Margins)'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Historical Default/Failure Rate:</span>
                <strong style={{ color: '#ef4444' }}>{benchmark.failureRatePercent}%</strong>
              </div>
            </div>
            
            <div style={{
              marginTop: '1.25rem',
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.04)',
              border: '1px solid rgba(6, 182, 212, 0.12)',
              fontSize: '0.75rem',
              display: 'flex',
              gap: '0.4rem',
              alignItems: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <RefreshCw size={14} style={{ flexShrink: 0 }} />
              <span>Grounded metrics drive the viability calculations and financial line chart projections.</span>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No benchmark mappings found for industry: {fallbackIndustry}</p>
          </div>
        )}
      </div>

      {/* Matched Grounding Competitors */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} color="var(--accent-cyan)" /> Grounding Competitors from Kaggle Registry
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {matchedCompetitors.map((comp: any, idx: number) => (
            <div key={idx} className="glass-panel" style={{
              background: 'var(--bg-card)',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '1.5rem',
              alignItems: 'start'
            }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{comp.name}</h4>
                {comp.website && (
                  <a 
                    href={`https://${comp.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', marginTop: '0.25rem' }}
                  >
                    {comp.website} <ExternalLink size={10} />
                  </a>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                  <span>HQ: {comp.country}</span>
                  <span>Pricing: {comp.pricing}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{comp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-glass)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Real Funding: </span>
                    <strong style={{ color: 'var(--accent-green)' }}>{comp.funding}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Stage: </span>
                    <strong style={{ color: 'var(--accent-purple)' }}>{comp.stage}</strong>
                  </div>
                  {comp.leadInvestors && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Lead Investors: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{comp.leadInvestors}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
