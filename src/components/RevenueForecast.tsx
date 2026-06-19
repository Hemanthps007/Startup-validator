import React, { useState } from 'react';
import type { RevenueProjections, RevenueProjection } from '../utils/simulator';
import { BarChart2 } from 'lucide-react';

interface RevenueForecastProps {
  revenueModels: string[];
  projections: RevenueProjections;
}

export const RevenueForecast: React.FC<RevenueForecastProps> = ({
  revenueModels,
  projections
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    caseType: string;
    year: number;
    val: number;
    x: number;
    y: number;
  } | null>(null);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  // Find max value to scale chart
  const allVals = [
    ...projections.bestCase.map(p => p.revenue),
    ...projections.realistic.map(p => p.revenue),
    ...projections.conservative.map(p => p.revenue)
  ];
  const maxVal = Math.max(...allVals, 100000);
  const padding = maxVal * 0.1;
  const scaleMax = maxVal + padding;

  // Chart coordinates map
  const chartW = 550;
  const chartH = 260;
  const marginX = 60;
  const marginY = 40;

  const getCoordinates = (p: RevenueProjection) => {
    const xRatio = p.year === 1 ? 0 : p.year === 3 ? 0.5 : 1.0;
    const x = marginX + xRatio * (chartW - 2 * marginX);
    const y = chartH - marginY - (p.revenue / scaleMax) * (chartH - 2 * marginY);
    return { x, y };
  };

  const getLinePath = (projList: RevenueProjection[]) => {
    return projList.map((p, idx) => {
      const { x, y } = getCoordinates(p);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getAreaPath = (projList: RevenueProjection[]) => {
    const coords = projList.map(getCoordinates);
    if (coords.length === 0) return '';
    const startX = coords[0].x;
    const endX = coords[coords.length - 1].x;
    const bottomY = chartH - marginY;
    const linePath = coords.map(c => `L ${c.x} ${c.y}`).join(' ');
    return `M ${startX} ${bottomY} ${linePath} L ${endX} ${bottomY} Z`;
  };

  const cases = [
    { label: 'Best Case', data: projections.bestCase, color: 'var(--accent-cyan)', areaGrad: 'url(#areaBest)' },
    { label: 'Realistic Case', data: projections.realistic, color: 'var(--accent-purple)', areaGrad: 'url(#areaReal)' },
    { label: 'Conservative Case', data: projections.conservative, color: 'var(--accent-pink)', areaGrad: 'url(#areaCons)' }
  ];

  return (
    <div className="dashboard-pane animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Revenue Opportunity Estimator</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Compare financial growth and conversion estimates across Conservative, Realistic, and Best-Case assumptions.
          </p>
        </div>

        {/* Suggested Revenue Models */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Monetization:
          </span>
          {revenueModels.map((model, idx) => (
            <span key={idx} style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: 'var(--accent-cyan)'
            }}>
              {model}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* SVG Chart Container */}
        <div className="glass-panel" style={{ background: 'var(--bg-card)', padding: '1.5rem', position: 'relative' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={16} color="var(--accent-cyan)" /> 5-Year Revenue Forecast Chart
          </h3>

          <div style={{ position: 'relative', overflow: 'visible' }}>
            <svg width="100%" height="280" viewBox={`0 0 ${chartW} ${chartH}`} style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaBest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="areaReal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="areaCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = marginY + ratio * (chartH - 2 * marginY);
                const val = scaleMax * (1 - ratio);
                return (
                  <g key={idx}>
                    <line
                      x1={marginX}
                      y1={y}
                      x2={chartW - marginX}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                    <text
                      x={marginX - 10}
                      y={y + 4}
                      fill="var(--text-muted)"
                      fontSize="9"
                      textAnchor="end"
                    >
                      {formatCurrency(val)}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {[1, 3, 5].map((yNum, idx) => {
                const x = marginX + (idx * 0.5) * (chartW - 2 * marginX);
                return (
                  <g key={idx}>
                    <line
                      x1={x}
                      y1={marginY}
                      x2={x}
                      y2={chartH - marginY}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={chartH - marginY + 18}
                      fill="var(--text-secondary)"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      Year {yNum}
                    </text>
                  </g>
                );
              })}

              {/* Draw Shaded Areas and Line Paths */}
              {cases.map((c, index) => (
                <g key={index}>
                  <path
                    d={getAreaPath(c.data)}
                    fill={c.areaGrad}
                  />
                  <path
                    d={getLinePath(c.data)}
                    fill="none"
                    stroke={c.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ transition: 'all 0.3s ease' }}
                  />
                </g>
              ))}

              {/* Hoverable Interactive Hotspots */}
              {cases.map((c, caseIdx) => 
                c.data.map((pt, ptIdx) => {
                  const { x, y } = getCoordinates(pt);
                  const isHovered = hoveredPoint && hoveredPoint.caseType === c.label && hoveredPoint.year === pt.year;
                  return (
                    <circle
                      key={`${caseIdx}-${ptIdx}`}
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      fill="var(--bg-core)"
                      stroke={c.color}
                      strokeWidth="3"
                      style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                      onMouseEnter={() => {
                        setHoveredPoint({
                          caseType: c.label,
                          year: pt.year,
                          val: pt.revenue,
                          x: x,
                          y: y - 12
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })
              )}
            </svg>

            {/* Custom Tooltip */}
            {hoveredPoint && (
              <div style={{
                position: 'absolute',
                left: `${(hoveredPoint.x / chartW) * 100}%`,
                top: `${(hoveredPoint.y / chartH) * 100}%`,
                transform: 'translate(-50%, -100%)',
                background: 'rgba(9, 13, 22, 0.95)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                zIndex: 100,
                whiteSpace: 'nowrap'
              }}>
                <strong style={{ color: hoveredPoint.caseType.includes('Best') ? 'var(--accent-cyan)' : hoveredPoint.caseType.includes('Real') ? 'var(--accent-purple)' : 'var(--accent-pink)' }}>
                  {hoveredPoint.caseType}
                </strong>
                <span style={{ color: 'var(--text-primary)' }}>
                  Year {hoveredPoint.year}: {formatCurrency(hoveredPoint.val)}
                </span>
              </div>
            )}
          </div>

          {/* Color Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            {cases.map((c, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                <span style={{ width: '12px', height: '3px', background: c.color, borderRadius: '2px' }}></span>
                <span style={{ color: 'var(--text-secondary)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Metrics panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cases.map((c, idx) => {
            const y1 = c.data.find(d => d.year === 1);
            const y5 = c.data.find(d => d.year === 5);
            return (
              <div key={idx} className="glass-panel" style={{ background: 'var(--bg-card)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{c.label}</h4>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: c.color
                  }}>
                    {idx === 0 ? 'High Growth' : idx === 1 ? 'Target Baseline' : 'Defensive'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.15)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Year 1 Revenue</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{formatCurrency(y1?.revenue || 0)}</strong>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.1rem' }}>
                      {y1?.users.toLocaleString()} users @ {y1?.conversionRate}%
                    </span>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.15)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Year 5 Revenue</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{formatCurrency(y5?.revenue || 0)}</strong>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.1rem' }}>
                      {y5?.users.toLocaleString()} users @ {y5?.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
