import React, { useState } from 'react';
import type { ValidationResult } from '../utils/simulator';
import { exportToPPTX } from '../utils/pptxExport';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Sparkles
} from 'lucide-react';

interface PitchDeckProps {
  result: ValidationResult;
}

export const PitchDeck: React.FC<PitchDeckProps> = ({ result }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = result.pitchDeck;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDownloadPPTX = () => {
    try {
      exportToPPTX(result);
    } catch (e: any) {
      console.error(e);
      alert(`PowerPoint Generation failed: ${e.message}`);
    }
  };

  const activeSlideData = slides[currentSlide];

  // Formatting helpers
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="dashboard-pane animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Pitch Deck Generator</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Automatically structured 10-slide investor presentation matching your validation parameters.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleDownloadPPTX}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
          >
            <Download size={14} />
            Export PPTX
          </button>
        </div>
      </div>

      {/* Interactive Deck Window */}
      <div className="deck-container">
        <div className="deck-slide">
          {/* Header */}
          {activeSlideData.slideNumber > 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em'
                }}>
                  {result.startupName} Pitch Deck
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  SLIDE 0{activeSlideData.slideNumber}
                </span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)', marginTop: '0.25rem', fontWeight: 700 }}>
                {activeSlideData.title}
              </h3>
              {activeSlideData.subtitle && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.1rem' }}>
                  {activeSlideData.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Slide Layouts based on slide type */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
            {activeSlideData.slideNumber === 1 ? (
              // Cover Slide
              <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                <h1 style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 800, 
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.03em'
                }}>
                  {activeSlideData.title.toUpperCase()}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 500, fontStyle: 'italic' }}>
                  {activeSlideData.subtitle}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '2rem', 
                  marginTop: '1.5rem', 
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  {activeSlideData.bullets.map((b, idx) => (
                    <span key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem',
                      background: 'rgba(255,255,255,0.03)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      border: '1px solid var(--border-glass)'
                    }}>
                      <Sparkles size={12} color="var(--accent-cyan)" />
                      {b.replace(/^Target Market:\s*|^Region:\s*|^Industry Sector:\s*/, '')}
                    </span>
                  ))}
                </div>
              </div>
            ) : activeSlideData.slideNumber === 4 && activeSlideData.visualData ? (
              // Market sizing with TAM/SAM/SOM vertical lists
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', width: '100%', alignItems: 'center' }}>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem', 
                  fontSize: '1rem' 
                }}>
                  {activeSlideData.bullets.map((b, idx) => (
                    <li key={idx} style={{ position: 'relative', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent-cyan)' }}>•</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Graphical TAM/SAM/SOM Blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block' }}>TAM (Total Addressable Market)</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>{activeSlideData.visualData.TAM}</strong>
                  </div>
                  <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block' }}>SAM (Serviceable Available Market)</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--accent-purple)' }}>{activeSlideData.visualData.SAM}</strong>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block' }}>SOM (Serviceable Obtainable Market)</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--accent-green)' }}>{activeSlideData.visualData.SOM}</strong>
                  </div>
                </div>
              </div>
            ) : activeSlideData.slideNumber === 9 && activeSlideData.visualData ? (
              // Financial Projections Bar graphs
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', width: '100%', alignItems: 'center' }}>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.85rem', 
                  fontSize: '0.95rem' 
                }}>
                  {activeSlideData.bullets.map((b, idx) => (
                    <li key={idx} style={{ position: 'relative', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent-purple)' }}>•</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* SVG Vertical chart */}
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '150px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                  {['Year1', 'Year3', 'Year5'].map((yKey, index) => {
                    const rev = activeSlideData.visualData[yKey] || 0;
                    const maxRev = activeSlideData.visualData.Year5 || 100000;
                    const heightPercent = Math.max(15, Math.min(100, (rev / maxRev) * 100));
                    return (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '30%' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {formatCurrency(rev)}
                        </span>
                        <div style={{ 
                          width: '100%', 
                          height: `${heightPercent}px`, 
                          background: 'linear-gradient(to top, var(--accent-cyan), var(--accent-purple))', 
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(6,182,212,0.2)'
                        }}></div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {yKey.replace('Year', 'Yr ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Standard Bullet layout
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                fontSize: '1.05rem', 
                width: '100%' 
              }}>
                {activeSlideData.bullets.map((b, idx) => (
                  <li key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-cyan)' }}>•</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="slide-footer">
            <span>Valistart AI Pitch System</span>
            <span>Confidential Investor Brief</span>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="deck-controls">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={prevSlide} style={{ padding: '0.5rem', borderRadius: '50%' }}>
              <ChevronLeft size={16} />
            </button>
            <button className="btn btn-secondary" onClick={nextSlide} style={{ padding: '0.5rem', borderRadius: '50%' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Slide Indicator circles */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {slides.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: idx === currentSlide ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                title={`Jump to Slide ${idx + 1}`}
              ></span>
            ))}
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Slide {currentSlide + 1} of 10
          </span>
        </div>
      </div>
    </div>
  );
};
