import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StartupForm } from './components/StartupForm';
import { Dashboard } from './components/Dashboard';
import { analyzeWithGemini } from './utils/geminiApi';
import { generateMockData } from './utils/simulator';
import type { ValidationResult } from './utils/simulator';
import { Cpu, AlertCircle } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('valistart_api_key') || '';
  });
  const [apiMode, setApiMode] = useState<'sim' | 'gemini'>(() => {
    const saved = localStorage.getItem('valistart_api_mode');
    return (saved === 'gemini' || saved === 'sim') ? saved : 'sim';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [marketDb, setMarketDb] = useState<any>(null);

  // Sync state with localstorage
  useEffect(() => {
    localStorage.setItem('valistart_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('valistart_api_mode', apiMode);
  }, [apiMode]);

  // Fetch Kaggle market intelligence database on startup
  useEffect(() => {
    fetch('/data/kaggle_market_intelligence.json')
      .then((res) => res.json())
      .then((data) => setMarketDb(data))
      .catch((err) => console.error("Failed to load Kaggle market intelligence database:", err));
  }, []);

  const queryMarketDatabase = (industry: string, idea: string) => {
    if (!marketDb) return undefined;
    
    const ideaLower = idea.toLowerCase();
    const indLower = industry.toLowerCase();
    
    // Determine matched industry sector
    let matchedSectorName = "SaaS & Productivity";
    if (indLower.includes("machine") || indLower.includes("intelligence") || indLower.includes("ai") || ideaLower.includes("ai") || ideaLower.includes("artificial intelligence") || ideaLower.includes("machine learning")) {
      matchedSectorName = "AI & Machine Learning";
    } else if (indLower.includes("fin") || indLower.includes("pay") || indLower.includes("crypto") || ideaLower.includes("fintech") || ideaLower.includes("finance") || ideaLower.includes("payment")) {
      matchedSectorName = "FinTech";
    } else if (indLower.includes("health") || indLower.includes("fit") || indLower.includes("wellness") || ideaLower.includes("health") || ideaLower.includes("fitness") || ideaLower.includes("wearable")) {
      matchedSectorName = "Health & Wellness";
    } else if (indLower.includes("ed") || indLower.includes("learn") || indLower.includes("teach") || ideaLower.includes("education") || ideaLower.includes("edtech") || ideaLower.includes("school")) {
      matchedSectorName = "EdTech";
    } else if (indLower.includes("e-com") || indLower.includes("shop") || indLower.includes("retail") || ideaLower.includes("e-commerce") || ideaLower.includes("store") || ideaLower.includes("marketplace")) {
      matchedSectorName = "E-Commerce";
    } else if (indLower.includes("saas") || indLower.includes("product") || indLower.includes("work") || ideaLower.includes("saas") || ideaLower.includes("productivity") || ideaLower.includes("software")) {
      matchedSectorName = "SaaS & Productivity";
    }

    const benchmark = marketDb.industryBenchmarks[matchedSectorName] || null;
    
    // Filter direct competitors
    const matchedCompetitors = marketDb.competitors.filter(
      (c: any) => c.industry === matchedSectorName
    );

    return {
      matchedCompetitors,
      benchmark,
      metadata: marketDb.datasetMetadata
    };
  };

  // Loading Ticker Steps
  const tickerSteps = [
    "Contacting AI neural core...",
    "Scanning search interest and market CAGR...",
    "Running competitor discovery audits...",
    "Mapping target customer demographic profiles...",
    "Synthesizing 9-block Business Model Canvas...",
    "Calculating Conservative, Realistic, and Best-Case projections...",
    "Generating 10-slide investor presentation deck..."
  ];

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      setLoadingStep(0);
      interval = window.setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % tickerSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFormSubmit = async (formData: {
    name?: string;
    idea: string;
    industry: string;
    targetMarket: string;
    region: string;
    problem: string;
  }) => {
    setIsLoading(true);
    setError(null);

    // Filter local Kaggle database
    const groundingData = queryMarketDatabase(formData.industry, formData.idea);

    // Give a short delay to appreciate the holographic scanning line
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      if (apiMode === 'gemini' && apiKey.trim()) {
        const aiResult = await analyzeWithGemini(formData, apiKey.trim(), groundingData);
        setResult(aiResult);
      } else {
        const mockResult = generateMockData(formData, groundingData);
        setResult(mockResult);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unexpected error occurred during analysis.");
      
      // Fallback automatically to simulator so the user's flow isn't completely broken
      try {
        console.warn("API call failed. Auto-falling back to Grounded Simulated Mode.");
        const fallbackResult = generateMockData(formData, groundingData);
        setResult(fallbackResult);
        setError(`AI Connection Error: ${e.message || "Network Timeout"}. We have generated grounded simulated results for you.`);
      } catch (fallbackErr) {
        // If everything fails
        setError("Crucial: AI connection failed and simulator failed to compile. Please check the network.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        apiKey={apiKey}
        setApiKey={setApiKey}
        apiMode={apiMode}
        setApiMode={setApiMode}
        onReset={handleReset}
        hasResult={!!result}
      />

      <div className="main-content">
        {isLoading ? (
          /* Hologram scanning container */
          <div className="glass-panel scan-container" style={{
            maxWidth: '520px',
            margin: '6rem auto',
            padding: '3rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.25)',
            borderColor: 'rgba(6, 182, 212, 0.4)'
          }}>
            <div className="scan-line"></div>
            
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '2px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulseGlow 2s infinite ease-in-out',
              color: 'var(--accent-cyan)'
            }}>
              <Cpu size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                Neural Validator Active
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--accent-cyan)', 
                fontWeight: 600,
                minHeight: '24px',
                transition: 'all 0.3s ease'
              }}>
                {tickerSteps[loadingStep]}
              </p>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Analyzing industry CAGR ratios, modeling competitor gaps, and formatting presentation templates.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="glass-panel animate-fade-in" style={{
                maxWidth: '680px',
                margin: '0 auto 1.5rem auto',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: 'var(--accent-amber)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {!result ? (
              <StartupForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            ) : (
              <Dashboard result={result} />
            )}
          </>
        )}
      </div>

      <footer style={{
        marginTop: 'auto',
        padding: '2rem 0',
        textAlign: 'center',
        borderTop: '1px solid var(--border-glass)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <p>© {new Date().getFullYear()} Valistart AI. Powered by Google Gemini. All rights reserved.</p>
      </footer>
    </div>
  );
}
