import React from 'react';
import type { CustomerPersona } from '../utils/simulator';
import { AlertCircle, ShoppingBag } from 'lucide-react';

interface CustomerPersonasProps {
  personas: CustomerPersona[];
}

export const CustomerPersonas: React.FC<CustomerPersonasProps> = ({ personas }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="dashboard-pane animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ideal Customer Personas</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review detailed buyer profiles representing your core target audience segments.
        </p>
      </div>

      <div className="personas-row">
        {personas.map((pers, idx) => (
          <div key={idx} className="persona-card glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--bg-card)'
          }}>
            <div>
              {/* Persona Avatar Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="persona-avatar">
                  {getInitials(pers.name)}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{pers.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {pers.occupation}
                  </span>
                </div>
              </div>

              {/* Persona Info Metadata */}
              <div className="persona-meta-grid">
                <div className="persona-meta-item">
                  Age Range
                  <span>{pers.age}</span>
                </div>
                <div className="persona-meta-item">
                  Location
                  <span>{pers.location}</span>
                </div>
                <div className="persona-meta-item">
                  Income level
                  <span>{pers.income}</span>
                </div>
                <div className="persona-meta-item">
                  Industry
                  <span>{pers.industry}</span>
                </div>
              </div>

              {/* Persona Pain Points */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h5 style={{ 
                  fontSize: '0.85rem', 
                  marginBottom: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem',
                  color: 'var(--accent-pink)'
                }}>
                  <AlertCircle size={14} /> Core Pain Points
                </h5>
                <ul style={{ 
                  paddingLeft: '1.1rem', 
                  margin: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.35rem', 
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}>
                  {pers.painPoints.map((pain, pIdx) => (
                    <li key={pIdx}>{pain}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buying Motivation */}
            <div style={{ 
              paddingTop: '1rem', 
              borderTop: '1px solid var(--border-glass)'
            }}>
              <h5 style={{ 
                fontSize: '0.85rem', 
                marginBottom: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                color: 'var(--accent-green)'
              }}>
                <ShoppingBag size={14} /> Buying Motivation & triggers
              </h5>
              <ul style={{ 
                paddingLeft: '1.1rem', 
                margin: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.35rem', 
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                {pers.buyingMotivation.map((mot, mIdx) => (
                  <li key={mIdx}>{mot}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
