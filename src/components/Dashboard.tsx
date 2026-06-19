import React, { useState } from 'react';
import type { ValidationResult } from '../utils/simulator';
import { ScoreCard } from './ScoreCard';
import { CompetitorPanel } from './CompetitorPanel';
import { BusinessModelCanvas } from './BusinessModelCanvas';
import { RevenueForecast } from './RevenueForecast';
import { CustomerPersonas } from './CustomerPersonas';
import { RiskAssessment } from './RiskAssessment';
import { ValidationReport } from './ValidationReport';
import { PitchDeck } from './PitchDeck';
import { GroundingPanel } from './GroundingPanel';
import { 
  LayoutDashboard, 
  Target, 
  Users2, 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  FileCheck, 
  Presentation,
  CheckCircle,
  HelpCircle,
  Activity,
  MapPin,
  Tag,
  Database
} from 'lucide-react';

interface DashboardProps {
  result: ValidationResult;
}

type TabType = 'metrics' | 'problem' | 'competitors' | 'model' | 'customers' | 'financials' | 'risks' | 'report' | 'deck' | 'grounding';

export const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<TabType>('metrics');

  const navItems = [
    { id: 'metrics', label: 'Startup Score', icon: <LayoutDashboard size={16} /> },
    { id: 'problem', label: 'Problem & Solution', icon: <Activity size={16} /> },
    { id: 'competitors', label: 'Competitor Panel', icon: <Target size={16} /> },
    { id: 'model', label: 'Business Canvas', icon: <Briefcase size={16} /> },
    { id: 'customers', label: 'Customer Personas', icon: <Users2 size={16} /> },
    { id: 'financials', label: 'Revenue Forecast', icon: <TrendingUp size={16} /> },
    { id: 'risks', label: 'Risk Assessment', icon: <ShieldAlert size={16} /> },
    { id: 'report', label: 'Validation Report', icon: <FileCheck size={16} /> },
    { id: 'grounding', label: 'Data Grounding', icon: <Database size={16} /> },
    { id: 'deck', label: 'Investor Pitch Deck', icon: <Presentation size={16} /> }
  ];

  const renderActivePane = () => {
    switch (activeTab) {
      case 'metrics':
        return (
          <div className="dashboard-pane animate-fade-in">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Validation Score Overview</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Analysis scores calculated based on market demand signals, scalability, and technical risks.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <ScoreCard
                label="Overall Viability"
                value={result.scores.overallViability}
                description="Aggregated score of target market viability, scalability, and financial margins."
                colorTypeClass="rainbow"
              />
              <ScoreCard
                label="Market Potential"
                value={result.scores.marketPotential}
                description="Total Addressable Market size, user demand signals, and sector growth CAGR."
                colorTypeClass="cyan"
              />
              <ScoreCard
                label="Scalability"
                value={result.scores.scalability}
                description="Potential to expand services internationally with low incremental operating margins."
                colorTypeClass="purple"
              />
              <ScoreCard
                label="Revenue Potential"
                value={result.scores.revenuePotential}
                description="Forecasted subscription rates, licensing models, and conversion ratios."
                colorTypeClass="green"
              />
              <ScoreCard
                label="Competition Level"
                value={result.scores.competitionLevel}
                description="Presence of capitalized category incumbents vs blue-ocean space gaps."
                colorTypeClass="amber"
              />
            </div>
          </div>
        );
      
      case 'problem':
        return (
          <div className="dashboard-pane animate-fade-in">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Problem & Solution Validation</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Verify the depth of user frustrations and evaluate the technical uniqueness of the proposed solution.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Problem Analysis */}
              <div className="glass-panel" style={{ background: 'var(--bg-card)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-pink)' }}>
                  <HelpCircle size={18} /> Problem Severity Assessment
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Problem Significance:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{result.analysis.problemSignificance}</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Target Sufferers:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{result.analysis.targetSufferers}</p>
                  </div>
                </div>
              </div>

              {/* Solution Analysis */}
              <div className="glass-panel" style={{ background: 'var(--bg-card)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                  <CheckCircle size={18} /> Solution Feasibility
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Solution Uniqueness:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{result.analysis.solutionUniqueness}</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Solution Advantages:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{result.analysis.solutionAdvantages}</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Innovation Score:</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{result.analysis.innovationScore}/100</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${result.analysis.innovationScore}%`, height: '100%', background: 'var(--accent-cyan)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demand Signals */}
            <div className="glass-panel" style={{ background: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Market Demand Signals</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>Emerging Trends</h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {result.marketDemand.trends.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', marginBottom: '0.5rem', fontWeight: 600 }}>Consumer Adoption Indicators</h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {result.marketDemand.signals.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'competitors':
        return (
          <CompetitorPanel
            direct={result.competitors.direct}
            indirect={result.competitors.indirect}
            comparison={result.competitors.comparison}
            advantage={result.competitors.advantage}
            weaknesses={result.competitors.weaknesses}
            gaps={result.competitors.gaps}
            differentiation={result.competitors.differentiation}
          />
        );
      
      case 'model':
        return <BusinessModelCanvas bmc={result.businessModel} />;
      
      case 'customers':
        return <CustomerPersonas personas={result.personas} />;
      
      case 'financials':
        return (
          <RevenueForecast
            revenueModels={result.financials.revenueModels}
            projections={result.financials.projections}
          />
        );
      
      case 'risks':
        return <RiskAssessment risks={result.risks} />;
      
      case 'report':
        return <ValidationReport result={result} />;
      
      case 'deck':
        return <PitchDeck result={result} />;
      
      case 'grounding':
        return <GroundingPanel grounding={result.grounding} fallbackIndustry={result.industry} />;

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-grid animate-fade-in">
      {/* Sidebar Navigation */}
      <aside className="glass-panel" style={{
        background: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1.25rem',
        height: 'fit-content'
      }}>
        {/* Startup Card Mini */}
        <div style={{ 
          borderBottom: '1px solid var(--border-glass)', 
          paddingBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{result.startupName}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={12} /> {result.industry}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={12} /> {result.region}
          </span>
        </div>

        {/* Tab Links */}
        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`dashboard-nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.icon}
              <span style={{ fontSize: '0.85rem' }}>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Quick Viability summary badge inside sidebar */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-glass)',
          borderRadius: '8px',
          padding: '0.85rem',
          marginTop: '0.5rem',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Viability Score
          </span>
          <strong style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: result.scores.overallViability >= 75 ? 'var(--accent-cyan)' : 'var(--accent-amber)'
          }}>
            {result.scores.overallViability}%
          </strong>
        </div>
      </aside>

      {/* Main View Area */}
      <main style={{ minHeight: '500px' }}>
        {renderActivePane()}
      </main>
    </div>
  );
};
