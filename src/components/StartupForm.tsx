import React, { useState } from 'react';
import { Rocket, Sparkles, AlertCircle } from 'lucide-react';

interface StartupFormProps {
  onSubmit: (data: {
    name?: string;
    idea: string;
    industry: string;
    targetMarket: string;
    region: string;
    problem: string;
  }) => void;
  isLoading: boolean;
}

export const StartupForm: React.FC<StartupFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [region, setRegion] = useState('');
  const [problem, setProblem] = useState('');
  const [error, setError] = useState('');

  const loadExample = () => {
    setName('FitSync AI');
    setIdea('An AI-powered platform that automatically creates personalized fitness plans based on wearable device data.');
    setIndustry('Health & Wellness');
    setTargetMarket('Tech-forward busy professionals owning smart wearables');
    setRegion('Global / North America');
    setProblem('Fitness enthusiasts struggle to coordinate data across multiple wearables (Apple Watch, Oura, Garmin) into a single, cohesive daily exercise and nutritional regime, resulting in high routine dropout rates.');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || !industry || !targetMarket.trim() || !region.trim() || !problem.trim()) {
      setError('Please fill in all required fields to run the validation scan.');
      return;
    }
    setError('');
    onSubmit({
      name: name.trim() || undefined,
      idea: idea.trim(),
      industry,
      targetMarket: targetMarket.trim(),
      region: region.trim(),
      problem: problem.trim()
    });
  };

  return (
    <div className="glass-panel animate-fade-in" style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '2.5rem',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>
          Validate Your Startup Idea
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Enter your business details below. Our AI systems will run market, financial, competitor, and risk analysis immediately.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={loadExample}
          style={{ 
            fontSize: '0.85rem', 
            padding: '0.4rem 0.8rem',
            borderColor: 'var(--accent-cyan-glow)',
            color: 'var(--accent-cyan)'
          }}
          disabled={isLoading}
        >
          <Sparkles size={14} />
          Load Example Idea
        </button>
      </div>

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '8px',
          color: '#ef4444',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="startup-name">Startup Name <span style={{ color: 'var(--text-muted)' }}>(Optional)</span></label>
            <input
              type="text"
              id="startup-name"
              className="form-input"
              placeholder="e.g. FitSync AI"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="startup-industry">Industry *</label>
            <select
              id="startup-industry"
              className="form-select"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select Industry</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="FinTech">FinTech</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="EdTech">EdTech</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="SaaS & Productivity">SaaS & Productivity</option>
              <option value="Creator Economy">Creator Economy</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="target-market">Target Market *</label>
            <input
              type="text"
              id="target-market"
              className="form-input"
              placeholder="e.g. Fitness enthusiasts, SMB managers"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="geo-region">Geographic Region *</label>
            <input
              type="text"
              id="geo-region"
              className="form-input"
              placeholder="e.g. India, North America, Global"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="problem-solved">Problem Being Solved *</label>
          <textarea
            id="problem-solved"
            className="form-textarea"
            placeholder="Explain the specific user pain point, its severity, and why current alternatives fail..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="startup-idea">Startup Idea / Solution *</label>
          <textarea
            id="startup-idea"
            className="form-textarea"
            placeholder="Describe your core product, features, and how it uniquely solves the target problem..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 1s linear infinite'
              }}></span>
              Analyzing Idea Components...
            </>
          ) : (
            <>
              <Rocket size={18} />
              Validate Startup Idea
            </>
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
