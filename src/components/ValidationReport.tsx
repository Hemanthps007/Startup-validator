import React from 'react';
import type { ValidationResult } from '../utils/simulator';
import { Award, FileText, Printer, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ReportProps {
  result: ValidationResult;
}

export const ValidationReport: React.FC<ReportProps> = ({ result }) => {
  const { report } = result;

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'Highly Promising':
        return (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '30px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: 'var(--accent-green)',
            fontWeight: 700,
            fontSize: '1rem'
          }}>
            <CheckCircle2 size={18} />
            Highly Promising Opportunity
          </div>
        );
      case 'Promising':
        return (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '30px',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: 'var(--accent-cyan)',
            fontWeight: 700,
            fontSize: '1rem'
          }}>
            <Award size={18} />
            Promising Opportunity
          </div>
        );
      case 'Needs Refinement':
        return (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '30px',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: 'var(--accent-amber)',
            fontWeight: 700,
            fontSize: '1rem'
          }}>
            <AlertTriangle size={18} />
            Needs Concept Refinement
          </div>
        );
      default:
        return (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '30px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#ef4444',
            fontWeight: 700,
            fontSize: '1rem'
          }}>
            <ShieldCheck size={18} />
            High Risk Concept
          </div>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { title: "1. Executive Summary", content: report.executiveSummary },
    { title: "2. Market Opportunity & Size", content: report.marketOpportunity },
    { title: "3. Competitor Analysis & Gaps", content: report.competitorAnalysis },
    { title: "4. Customer Insights & Personas", content: report.customerInsights },
    { title: "5. Business Model Execution", content: report.businessModel },
    { title: "6. Financial Feasibility & Projections", content: report.financialPotential },
    { title: "7. Threat Vector & Risk Analysis", content: report.riskAnalysis }
  ];

  return (
    <div className="dashboard-pane animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Startup Validation Report</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Comprehensive investment memo with recommendation indices and strategic notes.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handlePrint} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Printer size={16} />
          Print / Save PDF
        </button>
      </div>

      {/* Recommendation Summary Panel */}
      <div className="glass-panel" style={{
        background: 'linear-gradient(135deg, rgba(20, 30, 55, 0.6) 0%, rgba(13, 20, 35, 0.8) 100%)',
        borderLeft: '4px solid var(--accent-cyan)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Final Validation Grade
          </span>
          {getRecommendationBadge(report.recommendation)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
              AI Confidence Score
            </span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{report.confidenceScore}%</strong>
          </div>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '2px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--accent-cyan)'
          }}>
            {report.confidenceScore}%
          </div>
        </div>
      </div>

      {/* Detailed Analysis Document */}
      <div className="glass-panel" style={{
        background: 'var(--bg-card)',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        border: '1px solid var(--border-glass)'
      }}>
        {/* Document Header (appears prominently in Print view) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '1.5rem',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              VALISTART INVESTMENT ASSESSMENT
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '0.25rem' }}>
              Project: {result.startupName} — {result.tagline}
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Assessment Date: {new Date().toLocaleDateString()}</span>
            <span style={{ display: 'block' }}>Scope: {result.region} ({result.industry})</span>
          </div>
        </div>

        {/* Sections */}
        {sections.map((sec, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            breakInside: 'avoid'
          }}>
            <h4 style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              paddingBottom: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={16} color="var(--accent-cyan)" />
              {sec.title}
            </h4>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              textAlign: 'justify'
            }}>
              {sec.content}
            </p>
          </div>
        ))}

        {/* Disclaimer signature */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-glass)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          This startup feasibility report is generated programmatically by Valistart AI based on input criteria, competitive intelligence, and predictive financial models. Strategic outcomes are subject to operational variables.
        </div>
      </div>
    </div>
  );
};
