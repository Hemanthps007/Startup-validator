import React, { useState } from 'react';
import { Settings, Key, Info, Zap, Cpu } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  apiMode: 'sim' | 'gemini';
  setApiMode: (mode: 'sim' | 'gemini') => void;
  onReset: () => void;
  hasResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  apiKey,
  setApiKey,
  apiMode,
  setApiMode,
  onReset,
  hasResult
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputKey);
    if (inputKey.trim()) {
      setApiMode('gemini');
    } else {
      setApiMode('sim');
    }
    setShowSettings(false);
  };

  const handleClearKey = () => {
    setApiKey('');
    setInputKey('');
    setApiMode('sim');
    setShowSettings(false);
  };

  return (
    <header className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '0 0 16px 16px',
      borderTop: 'none',
      marginBottom: '1rem',
      padding: '1rem 2rem'
    }}>
      <div 
        onClick={onReset} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          cursor: 'pointer' 
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(6, 182, 212, 0.3)'
        }}>
          <Zap size={22} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>
            VALI<span style={{ color: 'var(--accent-cyan)' }}>START</span>
          </h1>
          <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--text-muted)' }}>AI Startup Intelligence</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {hasResult && (
          <button 
            className="btn btn-secondary" 
            onClick={onReset}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            New Validation
          </button>
        )}
        
        {/* API Indicator Badge */}
        <div 
          onClick={() => setShowSettings(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: apiMode === 'gemini' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(139, 92, 246, 0.12)',
            border: `1px solid ${apiMode === 'gemini' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
            color: apiMode === 'gemini' ? 'var(--accent-green)' : 'var(--accent-purple)',
            cursor: 'pointer'
          }}
        >
          {apiMode === 'gemini' ? <Cpu size={12} /> : <Info size={12} />}
          <span>{apiMode === 'gemini' ? 'Live Gemini AI' : 'Simulation Mode'}</span>
        </div>

        <button 
          className="btn btn-secondary" 
          onClick={() => setShowSettings(!showSettings)}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
          title="Configure API Credentials"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Settings Modal Dialog overlay */}
      {showSettings && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}>
                <Key size={18} />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>API Settings</h2>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              To validate ideas in real-time with live global market and competitive data, supply your Gemini API key. 
              Leave it empty to run using the offline <strong>Intelligent Simulator</strong>.
            </p>

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="api-key-input">Gemini API Key</label>
                <input
                  type="password"
                  id="api-key-input"
                  className="form-input"
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  style={{ letterSpacing: inputKey ? '0.2em' : 'normal' }}
                />
              </div>

              {/* Mode Toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="form-label">Processing Engine</span>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.5rem', 
                  background: 'rgba(0,0,0,0.2)', 
                  padding: '0.25rem', 
                  borderRadius: '8px' 
                }}>
                  <button
                    type="button"
                    onClick={() => setApiMode('sim')}
                    className={`btn ${apiMode === 'sim' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', border: 'none' }}
                  >
                    Simulator Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!inputKey.trim()) {
                        alert("Please provide a Gemini API Key first to enable live model analysis.");
                        return;
                      }
                      setApiMode('gemini');
                    }}
                    className={`btn ${apiMode === 'gemini' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', border: 'none' }}
                  >
                    Live Gemini AI
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                {apiKey && (
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleClearKey}
                    style={{ padding: '0.6rem 1.2rem' }}
                  >
                    Remove Key
                  </button>
                )}
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowSettings(false)}
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
