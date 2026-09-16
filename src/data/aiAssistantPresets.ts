import { SpecializationType } from '../types';

export interface TopicPreset {
  id: string;
  label: string;
}

export interface PromptSuggestionItem {
  topic: string;
  title: string;
  prompt: string;
  tag?: string;
}

export interface SpecializationAssistantConfig {
  specialization: SpecializationType;
  welcomeRoleTitle: string;
  welcomeSubtitle: string;
  welcomeBullets: { label: string; text: string }[];
  defaultFollowups: string[];
  topicPresets: TopicPreset[];
  promptSuggestions: PromptSuggestionItem[];
  inputPlaceholder: string;
  specialistBadge: string;
  quizActionText: string;
  interviewActionText: string;
}

export const SPECIALIZATION_ASSISTANT_CONFIGS: Record<string, SpecializationAssistantConfig> = {
  'Software Engineering & Tech': {
    specialization: 'Software Engineering & Tech',
    welcomeRoleTitle: 'Software Engineering & Systems Architecture Mentor',
    welcomeSubtitle: 'Full Stack Web, Distributed Systems, Cloud Architecture, DevOps & LeetCode Coding Interviews',
    welcomeBullets: [
      { label: 'System Design & Scalability', text: 'Design distributed rate limiters, caching tiers, message brokers, and fault-tolerant microservices.' },
      { label: 'Data Structures & Algorithms', text: 'Master sliding window, graph traversals (BFS/DFS), two-pointers, dynamic programming, and Big-O optimizations.' },
      { label: 'Cloud & Infrastructure', text: 'Architect Docker containers, Kubernetes deployments, AWS/GCP services, and automated CI/CD pipelines.' },
      { label: 'Technical Interview Polish', text: 'Prepare for live coding, system design whiteboards, and behavioral STAR stories for FAANG and top tech firms.' },
    ],
    defaultFollowups: [
      'How would you design a distributed rate limiter in Redis?',
      'Walk me through the Sliding Window coding pattern with a LeetCode example',
      'What are the trade-offs between SQL (Postgres) and NoSQL (DynamoDB)?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Tech Topics' },
      { id: 'system_design', label: 'System Design & Arch' },
      { id: 'dsa', label: 'Data Structures & Algo' },
      { id: 'fullstack', label: 'Full Stack & APIs' },
      { id: 'cloud_devops', label: 'Cloud & DevOps' },
      { id: 'databases', label: 'Databases & Concurrency' },
      { id: 'interview', label: 'Tech Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'system_design',
        title: 'Distributed Rate Limiter Design',
        prompt: 'How would you design a distributed API rate limiter allowing 100 req/min per user across multiple instances using Redis and Lua scripts?',
        tag: 'System Design',
      },
      {
        topic: 'dsa',
        title: 'Sliding Window vs Two Pointers',
        prompt: 'Explain the difference between Dynamic Sliding Window and Two Pointers in array problems with a TypeScript code example.',
        tag: 'Algorithms',
      },
      {
        topic: 'databases',
        title: 'Optimistic vs Pessimistic Locking',
        prompt: 'Explain optimistic locking vs pessimistic locking in high-throughput databases. When should an engineer use each?',
        tag: 'Databases',
      },
      {
        topic: 'fullstack',
        title: 'Idempotent API Design',
        prompt: 'How do you design idempotent payment APIs using idempotency keys, atomic DB transactions, and deduplication caches?',
        tag: 'APIs',
      },
      {
        topic: 'cloud_devops',
        title: 'Kubernetes Pod Lifecycle & Probes',
        prompt: 'Explain Kubernetes liveness, readiness, and startup probes with common failure traps during zero-downtime rolling deployments.',
        tag: 'DevOps',
      },
      {
        topic: 'interview',
        title: 'Answering System Design in 45 Mins',
        prompt: 'Provide a structured 45-minute roadmap for answering a senior software engineer system design interview question.',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about System Design, LeetCode algorithms, Docker, microservices, or SWE interview prep...',
    specialistBadge: 'Full Stack & Distributed Systems',
    quizActionText: 'Take a Software Engineering Quiz →',
    interviewActionText: 'Run a Mock SWE Technical Interview →',
  },

  'AI & Data Science': {
    specialization: 'AI & Data Science',
    welcomeRoleTitle: 'AI & Data Science Research & Applied Engineering Mentor',
    welcomeSubtitle: 'Machine Learning, Deep Learning, Foundation Models, LLM Ops & Statistical Inference',
    welcomeBullets: [
      { label: 'Foundation Models & LLMs', text: 'Understand transformer attention mechanics, fine-tuning (LoRA), RAG architectures, and vector embeddings.' },
      { label: 'Machine Learning Pipelines', text: 'Formulate feature stores, cross-validation, model drift monitoring, and hyperparameter optimization.' },
      { label: 'Data Engineering & MLOps', text: 'Build distributed PySpark pipelines, MLflow experiment tracking, and real-time inference microservices.' },
      { label: 'Statistical Intuition', text: 'Master hypothesis testing, p-values, A/B experimentation power analysis, and Bayesian vs Frequentist approaches.' },
    ],
    defaultFollowups: [
      'How does Multi-Head Self-Attention work mathematically in Transformers?',
      'Explain how to design an enterprise RAG pipeline with hybrid search and reranking',
      'What is the difference between LoRA and full parameter fine-tuning?',
    ],
    topicPresets: [
      { id: 'all', label: 'All AI & Data Topics' },
      { id: 'ml', label: 'Machine Learning' },
      { id: 'deep_learning', label: 'Deep Learning & LLMs' },
      { id: 'rag_agents', label: 'RAG & AI Agents' },
      { id: 'mlops', label: 'MLOps & Data Pipelines' },
      { id: 'statistics', label: 'Applied Statistics & A/B' },
      { id: 'interview', label: 'AI/ML Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'deep_learning',
        title: 'Transformer Multi-Head Attention',
        prompt: 'Explain the mathematical intuition behind Scaled Dot-Product Attention: Q, K, V matrices and why we scale by sqrt(d_k).',
        tag: 'Deep Learning',
      },
      {
        topic: 'rag_agents',
        title: 'Production RAG & Hallucination Defense',
        prompt: 'How do you design an enterprise RAG pipeline that mitigates hallucinations using semantic chunking, hybrid BM25/vector search, and cross-encoder reranking?',
        tag: 'Generative AI',
      },
      {
        topic: 'ml',
        title: 'XGBoost vs Random Forests Mechanics',
        prompt: 'Compare XGBoost gradient boosting with Random Forest bagging in terms of bias-variance trade-off, tree depth, and handling missing data.',
        tag: 'Machine Learning',
      },
      {
        topic: 'statistics',
        title: 'A/B Test Sample Size & Power Calculation',
        prompt: 'Walk me through calculating sample size for an A/B test with 80% statistical power, alpha = 0.05, and minimum detectable effect (MDE).',
        tag: 'Statistics',
      },
      {
        topic: 'mlops',
        title: 'Data & Concept Drift Detection',
        prompt: 'How do you set up automated drift monitoring in production ML using Kolmogorov-Smirnov tests and Population Stability Index (PSI)?',
        tag: 'MLOps',
      },
      {
        topic: 'interview',
        title: 'Machine Learning System Design Interview',
        prompt: 'Walk me through a 40-minute framework for designing a personalized YouTube video recommendation system.',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about Transformers, RAG pipelines, XGBoost, A/B testing, or ML interview questions...',
    specialistBadge: 'Generative AI & Machine Learning',
    quizActionText: 'Take an AI & Data Science Quiz →',
    interviewActionText: 'Run a Mock Machine Learning Interview →',
  },

  'Product Management': {
    specialization: 'Product Management',
    welcomeRoleTitle: 'Product Management & Strategic Leadership Mentor',
    welcomeSubtitle: 'Product Discovery, Frameworks, Backlog Prioritization, Product Analytics & APM Interviews',
    welcomeBullets: [
      { label: 'Product Discovery & Wireframing', text: 'Uncover real customer pain points through user research, empathy mapping, and low-fidelity prototypes.' },
      { label: 'Prioritization & Roadmapping', text: 'Apply RICE, Kano, and MoSCoW frameworks to balance commercial impact against engineering velocity.' },
      { label: 'Metrics & Experimentation', text: 'Define North Star metrics, input metrics, funnel drop-off telemetry, and cohort retention analyses.' },
      { label: 'APM & PM Case Interviews', text: 'Master CIRCLES, product critique, analytical estimations, and executive stakeholder alignment.' },
    ],
    defaultFollowups: [
      'How do you apply the CIRCLES framework to design a product from scratch?',
      'Walk me through a RICE prioritization matrix for 3 conflicting feature requests',
      'How would you diagnose a 25% drop in weekly active users for Spotify?',
    ],
    topicPresets: [
      { id: 'all', label: 'All PM Topics' },
      { id: 'strategy', label: 'Product Strategy & Vision' },
      { id: 'discovery', label: 'User Discovery & Design' },
      { id: 'prioritization', label: 'RICE & Prioritization' },
      { id: 'analytics', label: 'Product Metrics & Cohorts' },
      { id: 'gtm', label: 'Go-To-Market & Pricing' },
      { id: 'interview', label: 'APM / PM Case Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'strategy',
        title: 'CIRCLES Framework Product Design',
        prompt: 'Walk me through designing an autonomous smart grocery shopping cart using the CIRCLES framework step-by-step.',
        tag: 'Product Design',
      },
      {
        topic: 'analytics',
        title: 'Diagnosing Metric Drop-off',
        prompt: 'Instagram Stories engagement suddenly drops 18% week-over-week. Walk me through your root-cause investigation plan.',
        tag: 'Product Analytics',
      },
      {
        topic: 'prioritization',
        title: 'RICE Prioritization Walkthrough',
        prompt: 'Show a worked example of using the RICE framework to prioritize 3 candidate features for a SaaS productivity tool.',
        tag: 'Execution',
      },
      {
        topic: 'gtm',
        title: 'Freemium to Paid Conversion Strategy',
        prompt: 'How would you design monetization paywalls and feature gating to drive freemium self-serve conversion from 2% to 5%?',
        tag: 'Monetization',
      },
      {
        topic: 'discovery',
        title: 'Writing Impactful PRDs & User Stories',
        prompt: 'What are the essential sections of a modern 1-page Product Requirements Document (PRD) that engineers and designers love?',
        tag: 'Execution',
      },
      {
        topic: 'interview',
        title: 'Behavioral: Disagreeing with Engineering Leads',
        prompt: 'How do you answer "Tell me about a time you strongly disagreed with your engineering lead" in an APM interview using STAR?',
        tag: 'Behavioral',
      },
    ],
    inputPlaceholder: 'Ask about CIRCLES framework, RICE scores, North Star metrics, or APM interview questions...',
    specialistBadge: 'Product Strategy & Execution',
    quizActionText: 'Take a Product Management Quiz →',
    interviewActionText: 'Run an APM / PM Case Interview →',
  },

  'UI/UX & Product Design': {
    specialization: 'UI/UX & Product Design',
    welcomeRoleTitle: 'UI/UX & Digital Product Design Mentor',
    welcomeSubtitle: 'Figma Design Systems, User Research, Interaction Design, WCAG Accessibility & Portfolio Critiques',
    welcomeBullets: [
      { label: 'Design Systems & Tokens', text: 'Structure scalable token hierarchies (primitives -> semantics -> components), Auto Layout, and component variants.' },
      { label: 'Human-Centered Research', text: 'Conduct contextual inquiries, usability testing, persona mapping, and empathy-driven customer journeys.' },
      { label: 'Accessibility & WCAG AA/AAA', text: 'Implement color contrast ratios (4.5:1 / 3:1), keyboard navigation tab order, and screen-reader ARIA landmarks.' },
      { label: 'Design Handoff & Portfolio', text: 'Bridge design to code via Storybook, design tokens, and present high-conviction case study stories.' },
    ],
    defaultFollowups: [
      'How do you architect a 3-tier design token system in Figma variables and Tailwind CSS?',
      'Walk me through conducting a fast 5-user usability test for a mobile app checkout flow',
      'What are the core WCAG AA accessibility compliance requirements every designer must know?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Design Topics' },
      { id: 'design_systems', label: 'Design Systems & Tokens' },
      { id: 'user_research', label: 'User Research & Journey' },
      { id: 'ia_wireframes', label: 'Info Arch & Wireframing' },
      { id: 'accessibility', label: 'Accessibility (WCAG)' },
      { id: 'interaction', label: 'Micro-interactions & Motion' },
      { id: 'portfolio', label: 'Portfolio & App Critique' },
    ],
    promptSuggestions: [
      {
        topic: 'design_systems',
        title: '3-Tier Token Architecture in Figma',
        prompt: 'How do you architect a 3-tier design token system (Global Primitives, Semantic Tokens, Component Tokens) in Figma variables for dark-mode switching?',
        tag: 'Design Systems',
      },
      {
        topic: 'accessibility',
        title: 'WCAG AA Compliance Checklist',
        prompt: 'Provide an actionable design audit checklist for WCAG 2.1 AA compliance covering contrast, focus states, tap targets, and screen readers.',
        tag: 'Accessibility',
      },
      {
        topic: 'user_research',
        title: 'Solving Cart Abandonment with UX Research',
        prompt: 'An e-commerce app suffers 60% cart abandonment. Walk me through how you conduct user testing and redesign the checkout experience.',
        tag: 'UX Research',
      },
      {
        topic: 'ia_wireframes',
        title: 'Information Architecture & Mental Models',
        prompt: 'How do you conduct card sorting and tree testing to redesign the navigation architecture of an enterprise SaaS dashboard?',
        tag: 'Information Arch',
      },
      {
        topic: 'interaction',
        title: 'Figma Auto Layout & Responsive Components',
        prompt: 'Explain advanced Figma Auto Layout 5.0 practices: min/max widths, wrapping, absolute positioning, and component slot architecture.',
        tag: 'Figma Skills',
      },
      {
        topic: 'portfolio',
        title: 'How to Structure a Winning UX Case Study',
        prompt: 'How should a product designer structure a portfolio case study to impress hiring managers at Apple, Airbnb, or Stripe?',
        tag: 'Portfolio',
      },
    ],
    inputPlaceholder: 'Ask about Figma design tokens, user research, WCAG accessibility, or UX portfolio prep...',
    specialistBadge: 'Design Systems & Human-Centered UX',
    quizActionText: 'Take a UI/UX Design Quiz →',
    interviewActionText: 'Run a Product Design Whiteboard Interview →',
  },

  'Management Consulting & Strategy': {
    specialization: 'Management Consulting & Strategy',
    welcomeRoleTitle: 'Management Consulting & Corporate Strategy Mentor',
    welcomeSubtitle: 'MECE Frameworks, Issue Trees, Market Entry, Profitability Diagnosis & Case Interviews (MBB)',
    welcomeBullets: [
      { label: 'MECE Problem Structuring', text: 'Break messy, ambiguous business problems into Mutually Exclusive, Collectively Exhaustive issue trees.' },
      { label: 'Market Entry & Sizing', text: 'Calculate top-down and bottom-up market estimates (TAM/SAM/SOM) and formulate go/no-go entry strategies.' },
      { label: 'Profitability Turnarounds', text: 'Diagnose revenue vs cost drivers (price elasticity, product mix, fixed vs variable costs, capacity utilization).' },
      { label: 'Pyramid Principle Communication', text: 'Lead executive steering committee presentations with bottom-line conclusions, action titles, and crisp data charts.' },
    ],
    defaultFollowups: [
      'Walk me through the MECE framework for diagnosing a 15% decline in retail bank profitability',
      'How do you estimate the annual market size for electric two-wheelers in India from scratch?',
      'How does the Minto Pyramid Principle structure an executive board slide deck?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Consulting Topics' },
      { id: 'mece', label: 'MECE Frameworks & Trees' },
      { id: 'market_entry', label: 'Market Entry & Sizing' },
      { id: 'profitability', label: 'Profitability & Turnaround' },
      { id: 'ma_strategy', label: 'M&A & Due Diligence' },
      { id: 'executive_comm', label: 'Pyramid Communication' },
      { id: 'interview', label: 'MBB Case Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'profitability',
        title: 'Profitability Issue Tree Walkthrough',
        prompt: 'A national airline has seen its operating profit drop by 22% despite higher passenger volumes. Construct a comprehensive MECE issue tree to isolate the root cause.',
        tag: 'Profitability',
      },
      {
        topic: 'market_entry',
        title: 'Market Entry: European EV Maker Entering India',
        prompt: 'Structure a complete market entry framework for a European EV automaker evaluating entry into the Indian two-wheeler market within 18 months.',
        tag: 'Market Entry',
      },
      {
        topic: 'market_entry',
        title: 'Market Sizing: Coffee Pods in North America',
        prompt: 'Walk through a structured top-down market sizing estimate for single-serve coffee pods in North America without using external data.',
        tag: 'Market Sizing',
      },
      {
        topic: 'ma_strategy',
        title: 'Commercial Due Diligence in Private Equity',
        prompt: 'What are the 5 core areas a strategy consultant analyzes during a 3-week commercial due diligence (CDD) for a buyout PE firm?',
        tag: 'M&A Strategy',
      },
      {
        topic: 'executive_comm',
        title: 'Minto Pyramid Principle in Slide Decks',
        prompt: 'Explain the Minto Pyramid Principle: SCQA (Situation, Complication, Question, Answer) and how to write effective executive action titles.',
        tag: 'Communication',
      },
      {
        topic: 'interview',
        title: 'Structuring MBB Case Interview Openings',
        prompt: 'How do you deliver a world-class 2-minute opening recap and clarifying questions in a McKinsey/BCG case interview?',
        tag: 'Case Prep',
      },
    ],
    inputPlaceholder: 'Ask about MECE issue trees, market sizing, profitability cases, or MBB interview prep...',
    specialistBadge: 'Strategy Frameworks & MBB Cases',
    quizActionText: 'Take a Management Consulting Quiz →',
    interviewActionText: 'Run a Live MBB Case Interview Simulation →',
  },

  'Finance & FinTech': {
    specialization: 'Finance & FinTech',
    welcomeRoleTitle: 'Corporate Finance, Valuation & Investment Banking Mentor',
    welcomeSubtitle: '3-Statement Financial Modeling, DCF Valuation, LBOs, Excel Modeling & Financial Analyst Interviews',
    welcomeBullets: [
      { label: '3-Statement Flow Mechanics', text: 'Master how revenue, depreciation, working capital, and debt flow through the IS, CFS, and BS.' },
      { label: 'Valuation & DCF Bridges', text: 'Build Unlevered Free Cash Flow projections, calculate WACC, and sensitize Gordon Growth vs Exit Multiples.' },
      { label: 'Excel Modeling Precision', text: 'Apply dynamic arrays, XLOOKUP, INDEX/MATCH, circular debt schedules, and scenario modeling tables.' },
      { label: 'Finance Interview Polish', text: 'Prepare for technical accounting questions, stock pitches, and corporate finance superdays at Goldman Sachs, Morgan Stanley, etc.' },
    ],
    defaultFollowups: [
      'Walk me through the 3 statements if Depreciation increases by $10 (20% tax rate)',
      'How do you calculate WACC step by step, and why do we tax-adjust the cost of debt?',
      'What is the formula for Unlevered Free Cash Flow starting from EBIT?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Finance Topics' },
      { id: 'statements', label: '3-Statement Flow & Accounting' },
      { id: 'valuation', label: 'Valuation & DCF Modeling' },
      { id: 'corp_fin', label: 'Corporate Finance & WACC' },
      { id: 'excel', label: 'Excel & Shortcuts' },
      { id: 'credit_risk', label: 'Credit & Risk Analysis' },
      { id: 'interview', label: 'Finance Technical Interviews' },
    ],
    promptSuggestions: [
      {
        topic: 'statements',
        title: '3-Statement Flow of Depreciation',
        prompt: 'Walk me through the three financial statements if Depreciation increases by $10 with a 20% corporate tax rate.',
        tag: 'Accounting',
      },
      {
        topic: 'valuation',
        title: 'Enterprise Value vs Equity Value',
        prompt: 'Explain the difference between Enterprise Value and Equity Value. Why do we add Debt and subtract Cash?',
        tag: 'Valuation',
      },
      {
        topic: 'corp_fin',
        title: 'WACC & Capital Structure Formula',
        prompt: 'Explain how to calculate WACC step-by-step. What happens to WACC as a company takes on excessive debt?',
        tag: 'Corporate Finance',
      },
      {
        topic: 'valuation',
        title: 'DCF Terminal Value: Gordon vs Exit Multiple',
        prompt: 'How do you calculate Terminal Value in a DCF model using both Gordon Growth and Exit Multiple methods? What are common traps?',
        tag: 'Valuation',
      },
      {
        topic: 'excel',
        title: 'XLOOKUP vs Two-Way INDEX/MATCH',
        prompt: 'Show me the syntax for XLOOKUP vs a two-way dynamic INDEX/MATCH in Excel with practical financial modeling examples.',
        tag: 'Excel',
      },
      {
        topic: 'interview',
        title: 'How to Answer "Why Financial Analyst?"',
        prompt: 'How should a university finance student structure the answer to "Why Financial Analyst?" during a corporate investment banking interview?',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about 3-statement flow, DCF models, WACC, Excel shortcuts, or Wall Street interviews...',
    specialistBadge: 'Corporate Finance & Valuation Modeling',
    quizActionText: 'Take a Finance Practice Quiz →',
    interviewActionText: 'Run a Mock Financial Analyst Interview →',
  },

  'Marketing & Growth': {
    specialization: 'Marketing & Growth',
    welcomeRoleTitle: 'Brand Strategy, Growth Marketing & Consumer Insights Mentor',
    welcomeSubtitle: 'Performance Marketing, Brand Architecture, SEO/SEM, Marketing Analytics & FMCG/D2C Case Studies',
    welcomeBullets: [
      { label: 'Performance & Paid Growth', text: 'Optimize ROAS, CAC, LTV, conversion rate optimization (CRO), and multi-touch attribution models.' },
      { label: 'Brand Strategy & Positioning', text: 'Construct Keller Brand Resonance Pyramids, brand equity dimensions, and distinct value propositions.' },
      { label: 'Consumer Psychology & Research', text: 'Analyze consumer journey maps, sentiment analysis, qualitative focus groups, and conjoint analysis.' },
      { label: 'Marketing Interview Cases', text: 'Formulate GTM launch plans, trade promotion ROI, and FMCG brand turnaround case responses.' },
    ],
    defaultFollowups: [
      'Explain how to calculate Customer Acquisition Cost (CAC) and LTV:CAC ratio benchmarks',
      'Walk me through creating a Brand Positioning Statement using the Keller framework',
      'How do you design a high-converting full-funnel Meta and Google Ads strategy?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Marketing Topics' },
      { id: 'performance', label: 'Performance Ads & ROAS' },
      { id: 'brand', label: 'Brand Strategy & Positioning' },
      { id: 'seo_content', label: 'SEO & Content Funnels' },
      { id: 'consumer', label: 'Consumer Behaviour & Research' },
      { id: 'analytics', label: 'Marketing Analytics & Attribution' },
      { id: 'interview', label: 'Brand & Growth Interviews' },
    ],
    promptSuggestions: [
      {
        topic: 'performance',
        title: 'LTV to CAC Ratio & Payback Period',
        prompt: 'Explain the math behind Customer Lifetime Value (LTV) and CAC Payback Period. What is considered a healthy benchmark for D2C vs B2B SaaS?',
        tag: 'Unit Economics',
      },
      {
        topic: 'brand',
        title: 'Brand Positioning Statement Framework',
        prompt: 'Provide the standard 4-part Brand Positioning formula (Target, Category, Benefit, Reason to Believe) with a real-world Nike or Apple example.',
        tag: 'Branding',
      },
      {
        topic: 'seo_content',
        title: 'SEO Topical Authority & Pillar Clusters',
        prompt: 'How do you build a topical authority cluster in SEO to rank for high-intent competitive keywords?',
        tag: 'SEO',
      },
      {
        topic: 'analytics',
        title: 'Multi-Touch Attribution: First, Last vs Data-Driven',
        prompt: 'Compare First-Click, Last-Click, Linear, and Data-Driven Attribution models in GA4 and explain when each should be used.',
        tag: 'Analytics',
      },
      {
        topic: 'performance',
        title: 'A/B Testing Ad Creatives at Scale',
        prompt: 'How do you structure creative testing on Meta Ads to prevent ad fatigue and isolate the winning hook, body, and CTA variables?',
        tag: 'Paid Growth',
      },
      {
        topic: 'interview',
        title: 'Brand Manager Case: Launching in Tier-2 Cities',
        prompt: 'You are Brand Manager at an FMCG personal care company. How would you design a product launch campaign for Tier-2 and Tier-3 cities in India?',
        tag: 'FMCG Case',
      },
    ],
    inputPlaceholder: 'Ask about ROAS, CAC/LTV, Keller Brand Pyramid, GA4 attribution, or FMCG interview cases...',
    specialistBadge: 'Brand Strategy & Growth Marketing',
    quizActionText: 'Take a Marketing Practice Quiz →',
    interviewActionText: 'Run a Mock Brand Manager Interview →',
  },

  'Business Analytics': {
    specialization: 'Business Analytics',
    welcomeRoleTitle: 'Business Intelligence, SQL & Predictive Analytics Mentor',
    welcomeSubtitle: 'SQL Window Functions, Power BI / DAX, Statistical Hypothesis Testing, Data Modeling & BI Interviews',
    welcomeBullets: [
      { label: 'Advanced SQL & Data Wrangling', text: 'Write window functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG), CTEs, and query performance optimizations.' },
      { label: 'Business Intelligence & Dashboards', text: 'Model star schemas, measure dynamic DAX formulas in Power BI, and design executive KPI dashboards.' },
      { label: 'Statistical Analysis & Inference', text: 'Conduct t-tests, ANOVA, multiple linear regression, and logistic regression with p-value validation.' },
      { label: 'Business Problem Solving', text: 'Translate raw transactional data into actionable executive recommendations that drive revenue and operational efficiency.' },
    ],
    defaultFollowups: [
      'Explain the difference between ROW_NUMBER, RANK, and DENSE_RANK in SQL with examples',
      'How does the CALCULATE function work in DAX with FILTER and ALL modifiers?',
      'How do you test for multicollinearity in multiple regression using VIF?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Analytics Topics' },
      { id: 'sql', label: 'SQL & Window Functions' },
      { id: 'power_bi', label: 'Power BI & DAX Formulas' },
      { id: 'statistics', label: 'Statistics & Hypothesis Testing' },
      { id: 'data_modeling', label: 'Star Schema & Data Modeling' },
      { id: 'kpis', label: 'Executive KPIs & Dashboards' },
      { id: 'interview', label: 'BI Analyst Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'sql',
        title: 'SQL Window Functions: Cumulative Running Total',
        prompt: 'Show the SQL syntax to calculate a running total and month-over-month growth percentage partitioned by product category.',
        tag: 'SQL',
      },
      {
        topic: 'power_bi',
        title: 'DAX Context Transition & CALCULATE',
        prompt: 'Explain how row context transitions into filter context in DAX when using CALCULATE inside an iterator like SUMX.',
        tag: 'Power BI',
      },
      {
        topic: 'data_modeling',
        title: 'Star Schema vs Snowflake Schema',
        prompt: 'Why is Star Schema universally preferred over Snowflake Schema in Power BI in terms of DAX complexity and VertiPaq engine performance?',
        tag: 'Data Modeling',
      },
      {
        topic: 'statistics',
        title: 'Interpreting Regression Coefficients & p-values',
        prompt: 'How do you interpret a multiple regression output: R-squared vs Adjusted R-squared, coefficient p-values, and F-statistic?',
        tag: 'Statistics',
      },
      {
        topic: 'sql',
        title: 'Handling Missing & Duplicate Records in SQL',
        prompt: 'How do you identify and delete duplicate rows in a SQL table without a unique primary key using a CTE and ROW_NUMBER()?',
        tag: 'SQL',
      },
      {
        topic: 'interview',
        title: 'BI Analyst Live SQL Challenge Walkthrough',
        prompt: 'Walk through answering a complex SQL live interview question asking for the top 3 customers by revenue in each region.',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about SQL window functions, DAX formulas, Star Schema, regression, or BI interviews...',
    specialistBadge: 'Business Intelligence & SQL Modeling',
    quizActionText: 'Take a Business Analytics Quiz →',
    interviewActionText: 'Run a Mock BI Analyst Interview →',
  },

  'Human Resources & People Ops': {
    specialization: 'Human Resources & People Ops',
    welcomeRoleTitle: 'Human Resources, People Operations & Talent Strategy Mentor',
    welcomeSubtitle: 'Talent Acquisition, HR Analytics, Competency Frameworks, Total Rewards & HRBP Scenario Cases',
    welcomeBullets: [
      { label: 'Talent Acquisition & Sourcing', text: 'Design Boolean search strings, structured behavioral interview rubrics, and candidate experience loops.' },
      { label: 'HR Analytics & Workforce Planning', text: 'Model employee turnover rates, early attrition predictors, cost-per-hire, and time-to-fill analytics.' },
      { label: 'Total Rewards & Compensation', text: 'Structure salary bands, compa-ratios, ESOP vesting, and annual performance appraisal curves.' },
      { label: 'HRBP Workplace Scenarios', text: 'Navigate difficult employee grievance investigations, labor law compliance, and organizational restructuring.' },
    ],
    defaultFollowups: [
      'How do you calculate Compa-Ratio and use it during annual compensation reviews?',
      'Walk me through handling a high-performer who is toxic to team culture',
      'What are the key metrics in an HR Analytics dashboard for measuring attrition risk?',
    ],
    topicPresets: [
      { id: 'all', label: 'All HR Topics' },
      { id: 'recruitment', label: 'Talent Sourcing & ATS' },
      { id: 'hr_analytics', label: 'HR Analytics & Retention' },
      { id: 'compensation', label: 'Total Rewards & Compa-Ratio' },
      { id: 'performance', label: 'Performance Mgmt & OKRs' },
      { id: 'labor_relations', label: 'Employee Relations & Compliance' },
      { id: 'interview', label: 'HRBP Case Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'compensation',
        title: 'Compa-Ratio & Salary Banding',
        prompt: 'Explain what Compa-Ratio is, how it is calculated, and how an HR manager uses it to resolve pay compression during merit increases.',
        tag: 'Compensation',
      },
      {
        topic: 'labor_relations',
        title: 'Managing a High-Performing Toxic Employee',
        prompt: 'How should an HR Business Partner handle a situation where a top-grossing sales lead is repeatedly bullying junior associates?',
        tag: 'HRBP Scenario',
      },
      {
        topic: 'hr_analytics',
        title: 'Predictive Attrition Modeling in HR',
        prompt: 'What quantitative variables and machine learning techniques can HR teams use to predict voluntary employee attrition 6 months in advance?',
        tag: 'HR Analytics',
      },
      {
        topic: 'recruitment',
        title: 'Designing Structured Behavioral Interviews',
        prompt: 'How do you design a behavioral interview rubric using BARS (Behaviorally Anchored Rating Scales) to eliminate interviewer bias?',
        tag: 'Talent Acquisition',
      },
      {
        topic: 'performance',
        title: 'OKRs vs Traditional Bell Curve Appraisals',
        prompt: 'Compare OKRs with traditional annual bell-curve appraisals. Why are leading tech companies abandoning forced ranking?',
        tag: 'Performance',
      },
      {
        topic: 'interview',
        title: 'HRBP Case: Managing a Company-Wide Layoff',
        prompt: 'Walk me through how an HR leader plans and executes a compassionate, legally compliant workforce reduction (RIF).',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about Compa-Ratios, HR analytics, performance appraisal curves, or HRBP cases...',
    specialistBadge: 'Talent Acquisition & People Operations',
    quizActionText: 'Take an HR & People Ops Quiz →',
    interviewActionText: 'Run a Mock HR Business Partner Interview →',
  },

  'Agri-Business Management': {
    specialization: 'Agri-Business Management',
    welcomeRoleTitle: 'Agri-Business Management, Cold Chain & Rural Strategy Mentor',
    welcomeSubtitle: 'Farm-to-Fork Logistics, Commodity Trading, Priority Sector Lending & Rural Marketing (4As)',
    welcomeBullets: [
      { label: 'Supply Chain & Cold Chain', text: 'Design farm-gate aggregation, pre-cooling protocols, reefer fleet management, and post-harvest loss prevention.' },
      { label: 'Commodity Trading & Warehousing', text: 'Analyze Mandi price discovery, NCDEX futures hedging, WDRA e-NWR warehouse receipts, and MSP dynamics.' },
      { label: 'Rural Marketing & Distribution', text: 'Deploy the 4A framework (Affordability, Availability, Awareness, Acceptability) across rural Haats and village retailer networks.' },
      { label: 'Agri-Finance & Credit', text: 'Model Kisan Credit Card (KCC) limits, Priority Sector Lending (PSL) compliance, and crop insurance actuarial models.' },
    ],
    defaultFollowups: [
      'How does the 4A Rural Marketing framework apply to promoting micro-irrigation systems?',
      'Walk me through hedging agricultural price risk using NCDEX commodity futures',
      'How do you design a fresh produce cold chain to reduce post-harvest losses below 5%?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Agri Topics' },
      { id: 'cold_chain', label: 'Cold Chain & Logistics' },
      { id: 'commodities', label: 'Commodity Markets & Trading' },
      { id: 'rural_mkt', label: 'Rural Marketing (4As)' },
      { id: 'agri_finance', label: 'Agri Credit & PSL Norms' },
      { id: 'food_processing', label: 'Food Processing & Standards' },
      { id: 'interview', label: 'Agribusiness Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'cold_chain',
        title: 'Cutting Perishable Post-Harvest Losses',
        prompt: 'How would you design a farm-to-fork supply chain for fresh vegetables that cuts spoilage losses from 20% down to under 5%?',
        tag: 'Cold Chain',
      },
      {
        topic: 'commodities',
        title: 'Hedging Soybean Prices on Commodity Exchanges',
        prompt: 'A soybean oil refiner expects to buy 1,000 tons of soybeans in 3 months. How do they execute a long hedge on NCDEX to lock in costs?',
        tag: 'Commodities',
      },
      {
        topic: 'rural_mkt',
        title: 'The 4A Rural Marketing Framework',
        prompt: 'Explain the 4A Rural Marketing Framework (Affordability, Availability, Awareness, Acceptability) with a successful rural FMCG or agri-equipment example.',
        tag: 'Rural Marketing',
      },
      {
        topic: 'agri_finance',
        title: 'Priority Sector Lending (PSL) & KCC',
        prompt: 'Explain the RBI Priority Sector Lending (PSL) norms for commercial banks in agriculture, including direct vs indirect lending and KCC scale of finance.',
        tag: 'Agri Finance',
      },
      {
        topic: 'food_processing',
        title: 'HACCP & FSSAI Food Quality Protocols',
        prompt: 'What are the 7 core principles of HACCP food safety certification for an export-oriented mango pulp processing plant?',
        tag: 'Food Processing',
      },
      {
        topic: 'interview',
        title: 'Agri Supply Chain Manager Interview Case',
        prompt: 'How should an applicant answer: "How would you set up a direct farmer procurement model to bypass intermediary traders (Arhtiyas)?"',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about post-harvest cold chains, NCDEX commodity hedging, 4A rural marketing, or agri finance...',
    specialistBadge: 'Agri Supply Chain & Rural Markets',
    quizActionText: 'Take an Agri-Business Practice Quiz →',
    interviewActionText: 'Run a Mock Agri-Business Interview →',
  },

  'Healthcare & Life Sciences': {
    specialization: 'Healthcare & Life Sciences',
    welcomeRoleTitle: 'Hospital Operations, Quality Accreditations & Healthcare Finance Mentor',
    welcomeSubtitle: 'Hospital Bed Turnover, NABH / JCI Standards, Revenue Cycle Management (RCM) & Health Analytics',
    welcomeBullets: [
      { label: 'Hospital Operations & Bed Flow', text: 'Optimize Emergency Department triage, Average Length of Stay (ALOS), OT utilization, and discharge workflows.' },
      { label: 'Quality & Accreditations (NABH/JCI)', text: 'Implement International Patient Safety Goals (IPSG), clinical indicator tracking, and medication error audits.' },
      { label: 'Healthcare Finance & RCM', text: 'Analyze ARPOB (Average Revenue Per Occupied Bed), TPA cashless claim rejection root causes, and medical equipment IRR.' },
      { label: 'Clinical Data & Health Analytics', text: 'Leverage Hospital Information Systems (HIS), Electronic Health Records (EHR), and predictive readmission models.' },
    ],
    defaultFollowups: [
      'How do you calculate ARPOB and what operational levers increase hospital revenue without raising bed prices?',
      'Walk me through resolving persistent Emergency Department overcrowding in a 300-bed hospital',
      'What are the 6 International Patient Safety Goals (IPSG) mandated by JCI and NABH?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Healthcare Topics' },
      { id: 'operations', label: 'Hospital Ops & Bed Flow' },
      { id: 'quality', label: 'NABH / JCI Accreditations' },
      { id: 'rcm_finance', label: 'Healthcare RCM & ARPOB' },
      { id: 'insurance', label: 'TPA & Health Insurance' },
      { id: 'analytics', label: 'Healthcare Data & HIS' },
      { id: 'interview', label: 'Healthcare Admin Interview Prep' },
    ],
    promptSuggestions: [
      {
        topic: 'operations',
        title: 'Solving Emergency Department Overcrowding',
        prompt: 'A 400-bed multispecialty hospital has patient wait times of 4 hours in the ER before admission. Formulate an operational plan to cut boarding time under 60 mins.',
        tag: 'Hospital Ops',
      },
      {
        topic: 'rcm_finance',
        title: 'ARPOB Calculation & Revenue Levers',
        prompt: 'Define Average Revenue Per Occupied Bed (ARPOB). How can hospital management increase ARPOB through clinical procedure mix and OT scheduling?',
        tag: 'Healthcare Finance',
      },
      {
        topic: 'quality',
        title: 'International Patient Safety Goals (IPSG)',
        prompt: 'Detail the 6 International Patient Safety Goals (IPSG) under JCI/NABH standards and how a quality manager audits compliance on nursing floors.',
        tag: 'Quality & Safety',
      },
      {
        topic: 'insurance',
        title: 'Reducing TPA Claim Denials in RCM',
        prompt: 'Explain the primary causes of insurance claim denials in hospital Revenue Cycle Management (RCM) and how clinical documentation improvement (CDI) prevents them.',
        tag: 'TPA & Insurance',
      },
      {
        topic: 'operations',
        title: 'Optimizing Operation Theatre (OT) Turnaround',
        prompt: 'How do you calculate Operation Theatre (OT) utilization rate and reduce wheels-out to wheels-in turnover time between surgeries?',
        tag: 'Hospital Ops',
      },
      {
        topic: 'interview',
        title: 'Hospital Operations Executive Interview Case',
        prompt: 'How do you respond to an interview case asking: "Doctor complaints about nursing shortages are causing delayed morning discharge rounds. How do you resolve this?"',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about hospital bed flow, ARPOB, NABH quality standards, TPA claim denials, or healthcare interviews...',
    specialistBadge: 'Hospital Administration & Clinical Quality',
    quizActionText: 'Take a Healthcare Management Quiz →',
    interviewActionText: 'Run a Mock Hospital Operations Interview →',
  },
  'Supply Chain Management': {
    specialization: 'Supply Chain Management',
    welcomeRoleTitle: 'Supply Chain & Sourcing Mentor',
    welcomeSubtitle: 'Personalized inventory optimization, global logistics, strategic sourcing, and vendor ops mentor.',
    welcomeBullets: [
      {
        label: 'Inventory Optimization & EOQ',
        text: 'Model Economic Order Quantity, safety stock, and service levels to minimize total holding and stockout costs.',
      },
      {
        label: 'Logistics & Multi-Modal Freight',
        text: 'Design resilient hub-and-spoke networks, manage carrier SLAs, and master Incoterms 2020 risk allocation.',
      },
      {
        label: 'Strategic Sourcing & Kraljic Matrix',
        text: 'Segment commodities by profit impact and supply risk, negotiate contracts, and quantify Total Cost of Ownership (TCO).',
      },
      {
        label: 'Vendor Management & S&OP',
        text: 'Dampen the Bullwhip Effect with POS data sharing, Vendor Managed Inventory (VMI), and structured S&OP cycles.',
      },
    ],
    defaultFollowups: [
      'How do I calculate safety stock for variable lead times and demand?',
      'Walk me through the 4 quadrants of the Kraljic Matrix.',
      'What causes the Bullwhip Effect and how do top firms eliminate it?',
      'How would a Supply Chain Analyst answer an inventory spike interview question?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Topics' },
      { id: 'inventory', label: 'Inventory & EOQ' },
      { id: 'logistics', label: 'Logistics & Freight' },
      { id: 'procurement', label: 'Sourcing & Procurement' },
      { id: 'demand', label: 'Demand Planning & S&OP' },
      { id: 'vendor', label: 'Vendor Ops & WMS' },
      { id: 'interviews', label: 'Interviews & Cases' },
    ],
    promptSuggestions: [
      {
        topic: 'inventory',
        title: 'EOQ & Total Holding Cost Formula',
        prompt: 'Explain the Economic Order Quantity (EOQ) formula √((2DS)/H), its underlying assumptions, and how holding cost per unit affects optimal order size.',
        tag: 'Inventory Optimization',
      },
      {
        topic: 'inventory',
        title: 'Safety Stock with Variable Lead Time',
        prompt: 'How do you calculate Safety Stock when both daily demand and supplier lead time are normally distributed variables with standard deviations σd and σL?',
        tag: 'Inventory Modeling',
      },
      {
        topic: 'procurement',
        title: 'Kraljic Matrix Sourcing Strategy',
        prompt: 'Detail how to categorize spend across Strategic, Bottleneck, Leverage, and Non-Critical items in the Kraljic Matrix and the optimal sourcing strategy for each.',
        tag: 'Procurement Strategy',
      },
      {
        topic: 'logistics',
        title: 'Incoterms 2020: FOB vs CIF vs DDP',
        prompt: 'Compare FOB (Free on Board), CIF (Cost, Insurance & Freight), and DDP (Delivered Duty Paid). Where does risk and cost transfer between buyer and seller?',
        tag: 'Global Logistics',
      },
      {
        topic: 'demand',
        title: 'Mitigating the Bullwhip Effect',
        prompt: 'What are the 4 fundamental drivers of the Bullwhip Effect (order batching, price fluctuations, rationing/shortage gaming, demand signal processing) and how does VMI solve them?',
        tag: 'Demand & S&OP',
      },
      {
        topic: 'interviews',
        title: 'Supply Chain Analyst Interview Case',
        prompt: 'Walk me through how a Supply Chain Analyst should structure a case response: "Our on-time in-full (OTIF) delivery dropped from 96% to 81% last quarter. How do you diagnose and rectify this?"',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about EOQ, safety stock, Kraljic matrix, logistics routing, vendor negotiations, or SCM interviews...',
    specialistBadge: 'Supply Chain & Sourcing Mentor',
    quizActionText: 'Take a Supply Chain Management Quiz →',
    interviewActionText: 'Run a Mock Supply Chain Interview →',
  },
  'Operations Management': {
    specialization: 'Operations Management',
    welcomeRoleTitle: 'Operations & Process Optimization Mentor',
    welcomeSubtitle: 'Personalized operations management, Lean Six Sigma, capacity planning, and operational efficiency mentor.',
    welcomeBullets: [
      {
        label: 'Process Flow & Bottleneck Analysis',
        text: 'Map Value Streams (VSM), identify constraint bottlenecks, and calculate line balancing and takt time.',
      },
      {
        label: 'Lean & Six Sigma (DMAIC)',
        text: 'Systematically eliminate the 8 wastes (Muda), calculate process capability (Cp/Cpk), and apply statistical root-cause tools.',
      },
      {
        label: 'Capacity Planning & Little’s Law',
        text: 'Model WIP = Throughput × Flow Time, optimize queuing lines (M/M/s), and design chase vs level production schedules.',
      },
      {
        label: 'Operational KPIs & OEE',
        text: 'Decompose Overall Equipment Effectiveness into Availability, Performance, and Quality to drive zero unplanned downtime.',
      },
    ],
    defaultFollowups: [
      'How does Little\'s Law apply to manufacturing lead times and service desks?',
      'Walk me through the 5 phases of Six Sigma DMAIC with an example.',
      'How do I calculate Overall Equipment Effectiveness (OEE) with real metrics?',
      'How should an Operations Manager resolve a critical production line bottleneck?',
    ],
    topicPresets: [
      { id: 'all', label: 'All Topics' },
      { id: 'bottleneck', label: 'Flow & Bottlenecks' },
      { id: 'sixsigma', label: 'Lean & Six Sigma' },
      { id: 'capacity', label: 'Capacity & Little’s Law' },
      { id: 'quality', label: 'Quality Control & SPC' },
      { id: 'oee', label: 'OEE & Operational KPIs' },
      { id: 'interviews', label: 'Interviews & Cases' },
    ],
    promptSuggestions: [
      {
        topic: 'capacity',
        title: 'Little’s Law & Work-in-Progress (WIP)',
        prompt: 'Explain Little’s Law (L = λW or WIP = Throughput × Cycle Time). How can an Operations Manager reduce customer wait time without adding physical capacity?',
        tag: 'Process Flow',
      },
      {
        topic: 'sixsigma',
        title: 'Six Sigma DMAIC Structured Execution',
        prompt: 'Detail the 5 phases of DMAIC (Define, Measure, Analyze, Improve, Control) and explain key deliverables for each phase in a manufacturing or service setting.',
        tag: 'Lean Six Sigma',
      },
      {
        topic: 'oee',
        title: 'Overall Equipment Effectiveness (OEE) Formula',
        prompt: 'A packaging line has Planned Production Time of 8 hours, 45 minutes of breakdown downtime, operates at 90% of rated speed, and yields 96% good units. Calculate its OEE.',
        tag: 'Operational KPIs',
      },
      {
        topic: 'bottleneck',
        title: 'Theory of Constraints (TOC) 5 Focusing Steps',
        prompt: 'Explain Goldratt’s 5 Focusing Steps (Identify, Exploit, Subordinate, Elevate, Repeat) and the Drum-Buffer-Rope mechanism for production pacing.',
        tag: 'Theory of Constraints',
      },
      {
        topic: 'quality',
        title: 'Process Capability: Cp vs Cpk Index',
        prompt: 'What is the mathematical difference between Cp and Cpk? Why can a process with Cp = 1.6 still produce non-conforming defective parts?',
        tag: 'Quality & SPC',
      },
      {
        topic: 'interviews',
        title: 'Operations Manager Interview Case',
        prompt: 'How should an Operations Manager candidate respond to: "Overtime costs rose 28% while output stayed flat. What is your 30-day diagnosis and operational turnaround plan?"',
        tag: 'Interviews',
      },
    ],
    inputPlaceholder: 'Ask about Little’s Law, DMAIC, OEE, capacity planning, bottleneck analysis, or Operations Manager interviews...',
    specialistBadge: 'Operations & Lean Six Sigma Mentor',
    quizActionText: 'Take an Operations Management Quiz →',
    interviewActionText: 'Run a Mock Operations Manager Interview →',
  },
};

// Aliases
SPECIALIZATION_ASSISTANT_CONFIGS['Finance'] = SPECIALIZATION_ASSISTANT_CONFIGS['Finance & FinTech'];
SPECIALIZATION_ASSISTANT_CONFIGS['Marketing'] = SPECIALIZATION_ASSISTANT_CONFIGS['Marketing & Growth'];
SPECIALIZATION_ASSISTANT_CONFIGS['Human Resources (HR)'] = SPECIALIZATION_ASSISTANT_CONFIGS['Human Resources & People Ops'];
SPECIALIZATION_ASSISTANT_CONFIGS['Healthcare Management'] = SPECIALIZATION_ASSISTANT_CONFIGS['Healthcare & Life Sciences'];
SPECIALIZATION_ASSISTANT_CONFIGS['Supply Chain'] = SPECIALIZATION_ASSISTANT_CONFIGS['Supply Chain Management'];
SPECIALIZATION_ASSISTANT_CONFIGS['Operations'] = SPECIALIZATION_ASSISTANT_CONFIGS['Operations Management'];

export function getAssistantConfigForSpecialization(spec: SpecializationType | string): SpecializationAssistantConfig {
  return SPECIALIZATION_ASSISTANT_CONFIGS[spec] || SPECIALIZATION_ASSISTANT_CONFIGS['Software Engineering & Tech'];
}
