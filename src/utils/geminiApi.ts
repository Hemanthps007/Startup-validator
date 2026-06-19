import type { ValidationResult } from './simulator';

const SYSTEM_PROMPT = `You are an expert Startup Consultant, Venture Capital Analyst, Market Researcher, and Business Strategist.
Your task is to evaluate startup ideas using market analysis, competitor research, business modeling, revenue forecasting, and risk assessment.
Provide data-driven insights, realistic assumptions, structured reports, and investor-ready recommendations.

You MUST return a JSON object that strictly adheres to the following TypeScript interface definition. Do not wrap the JSON in markdown code blocks or add any other text outside the JSON object.

interface Competitor {
  name: string;
  website: string;
  description: string;
  funding: string;
  pricing: string;
}

interface CompetitorComparison {
  feature: string;
  startup: string;
  competitorA: string;
  competitorB: string;
}

interface CustomerPersona {
  name: string;
  age: string;
  occupation: string;
  industry: string;
  income: string;
  location: string;
  painPoints: string[];
  buyingMotivation: string[];
}

interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  valueProposition: string[];
  customerRelationships: string[];
  customerSegments: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
}

interface RevenueProjection {
  year: number; // must be 1, 3, or 5
  users: number;
  conversionRate: number; // percentage, e.g. 2.5
  revenue: number; // in USD
}

interface RevenueProjections {
  conservative: RevenueProjection[]; // 3 items for years 1, 3, 5
  realistic: RevenueProjection[]; // 3 items for years 1, 3, 5
  bestCase: RevenueProjection[]; // 3 items for years 1, 3, 5
}

interface Risk {
  category: 'Market' | 'Product' | 'Financial' | 'Competitive';
  title: string;
  description: string;
  score: number; // 1-100
  mitigation: string;
}

interface ValidationReport {
  executiveSummary: string;
  marketOpportunity: string;
  competitorAnalysis: string;
  customerInsights: string;
  businessModel: string;
  financialPotential: string;
  riskAnalysis: string;
  recommendation: 'Highly Promising' | 'Promising' | 'Needs Refinement' | 'High Risk';
  confidenceScore: number; // 1-100
}

interface PitchDeckSlide {
  slideNumber: number; // 1 to 10
  title: string;
  subtitle?: string;
  bullets: string[]; // 3-5 concise bullet points
  visualData?: any; // key-value statistics or simple chart numbers if applicable
}

interface ValidationResult {
  startupName: string; // use the user's name or generate a creative one if empty
  tagline: string; // short, punchy marketing slogan
  idea: string;
  industry: string;
  targetMarket: string;
  region: string;
  problem: string;
  scores: {
    marketPotential: number; // 1-100
    competitionLevel: number; // 1-100
    scalability: number; // 1-100
    revenuePotential: number; // 1-100
    overallViability: number; // 1-100
  };
  analysis: {
    problemSignificance: string;
    targetSufferers: string;
    solutionUniqueness: string;
    solutionAdvantages: string;
    innovationScore: number; // 1-100
  };
  marketDemand: {
    tam: string; // e.g., "$10 Billion"
    sam: string;
    som: string;
    trends: string[]; // at least 3 trends
    signals: string[]; // at least 3 demand indicators
    demandScore: number; // 1-100
    opportunityScore: number; // 1-100
  };
  competitors: {
    direct: Competitor[]; // 3 real or highly probable direct competitors
    indirect: string[]; // 3 indirect alternatives
    comparison: CompetitorComparison[]; // 3-4 feature rows
    advantage: string;
    weaknesses: string;
    gaps: string;
    differentiation: string;
  };
  personas: CustomerPersona[]; // exactly 3 personas
  businessModel: BusinessModelCanvas; // detailed entries for all 9 blocks
  financials: {
    revenueModels: string[]; // monetization methods
    projections: RevenueProjections;
  };
  risks: Risk[]; // 4 risks, one for each category
  report: ValidationReport;
  pitchDeck: PitchDeckSlide[]; // exactly 10 slides matching the required outline:
  // Slide 1: Startup Name & Tagline
  // Slide 2: Problem
  // Slide 3: Solution
  // Slide 4: Market Opportunity (TAM / SAM / SOM)
  // Slide 5: Product Demo / Features
  // Slide 6: Business Model
  // Slide 7: Competitive Advantage
  // Slide 8: Go-To-Market Strategy
  // Slide 9: Financial Projections
  // Slide 10: Investment Opportunity (Funding Ask, Vision)
}`;

export async function analyzeWithGemini(
  input: {
    name?: string;
    idea: string;
    industry: string;
    targetMarket: string;
    region: string;
    problem: string;
  },
  apiKey: string,
  groundingData?: {
    matchedCompetitors: any[];
    benchmark: any;
    metadata: any;
  }
): Promise<ValidationResult> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  let groundingContext = "";
  if (groundingData) {
    groundingContext = `
<KAGGLE_GROUNDING_DATA>
Below are the actual matched real-world dataset records loaded from the market intelligence database (Kaggle sources):
- Sector Growth Benchmarks: ${JSON.stringify(groundingData.benchmark)}
- Verified Direct Competitors: ${JSON.stringify(groundingData.matchedCompetitors)}
- Dataset Sources Reference: ${JSON.stringify(groundingData.metadata.sources)}
</KAGGLE_GROUNDING_DATA>

CRITICAL INSTRUCTION FOR AI ANALYST:
You must act as a financial and strategic analyst INTERPRETING this data. 
1. Use the actual direct competitors listed above in the competitor panel, competitor cards, and comparisons.
2. Use the provided growthRateCagr and tamEstimateBillions to ground your TAM/SAM/SOM market forecasts.
3. Assess the failureRatePercent and avgCac/avgLtv ratio to calculate risks and financial viability parameters.
4. Do NOT make up fake competitor names, fake funding figures, or default growth rates. If you need details, extrapolate analytically from the provided real data.
`;
  }

  const prompt = `Analyze this startup idea:
Startup Name: ${input.name || "Optional / Not provided"}
Startup Idea: ${input.idea}
Industry: ${input.industry}
Target Market: ${input.targetMarket}
Geographic Region: ${input.region}
Problem Being Solved: ${input.problem}

${groundingContext}

Perform a rigorous evaluation and populate all sections of the JSON object schema detailed in the system instructions. Ensure high-quality, professional, realistic market sizes, and numbers.`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          { text: SYSTEM_PROMPT },
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText || response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Empty response received from Gemini API.");
  }

  try {
    const parsedData = JSON.parse(rawText.trim()) as ValidationResult;
    // Perform simple validation of the required fields
    if (!parsedData.scores || !parsedData.report || !parsedData.pitchDeck) {
      throw new Error("JSON returned by Gemini API is missing core fields.");
    }
    parsedData.grounding = groundingData;
    return parsedData;
  } catch (error: any) {
    console.error("Failed to parse Gemini API JSON response:", rawText, error);
    throw new Error(`Failed to parse AI output: ${error.message}. Please retry or check the console logs.`);
  }
}
