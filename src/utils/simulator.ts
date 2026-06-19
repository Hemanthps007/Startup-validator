export interface Competitor {
  name: string;
  website: string;
  description: string;
  funding: string;
  pricing: string;
}

export interface CompetitorComparison {
  feature: string;
  startup: string;
  competitorA: string;
  competitorB: string;
}

export interface CustomerPersona {
  name: string;
  age: string;
  occupation: string;
  industry: string;
  income: string;
  location: string;
  painPoints: string[];
  buyingMotivation: string[];
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  valueProposition: string[];
  customerRelationships: string[];
  customerSegments: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface RevenueProjection {
  year: number;
  users: number;
  conversionRate: number;
  revenue: number;
}

export interface RevenueProjections {
  conservative: RevenueProjection[];
  realistic: RevenueProjection[];
  bestCase: RevenueProjection[];
}

export interface Risk {
  category: 'Market' | 'Product' | 'Financial' | 'Competitive';
  title: string;
  description: string;
  score: number;
  mitigation: string;
}

export interface ValidationReport {
  executiveSummary: string;
  marketOpportunity: string;
  competitorAnalysis: string;
  customerInsights: string;
  businessModel: string;
  financialPotential: string;
  riskAnalysis: string;
  recommendation: 'Highly Promising' | 'Promising' | 'Needs Refinement' | 'High Risk';
  confidenceScore: number;
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  visualData?: any;
}

export interface ValidationResult {
  startupName: string;
  tagline: string;
  idea: string;
  industry: string;
  targetMarket: string;
  region: string;
  problem: string;
  scores: {
    marketPotential: number;
    competitionLevel: number;
    scalability: number;
    revenuePotential: number;
    overallViability: number;
  };
  analysis: {
    problemSignificance: string;
    targetSufferers: string;
    solutionUniqueness: string;
    solutionAdvantages: string;
    innovationScore: number;
  };
  marketDemand: {
    tam: string;
    sam: string;
    som: string;
    trends: string[];
    signals: string[];
    demandScore: number;
    opportunityScore: number;
  };
  competitors: {
    direct: Competitor[];
    indirect: string[];
    comparison: CompetitorComparison[];
    advantage: string;
    weaknesses: string;
    gaps: string;
    differentiation: string;
  };
  personas: CustomerPersona[];
  businessModel: BusinessModelCanvas;
  financials: {
    revenueModels: string[];
    projections: RevenueProjections;
  };
  risks: Risk[];
  report: ValidationReport;
  pitchDeck: PitchDeckSlide[];
  grounding?: {
    matchedCompetitors: any[];
    benchmark: any;
    metadata: any;
  };
}

export function generateMockData(
  input: {
    name?: string;
    idea: string;
    industry: string;
    targetMarket: string;
    region: string;
    problem: string;
  },
  groundingData?: {
    matchedCompetitors: any[];
    benchmark: any;
    metadata: any;
  }
): ValidationResult {
  const ideaLower = input.idea.toLowerCase();
  const name = input.name || "ElevateVentures";
  
  // 1. Identify category & custom content bases
  let category: 'AI' | 'Fintech' | 'Edtech' | 'Health' | 'Ecommerce' | 'General' = 'General';
  if (ideaLower.includes('ai') || ideaLower.includes('artificial intelligence') || ideaLower.includes('machine learning') || ideaLower.includes('gpt') || ideaLower.includes('chatbot') || ideaLower.includes('copilot')) {
    category = 'AI';
  } else if (ideaLower.includes('fintech') || ideaLower.includes('finance') || ideaLower.includes('money') || ideaLower.includes('pay') || ideaLower.includes('crypto') || ideaLower.includes('bank') || ideaLower.includes('ledger')) {
    category = 'Fintech';
  } else if (ideaLower.includes('education') || ideaLower.includes('edtech') || ideaLower.includes('learn') || ideaLower.includes('teach') || ideaLower.includes('school') || ideaLower.includes('student') || ideaLower.includes('course')) {
    category = 'Edtech';
  } else if (ideaLower.includes('health') || ideaLower.includes('fitness') || ideaLower.includes('medical') || ideaLower.includes('wearable') || ideaLower.includes('doctor') || ideaLower.includes('wellness') || ideaLower.includes('diet')) {
    category = 'Health';
  } else if (ideaLower.includes('shop') || ideaLower.includes('e-commerce') || ideaLower.includes('sell') || ideaLower.includes('store') || ideaLower.includes('retail') || ideaLower.includes('marketplace') || ideaLower.includes('delivery')) {
    category = 'Ecommerce';
  }

  // Basic info setup
  let tagline = "Redefining the future of technology.";
  let defaultTAM = "$150 Billion";
  let defaultSAM = "$15 Billion";
  let defaultSOM = "$850 Million";
  let trends: string[] = [];
  let signals: string[] = [];
  let directComps: Competitor[] = [];
  let indirectComps: string[] = [];
  let bmc: BusinessModelCanvas = {
    keyPartners: [], keyActivities: [], valueProposition: [], customerRelationships: [],
    customerSegments: [], channels: [], costStructure: [], revenueStreams: []
  };
  let comparison: CompetitorComparison[] = [];
  let personas: CustomerPersona[] = [];
  let revenueModels: string[] = [];
  let basePrice = 29; // Monthly subscription base
  let userMultiplier = 1;

  if (category === 'AI') {
    tagline = "Empowering operations with agentic intelligence.";
    defaultTAM = "$350 Billion by 2030";
    defaultSAM = "$24 Billion";
    defaultSOM = "$1.2 Billion";
    trends = [
      "Exponential growth of LLM orchestrations and workflow agents.",
      "Increasing shift from general chatbots to domain-specific autonomous copilots.",
      "Regulatory frameworks (EU AI Act, FTC guidelines) driving ethical AI compliance."
    ];
    signals = [
      "Rising corporate developer spend on AI API tokens (up 140% YoY).",
      "Surge in venture capital investments for seed-stage agentic automation.",
      "High developer pain index in maintaining deterministic prompts and reliability."
    ];
    directComps = [
      { name: "Jasper AI", website: "jasper.ai", description: "AI enterprise content curation platform.", funding: "$125M Series A", pricing: "Custom / SaaS (Starts $39/mo)" },
      { name: "CrewAI", website: "crewai.com", description: "Multi-agent framework for workflow automation.", funding: "Seed / Open Source", pricing: "Freemium / Developer SaaS" },
      { name: "Relevance AI", website: "relevance.ai", description: "Low-code workspace for building AI agents.", funding: "$15M Series A", pricing: "Usage-based (Starts $19/mo)" }
    ];
    indirectComps = ["Zapier (legacy integrations)", "Custom internal Python scripts", "Traditional software outsourcing companies"];
    bmc = {
      keyPartners: ["LLM Providers (OpenAI, Anthropic, Google Cloud)", "Cloud Hosting (AWS, GCP)", "System Integrators / Dev Agencies"],
      keyActivities: ["Core model fine-tuning", "UX dashboard optimization", "API integration connector development"],
      valueProposition: ["Reduces task duration from hours to seconds", "Automates cognitive workflows with 95%+ precision", "Seamless native integrations into enterprise software legacy pipelines"],
      customerRelationships: ["High-touch onboarding for Enterprise", "Developer-focused community Discord & documentation", "Self-service SaaS model"],
      customerSegments: ["Mid-market operations teams", "Software development agencies", "SMBs seeking workflow optimization"],
      channels: ["SEO & developer articles", "GitHub and open-source packages", "Direct B2B outbound cold outreach"],
      costStructure: ["Model token inference costs", "Infrastructure & database hosting costs", "Engineering & customer support salaries"],
      revenueStreams: ["Monthly seat-based subscription", "API usage volume fees", "Enterprise customization implementation charges"]
    };
    comparison = [
      { feature: "AI Agent Autonomy", startup: "High / Autonomous agentic chains", competitorA: "Low / Templated templates", competitorB: "Medium / Orchestrated graphs" },
      { feature: "Custom Integrations", startup: "Native / Dynamic API generator", competitorA: "Predefined libraries only", competitorB: "Developer SDK configuration only" },
      { feature: "Price-to-Performance Ratio", startup: "Optimized multi-model caching", competitorA: "Expensive API wrapper overhead", competitorB: "High cloud setup infrastructure fees" }
    ];
    personas = [
      {
        name: "Alex Rivera", age: "32", occupation: "Head of Operations", industry: "B2B SaaS", income: "$120,000/yr", location: "San Francisco, CA",
        painPoints: ["Spends 15 hours a week doing manual copy-paste spreadsheet data checks.", "High operational friction onboarding new customer tiers.", "Existing APIs keep breaking with legacy databases."],
        buyingMotivation: ["Wants to automate repetitive checks so his team can scale.", "Needs a dashboard that doesn't require programming knowledge to modify.", "Wants instant integration with Slack and Salesforce."]
      },
      {
        name: "Jessica Chen", age: "41", occupation: "Founder & CEO", industry: "Digital Agency", income: "$210,000/yr", location: "Austin, TX",
        painPoints: ["High contractor labor costs for content rewriting and formatting.", "Difficulty scaling volume of clients due to delivery bottlenecks.", "Low profit margins on entry-level projects."],
        buyingMotivation: ["To multiply individual output without hiring more full-time staff.", "To present cutting-edge automation options to key corporate clients.", "To improve agency EBITDA margins by 20%."]
      }
    ];
    revenueModels = ["SaaS Subscription", "API Usage-Based Pricing", "Enterprise Licensing"];
    basePrice = 49;
    userMultiplier = 1.2;
  } else if (category === 'Health') {
    tagline = "Bridging bio-data and human habits.";
    defaultTAM = "$220 Billion";
    defaultSAM = "$18 Billion";
    defaultSOM = "$450 Million";
    trends = [
      "Surge in consumer adoption of smart wearables (Oura, Apple Watch, Whoop).",
      "Shift towards preventative lifestyle medicine and biomarker tracking.",
      "Increasing trust in automated, real-time virtual health coaching."
    ];
    signals = [
      "Over 60% of smartphone users tracking at least one wellness metric daily.",
      "Growing search intent for 'personalized bio-hacking' and 'wearable optimization'.",
      "High dropout rate (approx 70% in first 3 months) for general, non-personalized diet apps."
    ];
    directComps = [
      { name: "MyFitnessPal", website: "myfitnesspal.com", description: "Food log and calorie tracker.", funding: "Acquired (Francisco Partners)", pricing: "Freemium ($19.99/mo)" },
      { name: "Whoop Coach", website: "whoop.com", description: "Subscription wearable providing bio-insights and AI coach.", funding: "$400M+ Venture-backed", pricing: "Hardware bundle ($30/mo)" },
      { name: "Noom", website: "noom.com", description: "Psychology-based wellness and behavior change app.", funding: "$600M+ Series F", pricing: "Subscription ($40-$70/mo)" }
    ];
    indirectComps = ["Personal trainers / gym coaches", "Generic Excel logs", "Youtube workout playlists"];
    bmc = {
      keyPartners: ["Wearable API Aggregators (Terra API, Vital)", "Fitness influencer networks", "Certified sports nutritionists"],
      keyActivities: ["Cross-wearable data sync API pipeline", "Algorithmic adaptive feedback loop", "Client app UX/UI design"],
      valueProposition: ["Eliminates guesswork: creates schedules based on yesterday's recovery stats", "Unified dashboard: reads Garmin, Apple, Oura simultaneously", "High-retention social accountability groups"],
      customerRelationships: ["Automated push notification triggers", "In-app gamified milestones", "VIP virtual direct chat support"],
      customerSegments: ["Tech-forward fitness enthusiasts", "Bio-hackers and amateur athletes", "Busy corporate professionals needing health balance"],
      channels: ["App Store Optimization (ASO)", "Micro-influencer affiliate networks", "Health & fitness podcasts"],
      costStructure: ["Wearable API synchronization tokens", "Data infrastructure hosting", "User acquisition costs (Paid Social)"],
      revenueStreams: ["Premium subscription tier", "In-app marketplace (wearable straps, supplements)", "Corporate corporate wellness packages"]
    };
    comparison = [
      { feature: "Data Integration", startup: "Unified sync from all major devices", competitorA: "Manual logging only", competitorB: "Proprietary device restrictions" },
      { feature: "Feedback Adaptability", startup: "Adapts hourly using recovery algorithms", competitorA: "Static monthly schedules", competitorB: "Daily workout logs but no food synergy" },
      { feature: "Gamification", startup: "Cooperative multiplayer challenges", competitorA: "Single-player charts", competitorB: "High focus on metric logs rather than social interaction" }
    ];
    personas = [
      {
        name: "Marcus Cole", age: "29", occupation: "Software Engineer", industry: "Fintech", income: "$150,000/yr", location: "Seattle, WA",
        painPoints: ["Owns an Apple Watch and Oura ring, but doesn't know how to sync data.", "Feels fatigued by 2 PM, struggles to optimize sleep and workout routines.", "Tired of generic generic fitness templates."],
        buyingMotivation: ["wants a unified plan that automatically changes if sleep quality drops.", "Desires scientific bio-metrics broken down into actionable micro-habits.", "Wants to maximize physical stamina for weekends."]
      },
      {
        name: "Sarah Jenkins", age: "38", occupation: "Marketing VP", industry: "Media", income: "$175,000/yr", location: "New York, NY",
        painPoints: ["Exhaustive schedule leaves little time to think about meal prepping.", "Finds personal training packages expensive and restrictive in timing.", "Struggles with maintaining long-term physical routines."],
        buyingMotivation: ["Needs quick, personalized workout plans that adjust to her schedule.", "Expects nutritional guidance to adapt to her wearable stress ratings.", "Wants convenient mobile accountability."]
      }
    ];
    revenueModels = ["SaaS Subscription", "Corporate Wellness SaaS", "Affiliate E-Commerce Partnerships"];
    basePrice = 19;
    userMultiplier = 1.8;
  } else if (category === 'Fintech') {
    tagline = "Simplifying value exchange and liquidity.";
    defaultTAM = "$310 Billion";
    defaultSAM = "$22 Billion";
    defaultSOM = "$950 Million";
    trends = [
      "Integration of real-time open-banking protocols (Plaid, Yodlee).",
      "Expanding adoption of autonomous robo-advisory and smart asset allocation.",
      "Regulatory focus on micro-payments and immediate payment networks."
    ];
    signals = [
      "Over 75% of consumers linking bank accounts to digital apps.",
      "Explosive search trends in 'micro-saving' and 'automated investment allocation'.",
      "High levels of consumer dissatisfaction with legacy banking interfaces and fee models."
    ];
    directComps = [
      { name: "Copilot Finance", website: "copilot.money", description: "Modern AI budget tracker and investment monitor.", funding: "Series A", pricing: "SaaS ($8.99/mo)" },
      { name: "Monarch Money", website: "monarchmoney.com", description: "Collaborative household asset planner.", funding: "Venture-backed", pricing: "SaaS ($14.99/mo)" },
      { name: "YNAB", website: "ynab.com", description: "Zero-based envelope budgeting software.", funding: "Bootstrapped / Profitable", pricing: "Subscription ($14/mo)" }
    ];
    indirectComps = ["Legacy bank statements", "Microsoft Excel sheets", "Cash-in-envelope systems"];
    bmc = {
      keyPartners: ["Financial API gateways (Plaid, Stripe)", "SEC/FINRA broker-dealers", "KYC/AML validation firms"],
      keyActivities: ["Double-entry ledger maintenance", "High-frequency classification engine", "Bank connection maintenance"],
      valueProposition: ["Instant automated categorization with 98% accuracy", "Predictive cashflow alerts 14 days before overdraft", "Multi-currency support and real-time wealth indices"],
      customerRelationships: ["High-security client trust communications", "Weekly balance reports via email", "Fast interactive customer service"],
      customerSegments: ["Young working professionals", "Multi-income freelancers / creators", "Newly married couples managing shared assets"],
      channels: ["Financial influencer content reviews", "App Store organic visibility", "Personal finance blogs (Substack/Medium)"],
      costStructure: ["Plaid bank API sync charges", "High-security cloud infrastructure (SOC2 compliance)", "Customer acquisition and marketing"],
      revenueStreams: ["SaaS premium memberships", "Ancillary advisory transaction commission", "Aggregate anonymized market indexes data"]
    };
    comparison = [
      { feature: "AI Categorization", startup: "Dynamic context learning algorithm", competitorA: "Keyword regex matching only", competitorB: "Requires manual user mapping" },
      { feature: "Household Collaboration", startup: "Real-time ledger sharing sync", competitorA: "Single account credentials sharing", competitorB: "Read-only view export permissions" },
      { feature: "Investment Insights", startup: "Holistic asset mapping across brokerages", competitorA: "Focuses strictly on day-to-day budgets", competitorB: "Very complex charts tailored for traders" }
    ];
    personas = [
      {
        name: "David Kim", age: "34", occupation: "Freelance Designer", industry: "Creative Services", income: "$95,000/yr", location: "Los Angeles, CA",
        painPoints: ["Irregular monthly income stream makes traditional budgeting difficult.", "Struggles to calculate self-employment tax allocations.", "Mixed personal and business expense receipts."],
        buyingMotivation: ["Wants an app that forecasts dry months based on client histories.", "Needs instant tax write-off recommendations.", "Demands simple visual bank dashboards."]
      }
    ];
    revenueModels = ["Subscription SaaS", "Robo-advisory Commission", "Premium Financial Analytics"];
    basePrice = 12;
    userMultiplier = 2.5;
  } else if (category === 'Edtech') {
    tagline = "Democratizing customized knowledge transfer.";
    defaultTAM = "$250 Billion";
    defaultSAM = "$14 Billion";
    defaultSOM = "$680 Million";
    trends = [
      "Rise of micro-learning formats and gamified progress metrics.",
      "High adoption of dynamic AI teachers adapting to individual paces.",
      "Growing institutional acceptance of alternative certificate paths."
    ];
    signals = [
      "Shorter consumer attention spans (preference for 5-minute tutorials).",
      "Increasing school board inquiries for custom supplementary software.",
      "Low average course completion rates (only 5% to 7%) on static, non-interactive platforms."
    ];
    directComps = [
      { name: "Duolingo", website: "duolingo.com", description: "Gamified vocabulary and language learning.", funding: "Publicly Traded (DUOL)", pricing: "Freemium ($12.99/mo)" },
      { name: "Khan Academy", website: "khanacademy.org", description: "Non-profit customized library of standard learning courses.", funding: "Philanthropic grants", pricing: "Free / Donation based" },
      { name: "Synthesis AI", website: "synthesis.is", description: "Interactive game-based math & thinking school for kids.", funding: "Venture Backed ($12M+)", pricing: "SaaS ($29/mo)" }
    ];
    indirectComps = ["Physical textbooks", "YouTube search tutorials", "Private home tutors"];
    bmc = {
      keyPartners: ["Subject matter experts & educators", "Accredited educational institutions", "Google Play / Apple App Store"],
      keyActivities: ["Curriculum mapping and scripting", "Adaptive learning graph engine", "Interactive gamification assets"],
      valueProposition: ["1-on-1 tutoring at 1/100th of the price", "Adapts dynamically: changes difficulty based on child's response speed", "Fun gameplay loop keeps completion rates above 65%"],
      customerRelationships: ["Parental tracking dashboard app", "Weekly performance email metrics", "Gamified community leagues"],
      customerSegments: ["Parents seeking enrichment for kids", "Adult learners seeking career transitions", "K-12 schools looking for custom supplements"],
      channels: ["Parenting communities & FB groups", "App store organic recommendations", "Teacher blogging networks"],
      costStructure: ["Game asset design & animation", "Infrastructure & CDN hosting", "Parent marketing campaigns"],
      revenueStreams: ["Monthly consumer subscription", "School site licensing licenses", "Ad-supported free account model"]
    };
    comparison = [
      { feature: "Adaptability", startup: "Real-time difficulty feedback curves", competitorA: "Static linear video order", competitorB: "Simple quiz benchmarks" },
      { feature: "Gamification", startup: "Native RPG adventure modules", competitorA: "Point boards and streak bars only", competitorB: "Plain text with occasional stars" },
      { feature: "Parent Involvement", startup: "Weekly SMS logs & focus stats", competitorA: "Email alerts on password resets", competitorB: "Basic test grade reports" }
    ];
    personas = [
      {
        name: "Emily Watson", age: "36", occupation: "Elementary School Teacher", industry: "Education", income: "$55,000/yr", location: "Denver, CO",
        painPoints: ["Kids have diverse math skills, hard to address individually in a class of 30.", "Lacks budget for expensive software licences.", "High administrative work limiting preparation time."],
        buyingMotivation: ["Wants an affordable platform where student groups can learn independently.", "Wants auto-grading and conceptual weakness analysis.", "Needs alignment with common core standards."]
      }
    ];
    revenueModels = ["SaaS Subscription", "School Site Licensing", "Freemium Ads"];
    basePrice = 15;
    userMultiplier = 3.0;
  } else if (category === 'Ecommerce') {
    tagline = "Frictionless global commerce integrations.";
    defaultTAM = "$6.3 Trillion (Global Retail Ecom)",
    defaultSAM = "$45 Billion (Niche Platforms)",
    defaultSOM = "$1.1 Billion",
    trends = [
      "Explosion of direct-to-consumer social commerce (TikTok Shop, Instagram Shop).",
      "High demand for ultra-personalized interactive storefront matching.",
      "Green logistics and carbon-neutral express shipping expectations."
    ];
    signals = [
      "Over 40% of checkout dropoffs occur due to slow payment gateways or hidden costs.",
      "Double-digit expansion of merchant marketing budgets shifting to social media.",
      "Increasing search queries for 'dropshipping automation' and 'custom AI storefronts'."
    ];
    directComps = [
      { name: "Shopify", website: "shopify.com", description: "Global e-commerce builder infrastructure.", funding: "Publicly Traded (SHOP)", pricing: "SaaS ($39-$399/mo)" },
      { name: "Gumroad", website: "gumroad.com", description: "E-commerce platform for digital creators.", funding: "Bootstrapped / Equity Crowdfunded", pricing: "10% Flat Transaction Fee" },
      { name: "WooCommerce", website: "woocommerce.com", description: "Open-source WordPress checkout system.", funding: "Subsidiary of Automattic", pricing: "Plugin Free / Paid Extensions" }
    ];
    indirectComps = ["Amazon Seller Central", "Instagram Direct Messages", "Local farmers markets"];
    bmc = {
      keyPartners: ["Payment process providers (Stripe, Paypal)", "Logistics & warehouse APIs (ShipStation, DHL)", "Social media ad systems"],
      keyActivities: ["Checkout security optimization", "Multi-channel catalog syncing", "Merchant support ticketing"],
      valueProposition: ["Launch a customized checkout site in under 3 minutes", "Automated marketing emails generated from product photos", "Lowest transaction fees: only 1% + 30¢"],
      customerRelationships: ["Merchant community chat boards", "24/7 technical live chat helper", "On-demand store building manuals"],
      customerSegments: ["Independent digital creators", "Boutique physical goods sellers", "Dropshipping side-hustlers"],
      channels: ["Youtube tutorial reviews", "Shopify migration comparative ads", "Word-of-mouth creator referrals"],
      costStructure: ["PCI compliant hosting infrastructure", "Fraud risk mitigation processes", "Merchant customer support salaries"],
      revenueStreams: ["Monthly software SaaS subscriptions", "Transaction fee cut percentage", "Theme & add-on marketplace sales"]
    };
    comparison = [
      { feature: "Setup Time", startup: "AI storefront generated in 3 mins", competitorA: "Requires template customization (1-2 days)", competitorB: "Requires WordPress setup (3-4 days)" },
      { feature: "Transaction Fees", startup: "Low 1% transactional charge", competitorA: "Variable based on gateway + tier costs", competitorB: "High 10% platform fees" },
      { feature: "Marketing Integrations", startup: "Automated social video creation features", competitorA: "Requires manual plugin integration", competitorB: "Basic email marketing scripts" }
    ];
    personas = [
      {
        name: "Jordan Brooks", age: "25", occupation: "Digital Artist", industry: "Creator Economy", income: "$42,000/yr", location: "Portland, OR",
        painPoints: ["Existing platforms take too high a cut of low-price digital brush files.", "Struggles to configure complex tax policies for EU buyers.", "Lacks coding experience to build a portfolio shop."],
        buyingMotivation: ["Wants a store that sets up instantly from his Instagram profile link.", "Demands low fee structures to preserve artist profits.", "Needs secure digital file delivery pipelines."]
      }
    ];
    revenueModels = ["Transaction Take-Rate", "Store Subscription SaaS", "Premium Themes"];
    basePrice = 9;
    userMultiplier = 5.0;
  } else {
    // General SaaS
    tagline = "Structuring tomorrow's productivity tools.";
    defaultTAM = "$180 Billion";
    defaultSAM = "$12 Billion";
    defaultSOM = "$500 Million";
    trends = [
      "Shift towards centralized workspaces to battle app fatigue.",
      "Increasing demand for real-time multiplayer features.",
      "Prioritizing privacy and end-to-end data encryption."
    ];
    signals = [
      "Employees switching between 6+ work applications hourly.",
      "Growth of 'No Code' building configurations inside software.",
      "Enterprise software buying cycles shifting heavily to security reviews."
    ];
    directComps = [
      { name: "ClickUp", website: "clickup.com", description: "Customizable workspace for project management.", funding: "$400M Series C", pricing: "Freemium ($7/mo)" },
      { name: "Notion", website: "notion.so", description: "Connected workspace for wiki, docs, and tasks.", funding: "$300M+ Venture-backed", pricing: "Freemium ($8/mo)" },
      { name: "Linear", website: "linear.app", description: "High-performance software tracker for engineering.", funding: "$13M Series A", pricing: "SaaS ($8/mo)" }
    ];
    indirectComps = ["Physical sticky notes", "Email and Slack chains", "Pen and paper notebooks"];
    bmc = {
      keyPartners: ["Integration catalog directory ecosystems", "Enterprise security compliance platforms", "Strategic consultancies"],
      keyActivities: ["Database optimization & low-latency sync", "Core editor UX detailing", "Marketing & sales lead generation"],
      valueProposition: ["Consolidates tasks, files, and notes into 1 unified screen", "Keyboard shortcuts make navigation 3x faster", "Works offline with automatic background cloud merging"],
      customerRelationships: ["Developer API communities", "Template creator partner payouts", "Direct priority email support"],
      customerSegments: ["Product managers & tech leaders", "Remote team workers", "Independent consultants & agencies"],
      channels: ["Product Hunt & developer launches", "Organic template marketplace shares", "Word-of-mouth professional networks"],
      costStructure: ["Database & WebSocket servers", "Marketing & paid software directories", "Customer success and development staff"],
      revenueStreams: ["SaaS monthly per-user subscriptions", "Enterprise compliance security upsells", "Commercial template creator commissions"]
    };
    comparison = [
      { feature: "Interface Speed", startup: "Sub-100ms key responses", competitorA: "Heavy loader screens", competitorB: "Medium speed, occasional freeze cycles" },
      { feature: "Flexibility", startup: "Completely modular drag block setups", competitorA: "Rigid predefined column grids", competitorB: "Markdown files with basic properties" },
      { feature: "Offline Support", startup: "Local-first SQLite storage sync", competitorA: "Requires internet connection to edit", competitorB: "Limited offline cache availability" }
    ];
    personas = [
      {
        name: "Tyler Cross", age: "30", occupation: "Creative Agency Director", industry: "Professional Services", income: "$110,000/yr", location: "Chicago, IL",
        painPoints: ["Clients complain they can't find tracking links in emails.", "Tired of paying for Slack, Asana, and Google Drive simultaneously.", "Wastes hours preparing client reports."],
        buyingMotivation: ["Wants an all-in-one portal clients can log into.", "To cut agency tool spend in half.", "Desires clean dashboard reports."]
      }
    ];
    revenueModels = ["Subscription SaaS", "Enterprise Security Tier", "White-label Portal Licensing"];
    basePrice = 10;
    userMultiplier = 4.0;
  }

  // Fallback for personas size if less than requested
  if (personas.length < 3) {
    personas.push({
      name: "Hannah Miller", age: "31", occupation: "Independent Consultant", industry: "Professional Services", income: "$85,000/yr", location: "Miami, FL",
      painPoints: ["Managing multiple client communication logs across different platforms.", "Hard to visualize project pipelines and revenue forecasts at once.", "Feels overwhelmed by complex tools."],
      buyingMotivation: ["Wants a simple tool to showcase validation outputs to startup clients.", "Needs automated reports to save manual presentation design time.", "Expected outcomes: professional presentation output in 5 minutes."]
    });
  }

  // Overrides from real Kaggle database
  if (groundingData && groundingData.matchedCompetitors && groundingData.matchedCompetitors.length > 0) {
    directComps = groundingData.matchedCompetitors.map((c) => ({
      name: c.name,
      website: c.website,
      description: c.description,
      funding: `${c.funding} (${c.stage})`,
      pricing: c.pricing
    }));
    
    // Customize comparison features based on real names
    if (directComps.length >= 2) {
      comparison = [
        { feature: "Primary Differentiation", startup: "Our Custom Architecture", competitorA: directComps[0].description.split('.')[0], competitorB: directComps[1].description.split('.')[0] },
        { feature: "Estimated Price Point", startup: `Starts $${basePrice}/mo`, competitorA: directComps[0].pricing, competitorB: directComps[1].pricing },
        { feature: "Capital Support Stage", startup: "Seed Round Ask", competitorA: directComps[0].funding, competitorB: directComps[1].funding }
      ];
    }
  }

  if (groundingData && groundingData.benchmark) {
    const b = groundingData.benchmark;
    defaultTAM = `$${b.tamEstimateBillions} Billion Global Industry`;
    defaultSAM = `$${(b.tamEstimateBillions * 0.08).toFixed(1)} Billion Regional Focus`;
    defaultSOM = `$${(b.tamEstimateBillions * 0.005 * 1000).toFixed(0)} Million Addressable Market`;
    trends = b.trends;
    signals = b.signals;
  }

  // 2. Score calculations (Dynamic based on inputs to feel custom)
  const lenIdea = input.idea.length;
  const lenProblem = input.problem.length;
  
  // Create deterministic-like scores based on the lengths and text metrics
  let marketPotential = Math.min(96, Math.max(68, 70 + (lenIdea % 15) + (category === 'AI' ? 10 : 2)));
  let competitionLevel = Math.min(94, Math.max(45, 55 + (lenProblem % 20) + (category === 'AI' ? 15 : -5)));
  let scalability = Math.min(98, Math.max(60, 65 + ((lenIdea + lenProblem) % 18) + (category === 'AI' ? 12 : -2)));
  let revenuePotential = Math.min(95, Math.max(55, 60 + ((lenIdea * 3) % 22) + (category === 'Fintech' ? 12 : 0)));

  if (groundingData && groundingData.benchmark) {
    const b = groundingData.benchmark;
    const ratio = b.avgLtv / b.avgCac;
    marketPotential = Math.min(98, Math.max(60, Math.round(55 + b.growthRateCagr)));
    competitionLevel = Math.min(94, Math.max(35, Math.round(b.failureRatePercent)));
    scalability = Math.min(98, Math.max(55, Math.round(50 + ratio * 5)));
    revenuePotential = Math.min(96, Math.max(50, Math.round(45 + ratio * 4)));
  }

  const overallViability = Math.round((marketPotential * 0.3) + (scalability * 0.3) + (revenuePotential * 0.2) + ((100 - competitionLevel) * 0.2));

  // Recommendation status
  let recommendation: 'Highly Promising' | 'Promising' | 'Needs Refinement' | 'High Risk' = 'Promising';
  if (overallViability >= 85) recommendation = 'Highly Promising';
  else if (overallViability >= 70) recommendation = 'Promising';
  else if (overallViability >= 50) recommendation = 'Needs Refinement';
  else recommendation = 'High Risk';

  // 3. Projections calculation
  const getProjections = (pricing: number, multiplier: number, modifier: number): RevenueProjection[] => {
    return [
      { year: 1, users: Math.round(1500 * multiplier * modifier), conversionRate: 2.2, revenue: Math.round(1500 * multiplier * modifier * pricing * 12 * 0.022) },
      { year: 3, users: Math.round(8000 * multiplier * modifier), conversionRate: 2.5, revenue: Math.round(8000 * multiplier * modifier * pricing * 1.2 * 12 * 0.025) },
      { year: 5, users: Math.round(35000 * multiplier * modifier), conversionRate: 2.8, revenue: Math.round(35000 * multiplier * modifier * pricing * 1.5 * 12 * 0.028) }
    ];
  };

  const conservative = getProjections(basePrice, userMultiplier, 0.7);
  const realistic = getProjections(basePrice, userMultiplier, 1.0);
  const bestCase = getProjections(basePrice, userMultiplier, 1.6);

  // 4. Risks & Mitigation
  const risks: Risk[] = [
    {
      category: 'Market',
      title: "Slower B2B Adoption",
      description: "Target buyers are accustomed to legacy procedures and have high resistance to shifting workflows.",
      score: Math.round(40 + (lenIdea % 25)),
      mitigation: "Launch a frictionless, self-service free tier and offer white-glove onboarding for early champion users."
    },
    {
      category: 'Product',
      title: "Data Sync Integrity & Reliability",
      description: "Managing live integration pipelines across multiple external vendors and hardware profiles.",
      score: Math.round(30 + (lenProblem % 30)),
      mitigation: "Set up isolated queue workers, cache responses, and implement automatic exponential retry fallbacks."
    },
    {
      category: 'Financial',
      title: "Elevated User Acquisition Costs",
      description: "Competitive keyword advertising makes traditional direct customer acquisition unprofitable.",
      score: Math.round(50 + (overallViability % 20)),
      mitigation: "Build an organic SEO network, leverage developer-focused open-source kits, and incentivize customer invites."
    },
    {
      category: 'Competitive',
      title: "Fast Follow by Capitalized Competitors",
      description: "Established category giants can integrate similar features into their existing software products.",
      score: Math.round(competitionLevel),
      mitigation: "Focus on speed-to-market and build proprietary data loops (e.g. customized fine-tuned layers) that are hard to replicate."
    }
  ];

  // 5. Build Reports
  const report: ValidationReport = {
    executiveSummary: `The proposed startup "${name}" addresses a critical bottleneck within the ${input.industry || 'general'} space. By targeting "${input.targetMarket}" in the "${input.region}" region, it seeks to solve: "${input.problem}". The project demonstrates a viable solution path, scoring an overall viability of ${overallViability}%, driven by robust ${category} scaling dynamics.`,
    marketOpportunity: `With a calculated TAM of ${defaultTAM} and SAM of ${defaultSAM}, the market signals indicate favorable conditions. The industry is shaped by key drivers, notably: "${trends[0]}". The startup's opportunity is backed by search interest and customer pain validation.`,
    competitorAnalysis: `Our intelligence identifies several active direct players, including ${directComps.map(c => c.name).join(', ')}. The primary competitive gaps center around: "${comparison[0].feature}" and custom onboarding frameworks. ${name} will lock in its competitive position via its "${bmc.valueProposition[0]}".`,
    customerInsights: `Target personas (like ${personas[0].name}, Age ${personas[0].age}) have critical pain points centered on: "${personas[0].painPoints[0]}". They demonstrate buying trigger readiness if a solution saves them quantifiable hours or cuts operational expenditure.`,
    businessModel: `The business leverages a ${revenueModels[0]} structure. Key channels include "${bmc.channels[0]}", driving users toward a recurring value proposition. Cost factors will remain dominated by infrastructure fees and developmental staffing.`,
    financialPotential: `Under a realistic trajectory, Year 1 is modeled to produce $${(realistic[0].revenue / 1000).toFixed(0)}k in revenue, expanding to $${(realistic[1].revenue / 1000000).toFixed(1)}M by Year 3, and demonstrating a best-case Year 5 scaling potential of $${(bestCase[2].revenue / 1000000).toFixed(1)}M.`,
    riskAnalysis: `The main risk vector is ${risks.sort((a,b) => b.score - a.score)[0].title} (Score: ${risks[0].score}/100). Mitigation requires targeted implementation of ${risks[0].mitigation}.`,
    recommendation,
    confidenceScore: Math.round(75 + (overallViability % 16))
  };

  // 6. Pitch Deck Configuration
  const pitchDeck: PitchDeckSlide[] = [
    {
      slideNumber: 1,
      title: name,
      subtitle: tagline,
      bullets: [
        `Target Market: ${input.targetMarket}`,
        `Region: ${input.region}`,
        `Industry Sector: ${input.industry || 'Technology'}`
      ]
    },
    {
      slideNumber: 2,
      title: "The Problem",
      subtitle: "Unmet customer frustrations are creating critical operational gaps.",
      bullets: [
        `Core Issue: ${input.problem}`,
        "Customers waste significant time on manual workarounds.",
        "Existing alternative solutions are overly expensive, hard to configure, or rigid.",
        `Primary sufferers: ${personas[0].occupation}s and related teams.`
      ]
    },
    {
      slideNumber: 3,
      title: "The Solution",
      subtitle: `Introducing ${name}`,
      bullets: [
        `Core Value: ${input.idea}`,
        "Automated intelligence eliminates friction and error.",
        `Key differentiator: ${bmc.valueProposition[0]}`,
        `Innovation Assessment: Unique delivery architecture.`
      ]
    },
    {
      slideNumber: 4,
      title: "Market Opportunity",
      subtitle: "Large and expanding target market with emerging growth drivers.",
      bullets: [
        `Total Addressable Market (TAM): ${defaultTAM}`,
        `Serviceable Available Market (SAM): ${defaultSAM}`,
        `Serviceable Obtainable Market (SOM): ${defaultSOM}`,
        `Key Growth Driver: ${trends[0]}`
      ],
      visualData: { TAM: defaultTAM, SAM: defaultSAM, SOM: defaultSOM }
    },
    {
      slideNumber: 5,
      title: "Key Features & Demo",
      subtitle: "How the product provides maximum utility.",
      bullets: [
        `Feature 1: ${bmc.valueProposition[0]}`,
        "Feature 2: Seamless API integration across legacy systems.",
        "Feature 3: Interactive reporting analytics dashboard.",
        "Feature 4: Advanced client-side automation layers."
      ]
    },
    {
      slideNumber: 6,
      title: "Business Model",
      subtitle: "Clear pricing channels and unit economics.",
      bullets: [
        `Primary Monetization: ${revenueModels.join(', ')}`,
        `Customer Acquisition Channel: ${bmc.channels[0]}`,
        `Key Activity: ${bmc.keyActivities[0]}`,
        `Pricing Baseline: Starts at $${basePrice}/month.`
      ]
    },
    {
      slideNumber: 7,
      title: "Competitive Advantage",
      subtitle: `Why ${name} wins in the long term.`,
      bullets: [
        `Core Advantage: ${comparison[0].feature} is built natively.`,
        "Proprietary data flywheels: feedback loops improve recommendations.",
        `Direct Competitors: ${directComps.map(c => c.name).join(', ')}.`,
        `Market Gaps Filled: Solving user pain regarding "${personas[0].painPoints[0]}".`
      ]
    },
    {
      slideNumber: 8,
      title: "Go-To-Market Strategy",
      subtitle: "Phased acquisition strategy to scale traction.",
      bullets: [
        `Phase 1: Target early-adopting ${personas[0].occupation}s in the ${input.region} region.`,
        `Phase 2: Leverage "${bmc.channels[0]}" and content SEO to scale inbound requests.`,
        `Phase 3: Roll out referral benefits and partner integrations with ${bmc.keyPartners[0]}.`
      ]
    },
    {
      slideNumber: 9,
      title: "Financial Projections",
      subtitle: "Five-year revenue forecasts across validation scenarios.",
      bullets: [
        `Year 1 Realistic Revenue: $${(realistic[0].revenue / 1000).toFixed(0)}k (Users: ${realistic[0].users})`,
        `Year 3 Realistic Revenue: $${(realistic[1].revenue / 1000000).toFixed(1)}M (Users: ${realistic[1].users})`,
        `Year 5 Realistic Revenue: $${(realistic[2].revenue / 1000000).toFixed(1)}M (Users: ${realistic[2].users})`,
        `Best-Case Potential: Scaling up to $${(bestCase[2].revenue / 1000000).toFixed(1)}M by Year 5.`
      ],
      visualData: { Year1: realistic[0].revenue, Year3: realistic[1].revenue, Year5: realistic[2].revenue }
    },
    {
      slideNumber: 10,
      title: "Investment & Vision",
      subtitle: "Join us in reshaping the industry.",
      bullets: [
        `Funding Target Ask: $1.2 Million Seed Round`,
        "Capital Allocation: 50% Engineering, 30% Marketing, 20% Operations.",
        `Primary Goal: Scale to 10k active users and achieve $${(realistic[1].revenue / 1000000).toFixed(1)}M ARR in 36 months.`,
        "Vision Statement: To democratize accessibility and intelligence globally."
      ]
    }
  ];

  return {
    startupName: name,
    tagline,
    idea: input.idea,
    industry: input.industry,
    targetMarket: input.targetMarket,
    region: input.region,
    problem: input.problem,
    scores: {
      marketPotential,
      competitionLevel,
      scalability,
      revenuePotential,
      overallViability
    },
    analysis: {
      problemSignificance: `Highly significant. The problem affects substantial operations, causing key friction logs.`,
      targetSufferers: input.targetMarket,
      solutionUniqueness: `Highly unique. By integrating specialized structures, it outperforms the legacy alternatives.`,
      solutionAdvantages: `Reduced operating expenditures, automatic scheduling adjustments, and high client retention rate.`,
      innovationScore: Math.round(75 + (lenIdea % 20))
    },
    marketDemand: {
      tam: defaultTAM,
      sam: defaultSAM,
      som: defaultSOM,
      trends,
      signals,
      demandScore: Math.round((marketPotential + scalability) / 2),
      opportunityScore: Math.round((marketPotential + revenuePotential) / 2)
    },
    competitors: {
      direct: directComps,
      indirect: indirectComps,
      comparison,
      advantage: `Proprietary implementation of ${category === 'AI' ? 'agentic automation chains' : 'intuitive workflow configurations'} custom-fit for ${input.targetMarket}.`,
      weaknesses: `Initial dependencies on external APIs and higher cloud infrastructure scaling requirements.`,
      gaps: `Current competitors are slow to implement custom dynamic integrations, requiring manual client mapping.`,
      differentiation: `Lower pricing tiers coupled with self-service setup pipelines.`
    },
    personas,
    businessModel: bmc,
    financials: {
      revenueModels,
      projections: {
        conservative,
        realistic,
        bestCase
      }
    },
    risks,
    report,
    pitchDeck,
    grounding: groundingData
  };
}
