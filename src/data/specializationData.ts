import {
  SpecializationType,
  SkillCategoryData,
  QuizQuestion,
  InterviewQuestionItem,
  CareerPathOption,
  LearningHubModule,
  OpportunityListing,
  FacultyStudentRow,
  StudentProfile,
} from '../types';

export const SPECIALIZATIONS: {
  id: SpecializationType;
  title: string;
  tagline: string;
  badgeColor: string;
  borderActive: string;
  roles: string[];
  subjects: string[];
}[] = [
  {
    id: 'Software Engineering & Tech',
    title: 'Software Engineering & Tech',
    tagline: 'Full Stack, Distributed Systems, Cloud Architecture & DevOps',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    borderActive: 'border-cyan-500 ring-cyan-100',
    roles: [
      'Full Stack Software Engineer',
      'Backend Systems Engineer',
      'Frontend / Web Architect',
      'Cloud & DevOps Engineer',
      'Mobile Application Developer',
    ],
    subjects: [
      'Data Structures & Algorithms',
      'System Design & Microservices',
      'Database Systems & SQL/NoSQL',
      'Full Stack Web Development',
      'Cloud Computing & CI/CD',
      'API Design & Concurrency',
    ],
  },
  {
    id: 'AI & Data Science',
    title: 'AI & Data Science',
    tagline: 'Machine Learning, Deep Learning, Generative AI & Data Pipelines',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
    borderActive: 'border-violet-500 ring-violet-100',
    roles: [
      'Machine Learning Engineer',
      'Data Scientist',
      'AI Applications Developer',
      'Data Platform Engineer',
      'NLP / LLM Research Engineer',
    ],
    subjects: [
      'Machine Learning Fundamentals',
      'Deep Learning & Neural Architectures',
      'Generative AI & LLM Systems',
      'Data Engineering & ETL Pipelines',
      'Applied Statistics & Experimentation',
      'Python for Advanced Data Science',
    ],
  },
  {
    id: 'Product Management',
    title: 'Product Management',
    tagline: 'Product Strategy, UX Research, Agile Execution & Growth Metrics',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    borderActive: 'border-amber-500 ring-amber-100',
    roles: [
      'Associate Product Manager (APM)',
      'Technical Product Manager',
      'Growth Product Manager',
      'Product Operations Lead',
      'Digital Product Strategist',
    ],
    subjects: [
      'Product Strategy & Vision',
      'User Research & Wireframing',
      'Agile / Scrum & Backlog Execution',
      'Product Analytics & North Star Metrics',
      'GTM & Launch Strategy',
      'Monetization & Pricing Models',
    ],
  },
  {
    id: 'UI/UX & Product Design',
    title: 'UI/UX & Product Design',
    tagline: 'Design Systems, User Research, Interaction Design & Prototyping',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
    borderActive: 'border-pink-500 ring-pink-100',
    roles: [
      'Product Designer (UI/UX)',
      'Design Systems Specialist',
      'User Experience Researcher',
      'Interaction Designer',
      'Visual & Brand Experience Designer',
    ],
    subjects: [
      'User Research & Usability Testing',
      'Information Architecture & Wireframes',
      'Figma & Design Systems',
      'Interaction & Motion Design',
      'Design Thinking & Problem Framing',
      'Accessibility & WCAG Standards',
    ],
  },
  {
    id: 'Management Consulting & Strategy',
    title: 'Management Consulting & Strategy',
    tagline: 'Market Entry, Profitability Trees, MECE Problem Solving & M&A',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    borderActive: 'border-slate-500 ring-slate-100',
    roles: [
      'Management Consultant / Associate',
      'Corporate Strategy Analyst',
      'Operations Transformation Lead',
      'M&A and Commercial Due Diligence',
      'Business Strategy Associate',
    ],
    subjects: [
      'Case Interview Frameworks (MECE)',
      'Market Sizing & Estimation',
      'Profitability & Turnaround Strategy',
      'Operations & Supply Optimization',
      'Executive Slide Communication',
      'Competitive Strategy & Moats',
    ],
  },
  {
    id: 'Finance',
    title: 'Finance',
    tagline: 'Corporate Finance, Valuation, Banking & Wealth Management',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderActive: 'border-emerald-500 ring-emerald-100',
    roles: [
      'Financial Analyst (FP&A)',
      'Investment Banking Analyst',
      'Equity Research Associate',
      'Credit & Risk Analyst',
      'Wealth & Portfolio Manager',
    ],
    subjects: [
      'Corporate Finance',
      'Financial Accounting',
      'Excel for Finance',
      'Valuation & DCF',
      'Banking & Credit Analysis',
      'Investment Analysis',
    ],
  },
  {
    id: 'Marketing',
    title: 'Marketing',
    tagline: 'Brand Strategy, Digital Marketing, Consumer Insights & Sales',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    borderActive: 'border-indigo-500 ring-indigo-100',
    roles: [
      'Brand Manager',
      'Digital Marketing Specialist',
      'Product Marketing Associate',
      'Market Research Analyst',
      'Sales & Business Development Lead',
    ],
    subjects: [
      'Marketing Management',
      'Consumer Behaviour',
      'Digital Marketing & SEO/SEM',
      'Brand Management',
      'Market Research & Insights',
      'Sales & Channel Management',
    ],
  },
  {
    id: 'Human Resources (HR)',
    title: 'Human Resources (HR)',
    tagline: 'Talent Acquisition, HR Analytics, Organizational Development & L&D',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    borderActive: 'border-purple-500 ring-purple-100',
    roles: [
      'HR Business Partner (HRBP)',
      'Talent Acquisition Specialist',
      'HR Analytics & Compensation Lead',
      'Learning & Development Executive',
      'Employee Relations Manager',
    ],
    subjects: [
      'Recruitment & Talent Sourcing',
      'HR Analytics & Metrics',
      'Training & Development',
      'Performance Management',
      'Compensation & Total Rewards',
      'Labor Laws & Employee Relations',
    ],
  },
  {
    id: 'Business Analytics',
    title: 'Business Analytics',
    tagline: 'Data Modeling, SQL, Power BI, Statistics & Predictive Intelligence',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    borderActive: 'border-blue-500 ring-blue-100',
    roles: [
      'Business Intelligence Analyst',
      'Data Analytics Consultant',
      'SQL & Power BI Developer',
      'Quantitative Risk Analyst',
      'Operations & Growth Analyst',
    ],
    subjects: [
      'Statistical Methods & Inference',
      'SQL & Relational Databases',
      'Power BI & Tableau Dashboards',
      'Predictive Modeling & Python',
      'Business Problem Solving & Cases',
      'Excel for Advanced Analytics',
    ],
  },
  {
    id: 'Agri-Business Management',
    title: 'Agri-Business Management',
    tagline: 'Agri Supply Chains, Commodity Trading, Rural Marketing & Food Processing',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    borderActive: 'border-amber-500 ring-amber-100',
    roles: [
      'Agri Supply Chain Manager',
      'Commodity Trading Analyst',
      'Rural Marketing Manager',
      'Agri-Finance & Credit Officer',
      'Food Processing Operations Lead',
    ],
    subjects: [
      'Agribusiness Management & Policies',
      'Agricultural Supply Chain & Logistics',
      'Rural Marketing & Consumer Dynamics',
      'Agri-Finance & Microcredit',
      'Commodity Markets & Warehousing',
      'Food Processing & Quality Standards',
    ],
  },
  {
    id: 'Healthcare Management',
    title: 'Healthcare Management',
    tagline: 'Hospital Operations, Quality Accreditations, Health Finance & Analytics',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    borderActive: 'border-rose-500 ring-rose-100',
    roles: [
      'Hospital Operations Executive',
      'Healthcare Quality & NABH Manager',
      'Healthcare Strategy Consultant',
      'Health Insurance & TPA Specialist',
      'Healthcare Analytics Associate',
    ],
    subjects: [
      'Hospital Operations & Administration',
      'Healthcare Quality & Accreditations (NABH/JCI)',
      'Healthcare Finance & Revenue Cycle',
      'Health Insurance & Managed Care',
      'Healthcare Marketing & Patient Experience',
      'Healthcare Analytics & Clinical Data',
    ],
  },
  {
    id: 'Supply Chain Management',
    title: 'Supply Chain Management',
    tagline: 'Inventory Optimization, Logistics, Strategic Procurement & Vendor Management',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    borderActive: 'border-teal-500 ring-teal-100',
    roles: [
      'Supply Chain Analyst',
      'Logistics & Distribution Coordinator',
      'Strategic Sourcing & Procurement Specialist',
      'Inventory Planning Manager',
      'Vendor Operations Manager',
    ],
    subjects: [
      'Inventory Optimization & EOQ Modeling',
      'Global Logistics & Freight Distribution',
      'Strategic Procurement & Vendor Negotiation',
      'Demand Forecasting & S&OP Planning',
      'Warehouse Management Systems (WMS)',
      'Supply Chain Risk & Resilience',
    ],
  },
  {
    id: 'Operations Management',
    title: 'Operations Management',
    tagline: 'Process Optimization, Lean/Six Sigma, Capacity Planning & Operational Efficiency',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderActive: 'border-emerald-500 ring-emerald-100',
    roles: [
      'Operations Manager',
      'Process Improvement Specialist (Lean/Six Sigma)',
      'Capacity Planning & Resource Manager',
      'Operational Efficiency Lead',
      'Continuous Improvement (Kaizen) Lead',
    ],
    subjects: [
      'Process Flow Analysis & Bottleneck Identification',
      'Lean Manufacturing & Six Sigma (DMAIC)',
      'Capacity Planning & Queuing Theory',
      'Total Quality Management (TQM) & Statistical Process Control',
      'Facility Layout & Workflow Design',
      'Operational KPIs & Overall Equipment Effectiveness (OEE)',
    ],
  },
];

export function getDefaultSkillsForSpecialization(specialization: SpecializationType): Record<string, SkillCategoryData> {
  switch (specialization) {
    case 'Software Engineering & Tech':
      return {
        'Data Structures & Algorithms': {
          name: 'Data Structures & Algorithms',
          score: 82,
          benchmark: 85,
          strengths: ['Two-Pointer & Sliding Window', 'Trees & Graph Traversal (BFS/DFS)', 'Hash Table Optimizations'],
          weaknesses: ['Dynamic Programming Memoization vs Tabulation', 'Trie & Segment Trees'],
          subSkills: [
            { name: 'Array, String & Hashing Techniques', score: 90, weight: 0.3 },
            { name: 'Trees, Graphs & Shortest Path', score: 82, weight: 0.25 },
            { name: 'Dynamic Programming & Recursion', score: 70, weight: 0.25 },
            { name: 'Time & Space Big-O Trade-offs', score: 88, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'System Design': {
          name: 'System Design',
          score: 75,
          benchmark: 80,
          strengths: ['API Contract Design (REST/GraphQL)', 'Microservice Boundaries', 'Load Balancers & Reverse Proxies'],
          weaknesses: ['Distributed Consensus (Raft/Paxos)', 'Database Sharding & Consistent Hashing'],
          subSkills: [
            { name: 'Horizontal Scaling & Caching (Redis)', score: 84, weight: 0.25 },
            { name: 'Database Selection (SQL vs NoSQL)', score: 78, weight: 0.25 },
            { name: 'Async Message Queues (Kafka/RabbitMQ)', score: 72, weight: 0.25 },
            { name: 'Distributed Transactions & Sagas', score: 64, weight: 0.25 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Full Stack & Web Architecture': {
          name: 'Full Stack & Web Architecture',
          score: 86,
          benchmark: 85,
          strengths: ['Modern React & State Management', 'Node.js & Express Async Services', 'TypeScript Strict Mode'],
          weaknesses: ['Web Security (CORS, CSRF, XSS mitigation)', 'Browser Critical Rendering Path'],
          subSkills: [
            { name: 'Component Architecture & Hooks', score: 92, weight: 0.3 },
            { name: 'Backend API Engineering', score: 88, weight: 0.3 },
            { name: 'Performance Optimization & Bundling', score: 80, weight: 0.2 },
            { name: 'Authentication (OAuth 2.0 & JWT)', score: 82, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'DevOps & Cloud': {
          name: 'DevOps & Cloud',
          score: 70,
          benchmark: 75,
          strengths: ['Docker Containerization', 'GitHub Actions CI/CD Pipelines'],
          weaknesses: ['Kubernetes Helm Charts & Orchestration', 'Terraform Infrastructure as Code'],
          subSkills: [
            { name: 'Container Workflows (Docker)', score: 80, weight: 0.3 },
            { name: 'Automated CI/CD Testing', score: 75, weight: 0.3 },
            { name: 'Cloud Services (AWS / GCP / Cloud Run)', score: 68, weight: 0.25 },
            { name: 'Monitoring & Telemetry', score: 58, weight: 0.15 },
          ],
          lastAssessedDate: '5 days ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 76,
          benchmark: 85,
          strengths: ['Live Coding Problem Clarification', 'Explaining Big-O Complexities Out Loud'],
          weaknesses: ['Structuring Behavioral STAR stories under pressure', 'System Design Whiteboard Pacing'],
          subSkills: [
            { name: 'Live Coding & Debugging Demeanor', score: 82, weight: 0.35 },
            { name: 'System Design Communication', score: 72, weight: 0.35 },
            { name: 'Behavioral Culture Fit (STAR)', score: 75, weight: 0.3 },
          ],
          lastAssessedDate: '1 day ago',
        },
      };

    case 'AI & Data Science':
      return {
        'Machine Learning': {
          name: 'Machine Learning',
          score: 80,
          benchmark: 85,
          strengths: ['Supervised Algorithms (XGBoost, Random Forests)', 'Feature Engineering & Cross-Validation'],
          weaknesses: ['Model Drift & Concept Drift Monitoring', 'Hyperparameter Bayesian Optimization'],
          subSkills: [
            { name: 'Classification & Regression Models', score: 88, weight: 0.3 },
            { name: 'Feature Selection & Data Cleaning', score: 85, weight: 0.25 },
            { name: 'Evaluation Metrics (ROC-AUC, F1, Precision/Recall)', score: 82, weight: 0.25 },
            { name: 'Model Explainability (SHAP/LIME)', score: 65, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Deep Learning & LLMs': {
          name: 'Deep Learning & LLMs',
          score: 72,
          benchmark: 80,
          strengths: ['Transformer Self-Attention Mechanics', 'PyTorch Tensor Operations', 'Prompt Engineering & Few-Shot'],
          weaknesses: ['RAG Pipeline Vector Index Optimization', 'LoRA & Parameter-Efficient Fine-Tuning'],
          subSkills: [
            { name: 'Neural Network Architectures', score: 78, weight: 0.25 },
            { name: 'PyTorch & Model Training Loops', score: 75, weight: 0.25 },
            { name: 'RAG Architecture & Embeddings', score: 70, weight: 0.25 },
            { name: 'Fine-Tuning & Quantization', score: 62, weight: 0.25 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Data Engineering & SQL': {
          name: 'Data Engineering & SQL',
          score: 84,
          benchmark: 85,
          strengths: ['Complex Window Functions & CTEs', 'Pandas DataFrame Transformations', 'Data Normalization'],
          weaknesses: ['Distributed Spark & PySpark Operations', 'Airflow DAG Orchestration'],
          subSkills: [
            { name: 'Advanced SQL Querying', score: 92, weight: 0.35 },
            { name: 'Pandas & NumPy Data Processing', score: 88, weight: 0.35 },
            { name: 'ETL Pipelines & Data Quality', score: 74, weight: 0.3 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Applied Statistics': {
          name: 'Applied Statistics',
          score: 78,
          benchmark: 80,
          strengths: ['A/B Testing & Hypothesis Testing', 'Confidence Intervals & P-Values', 'Central Limit Theorem'],
          weaknesses: ['Bayesian Inference & Priors', 'Multiple Testing Correction (Bonferroni)'],
          subSkills: [
            { name: 'Hypothesis Testing & Z/T-Tests', score: 85, weight: 0.35 },
            { name: 'Probability Distributions', score: 80, weight: 0.35 },
            { name: 'Experimentation & Power Analysis', score: 70, weight: 0.3 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 74,
          benchmark: 85,
          strengths: ['Explaining Complex Math in Simple Business Terms', 'Code Walkthrough in Python'],
          weaknesses: ['Defending ML Design Choices Under Rigorous Cross-Questioning', 'Project Impact Metrics'],
          subSkills: [
            { name: 'Technical ML Theory Defense', score: 75, weight: 0.4 },
            { name: 'Product Sense & Metric Intuition', score: 72, weight: 0.3 },
            { name: 'Behavioral & Leadership Stories', score: 76, weight: 0.3 },
          ],
          lastAssessedDate: 'Yesterday',
        },
      };

    case 'Product Management':
      return {
        'Product Strategy': {
          name: 'Product Strategy',
          score: 80,
          benchmark: 85,
          strengths: ['Problem Framing & Opportunity Sizing', 'Competitive Moats & Positioning', 'North Star Metric Selection'],
          weaknesses: ['Platform Ecosystem Strategies', 'Pricing & Monetization Architecture'],
          subSkills: [
            { name: 'Vision & Strategic Alignment', score: 84, weight: 0.3 },
            { name: 'Market Sizing & TAM/SAM', score: 82, weight: 0.25 },
            { name: 'Competitive Strategy & Flywheels', score: 78, weight: 0.25 },
            { name: 'Pricing & Unit Economics', score: 72, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Execution & Agile Delivery': {
          name: 'Execution & Agile Delivery',
          score: 86,
          benchmark: 85,
          strengths: ['RICE Backlog Prioritization', 'User Story Writing & Acceptance Criteria', 'Sprint Planning'],
          weaknesses: ['Technical Debt vs Innovation Trade-offs', 'Release Rollback Protocols'],
          subSkills: [
            { name: 'User Stories & PRD Writing', score: 90, weight: 0.35 },
            { name: 'Prioritization Frameworks (RICE/MoSCoW)', score: 88, weight: 0.35 },
            { name: 'Agile/Scrum Ceremonies', score: 80, weight: 0.3 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Product Analytics & Metrics': {
          name: 'Product Analytics & Metrics',
          score: 78,
          benchmark: 85,
          strengths: ['Cohort Retention Curves', 'Conversion Funnel Drop-off Analysis', 'A/B Test Metric Guardrails'],
          weaknesses: ['Statistical Significance in Low-Volume B2B', 'Causal Impact Modeling'],
          subSkills: [
            { name: 'Funnel & Retention Analytics', score: 84, weight: 0.35 },
            { name: 'A/B Testing Hypothesis Formation', score: 78, weight: 0.35 },
            { name: 'Engagement & Churn Profiling', score: 72, weight: 0.3 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'User Research & Design Sense': {
          name: 'User Research & Design Sense',
          score: 82,
          benchmark: 80,
          strengths: ['Customer Discovery Interviews', 'Jobs-To-Be-Done (JTBD) Framework', 'Lo-Fi Wireframing'],
          weaknesses: ['Quantitative Survey Bias Mitigation', 'Accessibility & Edge State User Flows'],
          subSkills: [
            { name: 'User Discovery & Interviews', score: 88, weight: 0.35 },
            { name: 'Wireframing & Flow Mapping', score: 82, weight: 0.35 },
            { name: 'Usability Testing Synthesis', score: 76, weight: 0.3 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 76,
          benchmark: 85,
          strengths: ['Structured Product Design Questions (CIRCLES)', 'Analytical Estimation Logic'],
          weaknesses: ['Technical Trade-offs with Engineering Leads', 'Executive Presentation Polish'],
          subSkills: [
            { name: 'Product Design Cases (CIRCLES)', score: 80, weight: 0.4 },
            { name: 'Product Metrics & Root Cause', score: 75, weight: 0.3 },
            { name: 'Behavioral & Cross-Functional Influence', score: 72, weight: 0.3 },
          ],
          lastAssessedDate: 'Yesterday',
        },
      };

    case 'Finance & FinTech':
    case 'Finance':
      return {
        Accounting: {
          name: 'Accounting',
          score: 78,
          benchmark: 80,
          strengths: ['Three-Statement Linkages', 'Revenue Recognition (ASC 606)', 'Working Capital Mechanics'],
          weaknesses: ['Deferred Tax Assets/Liabilities', 'Stock-Based Compensation Cash Flow Impact'],
          subSkills: [
            { name: 'Income Statement & Operating Margins', score: 86, weight: 0.25 },
            { name: 'Balance Sheet & Capital Structure', score: 80, weight: 0.25 },
            { name: 'Cash Flow Statement Adjustments', score: 75, weight: 0.25 },
            { name: 'Deferred Taxes & Special Items', score: 62, weight: 0.25 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        Excel: {
          name: 'Excel',
          score: 84,
          benchmark: 85,
          strengths: ['XLOOKUP & Dynamic Arrays', 'Sensitivity Data Tables', 'Financial Functions (IRR, XIRR)'],
          weaknesses: ['Power Query ETL pipelines', 'VBA & Automated Macro Debugging'],
          subSkills: [
            { name: 'Core Formulas & Lookups', score: 94, weight: 0.3 },
            { name: 'Financial Logic (IRR, NPV)', score: 88, weight: 0.25 },
            { name: 'Data Tables & Scenarios', score: 80, weight: 0.25 },
            { name: 'Shortcuts & Speed Modelling', score: 70, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Financial Modelling': {
          name: 'Financial Modelling',
          score: 64,
          benchmark: 85,
          strengths: ['Top-Line Revenue Drivers', 'COGS & SG&A Operating Schedules'],
          weaknesses: ['Circular Interest Debt Schedule', 'DCF Terminal Value Sensitivities', 'LBO Balance Sheet'],
          subSkills: [
            { name: 'Historical Period Normalization', score: 78, weight: 0.2 },
            { name: 'Operating Model Projections', score: 72, weight: 0.25 },
            { name: 'Debt & Interest Waterfall Schedule', score: 55, weight: 0.3 },
            { name: 'DCF & WACC Calculation', score: 58, weight: 0.25 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Financial Analysis': {
          name: 'Financial Analysis',
          score: 82,
          benchmark: 80,
          strengths: ['DuPont 3-Way ROE Decomposition', 'Liquidity, Solvency & Coverage Ratios', 'EBITDA Bridge'],
          weaknesses: ['Valuation Multiple Pitfalls', 'WACC Capital Structure Weighting'],
          subSkills: [
            { name: 'Profitability & Efficiency Metrics', score: 88, weight: 0.3 },
            { name: 'Liquidity & Solvency Profiling', score: 85, weight: 0.25 },
            { name: 'Comparable Company Analysis (Comps)', score: 76, weight: 0.25 },
            { name: 'Capital Budgeting (NPV vs IRR)', score: 78, weight: 0.2 },
          ],
          lastAssessedDate: '1 week ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 68,
          benchmark: 85,
          strengths: ['Clear Articulation & Professional Tone', 'Polished "Tell Me About Yourself"'],
          weaknesses: ['Structuring Technical 3-Statement Walkthroughs Under Pressure', 'STAR Method Specificity'],
          subSkills: [
            { name: 'HR & Behavioral Fit (STAR)', score: 76, weight: 0.3 },
            { name: 'Technical Statement Walkthroughs', score: 62, weight: 0.35 },
            { name: 'Situational & Workplace Scenarios', score: 70, weight: 0.2 },
            { name: 'Case-based Brainteasers', score: 60, weight: 0.15 },
          ],
          lastAssessedDate: '2 days ago',
        },
      };

    case 'Marketing & Growth':
    case 'Marketing':
      return {
        'Digital Marketing': {
          name: 'Digital Marketing',
          score: 72,
          benchmark: 85,
          strengths: ['SEO On-Page Optimization', 'Social Media Campaign Planning', 'Google Analytics 4 Basics'],
          weaknesses: ['Programmatic Ad Bidding', 'ROAS Attribution & CAC/LTV Unit Economics'],
          subSkills: [
            { name: 'SEO & Content Marketing', score: 82, weight: 0.25 },
            { name: 'Paid Ads (Meta/Google Ads)', score: 68, weight: 0.3 },
            { name: 'Email & Lifecycle Funnels', score: 75, weight: 0.25 },
            { name: 'Attribution & Performance Metrics', score: 60, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        Branding: {
          name: 'Branding',
          score: 84,
          benchmark: 80,
          strengths: ['Brand Positioning Frameworks (Keller Pyramid)', 'Brand Architecture Strategy', 'Tone of Voice'],
          weaknesses: ['Brand Equity Valuation Metrics', 'Rebranding Risk Management'],
          subSkills: [
            { name: 'Brand Identity & Value Proposition', score: 90, weight: 0.3 },
            { name: 'Positioning Statements & STP', score: 88, weight: 0.3 },
            { name: 'Brand Extension Strategy', score: 78, weight: 0.2 },
            { name: 'Brand Equity Measurement', score: 74, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Consumer Behaviour': {
          name: 'Consumer Behaviour',
          score: 80,
          benchmark: 80,
          strengths: ['Customer Journey Mapping', 'Cognitive Biases in Purchasing', 'Psychographic Segmentation'],
          weaknesses: ['Neuro-marketing application', 'Ethnographic Field Research Synthesis'],
          subSkills: [
            { name: 'Decision-Making Process (AIDA)', score: 86, weight: 0.3 },
            { name: 'Perceptual Mapping & Motivations', score: 82, weight: 0.25 },
            { name: 'Post-Purchase Loyalty & Churn', score: 76, weight: 0.25 },
            { name: 'Cultural Influences & Trends', score: 74, weight: 0.2 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Sales Strategy': {
          name: 'Sales Strategy',
          score: 65,
          benchmark: 85,
          strengths: ['B2B Sales Pipeline Fundamentals', 'Lead Qualification (BANT Framework)'],
          weaknesses: ['Negotiation under Pricing Pressure', 'Channel Partner Margin Economics'],
          subSkills: [
            { name: 'Sales Funnel Management & CRM', score: 72, weight: 0.3 },
            { name: 'B2B Solution Selling & Pitching', score: 68, weight: 0.3 },
            { name: 'Channel Distribution & Trade Margins', score: 58, weight: 0.25 },
            { name: 'Closing & Objection Handling', score: 60, weight: 0.15 },
          ],
          lastAssessedDate: '5 days ago',
        },
        'Market Research': {
          name: 'Market Research',
          score: 75,
          benchmark: 80,
          strengths: ['Survey Questionnaire Design', 'Secondary Industry Reports (Statista/Euromonitor)'],
          weaknesses: ['Conjoint Analysis Interpretation', 'Regression Modeling for Price Elasticity'],
          subSkills: [
            { name: 'Qualitative & Quantitative Design', score: 82, weight: 0.3 },
            { name: 'Sampling Methodology & Bias Avoidance', score: 78, weight: 0.25 },
            { name: 'Data Tabulation & Statistical Tests', score: 68, weight: 0.25 },
            { name: 'Insight Storyboarding & Synthesis', score: 72, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
      };

    case 'Human Resources & People Ops':
    case 'Human Resources (HR)':
      return {
        'Recruitment & Sourcing': {
          name: 'Recruitment & Sourcing',
          score: 82,
          benchmark: 80,
          strengths: ['Boolean Search on LinkedIn', 'Competency-Based Interview Design', 'Candidate Experience Flow'],
          weaknesses: ['Executive Search Headhunting', 'Cost-per-Hire Optimization in Campus Drives'],
          subSkills: [
            { name: 'Job Description & Role Profiling', score: 88, weight: 0.25 },
            { name: 'Sourcing Channels & ATS Systems', score: 84, weight: 0.25 },
            { name: 'Behavioral Assessment Design', score: 80, weight: 0.25 },
            { name: 'Offer Negotiation & Onboarding', score: 74, weight: 0.25 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'HR Analytics': {
          name: 'HR Analytics',
          score: 63,
          benchmark: 85,
          strengths: ['Attrition Rate Calculation', 'Headcount & Turnover Tracking in Excel'],
          weaknesses: ['Predictive Flight-Risk Logistic Regression', 'eNPS Correlation with Productivity'],
          subSkills: [
            { name: 'Core HR Metrics (Time to Fill, Cost/Hire)', score: 76, weight: 0.25 },
            { name: 'Attrition & Turnover Driver Analysis', score: 65, weight: 0.25 },
            { name: 'Workforce Planning & Forecasting', score: 55, weight: 0.25 },
            { name: 'HR Dashboarding & Power BI', score: 54, weight: 0.25 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Training & Development': {
          name: 'Training & Development',
          score: 79,
          benchmark: 80,
          strengths: ['ADDIE Instructional Design Model', 'Kirkpatrick 4-Level Evaluation', 'Needs Assessment (TNA)'],
          weaknesses: ['ROI Calculation for Leadership Programs', 'Micro-learning LMS Implementation'],
          subSkills: [
            { name: 'Training Needs Analysis (TNA)', score: 85, weight: 0.3 },
            { name: 'Program Architecture & Content Design', score: 82, weight: 0.25 },
            { name: 'Kirkpatrick Effectiveness Audits', score: 74, weight: 0.25 },
            { name: 'Executive Coaching & Mentorship', score: 70, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Performance Management': {
          name: 'Performance Management',
          score: 76,
          benchmark: 80,
          strengths: ['OKRs vs KPIs Frameworks', '360-Degree Feedback Surveys', 'Bell-Curve Calibration Mechanics'],
          weaknesses: ['Performance Improvement Plans (PIP) Legal Risk', 'Continuous Coaching Culture'],
          subSkills: [
            { name: 'Goal Setting (OKRs / Balance Scorecard)', score: 82, weight: 0.3 },
            { name: 'Appraisal Reviews & Rating Bias Avoidance', score: 78, weight: 0.25 },
            { name: 'Bell Curve & Talent Review Calibration', score: 72, weight: 0.25 },
            { name: 'High-Potential (HiPo) 9-Box Grid', score: 70, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Employee Relations': {
          name: 'Employee Relations',
          score: 71,
          benchmark: 80,
          strengths: ['Workplace POSH Compliance', 'Disciplinary Hearings Process', 'Code of Conduct Formulation'],
          weaknesses: ['Industrial Disputes Act Case Laws', 'Collective Bargaining with Trade Unions'],
          subSkills: [
            { name: 'Labor Laws & Statutory Compliance', score: 68, weight: 0.3 },
            { name: 'Grievance Redressal & Investigations', score: 78, weight: 0.3 },
            { name: 'Employee Engagement (Q12 Gallup)', score: 75, weight: 0.2 },
            { name: 'Union Relations & Wage Negotiations', score: 60, weight: 0.2 },
          ],
          lastAssessedDate: '5 days ago',
        },
      };

    case 'Business Analytics':
      return {
        'Excel & Modelling': {
          name: 'Excel & Modelling',
          score: 86,
          benchmark: 85,
          strengths: ['Power Query ETL', 'Dynamic Arrays & INDEX/MATCH', 'Pivot Tables & Slicers'],
          weaknesses: ['VBA User Defined Functions', 'Monte Carlo Simulation Add-ins'],
          subSkills: [
            { name: 'Data Cleaning & Transformation', score: 92, weight: 0.3 },
            { name: 'Advanced Lookup & Array Formulas', score: 88, weight: 0.3 },
            { name: 'Scenario Manager & Solver Optimization', score: 82, weight: 0.2 },
            { name: 'Automated Macros & Speed Shortcuts', score: 78, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Statistics & Probability': {
          name: 'Statistics & Probability',
          score: 74,
          benchmark: 85,
          strengths: ['Hypothesis Testing (t-tests, ANOVA, Chi-Square)', 'Normal Distribution & Confidence Intervals'],
          weaknesses: ['Multicollinearity in Multiple Regression (VIF)', 'Time Series ARIMA Decomposition'],
          subSkills: [
            { name: 'Descriptive & Inferential Stats', score: 84, weight: 0.3 },
            { name: 'Hypothesis Testing & p-value Rigor', score: 76, weight: 0.3 },
            { name: 'Linear & Logistic Regression', score: 68, weight: 0.25 },
            { name: 'Time Series & Forecasting', score: 64, weight: 0.15 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'SQL & Databases': {
          name: 'SQL & Databases',
          score: 68,
          benchmark: 85,
          strengths: ['INNER/LEFT JOIN Queries', 'GROUP BY & HAVING Aggregations', 'Subqueries in WHERE Clause'],
          weaknesses: ['Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG)', 'Database Indexing & Query Tuning'],
          subSkills: [
            { name: 'Basic & Multi-Table Joins', score: 80, weight: 0.3 },
            { name: 'Aggregations & Groupings', score: 78, weight: 0.25 },
            { name: 'Window Functions & CTEs', score: 58, weight: 0.25 },
            { name: 'Schema Design & Normalization', score: 55, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Power BI & Dashboards': {
          name: 'Power BI & Dashboards',
          score: 78,
          benchmark: 85,
          strengths: ['Data Modeling (Star Schema)', 'Card, Bar & Trend Visual Design', 'Interactive Slicers'],
          weaknesses: ['Advanced DAX (CALCULATE with FILTER/ALL)', 'Row-Level Security (RLS) Setup'],
          subSkills: [
            { name: 'Visual Layout & UX for Executives', score: 86, weight: 0.3 },
            { name: 'Data Modeling & Relationship Keys', score: 80, weight: 0.25 },
            { name: 'DAX Measures & Time Intelligence', score: 68, weight: 0.3 },
            { name: 'Service Publishing & Gateway Refreshes', score: 75, weight: 0.15 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Data Interpretation': {
          name: 'Data Interpretation',
          score: 82,
          benchmark: 80,
          strengths: ['Translating Insights to Business Actions', 'A/B Testing Metric Selection', 'Executive Storytelling'],
          weaknesses: ['Root-cause 5-Whys in noisy operational datasets', 'Unit Economics LTV/CAC sensitivity'],
          subSkills: [
            { name: 'Business Acumen & Context Framing', score: 86, weight: 0.3 },
            { name: 'A/B Test Design & Experimentation', score: 80, weight: 0.25 },
            { name: 'Insight Communication to Non-Tech', score: 84, weight: 0.25 },
            { name: 'Metric Tree Decomposition', score: 76, weight: 0.2 },
          ],
          lastAssessedDate: '5 days ago',
        },
      };

    case 'Agri-Business Management':
      return {
        'Agribusiness Management': {
          name: 'Agribusiness Management',
          score: 80,
          benchmark: 80,
          strengths: ['Agricultural Input Industry Structure (Seeds, Fertilizers, Ag-chem)', 'Farm Gate Price Drivers'],
          weaknesses: ['Farm Machinery Rental Co-op Economics', 'Crop Insurance (PMFBY) Actuarial Mechanics'],
          subSkills: [
            { name: 'Agricultural Sector Structure & Policy', score: 85, weight: 0.3 },
            { name: 'Input Marketing (Fertilizer/Seed dealers)', score: 82, weight: 0.3 },
            { name: 'Farm Economics & Cost of Cultivation', score: 76, weight: 0.25 },
            { name: 'FPO (Farmer Producer Org) Governance', score: 74, weight: 0.15 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Agricultural Marketing': {
          name: 'Agricultural Marketing',
          score: 75,
          benchmark: 80,
          strengths: ['APMC Mandi Functioning & Regulations', 'e-NAM (National Agriculture Market) Portal'],
          weaknesses: ['Commodity Futures Hedging on NCDEX', 'Traceability Certifications (GlobalGAP)'],
          subSkills: [
            { name: 'Mandi Trade & Intermediary Margins', score: 80, weight: 0.3 },
            { name: 'Electronic Spot Markets & e-NAM', score: 78, weight: 0.25 },
            { name: 'Price Discovery & Seasonal Volatility', score: 72, weight: 0.25 },
            { name: 'Grading, Sorting & Export Packaging', score: 68, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Agri Supply Chain': {
          name: 'Agri Supply Chain',
          score: 67,
          benchmark: 85,
          strengths: ['Cold Chain Basics & Reefer Van Flow', 'Post-Harvest Loss Mitigation Principles'],
          weaknesses: ['Hub-and-Spoke Fresh Produce Distribution', 'Warehouse Receipt Financing (WDRA Rules)'],
          subSkills: [
            { name: 'Post-Harvest Loss Reduction', score: 76, weight: 0.25 },
            { name: 'Cold Chain Infrastructure & Temperature', score: 72, weight: 0.25 },
            { name: 'Procurement Logistics from Farm Gate', score: 62, weight: 0.25 },
            { name: 'Warehouse Receipts & Collateral Management', score: 56, weight: 0.25 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Agri-Finance & Credit': {
          name: 'Agri-Finance & Credit',
          score: 72,
          benchmark: 80,
          strengths: ['Kisan Credit Card (KCC) Scheme Rules', 'Priority Sector Lending (PSL) Bank Mandates'],
          weaknesses: ['Crop Loan Default Scoring Models', 'Micro-finance SHG Lending Delinquency Controls'],
          subSkills: [
            { name: 'PSL Norms & Rural Banking Credit', score: 82, weight: 0.3 },
            { name: 'KCC Assessment & Scale of Finance', score: 78, weight: 0.25 },
            { name: 'Agri NPA Recovery & Restructuring', score: 64, weight: 0.25 },
            { name: 'Venture Capital in Agri-Tech Startups', score: 60, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Rural Marketing': {
          name: 'Rural Marketing',
          score: 82,
          benchmark: 80,
          strengths: ['Rural Consumer 4As (Affordability, Availability, Awareness, Acceptability)', 'Haat & Mela Activations'],
          weaknesses: ['Village Influencer & Digital WhatsApp Funnels', 'Last-Mile Kirana Store Credit Economics'],
          subSkills: [
            { name: 'The 4A Rural Framework Strategy', score: 88, weight: 0.3 },
            { name: 'Distribution to Tier-4 & Villages', score: 84, weight: 0.3 },
            { name: 'Rural Brand Messaging & Vernacular Ads', score: 78, weight: 0.2 },
            { name: 'BTL Activations & Agro-Clinics', score: 75, weight: 0.2 },
          ],
          lastAssessedDate: '5 days ago',
        },
      };

    case 'Healthcare & Life Sciences':
    case 'Healthcare Management':
      return {
        'Healthcare Operations': {
          name: 'Healthcare Operations',
          score: 78,
          benchmark: 80,
          strengths: ['Patient Journey & OPD Queue Flow', 'Emergency Department Triage Systems', 'OT Utilization Rates'],
          weaknesses: ['Hospital Bed Turnaround Lean Six Sigma', 'Sterilization (CSSD) Workflow Bottlenecks'],
          subSkills: [
            { name: 'Inpatient & Outpatient Flow Management', score: 84, weight: 0.3 },
            { name: 'Bed Occupancy & ALOS Optimization', score: 80, weight: 0.25 },
            { name: 'Operation Theatre (OT) Scheduling', score: 74, weight: 0.25 },
            { name: 'CSSD & Biomedical Waste Protocols', score: 72, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Healthcare Quality & NABH': {
          name: 'Healthcare Quality & NABH',
          score: 66,
          benchmark: 85,
          strengths: ['Patient Safety Goals (IPSG)', 'Hand Hygiene Audit Standards (WHO Guidelines)'],
          weaknesses: ['NABH 5th Edition Chapter-wise Audits', 'Sentinel Event Root Cause Analysis (RCA)'],
          subSkills: [
            { name: 'International Patient Safety Goals', score: 78, weight: 0.25 },
            { name: 'NABH Accreditation Documentation', score: 62, weight: 0.3 },
            { name: 'Infection Control Surveillance (HAI)', score: 68, weight: 0.25 },
            { name: 'Root Cause Analysis & Incident Reporting', score: 56, weight: 0.2 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Healthcare Finance': {
          name: 'Healthcare Finance',
          score: 74,
          benchmark: 80,
          strengths: ['Average Revenue Per Occupied Bed (ARPOB)', 'Cost Center vs Profit Center in Hospitals'],
          weaknesses: ['Capitation Risk in Managed Care Plans', 'Medical Equipment Capex Payback (MRI/CT Scanners)'],
          subSkills: [
            { name: 'ARPOB & Hospital Unit Economics', score: 82, weight: 0.3 },
            { name: 'Pharmacy & Consumable Margin Control', score: 76, weight: 0.25 },
            { name: 'Revenue Cycle Management (RCM)', score: 70, weight: 0.25 },
            { name: 'Equipment Payback & IRR in Hospitals', score: 66, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Health Insurance & TPA': {
          name: 'Health Insurance & TPA',
          score: 72,
          benchmark: 80,
          strengths: ['Cashless Hospitalization Approval Flow', 'Pre-authorization & Query Resolution Mechanics'],
          weaknesses: ['Fraud Waste & Abuse (FWA) Claim Audits', 'Ayushman Bharat (PM-JAY) Package Reconciliation'],
          subSkills: [
            { name: 'TPA Desk & Cashless Claim Workflows', score: 80, weight: 0.3 },
            { name: 'Underwriting & Exclusions Understanding', score: 74, weight: 0.25 },
            { name: 'Government Health Schemes (PM-JAY)', score: 68, weight: 0.25 },
            { name: 'Claim Rejection & Dispute Resolution', score: 64, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Healthcare Analytics': {
          name: 'Healthcare Analytics',
          score: 70,
          benchmark: 80,
          strengths: ['HIS (Hospital Information System) Reports', 'Clinical KPI Tracking (30-Day Readmissions)'],
          weaknesses: ['Electronic Health Records (EHR) HL7 Interoperability', 'Predictive ICU Bed Demand Models'],
          subSkills: [
            { name: 'HIS & EHR Data Extraction', score: 78, weight: 0.3 },
            { name: 'Clinical Quality Indicator Dashboards', score: 72, weight: 0.25 },
            { name: 'Patient Satisfaction (CSAT/NPS) Analytics', score: 74, weight: 0.25 },
            { name: 'Epidemiological & Census Profiling', score: 56, weight: 0.2 },
          ],
          lastAssessedDate: '5 days ago',
        },
      };

    case 'Supply Chain Management':
      return {
        'Inventory Optimization & EOQ': {
          name: 'Inventory Optimization & EOQ',
          score: 80,
          benchmark: 82,
          strengths: ['Economic Order Quantity (EOQ) Modeling', 'Safety Stock Calculations', 'ABC-XYZ Inventory Stratification'],
          weaknesses: ['Multi-Echelon Inventory Optimization (MEIO)', 'Perishable Stock Aging Curves'],
          subSkills: [
            { name: 'EOQ & Holding vs Ordering Cost Balance', score: 84, weight: 0.3 },
            { name: 'Safety Stock & Service Level Modeling (Z-score)', score: 80, weight: 0.25 },
            { name: 'ABC-XYZ SKU Stratification & Lead Time Buffer', score: 82, weight: 0.25 },
            { name: 'Days Sales of Inventory (DSI) & Turns', score: 74, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Logistics & Multi-Modal Freight': {
          name: 'Logistics & Multi-Modal Freight',
          score: 75,
          benchmark: 80,
          strengths: ['Multi-Modal Freight Cost Modeling', 'Incoterms 2020 Risk Allocation', 'Carrier SLA Monitoring'],
          weaknesses: ['Reverse Logistics Network Cost Minimization', 'Fleet Telematics Real-Time Re-Routing'],
          subSkills: [
            { name: 'Freight Rate Benchmarking & Carrier SLAs', score: 80, weight: 0.3 },
            { name: 'Hub-and-Spoke Distribution Network Design', score: 76, weight: 0.25 },
            { name: 'Incoterms 2020 (FOB, CIF, DDP) Risk Transfers', score: 78, weight: 0.25 },
            { name: 'Cross-Docking & Transit Consolidation', score: 66, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Strategic Sourcing & Procurement': {
          name: 'Strategic Sourcing & Procurement',
          score: 74,
          benchmark: 85,
          strengths: ['Total Cost of Ownership (TCO) Analysis', 'RFP / RFQ Scoring Matrices', 'Vendor Payment Terms Negotiation'],
          weaknesses: ['Kraljic Matrix Sourcing Strategy', 'Commodity Price Index Hedging Contracts'],
          subSkills: [
            { name: 'Total Cost of Ownership (TCO) Calculations', score: 80, weight: 0.3 },
            { name: 'Kraljic Matrix Spend Segmentation', score: 72, weight: 0.25 },
            { name: 'Supplier Scorecards & On-Time In-Full (OTIF)', score: 76, weight: 0.25 },
            { name: 'Contract Commercial Clauses & SLA Penalties', score: 68, weight: 0.2 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Demand Planning & S&OP': {
          name: 'Demand Planning & S&OP',
          score: 77,
          benchmark: 82,
          strengths: ['Monthly S&OP Consensus Cadence', 'MAPE & Tracking Signal Calculation', 'Historical Moving Average Models'],
          weaknesses: ['Bullwhip Effect Damping Algorithms', 'Promotional Uplift Decomposition'],
          subSkills: [
            { name: 'S&OP Cross-Functional Consensus Meeting Prep', score: 82, weight: 0.3 },
            { name: 'Forecast Error Metrics (MAPE, WAPE, Bias)', score: 80, weight: 0.25 },
            { name: 'Bullwhip Effect Analysis & Order Smoothing', score: 74, weight: 0.25 },
            { name: 'Vendor Managed Inventory (VMI) Collaboration', score: 72, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Warehouse Operations & WMS': {
          name: 'Warehouse Operations & WMS',
          score: 78,
          benchmark: 80,
          strengths: ['Pick-Pack-Ship Throughput & Wave Planning', 'Slotting Optimization by Velocity', 'Warehouse Safety Standards (OSHA)'],
          weaknesses: ['Automated Storage and Retrieval Systems (AS/RS) Capex', 'Dock Scheduling Turnaround Bottlenecks'],
          subSkills: [
            { name: 'Velocity-Based Warehouse Slotting', score: 82, weight: 0.3 },
            { name: 'Order Picking Routes (Batch, Zone, Wave)', score: 80, weight: 0.25 },
            { name: 'Warehouse Management System (WMS) Integrations', score: 76, weight: 0.25 },
            { name: 'Cycle Counting & Inventory Accuracy (IR)', score: 74, weight: 0.2 },
          ],
          lastAssessedDate: '5 days ago',
        },
      };

    case 'Operations Management':
      return {
        'Process Flow & Bottleneck Analysis': {
          name: 'Process Flow & Bottleneck Analysis',
          score: 82,
          benchmark: 85,
          strengths: ['Value Stream Mapping (VSM Current vs Future)', 'Theory of Constraints (TOC)', "Little's Law Calculations"],
          weaknesses: ['Stochastic Line Balancing with Variable Failure Rates', 'Multi-Server Markovian Queuing (M/M/c) Models'],
          subSkills: [
            { name: 'Value Stream Mapping & Waste Identification', score: 86, weight: 0.3 },
            { name: 'Theory of Constraints & Drum-Buffer-Rope', score: 84, weight: 0.25 },
            { name: 'Little’s Law (WIP = Throughput × Flow Time)', score: 82, weight: 0.25 },
            { name: 'Line Balancing & Takt Time Synchronization', score: 76, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Lean & Six Sigma (DMAIC)': {
          name: 'Lean & Six Sigma (DMAIC)',
          score: 78,
          benchmark: 85,
          strengths: ['DMAIC 5-Phase Project Charter', '5S Workplace Organization', 'Ishikawa Fishbone & 5 Whys Root Cause Analysis'],
          weaknesses: ['Process Capability Indices (Cp, Cpk)', 'Design of Experiments (DOE) Factorial Screening'],
          subSkills: [
            { name: 'DMAIC Project Structuring & Problem Statements', score: 84, weight: 0.3 },
            { name: '8 Wastes of Lean (DOWNTIME / Muda)', score: 82, weight: 0.25 },
            { name: 'Process Capability Indices (Cp, Cpk)', score: 74, weight: 0.25 },
            { name: 'Kaizen Event Leadership & Gemba Walks', score: 72, weight: 0.2 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Capacity Planning & Queuing': {
          name: 'Capacity Planning & Queuing',
          score: 79,
          benchmark: 80,
          strengths: ['Design vs Effective Capacity Calculations', 'Overtime vs Subcontracting Trade-off Models', 'Erlang C Waiting Line Estimations'],
          weaknesses: ['Aggregate Production Planning (Chase vs Level Strategy)', 'Monte Carlo Simulation for Peak Load Surges'],
          subSkills: [
            { name: 'Effective Capacity & Equipment Utilization Rate', score: 85, weight: 0.3 },
            { name: 'Chase vs Level Aggregate Planning Strategies', score: 80, weight: 0.25 },
            { name: 'Queuing Models (M/M/1 & M/M/s Waiting Times)', score: 76, weight: 0.25 },
            { name: 'Capacity Cushion & Bottleneck Buffer Design', score: 75, weight: 0.2 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Quality Control & SPC': {
          name: 'Quality Control & SPC',
          score: 75,
          benchmark: 82,
          strengths: ['Control Charts (X-bar and R Charts)', 'Pareto Analysis (80/20 Rule)', 'Acceptance Sampling Plans (AQL)'],
          weaknesses: ['Measurement System Analysis (Gage R&R)', 'Failure Mode and Effects Analysis (FMEA) RPN Scoring'],
          subSkills: [
            { name: 'Statistical Process Control (SPC) X-bar & R Charts', score: 80, weight: 0.3 },
            { name: 'Failure Mode and Effects Analysis (FMEA & RPN)', score: 74, weight: 0.25 },
            { name: 'Pareto Defect Stratification', score: 78, weight: 0.25 },
            { name: 'Gage R&R Repeatability & Reproducibility', score: 68, weight: 0.2 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Operational KPIs & OEE': {
          name: 'Operational KPIs & OEE',
          score: 81,
          benchmark: 85,
          strengths: ['Overall Equipment Effectiveness (Availability × Performance × Quality)', 'First Pass Yield (FPY)', 'Labor Productivity & Cost per Unit'],
          weaknesses: ['Predictive Maintenance (PdM) Sensor ROI', 'Cost of Poor Quality (COPQ) Pareto Quantifications'],
          subSkills: [
            { name: 'OEE Calculation (Availability × Performance × Quality)', score: 86, weight: 0.3 },
            { name: 'First Pass Yield & Rolled Throughput Yield (RTY)', score: 82, weight: 0.25 },
            { name: 'Standard Operating Procedure (SOP) Deployment', score: 80, weight: 0.25 },
            { name: 'Cost of Poor Quality (Internal vs External Failure)', score: 76, weight: 0.2 },
          ],
          lastAssessedDate: 'Yesterday',
        },
      };

    case 'UI/UX & Product Design':
      return {
        'Design Systems & Figma': {
          name: 'Design Systems & Figma',
          score: 85,
          benchmark: 85,
          strengths: ['Auto Layout & Components', 'Design Tokens & Variables', 'Responsive Grid Layouts'],
          weaknesses: ['Complex Component Variant Logic', 'Figma Plugin Development'],
          subSkills: [
            { name: 'Component Architecture & Variants', score: 90, weight: 0.35 },
            { name: 'Token Structure & Sync', score: 85, weight: 0.35 },
            { name: 'Documentation & Style Guides', score: 80, weight: 0.3 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'User Research & Usability': {
          name: 'User Research & Usability',
          score: 80,
          benchmark: 80,
          strengths: ['Moderated Usability Testing', 'Affinity Mapping & Synthesis', 'Persona Development'],
          weaknesses: ['Unmoderated Quantitative Tree Testing', 'Statistical Usability Metrics (SUS)'],
          subSkills: [
            { name: 'Qualitative Interviewing', score: 88, weight: 0.35 },
            { name: 'Usability Test Scripting', score: 82, weight: 0.35 },
            { name: 'Synthesis & Insights Reporting', score: 72, weight: 0.3 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Interaction & Visual Design': {
          name: 'Interaction & Visual Design',
          score: 82,
          benchmark: 80,
          strengths: ['Visual Hierarchy & Typography Scales', 'Micro-interactions & State Feedback'],
          weaknesses: ['Advanced Motion Curves & Timing', 'Color Accessibility for Data Vis'],
          subSkills: [
            { name: 'Typography & Spatial Layout', score: 88, weight: 0.35 },
            { name: 'Motion & Micro-interactions', score: 76, weight: 0.35 },
            { name: 'Accessibility (WCAG 2.1 AA)', score: 82, weight: 0.3 },
          ],
          lastAssessedDate: '4 days ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 75,
          benchmark: 85,
          strengths: ['Portfolio Walkthrough Narrative', 'Explaining Product Rationale'],
          weaknesses: ['App Critique Under Time Pressure', 'Design Whiteboard Challenge Frameworks'],
          subSkills: [
            { name: 'Portfolio Storytelling', score: 82, weight: 0.4 },
            { name: 'Whiteboard Exercise Execution', score: 68, weight: 0.3 },
            { name: 'Cross-functional Collaboration Fit', score: 75, weight: 0.3 },
          ],
          lastAssessedDate: '2 days ago',
        },
      };

    case 'Management Consulting & Strategy':
      return {
        'Case Problem Solving': {
          name: 'Case Problem Solving',
          score: 78,
          benchmark: 85,
          strengths: ['MECE Issue Trees', 'Profitability Breakdown Frameworks', 'Market Entry Strategy'],
          weaknesses: ['Public Sector / Non-Profit Cases', 'High-Speed Mental Math Estimation'],
          subSkills: [
            { name: 'MECE Framework Construction', score: 86, weight: 0.35 },
            { name: 'Hypothesis-Driven Problem Solving', score: 80, weight: 0.35 },
            { name: 'Quantitative Market Sizing', score: 70, weight: 0.3 },
          ],
          lastAssessedDate: 'Yesterday',
        },
        'Strategic Analysis': {
          name: 'Strategic Analysis',
          score: 82,
          benchmark: 80,
          strengths: ['Porter Five Forces & Moat Analysis', 'Value Chain Deconstruction', 'SWOT Synthesis'],
          weaknesses: ['Regulatory Impact on Synergy Models', 'Cost Synergies in M&A Due Diligence'],
          subSkills: [
            { name: 'Industry & Competitor Profiling', score: 88, weight: 0.35 },
            { name: 'Cost Optimization Strategies', score: 80, weight: 0.35 },
            { name: 'M&A & Synergies Logic', score: 78, weight: 0.3 },
          ],
          lastAssessedDate: '3 days ago',
        },
        'Executive Communication': {
          name: 'Executive Communication',
          score: 84,
          benchmark: 85,
          strengths: ['Pyramid Principle Top-Down Messaging', 'Slide Architecture & Action Titles'],
          weaknesses: ['Managing High-Stakes Hostile Q&A', 'Data Density vs Visual Clarity Trade-off'],
          subSkills: [
            { name: 'Top-Down Pyramid Messaging', score: 90, weight: 0.35 },
            { name: 'Executive Presentation Delivery', score: 82, weight: 0.35 },
            { name: 'Active Listening & Synthesis', score: 80, weight: 0.3 },
          ],
          lastAssessedDate: '2 days ago',
        },
        'Interview Skills': {
          name: 'Interview Skills',
          score: 76,
          benchmark: 85,
          strengths: ['Structured Opening & Clarifying Questions', 'Synthesis & Recommendation Summary'],
          weaknesses: ['Stress Testing Edge-Case Scenarios', 'Complex Graph Interpretation Speed'],
          subSkills: [
            { name: 'Live Case Solving Demeanor', score: 80, weight: 0.4 },
            { name: 'Fit Interview (PEI / Stories)', score: 76, weight: 0.3 },
            { name: 'Chart & Exhibit Decryption', score: 72, weight: 0.3 },
          ],
          lastAssessedDate: 'Yesterday',
        },
      };

    default:
      return getDefaultSkillsForSpecialization('Software Engineering & Tech');
  }
}

export const sampleQuizQuestionsBySpecialization: Record<string, QuizQuestion[]> = {
  'Software Engineering & Tech': [
    {
      id: 'q_swe_1',
      specialization: 'Software Engineering & Tech',
      subject: 'System Design & Architecture',
      topic: 'Caching Strategies',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In a high-throughput read-heavy system using Redis with the Cache-Aside pattern, what happens during a cache miss?',
      options: [
        'The application throws a 404 error and requests the user to retry',
        'Redis automatically triggers a background SQL query to populate itself',
        'The application reads from the primary database, updates the cache, and returns data to the client',
        'The database writes to the replica and invalidates the Redis cluster immediately',
      ],
      correctAnswerIndex: 2,
      explanation: 'In the Cache-Aside (Lazy Loading) pattern, the application code first queries the cache. If data is not found (miss), the app queries the database, writes the result to the cache with an optional TTL, and returns it.',
      formula: 'Cache Hit Ratio = Hits / (Hits + Misses)',
      keyTakeaway: 'Cache-aside isolates cache failures from primary database reads and only caches data that is actively requested.',
    },
    {
      id: 'q_swe_2',
      specialization: 'Software Engineering & Tech',
      subject: 'Data Structures & Algorithms',
      topic: 'Hash Tables & Complexity',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'What is the worst-case time complexity of searching for a key in a standard Hash Table if all keys collide into the same bucket implemented as an un-balanced linked list?',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)',
      ],
      correctAnswerIndex: 2,
      explanation: 'While the average case for hash table search is O(1) with a uniform hash distribution, when all n keys collide into a single linked-list bucket (chaining), traversing the chain requires O(n) linear time. Modern implementations like Java 8 HashMap convert bins to Red-Black trees when the chain exceeds 8 elements to guarantee O(log n) worst case.',
      formula: 'Average Time: O(1) | Worst Case (all collisions): O(n)',
      keyTakeaway: 'Good hash functions and appropriate load factors maintain O(1) amortized performance.',
    },
    {
      id: 'q_swe_3',
      specialization: 'Software Engineering & Tech',
      subject: 'Distributed Systems',
      topic: 'CAP Theorem',
      difficulty: 'Advanced',
      questionType: 'Conceptual',
      question: 'According to the CAP theorem, when a network partition (P) occurs between nodes in a distributed database cluster, which trade-off must be made?',
      options: [
        'Sacrifice durability or sacrifice encryption',
        'Choose between Consistency (every read receives the most recent write or an error) and Availability (every request receives a non-error response)',
        'Choose between horizontal scaling and vertical scaling',
        'Choose between relational transactions (ACID) and microservice architecture',
      ],
      correctAnswerIndex: 1,
      explanation: 'The CAP theorem states that in the presence of a network partition (P), a distributed system cannot simultaneously guarantee both consistency (C) and availability (A). A CP system rejects stale writes/reads to preserve consistency, whereas an AP system returns available (potentially stale) data.',
      formula: 'CAP: In presence of P -> Pick either C or A',
      keyTakeaway: 'Network partitions are unavoidable across physical networks, so distributed systems are designed as either CP or AP.',
    },
  ],
  'AI & Data Science': [
    {
      id: 'q_ai_1',
      specialization: 'AI & Data Science',
      subject: 'Machine Learning',
      topic: 'Regularization & Overfitting',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'How does L1 regularization (Lasso) differ fundamentally from L2 regularization (Ridge) in terms of weight coefficients?',
      options: [
        'L1 penalizes sum of squared weights and keeps all features non-zero',
        'L1 penalizes absolute values of weights and tends to drive non-informative feature weights strictly to zero (inducing sparsity)',
        'L2 always produces exact zero weights for high-correlation variables',
        'L1 cannot be used for linear regression models',
      ],
      correctAnswerIndex: 1,
      explanation: 'L1 regularization adds the penalty λ∑|w_i|. Because the diamond-shaped L1 contour has corners intersecting parameter axes, it forces less important weights exactly to 0, performing automatic feature selection. L2 penalizes λ∑w_i^2, shrinking weights close to 0 without making them strictly 0.',
      formula: 'L1 Loss = Loss + λ∑|w|  vs  L2 Loss = Loss + λ∑(w²)',
      keyTakeaway: 'Use L1 when feature selection and sparsity are needed; use L2 to handle multicollinearity and prevent runaway weights.',
    },
    {
      id: 'q_ai_2',
      specialization: 'AI & Data Science',
      subject: 'Generative AI & LLMs',
      topic: 'Transformer Architecture',
      difficulty: 'Advanced',
      questionType: 'Conceptual',
      question: 'In the Transformer Scaled Dot-Product Attention mechanism, why are the dot products of Query (Q) and Key (K) divided by √d_k?',
      options: [
        'To convert continuous tokens into discrete integers',
        'To counteract the effect of dot products growing large in magnitude for high dimensions, which pushes softmax into regions with vanishingly small gradients',
        'To ensure the sequence length does not exceed the model context window',
        'To speed up GPU matrix multiplication by reducing memory footprint',
      ],
      correctAnswerIndex: 1,
      explanation: 'For large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients (gradient vanishing). Scaling by 1/√d_k stabilizes the variance of the dot products to approximately 1.',
      formula: 'Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V',
      keyTakeaway: 'Scaling factor prevents softmax saturation and maintains smooth backpropagation during training.',
    },
    {
      id: 'q_ai_3',
      specialization: 'AI & Data Science',
      subject: 'Applied Statistics',
      topic: 'Hypothesis Testing & Errors',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In an A/B test evaluation, what does a Type I error (False Positive) represent?',
      options: [
        'Failing to reject the null hypothesis when the treatment variant is genuinely superior',
        'Incorrectly rejecting the null hypothesis when there is actually no true difference between variants',
        'Running an experiment with sample size below the required statistical power',
        'Measuring bounce rate instead of conversion rate',
      ],
      correctAnswerIndex: 1,
      explanation: 'A Type I error (α, typically set to 0.05) occurs when you conclude that a new feature created an effect when in reality the null hypothesis was true (false alarm). A Type II error (β) is failing to detect a real effect (false negative).',
      formula: 'Type I Error = P(Reject H₀ | H₀ is True) = α',
      keyTakeaway: 'Control Type I error with significance level α (95% confidence) and Type II error with sample size and statistical power (1 - β).',
    },
  ],
  'Product Management': [
    {
      id: 'q_pm_1',
      specialization: 'Product Management',
      subject: 'Product Strategy & Metrics',
      topic: 'North Star Metric',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'Why is "Total Registered Accounts" considered a vanity metric rather than an effective North Star Metric for a SaaS collaboration tool?',
      options: [
        'Because registered accounts are difficult to query in SQL databases',
        'Because cumulative signups only go up over time and fail to capture whether users are actively receiving recurring value or churning',
        'Because enterprise B2B software does not allow individual user registrations',
        'Because product managers only measure monthly recurring revenue (MRR)',
      ],
      correctAnswerIndex: 1,
      explanation: 'A vanity metric looks impressive because it monotonically increases, but it does not reflect ongoing user engagement, retention, or customer health. An effective North Star Metric (e.g., Weekly Active Collaborative Teams or Weekly Documents Shared) directly reflects customer value realization.',
      formula: 'Good North Star = Direct measure of customer value delivered × core business engine',
      keyTakeaway: 'Focus on engagement and active value creation metrics rather than cumulative registrations.',
    },
    {
      id: 'q_pm_2',
      specialization: 'Product Management',
      subject: 'Execution & Prioritization',
      topic: 'RICE Framework',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'A feature has Reach = 5,000 users/quarter, Impact = 2 (High), Confidence = 80% (0.8), and Effort = 4 person-months. What is its RICE score?',
      options: [
        '1,000',
        '2,000',
        '2,500',
        '5,000',
      ],
      correctAnswerIndex: 1,
      explanation: 'RICE Score = (Reach × Impact × Confidence) / Effort. Calculating: (5,000 × 2 × 0.8) / 4 = 8,000 / 4 = 2,000.',
      formula: 'RICE = (Reach × Impact × Confidence) / Effort',
      keyTakeaway: 'RICE standardizes feature trade-offs by dividing expected customer value by team engineering cost.',
    },
  ],
  'UI/UX & Product Design': [
    {
      id: 'q_ux_1',
      specialization: 'UI/UX & Product Design',
      subject: 'Accessibility & WCAG Standards',
      topic: 'Color Contrast Ratios',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'According to WCAG 2.1 Level AA guidelines, what is the minimum required color contrast ratio for normal body text (under 18pt or 14pt bold)?',
      options: [
        '3:1',
        '4.5:1',
        '7:1',
        '10:1',
      ],
      correctAnswerIndex: 1,
      explanation: 'WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal body text and 3:1 for large text (at least 18pt regular or 14pt bold) and essential graphical user interface components.',
      formula: 'Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)',
      keyTakeaway: 'Always design body text with at least 4.5:1 contrast against its background container.',
    },
    {
      id: 'q_ux_2',
      specialization: 'UI/UX & Product Design',
      subject: 'Figma & Design Systems',
      topic: 'Auto Layout & Responsive Tokens',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In modern design systems, why are semantic tokens (e.g. `color.surface.primary`) preferred over global raw tokens (e.g. `blue.500`) in UI components?',
      options: [
        'Because raw tokens take longer to load in Figma and web browsers',
        'Semantic tokens bind intent to styling, enabling seamless dark mode switching, white-label theming, and centralized refactoring without touching component code',
        'Figma does not allow the use of hex colors directly in components',
        'Semantic tokens eliminate the need for front-end developers to write CSS',
      ],
      correctAnswerIndex: 1,
      explanation: 'Semantic tokens capture the purpose or role of a design choice (e.g. surface background, destructive button, text muted) rather than its raw visual value. When toggling themes or redesigning, changing the semantic token maps updates every component predictably.',
      formula: 'Architecture: Global Primitive Token -> Semantic Token -> Component Token',
      keyTakeaway: 'Use semantic tokens to make design systems portable across light/dark themes and sub-brands.',
    },
    {
      id: 'q_ux_3',
      specialization: 'UI/UX & Product Design',
      subject: 'User Research & Usability Testing',
      topic: 'Qualitative vs Quantitative Synthesis',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'Jakob Nielsen’s usability research demonstrates that testing with how many participants typically uncovers approximately 85% of core usability issues in an interface?',
      options: [
        '5 participants',
        '25 participants',
        '50 participants',
        '100 participants',
      ],
      correctAnswerIndex: 0,
      explanation: 'Nielsen and Landauer showed that the number of usability problems found in a usability test asymptotically approaches diminishing returns: 5 users uncover ~85% of usability issues. It is more cost-effective to run iterative tests with 5 users than a single large test with 25 users.',
      formula: 'Problems Found: N(1 - (1 - L)^n)',
      keyTakeaway: 'Run small, rapid usability tests of 5 users iteratively rather than waiting for massive sample cohorts.',
    },
  ],
  'Management Consulting & Strategy': [
    {
      id: 'q_cons_1',
      specialization: 'Management Consulting & Strategy',
      subject: 'Case Interview Frameworks (MECE)',
      topic: 'MECE Principle',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'What does the MECE (Mutually Exclusive, Collectively Exhaustive) principle enforce when structuring business issue trees?',
      options: [
        'Categories must overlap to capture cross-functional dependencies, and non-viable options must be hidden',
        'Each branch must be distinct with no overlap between buckets, and together all branches must account for 100% of possibilities with no gaps',
        'Financial ratios must strictly balance with standard GAAP audit disclosures',
        'Market sizing must be derived exclusively from supply-side capacity constraints',
      ],
      correctAnswerIndex: 1,
      explanation: 'MECE guarantees that an analytical issue tree has no overlapping elements (Mutually Exclusive) and misses nothing important (Collectively Exhaustive). This structured decomposition prevents duplicate effort and ensures holistic coverage.',
      formula: 'MECE = Zero Overlap (ME) + 100% Problem Space Coverage (CE)',
      keyTakeaway: 'Apply MECE to break complex strategic problems into discrete, manageable root cause hypotheses.',
    },
    {
      id: 'q_cons_2',
      specialization: 'Management Consulting & Strategy',
      subject: 'Profitability & Turnaround Strategy',
      topic: 'Profit Tree Deconstruction',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'A retail client is experiencing declining profits while sales revenue has increased by 15%. What is the most rigorous first MECE step to identify the root cause?',
      options: [
        'Assume the marketing team spent too much on TV ads and demand immediate budget cuts',
        'Deconstruct Total Cost into Fixed Costs and Variable Costs, and examine whether Unit Costs or Cost of Goods Sold (COGS) expanded faster than Revenue',
        'Immediately enter a new geographical market to compensate for margin decline',
        'Reduce the price of products to attract more volume',
      ],
      correctAnswerIndex: 1,
      explanation: 'Profit = Revenue - Total Costs. Since Revenue grew by 15%, Profit could only drop if Total Costs grew by more than 15%. The next MECE level requires breaking Costs into Fixed (rent, SG&A, overhead) vs Variable (raw materials, freight, commissions) to isolate margin compression.',
      formula: 'Profit = (Price × Volume) - (Fixed Costs + Variable Cost per Unit × Volume)',
      keyTakeaway: 'Always isolate whether profit decline is driven by price, volume, fixed overhead, or variable unit costs.',
    },
  ],
  Finance: [
    {
      id: 'q_fin_1',
      specialization: 'Finance',
      subject: 'Corporate Finance',
      topic: 'WACC & Capital Structure',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'Why is the after-tax cost of debt used when calculating a firm’s Weighted Average Cost of Capital (WACC)?',
      options: [
        'Debt holders demand lower coupon payments than equity dividends',
        'Interest expense is tax-deductible, creating an interest tax shield that lowers effective cash outflow',
        'State regulations subsidize bank loan defaults for listed corporations',
        'Equity dividend payments are tax deductible under GAAP rules',
      ],
      correctAnswerIndex: 1,
      explanation: 'Interest payments made to bondholders or lenders are subtracted before taxable corporate income is computed. Thus, debt provides a tax shield equal to Kd × (1 - T). Equity dividends are paid out of post-tax net income.',
      formula: 'After-tax Cost of Debt = Pre-tax Kd × (1 - Tax Rate)',
      keyTakeaway: 'Always tax-adjust debt costs when computing WACC.',
    },
    {
      id: 'q_fin_2',
      specialization: 'Finance',
      subject: 'Financial Accounting',
      topic: '3-Statement Flow Mechanics',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'If Depreciation increases by $20 million and the corporate tax rate is 30%, what is the net change in cash on the Cash Flow Statement at the end of the period?',
      options: [
        'Cash decreases by $20 million',
        'Cash decreases by $14 million',
        'Cash increases by $6 million',
        'Cash increases by $14 million',
      ],
      correctAnswerIndex: 2,
      explanation: 'Income Statement: EBIT drops by $20M. Tax drops by $6M ($20M × 30%). Net Income drops by $14M ($20M × (1 - 0.30)). On Cash Flow from Operations: Net Income is -$14M, and we add back non-cash Depreciation of +$20M. Net cash increases by +$6M due to tax shelter.',
      formula: 'ΔCash = Depreciation × Tax Rate = $20M × 30% = +$6M',
      keyTakeaway: 'Depreciation provides a cash inflow via tax expense reduction.',
    },
    {
      id: 'q_fin_3',
      specialization: 'Finance',
      subject: 'Valuation & DCF',
      topic: 'Enterprise Value vs Equity Value',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'A firm issues $100M of corporate bonds and holds the entire amount in its bank account as cash. What happens to its Enterprise Value?',
      options: [
        'Enterprise Value increases by $100M',
        'Enterprise Value decreases by $100M',
        'Enterprise Value remains unchanged',
        'Enterprise Value doubles due to financial leverage',
      ],
      correctAnswerIndex: 2,
      explanation: 'Enterprise Value = Equity Value + Total Debt - Cash. While Debt increases by $100M, Cash also increases by $100M. Net Debt (Debt - Cash) remains unchanged ($100M - $100M = $0). Therefore, Enterprise Value is unaffected.',
      formula: 'EV = Equity Value + Net Debt',
      keyTakeaway: 'Raising debt to sit on cash does not create Enterprise Value.',
    },
    {
      id: 'q_fin_4',
      specialization: 'Finance',
      subject: 'Excel for Finance',
      topic: 'Financial Modeling Formulas',
      difficulty: 'Beginner',
      questionType: 'MCQ',
      question: 'Which Excel formula correctly determines the Internal Rate of Return for a stream of irregular cash flows occurring on exact calendar dates?',
      options: ['=IRR()', '=XIRR()', '=NPV()', '=RATE()'],
      correctAnswerIndex: 1,
      explanation: '=XIRR(values, dates, [guess]) computes the annualized internal rate of return for non-periodic transaction dates. Standard =IRR assumes strictly equal periodic intervals.',
      formula: '=XIRR(values, dates)',
      keyTakeaway: 'Always use XIRR in real-world project deals with uneven dates.',
    },
  ],
  Marketing: [
    {
      id: 'q_mkt_1',
      specialization: 'Marketing',
      subject: 'Consumer Behaviour',
      topic: 'Customer Journey & Decision Making',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In consumer decision theory, what phenomenon describes post-purchase psychological discomfort when a buyer second-guesses a high-involvement purchase?',
      options: [
        'Confirmation Bias',
        'Cognitive Dissonance',
        'Sunk Cost Fallacy',
        'Hedonic Adaptation',
      ],
      correctAnswerIndex: 1,
      explanation: 'Cognitive dissonance is the psychological tension experienced when a consumer doubts whether they made the optimal purchase, especially common in high-cost or high-risk purchases. Marketers mitigate this with reassuring onboarding emails, warranties, and post-purchase confirmation.',
      keyTakeaway: 'Post-purchase engagement is essential to resolve cognitive dissonance and prevent returns.',
    },
    {
      id: 'q_mkt_2',
      specialization: 'Marketing',
      subject: 'Digital Marketing & SEO/SEM',
      topic: 'Unit Economics & Performance Marketing',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'A D2C brand spends $10,000 on Meta Ads, generating 400 new paying customers. If each customer generates an average gross margin of $80 over their lifetime, what is the LTV to CAC ratio?',
      options: ['2.0x', '3.2x', '4.5x', '1.25x'],
      correctAnswerIndex: 1,
      explanation: 'CAC (Customer Acquisition Cost) = Total Ad Spend / Customers Acquired = $10,000 / 400 = $25. LTV (Customer Lifetime Value) = $80. LTV:CAC Ratio = $80 / $25 = 3.2x. A benchmark of 3.0x or higher indicates healthy, scalable unit economics.',
      formula: 'CAC = Ad Spend / Customers; LTV:CAC = LTV / CAC',
      keyTakeaway: 'A 3x+ LTV to CAC ratio is considered the golden benchmark in venture and growth marketing.',
    },
    {
      id: 'q_mkt_3',
      specialization: 'Marketing',
      subject: 'Brand Management',
      topic: 'Brand Positioning & STP',
      difficulty: 'Advanced',
      questionType: 'Case-based',
      question: 'Under Kevin Lane Keller\'s Customer-Based Brand Equity (CBBE) pyramid, what is the ultimate peak level of the brand relationship that brands like Apple or Nike achieve?',
      options: [
        'Brand Salience',
        'Brand Performance & Imagery',
        'Consumer Judgments & Feelings',
        'Brand Resonance',
      ],
      correctAnswerIndex: 3,
      explanation: 'Brand Resonance is the apex of Keller\'s CBBE pyramid. It represents an intense, active psychological bond and community advocacy between the consumer and the brand (loyalty, attachment, community, and active engagement).',
      formula: 'Keller CBBE: Salience -> Performance/Imagery -> Judgments/Feelings -> Resonance',
      keyTakeaway: 'Resonance transforms customers into vocal brand advocates and community members.',
    },
  ],
  'Human Resources (HR)': [
    {
      id: 'q_hr_1',
      specialization: 'Human Resources (HR)',
      subject: 'HR Analytics & Metrics',
      topic: 'Turnover & Retention Analysis',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'A software company starts the year with 1,000 employees and ends with 1,200 employees. During the year, 110 employees voluntarily resigned. What was the annualized voluntary attrition rate?',
      options: ['11.0%', '10.0%', '9.16%', '12.2%'],
      correctAnswerIndex: 1,
      explanation: 'Average Headcount = (Starting + Ending) / 2 = (1,000 + 1,200) / 2 = 1,100. Attrition Rate = (Number of Exits / Average Headcount) × 100 = (110 / 1,100) × 100 = 10.0%.',
      formula: 'Attrition Rate = (Leavers / Average Headcount) × 100',
      keyTakeaway: 'Always use average headcount rather than ending headcount to avoid distorting turnover rates during hiring sprees.',
    },
    {
      id: 'q_hr_2',
      specialization: 'Human Resources (HR)',
      subject: 'Training & Development',
      topic: 'Instructional Evaluation Frameworks',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In the Kirkpatrick Model for training evaluation, which level measures whether trainees actually applied the learned skills on their day-to-day job?',
      options: [
        'Level 1: Reaction',
        'Level 2: Learning',
        'Level 3: Behavior',
        'Level 4: Results',
      ],
      correctAnswerIndex: 2,
      explanation: 'Level 1 evaluates participant satisfaction (Reaction); Level 2 evaluates knowledge acquired via tests (Learning); Level 3 evaluates on-the-job behavioral application over time (Behavior); Level 4 evaluates business bottom-line impact like sales or error reduction (Results).',
      formula: 'Kirkpatrick: 1. Reaction -> 2. Learning -> 3. Behavior -> 4. Results',
      keyTakeaway: 'Level 3 Behavior assesses true transfer of learning to real workplace performance.',
    },
    {
      id: 'q_hr_3',
      specialization: 'Human Resources (HR)',
      subject: 'Performance Management',
      topic: 'Talent Review & 9-Box Grid',
      difficulty: 'Advanced',
      questionType: 'Case-based',
      question: 'In the classic McKinsey / GE 9-Box talent grid, how is an employee classified who demonstrates exceptional potential for future leadership but whose current performance is inconsistent or medium?',
      options: [
        'Star / Top Talent',
        'Core Player / Solid Performer',
        'High Potential / Rough Diamond',
        'Underperformer / Risk',
      ],
      correctAnswerIndex: 2,
      explanation: 'In the 9-Box Grid, high potential combined with medium current performance places an employee in the "High Potential / Rough Diamond" box. The recommended HR action is focused mentoring, stretch assignments, and role alignment to unlock their ceiling.',
      keyTakeaway: 'The 9-Box balances past performance with future leadership runway.',
    },
  ],
  'Business Analytics': [
    {
      id: 'q_ba_1',
      specialization: 'Business Analytics',
      subject: 'SQL & Relational Databases',
      topic: 'Window Functions & Ranking',
      difficulty: 'Advanced',
      questionType: 'Conceptual',
      question: 'When writing a SQL query to find the top 3 highest-spending customers per sales region, which window function should you use if ties in spending should NOT skip consecutive rank numbers?',
      options: ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()', 'NTILE(3)'],
      correctAnswerIndex: 2,
      explanation: 'DENSE_RANK() assigns the same rank to identical values without skipping subsequent rankings (e.g. 1, 2, 2, 3). RANK() would skip (e.g. 1, 2, 2, 4), while ROW_NUMBER() arbitrarily breaks ties into unique sequence numbers.',
      formula: 'DENSE_RANK() OVER (PARTITION BY region ORDER BY spend DESC)',
      keyTakeaway: 'Use DENSE_RANK() to prevent rank gaps when ranking grouped top-performers.',
    },
    {
      id: 'q_ba_2',
      specialization: 'Business Analytics',
      subject: 'Statistical Methods & Inference',
      topic: 'Hypothesis Testing & Type I/II Errors',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In an A/B test for an e-commerce checkout flow, what error is committed if the analytics team concludes that the new checkout page increased conversions when in reality there was no true difference?',
      options: [
        'Type I Error (False Positive / α)',
        'Type II Error (False Negative / β)',
        'Selection Bias Error',
        'Simpson’s Paradox',
      ],
      correctAnswerIndex: 0,
      explanation: 'A Type I error occurs when the null hypothesis (no true difference) is rejected when it is actually true (a false alarm or false positive). Its probability is controlled by the significance level alpha (commonly 0.05).',
      formula: 'P(Type I Error) = α; P(Type II Error) = β',
      keyTakeaway: 'Type I error is rolling out a feature believing it works when the observed lift was random chance.',
    },
    {
      id: 'q_ba_3',
      specialization: 'Business Analytics',
      subject: 'Power BI & Tableau Dashboards',
      topic: 'DAX Calculations & Context Transition',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In Power BI DAX, what is the primary purpose of the CALCULATE() function?',
      options: [
        'It performs basic arithmetic additions on table rows',
        'It evaluates an expression within an altered or modified filter context',
        'It automatically connects to external SQL databases',
        'It converts column data types from strings to numbers',
      ],
      correctAnswerIndex: 1,
      explanation: 'CALCULATE() is the most powerful function in DAX. It evaluates a given calculation expression while modifying, overriding, or adding to the current report filter context using specified filter arguments.',
      formula: '=CALCULATE(Expression, Filter1, Filter2, ...)',
      keyTakeaway: 'CALCULATE() is the only DAX function capable of altering filter contexts.',
    },
  ],
  'Agri-Business Management': [
    {
      id: 'q_agri_1',
      specialization: 'Agri-Business Management',
      subject: 'Agribusiness Management & Policies',
      topic: 'Farmer Producer Organizations (FPOs)',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'What is the primary economic rationale behind organizing smallholder farmers into Farmer Producer Organizations (FPOs)?',
      options: [
        'To eliminate the need for agricultural credit from commercial banks',
        'To aggregate produce volume, achieve economies of scale, and gain collective bargaining power in input buying and output sales',
        'To mandate government fixed pricing on all seasonal vegetables',
        'To transition all cultivable land into state-owned collective farms',
      ],
      correctAnswerIndex: 1,
      explanation: 'Individual small and marginal farmers face high transaction costs, lack storage, and get price-dictated by local intermediaries. FPOs aggregate scale, enabling bulk purchasing of seeds/fertilizers at wholesale discounts and direct contract selling to institutional corporate buyers.',
      keyTakeaway: 'FPOs solve smallholder fragmentation through aggregation and collective bargaining.',
    },
    {
      id: 'q_agri_2',
      specialization: 'Agri-Business Management',
      subject: 'Agricultural Supply Chain & Logistics',
      topic: 'Cold Chain & Post-Harvest Losses',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In fresh horticulture supply chains, why is immediate "pre-cooling" at the farm-gate packhouse critical for extending shelf life?',
      options: [
        'It increases moisture content to make fruit weigh more at the mandi',
        'It rapidly removes field heat, substantially lowering the respiration rate and slowing ethylene gas production',
        'It bleaches surface bacteria without needing standard sanitization',
        'It freezes the produce solid for long-haul ocean container transit',
      ],
      correctAnswerIndex: 1,
      explanation: 'Freshly harvested fruits and vegetables respire rapidly due to trapped solar and field heat, consuming their own sugars and producing ethylene ripening gas. Pre-cooling brings core temperature down to optimal storage levels within hours, drastically slowing biological decay.',
      keyTakeaway: 'Removing field heat immediately post-harvest is the single most effective post-harvest loss intervention.',
    },
    {
      id: 'q_agri_3',
      specialization: 'Agri-Business Management',
      subject: 'Rural Marketing & Consumer Dynamics',
      topic: 'The 4A Rural Marketing Framework',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'In CK Prahalad\'s classic 4A framework for rural and bottom-of-pyramid markets, what do the 4 As represent?',
      options: [
        'Action, Acquisition, Activation, Retention',
        'Affordability, Availability, Awareness, Acceptability',
        'Agriculture, Agronomy, Agrochemicals, Animals',
        'Automation, Agility, Accuracy, Alignment',
      ],
      correctAnswerIndex: 1,
      explanation: 'The 4A framework tailored for rural emerging markets focuses on: Affordability (sachet pricing, small SKUs), Availability (deep distribution to weekly haats), Awareness (vernacular messaging, agro-dealer influence), and Acceptability (products built to withstand erratic power/heat).',
      formula: '4As = Affordability + Availability + Awareness + Acceptability',
      keyTakeaway: 'Winning rural markets requires redesigning value delivery across all 4 As.',
    },
  ],
  'Healthcare Management': [
    {
      id: 'q_health_1',
      specialization: 'Healthcare Management',
      subject: 'Hospital Operations & Administration',
      topic: 'Hospital Capacity & ARPOB Metrics',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'A 200-bed tertiary hospital runs at an average bed occupancy rate of 80% across a 30-day month. If total monthly IPD revenue is $2.4 million, what is the hospital’s ARPOB (Average Revenue Per Occupied Bed per day)?',
      options: ['$350', '$400', '$500', '$600'],
      correctAnswerIndex: 2,
      explanation: 'Occupied Beds = 200 beds × 80% = 160 occupied beds per day. Total Occupied Bed Days in Month = 160 × 30 = 4,800 bed days. ARPOB = Total Revenue / Total Occupied Bed Days = $2,400,000 / 4,800 = $500 per day.',
      formula: 'ARPOB = IPD Revenue / (Total Beds × Occupancy% × Days)',
      keyTakeaway: 'ARPOB is the primary operational efficiency and pricing yield metric in hospital management.',
    },
    {
      id: 'q_health_2',
      specialization: 'Healthcare Management',
      subject: 'Healthcare Quality & Accreditations (NABH/JCI)',
      topic: 'International Patient Safety Goals (IPSG)',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'Under International Patient Safety Goals (IPSG) and NABH standards, how many independent patient identifiers must be verified before administering medications or blood products?',
      options: [
        'At least one identifier (Bed number or Room number)',
        'At least two unique identifiers (e.g. Full Name and Unique Hospital Identification Number - UHID), never room/bed number',
        'Verification is only required if the patient is unconscious',
        'Four identifiers including Aadhaar and insurance policy number',
      ],
      correctAnswerIndex: 1,
      explanation: 'Patient Safety Goal #1 mandates using at least two active identifiers (such as Full Patient Name and Hospital ID / Medical Record Number). Bed or room numbers must NEVER be used because patients can be relocated unexpectedly.',
      keyTakeaway: 'Never use room or bed number as an identifier; use two unique patient attributes like Name + UHID.',
    },
    {
      id: 'q_health_3',
      specialization: 'Healthcare Management',
      subject: 'Health Insurance & Managed Care',
      topic: 'Hospital Revenue Cycle Management',
      difficulty: 'Advanced',
      questionType: 'Case-based',
      question: 'In hospital Revenue Cycle Management (RCM), what does the "Denial Rate" metric track, and why is early clinical documentation improvement (CDI) the most effective fix?',
      options: [
        'The percentage of admitted patients who refuse elective surgery',
        'The percentage of total claim dollars initially rejected by insurers/TPAs due to missing pre-auth, medical necessity, or coding discrepancies',
        'The rate of emergency room bed shortages during seasonal epidemics',
        'The attrition rate of hospital nursing staff',
      ],
      correctAnswerIndex: 1,
      explanation: 'The Denial Rate tracks claims rejected by insurers. Over 80% of initial claim denials stem from inadequate clinical documentation, missing pre-authorization numbers, or billing code mismatches. Real-time CDI ensures accurate medical justification before claims are submitted.',
      keyTakeaway: 'Fixing documentation at admission prevents expensive post-discharge insurance claim denials.',
    },
  ],
  'Supply Chain Management': [
    {
      id: 'q_scm_1',
      specialization: 'Supply Chain Management',
      subject: 'Inventory Optimization & EOQ Modeling',
      topic: 'Economic Order Quantity (EOQ)',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'An electronics distributor faces an annual demand (D) of 10,000 smart sensors. Order placement cost (S) is $50 per order, and annual holding cost (H) is $4 per unit. What is the Economic Order Quantity (EOQ)?',
      options: ['250 units', '500 units', '750 units', '1,000 units'],
      correctAnswerIndex: 1,
      explanation: 'EOQ = √((2 × D × S) / H) = √((2 × 10,000 × 50) / 4) = √(1,000,000 / 4) = √250,000 = 500 units. Ordering 500 units per batch minimizes total annual ordering plus inventory holding cost.',
      formula: 'EOQ = √((2 × D × S) / H)',
      keyTakeaway: 'At EOQ, total annual ordering costs equal total annual holding costs.',
    },
    {
      id: 'q_scm_2',
      specialization: 'Supply Chain Management',
      subject: 'Demand Forecasting & S&OP Planning',
      topic: 'Bullwhip Effect Causes & Mitigation',
      difficulty: 'Intermediate',
      questionType: 'Conceptual',
      question: 'What is the "Bullwhip Effect" in supply chains, and which operational practice most effectively mitigates it across upstream suppliers?',
      options: [
        'Order variability increases upstream; mitigated by sharing real-time POS (Point of Sale) demand data and Vendor-Managed Inventory (VMI)',
        'Transportation costs decrease with distance; mitigated by switching from ocean to air freight',
        'Inventory holding cost increases during economic downturns; mitigated by expanding warehouse footprint',
        'Worker absenteeism increases with overtime; mitigated by hiring temporary agency contractors',
      ],
      correctAnswerIndex: 0,
      explanation: 'The Bullwhip Effect is the progressive amplification of demand variability as one moves upstream from customer to tier-1 supplier. It is triggered by order batching, price speculation, and phantom shortage gaming. Sharing real-time POS consumption data and implementing VMI eliminates artificial order swings.',
      formula: 'Variance(Supplier Orders) > Variance(Retail Sales)',
      keyTakeaway: 'Dampen upstream volatility with demand transparency, small batch frequencies, and daily POS sharing.',
    },
    {
      id: 'q_scm_3',
      specialization: 'Supply Chain Management',
      subject: 'Strategic Procurement & Vendor Negotiation',
      topic: 'Kraljic Matrix Sourcing Strategy',
      difficulty: 'Advanced',
      questionType: 'Case-based',
      question: 'According to the Kraljic Portfolio Purchasing Matrix, how should a procurement team handle "Bottleneck" commodities (high supply risk, low financial impact)?',
      options: [
        'Aggressive price negotiations and reverse electronic auctions',
        'Secure long-term contracts, maintain safety stocks, and qualify backup alternative suppliers to guarantee continuity',
        'Consolidate volume across multiple business units to maximize purchasing leverage',
        'Outsource procurement completely through spot market bidding',
      ],
      correctAnswerIndex: 1,
      explanation: 'In the Kraljic Matrix, Bottleneck items have limited market suppliers and high supply risk, but low monetary spend. The primary objective is risk mitigation: securing volume contracts, keeping buffer stock, and developing substitute materials/suppliers.',
      formula: 'Kraljic Quadrant: High Supply Risk × Low Financial Impact = Bottleneck',
      keyTakeaway: 'For bottleneck items, supply continuity and risk mitigation outweigh price savings.',
    },
  ],
  'Operations Management': [
    {
      id: 'q_ops_1',
      specialization: 'Operations Management',
      subject: 'Process Flow Analysis & Bottleneck Identification',
      topic: "Little's Law & Work-in-Progress (WIP)",
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: "A semiconductor packaging cleanroom maintains an average Work-in-Progress (WIP) of 600 wafers and processes an average throughput of 30 wafers per hour. Using Little's Law, what is the average flow time (cycle time) of a wafer through the facility?",
      options: ['10 hours', '15 hours', '20 hours', '30 hours'],
      correctAnswerIndex: 2,
      explanation: "By Little's Law: WIP = Throughput (λ) × Flow Time (W). Therefore, Flow Time (W) = WIP / Throughput = 600 wafers / 30 wafers/hour = 20 hours.",
      formula: "L = λ × W (WIP = Throughput Rate × Flow Time)",
      keyTakeaway: 'To reduce lead time without altering throughput capacity, you must systematically reduce WIP.',
    },
    {
      id: 'q_ops_2',
      specialization: 'Operations Management',
      subject: 'Operational KPIs & Overall Equipment Effectiveness (OEE)',
      topic: 'Overall Equipment Effectiveness (OEE)',
      difficulty: 'Intermediate',
      questionType: 'Numerical',
      question: 'An automated assembly line recorded an Availability rate of 90%, an Operating Performance (speed) rate of 85%, and a Quality (First Time Right) rate of 95%. What is the Overall Equipment Effectiveness (OEE) of this line?',
      options: ['68.4%', '72.7%', '76.5%', '85.0%'],
      correctAnswerIndex: 1,
      explanation: 'OEE = Availability × Performance × Quality = 0.90 × 0.85 × 0.95 = 0.72675 ≈ 72.7%. World-class manufacturing benchmark for OEE is typically 85%+.',
      formula: 'OEE = Availability × Performance × Quality',
      keyTakeaway: 'OEE identifies whether line losses originate from machine downtime, suboptimal speed, or defective output.',
    },
    {
      id: 'q_ops_3',
      specialization: 'Operations Management',
      subject: 'Lean Manufacturing & Six Sigma (DMAIC)',
      topic: 'Six Sigma DMAIC & Process Capability',
      difficulty: 'Advanced',
      questionType: 'Conceptual',
      question: 'In Six Sigma quality management, what does a process capability index of Cpk = 1.33 signify regarding defect rates?',
      options: [
        'The process mean is shifted completely outside the customer specification limits',
        'The process is 4-sigma capable, corresponding to approximately 64 defects per million opportunities (DPMO) when centered',
        'The process produces zero variance and 100% yield',
        'The process requires immediate shutdown for recalibration',
      ],
      correctAnswerIndex: 1,
      explanation: 'Cpk = min((USL - μ)/(3σ), (μ - LSL)/(3σ)). A Cpk of 1.33 indicates that the process mean is at least 4 standard deviations away from the nearest specification limit, achieving an industry-standard capable threshold (~63-64 DPMO).',
      formula: 'Cpk = min((USL - μ)/(3σ), (μ - LSL)/(3σ))',
      keyTakeaway: 'A Cpk of 1.33 is the baseline industrial qualification standard for manufacturing processes.',
    },
  ],
};

export const sampleInterviewQuestionsBySpecialization: Record<string, InterviewQuestionItem[]> = {
  'Software Engineering & Tech': [
    {
      id: 'int_swe_1',
      specialization: 'Software Engineering & Tech',
      type: 'Technical',
      role: 'Full Stack Software Engineer',
      title: 'Distributed System Rate Limiter Design',
      question: 'How would you design a distributed API rate limiter that restricts clients to 100 requests per minute per user ID across multiple server instances?',
      promptContext: 'Standard system design and technical architecture interview question. Discuss algorithms, storage, race conditions, and edge cases.',
      expectedKeyPoints: [
        'Compare Token Bucket / Leaky Bucket / Sliding Window Log / Sliding Window Counter algorithms.',
        'Propose Redis as centralized in-memory datastore with TTL.',
        'Address race conditions using Redis Lua scripts or atomic transactions.',
        'Discuss HTTP response headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, and 429 Too Many Requests.',
      ],
      modelAnswer: `I would implement a Sliding Window Counter algorithm backed by a centralized Redis cluster for sub-millisecond atomic checks.

1. Algorithm Selection:
A Sliding Window Counter blends the fixed window count with the previous window's weight. For instance, if the current minute is 30 seconds in and had 20 requests, while the previous minute had 80 requests, the rolling count is 80 × (1 - 0.5) + 20 = 60 requests. This prevents the 2x burst exploit of fixed windows while conserving memory over sliding logs.

2. Architecture & Data Store:
Client requests hit an API Gateway (or reverse proxy middleware). The gateway extracts the client's API key or user ID and checks Redis. Using a single Redis Lua script, we atomically increment the counter and set an expiration TTL of 2 minutes, preventing race conditions between concurrent requests.

3. Client Feedback & Resilience:
If within limit (≤100), the request proceeds with headers: 'X-RateLimit-Limit: 100', 'X-RateLimit-Remaining: 40', 'X-RateLimit-Reset: <timestamp>'. If exceeded, return HTTP 429 'Too Many Requests' with a 'Retry-After' header. If Redis is temporarily unreachable, implement a circuit breaker to degrade gracefully (fail-open or fall back to local in-memory token buckets).`,
    },
    {
      id: 'int_swe_2',
      specialization: 'Software Engineering & Tech',
      type: 'Situational',
      role: 'Software Engineer',
      title: 'Production Outage Post-Deployment',
      question: 'You deployed a minor database migration on Friday afternoon. Twenty minutes later, customer checkout error rates spike to 15% and database CPU utilization reaches 98%. What is your immediate and subsequent action plan?',
      promptContext: 'Evaluates incident management, operational calmness, blast radius containment, and blameless post-mortem culture.',
      expectedKeyPoints: [
        'Acknowledge incident in on-call channel, establish incident commander role.',
        'Prioritize mitigation first (instant rollback of migration / service version), not root cause debugging in production.',
        'Verify metrics return to baseline (CPU, error rates, queue depths).',
        'Communicate transparently with internal stakeholders and customers.',
        'Conduct a blameless post-mortem and implement architectural guardrails.',
      ],
      modelAnswer: `My primary priority during an active outage is rapid mitigation to restore customer service, not live debugging.

1. Immediate Mitigation (0–5 minutes):
I would immediately declare an incident in the designated channel and assign an incident commander. Because error rates spiked directly following a deployment, the fastest route to recovery is an immediate rollback of the deployment to the previous stable release artifact. If the database migration itself created locking (e.g. non-concurrent index creation on a huge table), I would check active database process locks and terminate the blocking queries.

2. Verification (5–15 minutes):
Monitor real-time Grafana/Datadog dashboards to confirm that CPU drops below 40% and checkout error rates fall back to <0.1%. Update customer support and executive leads that mitigation is verified.

3. Root Cause Investigation & Prevention:
In a staging replica with production-like data scale, replicate why the query table-scanned or acquired exclusive locks. Implement zero-downtime migration patterns (e.g., expand-contract schema pattern, 'CONCURRENTLY' for Postgres indexes), and establish policy prohibiting non-emergency deployments late on Fridays.`,
    },
  ],
  'AI & Data Science': [
    {
      id: 'int_ai_1',
      specialization: 'AI & Data Science',
      type: 'Technical',
      role: 'Machine Learning Engineer',
      title: 'Mitigating Hallucination in Enterprise RAG Systems',
      question: 'You are building a Retrieval-Augmented Generation (RAG) system for financial analysts querying quarterly 10-K filings. The model occasionally generates plausible but incorrect numerical figures. How do you diagnose and architecturally fix this?',
      promptContext: 'Real-world Generative AI and enterprise LLM production challenge focusing on chunking, retrieval quality, context formatting, and guardrails.',
      expectedKeyPoints: [
        'Diagnose whether error originates in Retrieval phase (bad chunks) or Generation phase (unfaithful synthesis).',
        'Improve chunking: semantic chunking with table preservation (markdown / HTML tables) and metadata tagging (fiscal year, ticker).',
        'Hybrid Search (Dense vector embeddings + Sparse BM25 keyword search) with Cross-Encoder reranking.',
        'System prompt constraints: strict citation grounding, temperature = 0, explicit "I do not know if absent".',
        'Automated evaluation using RAG Triad (Context Relevance, Groundedness, Answer Relevance via Ragas / TruLens).',
      ],
      modelAnswer: `Numerical hallucinations in financial RAG systems are critical defects that require a multi-stage architectural overhaul.

1. Root Cause Diagnosis:
First, determine whether the retrieval stage failed to supply the correct chunk (retrieval error) or whether the LLM received the chunk but miscalculated/hallucinated (generation error).

2. Ingestion & Retrieval Enhancement:
Standard naive chunking tears financial tables apart. I would implement table-aware parsing using Markdown representations with contextual metadata headers (Ticker, Quarter, Statement Type). I would use Hybrid Search combining Dense vector search (semantic queries) with Sparse BM25 (exact ticker symbols and line items) followed by a Cross-Encoder Reranker (e.g., Cohere or BGE) to surface the top 3 most relevant segments.

3. Generation Guardrails:
Set model temperature to 0.0. Constrain system prompts with strict grounding instructions: 'Only report numbers explicitly written in the provided context. Cite the chunk ID for every claim. If not present, state that the filing does not disclose this metric.'

4. Evaluation & Verification:
Integrate an automated pipeline using the RAG Triad (Context Relevance, Groundedness, and Answer Relevance). Add a deterministic post-processing verification step that regex-matches numbers in the output against the retrieved text.`,
    },
  ],
  'Product Management': [
    {
      id: 'int_pm_1',
      specialization: 'Product Management',
      type: 'Case-based',
      role: 'Associate Product Manager',
      title: 'Product Design: Improving Mobile Onboarding Conversion',
      question: 'Imagine you are the PM for a mobile investment app. Data shows that 65% of users drop off between account sign-up and linking their bank account for their first deposit. How would you investigate and solve this problem?',
      promptContext: 'Evaluates structured product thinking using CIRCLES or similar frameworks: problem framing, funnel breakdown, user segment empathy, prioritization, and MVP design.',
      expectedKeyPoints: [
        'Deconstruct the funnel into discrete micro-steps to locate exact drop-off step.',
        'Segment data by acquisition channel, device OS, and demographics.',
        'Synthesize qualitative insights from user interviews and screen recordings.',
        'Formulate hypotheses around user trust, cognitive load, and immediate value perception.',
        'Design solutions (instant Plaid bank linking, dummy portfolio simulation, deferred KYC where legally possible).',
        'Define success metrics (Day-7 funded account rate, onboarding completion rate) and guardrails.',
      ],
      modelAnswer: `I will approach this using a structured product discovery and execution framework:

1. Deconstruct the Funnel & Diagnose:
First, break down the 65% drop-off into granular micro-steps:
- Email/phone verification -> Identity (SSN/KYC) -> Bank linking (Plaid) -> First deposit confirmation.
Pinpoint exactly where the steepest cliffs occur. For example, if 45% drop off at the bank linking screen, the barrier is likely trust or friction rather than registration intent.

2. Segment Analysis & User Research:
Segment drop-off rates across dimensions: Paid vs Organic acquisition, iOS vs Android, and first-time vs experienced investors. Concurrently, conduct 10 moderated usability sessions and review FullStory/Hotjar session recordings to uncover emotional friction (e.g., fear of sharing bank credentials).

3. Hypotheses & Solution Design:
- Hypothesis 1 (Trust & Anxiety): Users don't feel confident linking banks before experiencing the app value.
  Solution: Implement a "Preview Mode" with simulated virtual funds so users experience portfolio tracking before connecting real capital.
- Hypothesis 2 (Friction in Bank Auth): Manual routing/account entry causes failure.
  Solution: Integrate instant OAuth Plaid connections with clear bank logos and SOC2 security badges.
- Hypothesis 3 (Micro-Incentives): Lack of urgency to complete the final deposit.
  Solution: Offer a $10 initial stock match upon first completed deposit within 48 hours.

4. Experimentation & Metrics:
Run an A/B test with primary metric: % of registered users completing first deposit within 7 days. Guardrail metrics: KYC fraud rate and customer acquisition cost (CAC).`,
    },
  ],
  'UI/UX & Product Design': [
    {
      id: 'int_ux_1',
      specialization: 'UI/UX & Product Design',
      type: 'Technical',
      role: 'Product Designer (UI/UX)',
      title: 'Design Systems Architecture & Accessibility Audit',
      question: 'How do you architect a scalable design system in Figma and code that ensures WCAG AA compliance, rapid engineering handoff, and frictionless theming across web and mobile?',
      promptContext: 'Evaluates design tokens, atomic design methodology, component properties, accessibility contrast, and developer collaboration workflows.',
      expectedKeyPoints: [
        'Multi-tier token architecture: Global primitives -> Semantic tokens -> Component tokens.',
        'Accessibility guardrails: Color contrast minimums (4.5:1 text, 3:1 graphical), keyboard navigation focus states, and aria-labels.',
        'Component flexibility in Figma: Variants, boolean properties, auto-layout 5.0, and slot components.',
        'Developer handoff: Storybook synchronization, automated token exports (Style Dictionary), and zero-loss spec reviews.',
      ],
      modelAnswer: `I architect design systems around a 3-tier token hierarchy and atomic component governance:
1. Three-Tier Token Architecture:
- Global Primitives: Raw values (e.g., blue-500: #3b82f6, space-4: 16px).
- Semantic Tokens: Meaningful abstractions (e.g., surface-card, text-primary, border-interactive).
- Component Tokens: Scoped attributes (e.g., button-primary-bg). This allows instant dark-mode or white-label re-theming without altering component code.
2. Accessibility by Default:
Every semantic token pair is tested to guarantee WCAG 2.1 AA ratios (4.5:1 for body text, 3:1 for icons and focus rings). Focus states and active screen-reader targets are documented as first-class states.
3. Figma Structure & Developer Alignment:
Components leverage Auto Layout, interactive variant states, and strict naming matching the codebase. We use Style Dictionary to compile Figma variables directly into CSS/Tailwind variables, ensuring design and engineering are always in 1:1 parity.`,
    },
    {
      id: 'int_ux_2',
      specialization: 'UI/UX & Product Design',
      type: 'Case-based',
      role: 'Product Designer (UI/UX)',
      title: 'Mobile Checkout Cart Abandonment Redesign',
      question: 'An e-commerce mobile app has a 58% drop-off between cart view and completed payment. Walk me through how you would conduct user research, isolate friction points, and prototype an optimized checkout flow.',
      promptContext: 'Evaluates user journey mapping, qualitative user testing, cognitive load reduction, and usability metrics.',
      expectedKeyPoints: [
        'Qualitative and quantitative discovery: Heatmaps, drop-off step telemetry, 5-user usability interviews.',
        'Cognitive load reduction: One-page accordion checkout, guest checkout without forced account creation, clear progress steps.',
        'Friction elimination: Auto-fill addresses with Google Places API, express 1-click wallets (Apple Pay, Google Pay, UPI).',
        'Transparent cost communication: Show taxes, shipping fees, and estimated delivery dates upfront in the cart.',
      ],
      modelAnswer: `To resolve the 58% cart drop-off, I would follow a human-centered design sprint:
1. Discovery & Journey Mapping:
Analyze session replays and conduct 5 moderated user tests. Common culprits are forced registration, unexpected shipping charges at the final step, and tedious credit card entry.
2. Conceptual Redesign:
- Progressive Disclosure: Replace a 4-page sequence with a clean single-screen accordion or bottom-sheet showing Order Summary, Shipping, and Payment.
- Frictionless Identity: Provide Guest Checkout with optional 1-tap passwordless account creation post-purchase.
- Express Payment Integration: Put Apple Pay, Google Pay, and UPI front-and-center, reducing checkout input from 14 fields to a single biometric confirmation.
- Transparent Pricing: Display all taxes and shipping estimates directly in the cart before the user clicks 'Proceed'.
3. Validation:
Prototype the interactive flow in Figma, test with 5 target users for task completion speed and System Usability Scale (SUS), then run an A/B test tracking Checkout Completion Rate and Average Order Value.`,
    },
  ],
  'Management Consulting & Strategy': [
    {
      id: 'int_cons_1',
      specialization: 'Management Consulting & Strategy',
      type: 'Case-based',
      role: 'Management Consultant / Associate',
      title: 'Market Entry & Commercial Due Diligence: EV Two-Wheelers',
      question: 'A leading European automotive manufacturer wants to evaluate entering the Indian electric two-wheeler market within the next 18 months. How would you structure this engagement and deliver a go/no-go recommendation?',
      promptContext: 'Classic market entry case interview. Requires MECE framework, market sizing, competitive landscape, regulatory subsidies, unit economics, and operational risks.',
      expectedKeyPoints: [
        'Market Attractiveness: Market size estimation, CAGR, consumer adoption curve, state FAME-II/production subsidies.',
        'Competitive Dynamics: Incumbent ICE players transitioning vs well-funded EV startups (Ola, Ather, TVS), charging infrastructure barriers.',
        'Client Capabilities: Brand equity, European engineering, supply chain localization (battery cell procurement, motor manufacturing).',
        'Entry Strategy & Financial Feasibility: Organic greenfield setup vs Joint Venture vs M&A, CAPEX, breakeven time horizon.',
      ],
      modelAnswer: `I will structure the market entry evaluation into four MECE pillars:
1. Market Attractiveness & Sizing:
- Estimate Total Addressable Market (TAM): ~20M two-wheelers sold annually in India. With a projected 30% EV penetration by 2030, SAM is 6M units/year.
- Customer Segments: Daily urban commuters (price & battery life sensitive) vs Premium enthusiasts (performance & styling).
- Regulatory Enablers: FAME/EMPS subsidies, GST benefits (5% on EVs vs 28% on ICE), and state-level EV incentives.
2. Competitive Landscape & Moats:
- Incumbent giants (Bajaj, TVS) possess vast nationwide dealership networks.
- Pure EV startups (Ola, Ather) have established brand momentum and digital sales channels.
- Client's European premium positioning must offer clear differentiation: superior safety standards, removable battery ecosystems, or battery-as-a-service (BaaS).
3. Strategic Modes of Entry:
- Greenfield Plant: High CAPEX ($150M+), 24-month delay to comply with 50% domestic value addition (DVA) regulations.
- Joint Venture / Strategic Partnership: Partner with an established Indian OEM for manufacturing and distribution while providing powertrain technology. This optimizes time-to-market and lowers regulatory risk.
4. Recommendation & Roadmap:
Recommend a "Phased Partnership Entry": Pilot with a local assembly partner targeting Tier-1 urban centers with a premium commuter model, achieving positive unit economics before committing to domestic gigafactory investments.`,
    },
    {
      id: 'int_cons_2',
      specialization: 'Management Consulting & Strategy',
      type: 'Situational',
      role: 'Management Consultant / Associate',
      title: 'Managing Executive Disagreement & Conflicting Strategic Hypotheses',
      question: 'During a corporate strategy project, your client CEO is emotionally committed to acquiring a $200M competitor. Your team’s financial due diligence reveals severe customer churn and negative net synergies. How do you communicate this findings in the steering committee meeting without alienating the leadership?',
      promptContext: 'Tests executive communication, stakeholder management, pyramid principle, and objective data storytelling under pressure.',
      expectedKeyPoints: [
        'Adopt the Minto Pyramid Principle: Lead with the bottom line (recommendation) backed by structured logic.',
        'Pre-wire the meeting: Review key findings with the VP of Strategy or CFO before the executive committee.',
        'Focus on objective data and sensitivity models rather than emotional criticism of the CEO’s thesis.',
        'Provide strategic alternatives that still satisfy the CEO’s overarching growth objective (e.g. acqui-hire, organic product build, or earn-out deal structure).',
      ],
      modelAnswer: `When delivering disappointing strategic findings to senior executives, I employ a three-step stakeholder alignment protocol:
1. Pre-wire Key Stakeholders:
Never surprise a CEO in a public boardroom. Meet 1-on-1 with the CEO and CFO prior to the steering committee to share the emerging data as a collaborative "early sanity check."
2. Apply the Pyramid Principle with Sensitivity Modeling:
Frame the conversation around the CEO's original objective—accelerating market expansion. Present our findings objectively: "While the target company offers strong brand recognition, our empirical audit of their last 8 cohorts reveals a 38% annual churn rate. At the current $200M valuation, negative net synergies erode shareholder value by $35M."
3. Present Constructive Alternative Paths:
Instead of saying "No," provide actionable alternatives:
- Restructure the deal: Lower upfront valuation to $110M with performance-contingent earn-outs tied to customer retention.
- Reallocate capital: Use $80M to accelerate in-house R&D and targeted acqui-hiring, which yields a 2.4x higher projected NPV with zero integration debt. This preserves executive alignment while safeguarding the firm's capital.`,
    },
  ],
  Finance: [
    {
      id: 'int_fin_1',
      specialization: 'Finance',
      type: 'Technical',
      role: 'Financial Analyst',
      title: '3-Statement Flow: $100 Depreciation Walkthrough',
      question: 'Walk me through the three financial statements if Depreciation increases by $100. Assume a 20% corporate tax rate.',
      promptContext: 'Standard technical accounting question in Wall Street and FP&A interviews. Walk systematically through Income Statement, Cash Flow Statement, and Balance Sheet.',
      expectedKeyPoints: [
        'Income Statement: Operating Income drops by $100. Taxes decrease by $20. Net Income drops by $80.',
        'Cash Flow Statement: Start with Net Income (-$80). Add back non-cash Depreciation (+$100). Net cash increases by +$20.',
        'Balance Sheet: Cash is up +$20. Net PP&E drops by -$100. Total Assets down by -$80.',
        'Balance Sheet Equity: Retained Earnings drops by -$80. Both sides balance at -$80.',
      ],
      modelAnswer: `1. Income Statement: Operating Income drops by $100. At a 20% tax rate, taxes decrease by $20, so Net Income drops by $80.
2. Cash Flow Statement: Net Income starts at -$80. Since depreciation is a non-cash charge, we add back the entire $100 under Operating Cash Flow. Net cash increases by +$20 due to the interest/depreciation tax shield.
3. Balance Sheet: On the Assets side, Cash is up +$20, but Net PP&E is down -$100 (accumulated depreciation). Total Assets decrease by -$80. On the Liabilities & Equity side, Retained Earnings drops by -$80. Both sides decrease by $80 and balance.`,
    },
    {
      id: 'int_fin_2',
      specialization: 'Finance',
      type: 'Case-based',
      role: 'Investment Banking Analyst',
      title: 'M&A Accretion / Dilution Rapid Case',
      question: 'Company A acquires Company B for $500M in a 100% stock deal with no synergies. Company A has a P/E of 20x and Company B has a P/E of 10x. Is the acquisition accretive or dilutive to Company A’s EPS? Explain the intuitive rule.',
      promptContext: 'Evaluates candidate intuition on share issuance vs earnings acquired in all-stock deals.',
      expectedKeyPoints: [
        'The deal is accretive to Company A’s EPS.',
        'Rule in 100% stock deals: If Acquirer P/E > Target P/E, the deal is accretive.',
        'Company A trades at 20x (yield of 5%), while Company B trades at 10x (yield of 10%).',
        'Company A is issuing highly-valued stock to acquire relatively cheaper earnings.',
      ],
      modelAnswer: `The transaction is accretive to Company A's EPS.
In an all-stock transaction without synergies, if the Acquirer's P/E multiple is greater than the Target's P/E multiple, the deal is accretive.
Company A trades at 20x earnings (an earnings yield of 5%), while Company B trades at 10x earnings (an earnings yield of 10%). Because Company A is issuing shares that cost 20 dollars per dollar of earnings to buy earnings that cost only 10 dollars, the consolidated earnings per share will increase.`,
    },
    {
      id: 'int_fin_3',
      specialization: 'Finance',
      type: 'HR',
      role: 'Financial Analyst',
      title: 'Why Corporate Finance & Financial Modeling?',
      question: 'Why did you choose a specialization in Finance, and how have you prepared yourself for the rigorous analytical demands of an analyst position?',
      promptContext: 'Evaluates candidate motivation, quantitative curiosity, and proactive project experience.',
      expectedKeyPoints: [
        'Specific spark or catalyst (investment club, stock pitch, financial modeling projects)',
        'Enjoys connecting numerical data to strategic business decisions',
        'Concrete skill mastery: 3-statement modeling, Excel shortcuts, DCF sensitivities',
        'Commitment to detail, accuracy, and executive communication',
      ],
      modelAnswer: `I chose Finance because I love being at the nexus of strategic business decision-making and quantitative discipline. During my studies and hands-on projects, I realized that a financial model isn't just rows of numbers—it's the financial roadmap of an organization's commercial narrative.
To prepare, I built full 3-statement forecast models, mastered dynamic Excel functions like XLOOKUP and two-way sensitivity data tables, and practiced DCF valuations on public companies. I look forward to bringing that rigor and precision to the analyst team.`,
    },
  ],
  Marketing: [
    {
      id: 'int_mkt_1',
      specialization: 'Marketing',
      type: 'Technical',
      role: 'Brand Manager',
      title: 'Positioning Statement & Brand Architecture',
      question: 'Walk me through how you would construct a formal brand positioning statement for a new premium organic beverage launching against entrenched FMCG players.',
      promptContext: 'Tests candidate mastery of STP (Segmentation, Targeting, Positioning) and the 4-part positioning formula.',
      expectedKeyPoints: [
        'Target Audience definition (e.g. urban health-conscious Gen Z / Millennials)',
        'Frame of Reference / Category (e.g. ready-to-drink functional wellness beverages)',
        'Point of Difference (POD) / Core Benefit (e.g. 100% cold-pressed with zero added sugar)',
        'Reason to Believe (RTB) (e.g. certified organic farms and cold-chain distribution)',
      ],
      modelAnswer: `A classical positioning statement follows the formula: For [Target Segment], [Brand] is the [Frame of Reference] that delivers [Point of Difference/Benefit], because [Reason to Believe].
For example: 'For health-conscious urban professionals seeking clean everyday vitality, PureZen is the premium cold-pressed wellness beverage that delivers sustained energy with zero sugar crashes, because our drinks are 100% farm-sourced within 24 hours with clinically verified adaptogens.' This guides every packaging, pricing, and campaign choice.`,
    },
    {
      id: 'int_mkt_2',
      specialization: 'Marketing',
      type: 'Case-based',
      role: 'Digital Marketing Specialist',
      title: 'D2C CAC Escalation & ROAS Turnaround Case',
      question: 'A D2C personal care brand finds that its Customer Acquisition Cost (CAC) on Meta ads jumped from $20 to $45 over the past 3 months while conversion rate dropped 40%. How would you diagnose the root cause and propose an action plan?',
      promptContext: 'Evaluates analytical diagnostic capability, full-funnel thinking, and creative vs audience optimization.',
      expectedKeyPoints: [
        'Deconstruct the funnel: Ad CTR -> Landing page bounce rate -> Add-to-cart -> Checkout completion.',
        'Analyze creative fatigue and audience saturation (frequency creeping above 3.5+).',
        'Landing page friction: speed, price changes, or poor mobile UX.',
        'Action plan: Refresh creatives (UGC videos), test lookalike vs broad audiences, optimize mobile checkout, and leverage email/SMS retention to lift LTV.',
      ],
      modelAnswer: `I would dissect the funnel systematically across three stages:
1. Top-of-Funnel (Ad Level): Check ad frequency, CPMs, and CTR. If frequency is over 3.5 and CTR dropped, creative fatigue and audience saturation are the culprit. Fix: Launch 10 new UGC video variations with hook testing.
2. Middle-of-Funnel (Landing Page): If CTR is high but bounce rate jumped, examine page load speed, messaging mismatch, or pricing friction. Fix: A/B test a dedicated mobile landing page with social proof and bundle discounts.
3. Retention Buffer: While acquisition CAC is high, immediately turn on automated post-purchase email/SMS replenishment flows to drive second-order repurchase within 45 days, defending overall blended ROAS.`,
    },
  ],
  'Human Resources (HR)': [
    {
      id: 'int_hr_1',
      specialization: 'Human Resources (HR)',
      type: 'Technical',
      role: 'HR Business Partner (HRBP)',
      title: 'Designing a High-Retention Onboarding & 90-Day Plan',
      question: 'Studies show that up to 20% of employee turnover occurs within the first 45 days. As an HRBP, how would you architect a 30-60-90 day onboarding framework that accelerates time-to-productivity and maximizes retention?',
      promptContext: 'Evaluates candidate understanding of employee life-cycle, cultural assimilation, and measurable milestones.',
      expectedKeyPoints: [
        'Days 1-30: Assimilation, buddy system, tools access, culture immersion, and clear role expectations.',
        'Days 31-60: First tangible deliverable, structured manager 1-on-1s, skill enablement, and peer integration.',
        'Days 61-90: Independent project ownership, first quarterly review, formal feedback loop, and development roadmap.',
        'Key metrics: 90-day retention, time to first autonomous commit/ticket, and onboarding eNPS score.',
      ],
      modelAnswer: `A successful onboarding plan balances cultural assimilation with early operational clarity:
- Days 1 to 30 (Listen & Learn): Pair the new hire with a seasoned peer 'buddy'. Focus on tools access, understanding internal stakeholders, and shadowing. Conduct a Day-30 check-in on role clarity and team dynamics.
- Days 31 to 60 (Contribute & Align): Give the employee their first contained, high-confidence project deliverable. Calibrate expectations with bi-weekly manager 1-on-1s and provide feedback on communication norms.
- Days 61 to 90 (Own & Execute): Transition to full operational autonomy. At Day 90, conduct a formal review covering goals achieved, development opportunities, and an onboarding feedback survey to continually refine the HR process.`,
    },
    {
      id: 'int_hr_2',
      specialization: 'Human Resources (HR)',
      type: 'Situational',
      role: 'Talent Acquisition Specialist',
      title: 'Handling Counter-Offers and Candidate Ghosting',
      question: 'Your top engineering candidate has verbally accepted your offer for a critical role, but on joining day calls to say their current employer offered a 30% retention bonus and higher title. How do you handle this situation professionally?',
      promptContext: 'Examines candidate negotiation composure, identifying core motivations beyond salary, and risk mitigation.',
      expectedKeyPoints: [
        'Maintain professional composure; do not respond with emotional pressure.',
        'Revisit the candidate’s core catalyst for seeking a change (career growth, culture, autonomy, tech stack).',
        'Address the counter-offer reality: statistically, 70%+ of employees who take counter-offers leave within 12 months.',
        'Determine if your firm can adjust compensation within equity bands, and keep backup candidates warm.',
      ],
      modelAnswer: `First, I would thank the candidate for being transparent and listen without judgment.
Second, I would revisit the primary reasons they wanted to leave their current organization in the first place—which are almost always related to learning ceiling, culture, or leadership autonomy, rather than purely compensation. I would remind them: 'A counter-offer solves a temporary symptom, but the underlying reason you interviewed with us hasn't changed, and research shows most counter-offer recipients leave within a year anyway.'
Third, if compensation is genuinely the deciding factor, I would check with leadership if we can adjust signing incentives within internal pay equity bands. If not, I would respect their decision, wish them well, and activate our shortlisted silver-medalist candidate immediately.`,
    },
  ],
  'Business Analytics': [
    {
      id: 'int_ba_1',
      specialization: 'Business Analytics',
      type: 'Technical',
      role: 'Business Intelligence Analyst',
      title: 'Star Schema vs Snowflake Schema Design',
      question: 'When designing an enterprise data warehouse for e-commerce sales analytics, when would you recommend a Star Schema over a Snowflake Schema, and why does Power BI prefer Star Schemas?',
      promptContext: 'Evaluates data modeling fundamentals, query performance, and BI tool architecture.',
      expectedKeyPoints: [
        'Star Schema: Central fact table connected to de-normalized dimension tables with single-hop relationships.',
        'Snowflake Schema: Dimension tables are normalized into sub-dimensions (multi-hop joins).',
        'Power BI preference: Star schema drastically simplifies DAX, reduces join overhead in memory, and maximizes VertiPaq engine compression.',
      ],
      modelAnswer: `I would recommend a Star Schema for almost all enterprise reporting and Power BI models.
In a Star Schema, a central Fact Table (such as Sales Transactions) is connected directly to single-layer Dimension Tables (Date, Customer, Product, Store).
While a Snowflake Schema normalizes dimensions to save disk storage, modern analytics prioritizes query speed and simplicity over minor disk savings.
Power BI's VertiPaq columnar in-memory engine is purpose-built for Star Schemas—it optimizes memory compression, minimizes expensive table joins, and makes writing intuitive DAX measures significantly faster and less prone to circular relationship errors.`,
    },
    {
      id: 'int_ba_2',
      specialization: 'Business Analytics',
      type: 'Case-based',
      role: 'Data Analytics Consultant',
      title: 'Investigating a Drop in Daily Active Users (DAU)',
      question: 'A ride-hailing app shows a 15% decline in Daily Active Users (DAU) over the last 14 days in one metro city. As the lead analyst, what structured diagnostic framework would you execute?',
      promptContext: 'Tests structured problem breakdown, hypothesis generation, data segmentation, and external factor analysis.',
      expectedKeyPoints: [
        'Step 1: Validate data integrity (tracking pixel bug, app update logging errors).',
        'Step 2: Segment user population (New vs Existing vs Power users; iOS vs Android; app version).',
        'Step 3: Internal drivers (surge pricing changes, driver cancellations, UI app crash rates).',
        'Step 4: External drivers (weather/monsoon, local festival, competitor aggressive coupon blitz, transit strikes).',
      ],
      modelAnswer: `I would diagnose the DAU drop using a 4-step root-cause tree:
1. Verify Data & Metric Hygiene: Confirm the drop isn't a telemetry or logging defect. Check if a recent mobile app build stopped logging session events on specific OS versions.
2. Segment the Audience: Is the drop localized to new user acquisition, or are existing habitual commuters churning? Is it concentrated in specific neighborhoods or pick-up hubs like airports and IT corridors?
3. Analyze Funnel & Service Health: Check driver-side metrics—did driver cancellations spike, wait times increase, or did pricing algorithms raise surge multipliers? High wait times directly kill app retention.
4. Check Macro & Competitor Shocks: Review external factors—did a competitor launch 50% discount vouchers? Was there heavy rainfall or public transit disruption?
Synthesizing these cuts pinpoints whether the issue is technical, operational, or competitive.`,
    },
  ],
  'Agri-Business Management': [
    {
      id: 'int_agri_1',
      specialization: 'Agri-Business Management',
      type: 'Technical',
      role: 'Agri Supply Chain Manager',
      title: 'Mitigating Perishable Cold-Chain Post-Harvest Losses',
      question: 'India loses an estimated 15-20% of fruits and vegetables between the farm gate and retail shelves. How would you design a farm-to-fork supply chain for a fresh produce retailer that cuts waste below 5%?',
      promptContext: 'Evaluates understanding of farm gate logistics, pre-cooling, cold chain tracking, and demand-supply matching.',
      expectedKeyPoints: [
        'Farm-gate aggregation & rapid pre-cooling within 3 hours of harvest.',
        'Temperature-controlled transit with IoT GPS sensors tracking reefer van temperature.',
        'Cross-docking regional distribution centers (DCs) that eliminate multi-day storage.',
        'Dynamic predictive demand forecasting to match daily harvest orders with retail demand.',
      ],
      modelAnswer: `To drive post-harvest losses below 5%, I would implement an integrated 4-pillar logistics architecture:
1. Farm-Gate Rapid Pre-Cooling: Establish village-level collection centers equipped with modular hydro-coolers to strip out field heat within 3 hours of plucking, halting metabolic decay.
2. IoT Monitored Reefer Fleet: Move produce in multi-temperature reefer vehicles with real-time temperature loggers alerting ops teams to any cold chain breaks.
3. Cross-Dock Hub Architecture: Instead of storing inventory in intermediate warehouses, use cross-docking where produce arriving from farms at 2 AM is sorted, crate-graded, and dispatched to retail outlets by 6 AM.
4. Algorithmic Demand-Harvest Balancing: Connect store-level POS demand directly to harvest quotas 24 hours in advance, ensuring we never harvest excess perishable volumes that sit on shelves.`,
    },
  ],
  'Healthcare Management': [
    {
      id: 'int_health_1',
      specialization: 'Healthcare Management',
      type: 'Technical',
      role: 'Hospital Operations Executive',
      title: 'Optimizing Emergency Department (ED) Overcrowding & Bed Turnaround',
      question: 'Your 300-bed multispecialty hospital faces persistent Emergency Department overcrowding, with patients waiting up to 4 hours for an inpatient bed. How would you systematically diagnose and fix this operational bottleneck?',
      promptContext: 'Examines hospital discharge processes, triage workflows, housekeeping bed turnaround, and inter-departmental communication.',
      expectedKeyPoints: [
        'Diagnosis: Check Discharge vs Admission timing curve (discharge orders written at 2 PM while ED admissions peak at 11 AM).',
        'Emergency Triage: Implement the Emergency Severity Index (ESI 1 to 5) to fast-track low-acuity cases.',
        'Bed Turnaround Time: Housekeeping notification automation and bed cleaning SLAs (under 30 minutes).',
        'Discharge Lounge: Move medically discharged patients waiting for family/billing out of inpatient rooms.',
      ],
      modelAnswer: `Emergency Department crowding is rarely an ED-only problem; it is an inpatient bed flow bottleneck:
1. Diagnosis: Plot the discharge curve versus admission curve. In most hospitals, doctors write discharge summaries at 2 PM, while emergency admissions arrive continuously from 10 AM onward. This creates a 4-hour artificial bed deficit.
2. Morning Discharge Protocol: Mandate that stable discharge rounds occur before 10 AM, with preliminary billing completed the evening prior.
3. Establish a Discharge Hospitality Lounge: Once medically cleared, patients waiting for pharmacy pickup or family transit wait in a comfortable lounge, freeing the physical bed for deep cleaning immediately.
4. Automated Housekeeping SLAs: Equip housekeeping with mobile alerts when a patient vacates, setting a strict 30-minute terminal cleaning SLA.
These interventions synchronize bed releases with ED intake and drop boarding times under 60 minutes.`,
    },
  ],
  'Supply Chain Management': [
    {
      id: 'int_scm_1',
      specialization: 'Supply Chain Management',
      type: 'Technical',
      role: 'Supply Chain Analyst',
      title: 'Diagnosing Inventory Stockouts vs Holding Cost Surges',
      question: 'Our high-velocity consumer electronics SKU experienced an unexpected 18% stockout rate during Q3, yet total working capital tied up in slow-moving inventory rose by 25%. As our Supply Chain Analyst, how would you systematically diagnose the root cause and optimize the reorder policy?',
      promptContext: 'Evaluates inventory optimization, ABC-XYZ stratification, lead-time variance, safety stock modeling, and vendor lead-time SLAs.',
      expectedKeyPoints: [
        'ABC-XYZ Stratification: Separate fast-moving high-value SKUs from slow-moving erratic demand items.',
        'Lead-time and Demand Variance: Decompose safety stock into demand uncertainty vs supplier lead-time variability.',
        'Vendor SLA & Lead Time Compliance: Audit actual vendor ship times versus contracted procurement lead times.',
        'Dynamic Reorder Points: Implement automated reorder point (ROP) calculation with dynamic service levels (98% for A items, 90% for C items).',
      ],
      modelAnswer: `To resolve the dual challenge of stockouts on fast-movers and excess capital on slow-movers, I would deploy a 4-step diagnostic and remediation plan:
1. Multi-Dimensional ABC-XYZ Matrix: Stratify the entire inventory catalog. SKUs with high velocity and predictable demand (AX) need tight pull replenishment with lower safety stocks, while erratic items (CZ) should transition to make-to-order or minimum lot sizes to unlock the 25% tied-up capital.
2. Safety Stock Formula Decomposition: Calculate Safety Stock = Z × √(L × σ_d² + d² × σ_L²). This reveals whether the 18% stockouts were caused by demand surges (σ_d) or supplier lead time unreliability (σ_L).
3. Vendor OTIF Audit: Benchmark supplier On-Time In-Full (OTIF) performance. If suppliers missed promised lead-time windows by 4-7 days without notification, enforce SLA penalty clauses and establish dual-sourcing contracts.
4. Dynamic ERP Reorder Triggers: Replace static monthly order batches with automated Reorder Points (ROP = d × L + SS) tied to real-time Point of Sale data, ensuring high-runner SKUs trigger purchase orders the moment stock hits threshold.`,
    },
    {
      id: 'int_scm_2',
      specialization: 'Supply Chain Management',
      type: 'Case-based',
      role: 'Supply Chain Analyst',
      title: 'Carrier Freight Optimization & Logistics Redesign',
      question: 'Our e-commerce fulfillment network faces a 32% increase in last-mile freight costs and rising transit delays. How would you redesign logistics distribution, carrier contracts, and cross-docking hubs to compress delivery windows while reducing cost per parcel?',
      promptContext: 'Tests understanding of hub-and-spoke networks, multi-modal transportation, zone skipping, and carrier rate negotiations.',
      expectedKeyPoints: [
        'Zone Skipping & Regional Fulfillment Centers: Place inventory closer to customer clusters to shift parcels from Zone 6/7 to Zone 2.',
        'Dynamic Carrier Allocation: Blend national carriers (FedEx/UPS/DHL) with regional courier networks using rate-shopping APIs.',
        'Cross-Docking Hubs: Streamline transfers from long-haul linehaul trucks to local delivery vans without intermediate storage.',
        'Packaging & Dimensional Weight (DIM) Optimization: Reduce void fill and carton sizing to lower volumetric freight charges.',
      ],
      modelAnswer: `To compress last-mile transit times while driving down parcel freight costs by 15-20%, I would implement a strategic 4-part logistics overhaul:
1. Inventory Decentralization & Zone Skipping: Analyze heatmaps of order delivery zip codes. Moving inventory from a single central warehouse to 3 regional fulfillment nodes shifts shipments from expensive Zone 6-8 freight to low-cost local Zone 2-3 delivery, drastically reducing linehaul charges.
2. Dynamic Rate-Shopping API: Integrate multi-carrier logistics routing that programmatically chooses the most cost-effective provider between national linehaul partners and local courier fleets based on parcel weight and delivery promise SLAs.
3. Cross-Docking Regional Hubs: Establish cross-dock transfer points where inbound palletized shipments arriving at 3 AM are immediately sorted and loaded onto localized delivery vans by 6 AM, bypassing warehouse shelving costs and eliminating 24-48 hours of transit buffer.
4. Cartonization & DIM Weight Reduction: Implement automated carton-recommendation software to cut package air volume by 22%, eliminating volumetric surcharge penalties.`,
    },
  ],
  'Operations Management': [
    {
      id: 'int_ops_1',
      specialization: 'Operations Management',
      type: 'Technical',
      role: 'Operations Manager',
      title: 'Resolving Critical Manufacturing Bottlenecks & Line Imbalance',
      question: 'A 5-station assembly line produces 40 finished units per hour against a customer demand requirement (Takt Time) of 55 units per hour. Station 3 takes 90 seconds while Stations 1, 2, 4, and 5 average 55 seconds. As Operations Manager, how do you apply the Theory of Constraints and Lean principles to meet target throughput?',
      promptContext: 'Examines Theory of Constraints, bottleneck exploitation, line balancing, takt time synchronization, and SMED/Kaizen.',
      expectedKeyPoints: [
        'Identify & Exploit the Bottleneck: Station 3 (90 sec) is the pacing constraint (Drum) capping line output at 40 units/hr (3600/90).',
        'Takt Time Calculation: Target is 55 units/hr, meaning Takt Time = 3600 / 55 = 65.45 seconds per unit.',
        'Offload & Rebalance: Redistribute 30 seconds of tasks from Station 3 to Station 2 or 4, or introduce parallel work-sharing.',
        'Subordinate & Buffer: Place a buffer inventory (Rope) before Station 3 so it never starves, and run 5S/SMED to eliminate Station 3 micro-stoppages.',
      ],
      modelAnswer: `To meet customer demand of 55 units/hr, we must synchronize line cycle time with Takt Time using Goldratt's Theory of Constraints:
1. Bottleneck Identification: Station 3 is the system constraint. At 90 seconds per unit, maximum line capacity is 3,600 / 90 = 40 units/hr. Customer requirement is 55 units/hr, requiring a Takt Time of 3,600 / 55 = 65.45 seconds per unit.
2. Work Element Rebalancing: Conduct a time-and-motion study on Station 3. Break its 90-second cycle into distinct work elements. Reassign 28-30 seconds of non-specialized assembly tasks to Station 2 (currently at 55s) or Station 4 (55s). This balances Station 3 down to ~62 seconds, safely below Takt Time.
3. Exploit the Constraint: Ensure Station 3 never starves or blocks by maintaining a physical 10-unit buffer upstream and scheduling relief operators during shift breaks so Station 3 runs continuously.
4. SMED & Mistake-Proofing (Poka-Yoke): Implement Single-Minute Exchange of Die (SMED) to eliminate changeover downtime and tool searching at Station 3.
This brings line throughput to 58 units/hour (+45% increase) with zero additional capital expenditure.`,
    },
    {
      id: 'int_ops_2',
      specialization: 'Operations Management',
      type: 'Case-based',
      role: 'Operations Manager',
      title: 'Six Sigma DMAIC Turnaround for Rising Scrap & Defect Rates',
      question: 'During the past two quarters, scrap rates at our precision manufacturing unit spiked from 1.8% to 6.2%, causing $420,000 in material losses and delivery delays. Walk me through how you would structure a Six Sigma DMAIC project to return the process to under 1.5% scrap.',
      promptContext: 'Demonstrates mastery of DMAIC phases, Fishbone RCA, Statistical Process Control (SPC), and Control Plan sustainment.',
      expectedKeyPoints: [
        'Define: Problem statement, baseline metrics ($420k loss, 6.2% scrap), team charter, and VOC.',
        'Measure: Gage R&R audit on measurement systems, Pareto chart on defect categories to isolate the top 80% contributors.',
        'Analyze: Ishikawa (Fishbone) diagram, 5 Whys, and hypothesis testing (ANOVA/Regression) correlating temperature/feed rate to scrap.',
        'Improve: Design of Experiments (DOE) to determine optimal operating parameters, Poka-Yoke fixture redesign.',
        'Control: Statistical Process Control (SPC) X-bar/R control charts, SOP standard work training, and weekly scrap audits.',
      ],
      modelAnswer: `I would lead a cross-functional Six Sigma DMAIC project structured as follows:
1. Define: Quantify the business impact: reducing scrap from 6.2% to <1.5% preserves $320,000 annualized EBITDA. Define a clear project charter with the plant manager and process engineering leads.
2. Measure: First, run a Gage R&R (Repeatability & Reproducibility) study to ensure sensor measurement variance is under 10%. Next, plot a Pareto chart of scrap defects. Typically, 80% of scrap stems from 1 or 2 defects (e.g., thermal warpage and dimensional out-of-roundness).
3. Analyze: Conduct an Ishikawa Fishbone session with line technicians covering Machine, Method, Material, and Measurement. Use 5 Whys and multiple regression to prove root causes—for example, discovering that raw material batch hardness variations coupled with cutting fluid temperature spikes beyond 45°C directly triggered tool deflection.
4. Improve: Execute a 2-factor Design of Experiments (DOE) to identify the optimal tooling speed and chiller coolant settings. Install automated temperature shut-off interlocks (Poka-Yoke) preventing the lathe from cycling if coolant exceeds 38°C.
5. Control: Institute real-time SPC X-bar and R charts on the shop floor with automated out-of-control warning limits. Update Standard Operating Procedures (SOPs) and verify capability indices (Cpk ≥ 1.33) over 60 consecutive production shifts to lock in gains permanently.`,
    },
  ],
};

export const careerPathsBySpecialization: Record<string, CareerPathOption[]> = {
  'Software Engineering & Tech': [
    {
      id: 'cp_swe_1',
      specialization: 'Software Engineering & Tech',
      title: 'Full Stack Software Engineer',
      matchScore: 92,
      description: 'Architect, build, and deploy end-to-end web applications, scalable backend REST/GraphQL microservices, and modern responsive frontends.',
      averageStartingSalary: '$95,000 – $135,000 / ₹14 - 24 LPA',
      topEmployers: ['Google', 'Meta', 'Stripe', 'Amazon', 'Atlassian', 'Top Startups'],
      coreCompetencies: ['TypeScript / Node.js', 'React & State Management', 'PostgreSQL / Redis', 'Docker & CI/CD Pipelines'],
      skillGap: 'Expand distributed consensus patterns and deep system telemetry.',
      typicalProgression: 'Software Engineer (L3) → Mid-Level (L4) → Senior Engineer (L5) → Staff Architect (L6) → VP Engineering',
      requiredCertifications: ['AWS Certified Solutions Architect (Recommended)', 'Certified Kubernetes Application Developer (CKAD)'],
    },
    {
      id: 'cp_swe_2',
      specialization: 'Software Engineering & Tech',
      title: 'Cloud Infrastructure & DevOps Engineer',
      matchScore: 84,
      description: 'Design highly available multi-region cloud infrastructure, automate deployment pipelines, and enforce zero-trust network security.',
      averageStartingSalary: '$100,000 – $140,000 / ₹15 - 26 LPA',
      topEmployers: ['Datadog', 'Cloudflare', 'Microsoft Azure', 'HashiCorp', 'Uber'],
      coreCompetencies: ['Terraform / IaC', 'Kubernetes & Docker', 'Linux Kernel & Networking', 'Prometheus / Grafana Telemetry'],
      skillGap: 'Strengthen multi-cluster mesh orchestration and cost optimization automation.',
      typicalProgression: 'DevOps Engineer → Cloud Architect → Principal Platform Engineer → VP Infrastructure',
      requiredCertifications: ['AWS DevOps Professional', 'Kubernetes CKA'],
    },
  ],
  'AI & Data Science': [
    {
      id: 'cp_ai_1',
      specialization: 'AI & Data Science',
      title: 'Machine Learning & Generative AI Engineer',
      matchScore: 91,
      description: 'Train, fine-tune, evaluate, and serve foundation models, embeddings, RAG pipelines, and deep neural networks in production environments.',
      averageStartingSalary: '$105,000 – $150,000 / ₹18 - 30 LPA',
      topEmployers: ['OpenAI', 'Google DeepMind', 'Anthropic', 'NVIDIA', 'Scale AI', 'Databricks'],
      coreCompetencies: ['Python & PyTorch', 'RAG & Vector Databases', 'Transformer Architectures', 'Model Evaluation & Quantization'],
      skillGap: 'Enhance agentic tool calling and streaming latency optimization.',
      typicalProgression: 'ML Engineer → Senior ML Scientist → Staff AI Researcher → Head of AI Solutions',
      requiredCertifications: ['TensorFlow/PyTorch Developer Certificate', 'DeepLearning.AI Specializations'],
    },
    {
      id: 'cp_ai_2',
      specialization: 'AI & Data Science',
      title: 'Data Scientist & Analytics Consultant',
      matchScore: 86,
      description: 'Design experimentation frameworks, lead causal inference and predictive modeling, and convert petabyte datasets into strategic business decisions.',
      averageStartingSalary: '$90,000 – $125,000 / ₹13 - 22 LPA',
      topEmployers: ['McKinsey QuantumBlack', 'Netflix', 'Airbnb', 'Spotify', 'Boston Consulting Group'],
      coreCompetencies: ['Statistical Modeling', 'Advanced SQL & DBT', 'A/B Testing Methodology', 'Executive Data Storytelling'],
      skillGap: 'Deepen Bayesian inference and production pipeline orchestration.',
      typicalProgression: 'Data Scientist → Lead Scientist → Director of Data & Insights → Chief Data Officer',
      requiredCertifications: ['Google Cloud Professional Data Engineer'],
    },
  ],
  'Product Management': [
    {
      id: 'cp_pm_1',
      specialization: 'Product Management',
      title: 'Associate Product Manager (APM / PM)',
      matchScore: 89,
      description: 'Lead cross-functional engineering, design, and business teams to conceptualize, prioritize, and launch high-impact digital products.',
      averageStartingSalary: '$90,000 – $130,000 / ₹15 - 25 LPA',
      topEmployers: ['Google APM Program', 'Uber', 'Salesforce', 'Figma', 'DoorDash'],
      coreCompetencies: ['Product Discovery & Wireframing', 'RICE Backlog Prioritization', 'Data Analytics (SQL/Mixpanel)', 'Agile Execution'],
      skillGap: 'Deepen technical architecture comprehension and pricing sensitivity models.',
      typicalProgression: 'APM → Product Manager → Senior PM → Group Product Manager (GPM) → VP Product → CPO',
      requiredCertifications: ['Reforge Product Leadership', 'Scrum Product Owner (CSPO)'],
    },
  ],
  'UI/UX & Product Design': [
    {
      id: 'cp_ux_1',
      specialization: 'UI/UX & Product Design',
      title: 'Product Designer (UI/UX)',
      matchScore: 90,
      description: 'Own end-to-end product design from user research and wireframing to high-fidelity Figma design systems, micro-interactions, and usability testing.',
      averageStartingSalary: '$85,000 – $125,000 / ₹12 - 22 LPA',
      topEmployers: ['Apple', 'Airbnb', 'Figma', 'Stripe', 'Google', 'Notion', 'Swiggy'],
      coreCompetencies: ['Figma & Design Systems', 'User Research & Journey Mapping', 'Interaction Design & Prototyping', 'WCAG Accessibility Standards'],
      skillGap: 'Refine motion prototyping and multi-platform responsive token handoff.',
      typicalProgression: 'Junior Product Designer → Product Designer → Senior Designer → Staff Design Lead → VP of Design / Head of Design',
      requiredCertifications: ['Nielsen Norman Group UX Master Certification', 'Google UX Design Professional Certificate'],
    },
    {
      id: 'cp_ux_2',
      specialization: 'UI/UX & Product Design',
      title: 'Design Systems & UI Engineer',
      matchScore: 85,
      description: 'Bridge the gap between design and engineering by maintaining scalable component libraries, design tokens, Storybook catalogs, and accessibility audits.',
      averageStartingSalary: '$95,000 – $135,000 / ₹14 - 24 LPA',
      topEmployers: ['GitHub', 'Shopify', 'Vercel', 'Uber', 'Spotify', 'Atlassian'],
      coreCompetencies: ['Design Token Architecture', 'React / Tailwind Component Specs', 'Storybook Documentation', 'Accessibility (a11y) Auditing'],
      skillGap: 'Strengthen automated visual regression testing pipelines.',
      typicalProgression: 'Design Systems Designer → Lead Design Technologist → Head of Design Systems',
      requiredCertifications: ['Certified Professional in Accessibility Core Competencies (CPACC)'],
    },
  ],
  'Management Consulting & Strategy': [
    {
      id: 'cp_cons_1',
      specialization: 'Management Consulting & Strategy',
      title: 'Management Consultant / Associate',
      matchScore: 88,
      description: 'Solve CEO-level strategic problems across market entry, operational turnaround, profitability optimization, and digital business transformation.',
      averageStartingSalary: '$105,000 – $145,000 / ₹18 - 30 LPA',
      topEmployers: ['McKinsey & Company', 'Boston Consulting Group (BCG)', 'Bain & Company', 'Strategy&', 'Oliver Wyman'],
      coreCompetencies: ['MECE Problem Structuring', 'Hypothesis-Driven Modeling', 'Executive Slide Communication', 'Commercial Due Diligence'],
      skillGap: 'Sharpen rapid top-down market sizing and executive boardroom synthesis.',
      typicalProgression: 'Associate / Business Analyst → Consultant → Engagement Manager / Project Leader → Associate Partner → Senior Partner / Director',
      requiredCertifications: ['Case In Point Master Certified', 'Project Management Professional (PMP)'],
    },
    {
      id: 'cp_cons_2',
      specialization: 'Management Consulting & Strategy',
      title: 'Corporate Strategy & BizOps Lead',
      matchScore: 86,
      description: 'Define multi-year company strategic roadmaps, lead competitor intelligence, evaluate M&A opportunities, and streamline high-impact business operations.',
      averageStartingSalary: '$95,000 – $135,000 / ₹16 - 26 LPA',
      topEmployers: ['Salesforce BizOps', 'Amazon Strategy', 'Google Strategy & Operations', 'Stripe', 'Flipkart'],
      coreCompetencies: ['Financial Due Diligence', 'Cross-Functional Strategy Execution', 'Competitive Intelligence', 'Unit Economics & Moat Analysis'],
      skillGap: 'Deepen quantitative sensitivity and post-merger integration planning.',
      typicalProgression: 'Strategy Analyst → Strategy Manager → Director of Strategic Planning → Chief Strategy Officer (CSO)',
      requiredCertifications: ['Corporate Strategy Specialization (Wharton/INSEAD)'],
    },
  ],
  Finance: [
    {
      id: 'cp_fin_1',
      specialization: 'Finance',
      title: 'Financial Analyst (Corporate FP&A)',
      matchScore: 88,
      description: 'Lead annual budget forecasting, monthly variance analysis, capital expenditure evaluation, and executive board reporting for enterprise corporations.',
      averageStartingSalary: '$75,000 – $92,000 / ₹12 - 16 LPA',
      topEmployers: ['Microsoft', 'Amazon', 'Johnson & Johnson', 'P&G', 'JPMorgan Chase'],
      coreCompetencies: ['Budgeting & Forecasting', 'Excel Dynamic Modeling', 'Variance Commentary', 'SQL/Tableau Basics'],
      skillGap: 'Needs deeper debt schedule modeling and power query automation.',
      typicalProgression: 'Financial Analyst (Y1-2) → Senior Analyst (Y3-4) → Finance Manager (Y5-7) → Director of FP&A → VP Finance',
      requiredCertifications: ['CFA Level 1 (Preferred)', 'Financial Modeling & Valuation Analyst (FMVA)'],
    },
    {
      id: 'cp_fin_2',
      specialization: 'Finance',
      title: 'Investment Banking Analyst',
      matchScore: 74,
      description: 'Advise corporate clients on M&A transactions, capital raises, financial restructuring, and build complex pitchbooks and valuation models.',
      averageStartingSalary: '$110,000 – $135,000 / ₹22 - 32 LPA + Bonus',
      topEmployers: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Evercore', 'Lazard'],
      coreCompetencies: ['Complex 3-Statement Modeling', 'LBO & DCF Valuation', 'M&A Accretion/Dilution', 'High-Pressure Technical Polish'],
      skillGap: 'Significant gap in advanced DCF terminal value sensitivity and speed modeling.',
      typicalProgression: 'Analyst (Y1-3) → Associate (Y4-6) → VP (Y7-9) → Managing Director',
      requiredCertifications: ['CFA (Candidate)', 'Wall Street Prep / BIWS Certification'],
    },
    {
      id: 'cp_fin_3',
      specialization: 'Finance',
      title: 'Credit & Risk Analyst',
      matchScore: 84,
      description: 'Assess borrower creditworthiness, calculate debt service coverage ratios (DSCR), model default probabilities, and structure loan facilities.',
      averageStartingSalary: '$72,000 – $88,000 / ₹11 - 15 LPA',
      topEmployers: ['Moody’s', 'S&P Global', 'Standard Chartered', 'HSBC', 'Bank of America'],
      coreCompetencies: ['Solvency & Liquidity Ratios', 'Cash Flow Volatility Modeling', 'Covenant Compliance', 'Commercial Underwriting'],
      skillGap: 'Strong foundation in DuPont and coverage metrics; ready for commercial underwriting cases.',
      typicalProgression: 'Credit Analyst → Senior Underwriter → Portfolio Risk Manager → Chief Credit Officer',
      requiredCertifications: ['FRM (Financial Risk Manager)', 'Moody’s Credit Certificate'],
    },
  ],
  Marketing: [
    {
      id: 'cp_mkt_1',
      specialization: 'Marketing',
      title: 'Brand Manager (FMCG / D2C)',
      matchScore: 86,
      description: 'Own brand P&L, positioning strategy, campaign execution, packaging design, and agency relationship management.',
      averageStartingSalary: '$80,000 – $98,000 / ₹14 - 18 LPA',
      topEmployers: ['Unilever', 'Nestlé', 'Procter & Gamble', 'ITC Limited', 'Marico'],
      coreCompetencies: ['Brand Positioning (STP)', 'Campaign Media Mix', 'Consumer Insights', 'Trade & Channel Promotions'],
      skillGap: 'Needs deeper experience in quantitative media spend attribution and ROI tracking.',
      typicalProgression: 'Assistant Brand Manager (Y1-2) → Brand Manager (Y3-5) → Category Lead → Marketing Director',
      requiredCertifications: ['Google Digital Marketing', 'Brand Strategy Masterclass'],
    },
    {
      id: 'cp_mkt_2',
      specialization: 'Marketing',
      title: 'Digital Marketing & Growth Lead',
      matchScore: 82,
      description: 'Drive customer acquisition and retention through paid media, organic SEO, conversion rate optimization, and viral loops.',
      averageStartingSalary: '$75,000 – $95,000 / ₹12 - 16 LPA',
      topEmployers: ['Swiggy', 'Zomato', 'Nykaa', 'Uber', 'Myntra'],
      coreCompetencies: ['Performance Ads (Meta/Google)', 'Conversion Rate Optimization (CRO)', 'Marketing Funnel Analytics', 'A/B Testing'],
      skillGap: 'Strong in creative conceptualization, needs deeper SQL and GA4 advanced tracking.',
      typicalProgression: 'Growth Associate → Growth Marketer → Head of Digital Growth → VP Growth',
      requiredCertifications: ['Google Ads Search/Display', 'Meta Certified Media Planning Professional'],
    },
  ],
  'Human Resources (HR)': [
    {
      id: 'cp_hr_1',
      specialization: 'Human Resources (HR)',
      title: 'HR Business Partner (HRBP)',
      matchScore: 85,
      description: 'Partner with business unit heads on workforce planning, talent development, succession planning, and employee retention strategies.',
      averageStartingSalary: '$72,000 – $90,000 / ₹11 - 15 LPA',
      topEmployers: ['Deloitte', 'Accenture', 'Tata Sons', 'Google', 'Hindustan Unilever'],
      coreCompetencies: ['Strategic Workforce Planning', 'Stakeholder Management', 'Employee Engagement (eNPS)', 'Change Management'],
      skillGap: 'Needs more comfort with predictive talent analytics and compensation modeling.',
      typicalProgression: 'HR Specialist → HR Business Partner → Senior HRBP → Head of HR',
      requiredCertifications: ['SHRM-CP / SHRM-SCP', 'CIPD Level 5'],
    },
    {
      id: 'cp_hr_2',
      specialization: 'Human Resources (HR)',
      title: 'HR Analytics & Total Rewards Specialist',
      matchScore: 80,
      description: 'Model compensation bands, benchmark competitive benefits, and use predictive data to forecast workforce attrition and productivity.',
      averageStartingSalary: '$78,000 – $95,000 / ₹13 - 17 LPA',
      topEmployers: ['Aon Hewitt', 'Mercer', 'Willis Towers Watson', 'Amazon', 'Infosys'],
      coreCompetencies: ['Compensation & Benefits Benchmarking', 'Attrition Modeling in Excel/Power BI', 'Equity/ESOP Design', 'Labor Cost Optimization'],
      skillGap: 'Requires deeper hands-on experience in regression modeling for flight risk prediction.',
      typicalProgression: 'Rewards Analyst → Total Rewards Manager → Global Head of Rewards',
      requiredCertifications: ['WorldatWork Certified Compensation Professional (CCP)', 'HR Analytics Specialist'],
    },
  ],
  'Business Analytics': [
    {
      id: 'cp_ba_1',
      specialization: 'Business Analytics',
      title: 'Business Intelligence Analyst',
      matchScore: 90,
      description: 'Build enterprise Power BI / Tableau dashboards, design Star Schema data models, and deliver actionable operational intelligence to C-suite.',
      averageStartingSalary: '$82,000 – $105,000 / ₹14 - 19 LPA',
      topEmployers: ['McKinsey Analytics', 'EY', 'Boston Consulting Group', 'Fractal Analytics', 'Mu Sigma'],
      coreCompetencies: ['SQL & Window Functions', 'Power BI & DAX', 'Data Storytelling', 'Statistical Hypothesis Testing'],
      skillGap: 'Strong in SQL; needs to master advanced DAX context transitions.',
      typicalProgression: 'BI Analyst (Y1-2) → Senior Consultant (Y3-4) → Analytics Manager (Y5-7) → Director of BI',
      requiredCertifications: ['Microsoft Certified: Power BI Data Analyst Associate (PL-300)', 'SQL Advanced Certificate'],
    },
    {
      id: 'cp_ba_2',
      specialization: 'Business Analytics',
      title: 'Data & Analytics Consultant',
      matchScore: 83,
      description: 'Advise Fortune 500 leadership on data strategy, customer segmentation, churn reduction models, and analytics transformation.',
      averageStartingSalary: '$85,000 – $112,000 / ₹15 - 22 LPA',
      topEmployers: ['PwC Analytics', 'Bain & Company', 'KPMG Lighthouse', 'Wipro', 'Tiger Analytics'],
      coreCompetencies: ['Business Problem Framing', 'Python/R for Analytics', 'Customer Lifetime Value Modeling', 'Executive Presentation'],
      skillGap: 'Needs practice with rapid case interviews and unit economic decomposition.',
      typicalProgression: 'Consultant → Engagement Manager → Partner',
      requiredCertifications: ['Alteryx Designer Core', 'Tableau Desktop Specialist'],
    },
  ],
  'Agri-Business Management': [
    {
      id: 'cp_agri_1',
      specialization: 'Agri-Business Management',
      title: 'Agribusiness Supply Chain & Procurement Lead',
      matchScore: 86,
      description: 'Manage direct farm-gate commodity procurement, cold-chain operations, logistics vendor SLAs, and warehouse inventory quality.',
      averageStartingSalary: '$68,000 – $85,000 / ₹10 - 14 LPA',
      topEmployers: ['ITC Agri-Business Division', 'Cargill', 'Olam International', 'Bayer Crop Science', 'DeHaat'],
      coreCompetencies: ['Farm-Gate Sourcing', 'Post-Harvest Quality Grading', 'Cold Chain Fleet Management', 'APMC Mandi Regulation'],
      skillGap: 'Needs deeper exposure to electronic commodity warehouse financing (WDRA).',
      typicalProgression: 'Procurement Executive → Regional Supply Chain Manager → VP Agri Supply Chain',
      requiredCertifications: ['Agribusiness Supply Chain Certificate', 'Six Sigma Green Belt'],
    },
    {
      id: 'cp_agri_2',
      specialization: 'Agri-Business Management',
      title: 'Rural Marketing & Brand Manager',
      matchScore: 84,
      description: 'Design distribution and promotional strategies targeting tier-3/4 and village markets using the 4A framework and agro-dealer networks.',
      averageStartingSalary: '$70,000 – $88,000 / ₹11 - 15 LPA',
      topEmployers: ['Mahindra & Mahindra Farm Equipment', 'Godrej Agrovet', 'UPL Limited', 'Tata Chemicals', 'Amul'],
      coreCompetencies: ['Rural Channel Distribution', 'Agro-Dealer Management', 'Vernacular Activations', 'Haat & Mela Marketing'],
      skillGap: 'Needs closer alignment with digital WhatsApp agri-commerce funnels.',
      typicalProgression: 'Area Marketing Manager → Zonal Head → National Marketing Head',
      requiredCertifications: ['Rural Marketing Management Certification'],
    },
  ],
  'Healthcare Management': [
    {
      id: 'cp_health_1',
      specialization: 'Healthcare Management',
      title: 'Hospital Operations Executive',
      matchScore: 87,
      description: 'Oversee daily hospital operations including inpatient capacity management, emergency department flow, OT scheduling, and patient experience.',
      averageStartingSalary: '$65,000 – $84,000 / ₹10 - 14 LPA',
      topEmployers: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'Narayana Health'],
      coreCompetencies: ['Bed Turnover Optimization', 'Emergency Flow & Triage', 'NABH Compliance', 'Doctor & Nurse Scheduling'],
      skillGap: 'Needs deeper training on lean hospital waste reduction and OT utilization metrics.',
      typicalProgression: 'Operations Executive (Y1-2) → Assistant Medical Superintendent / Operations Manager (Y3-5) → Chief Operating Officer (COO)',
      requiredCertifications: ['NABH Assessor Program (Awareness)', 'Lean Six Sigma in Healthcare'],
    },
    {
      id: 'cp_health_2',
      specialization: 'Healthcare Management',
      title: 'Healthcare Strategy & Quality Manager',
      matchScore: 82,
      description: 'Lead hospital clinical quality audits, JCI/NABH accreditation prep, clinical pathway standardization, and patient safety protocols.',
      averageStartingSalary: '$72,000 – $92,000 / ₹12 - 16 LPA',
      topEmployers: ['Medanta The Medicity', 'Aster DM Healthcare', 'PwC Healthcare Advisory', 'IQVIA', 'GE Healthcare'],
      coreCompetencies: ['International Patient Safety Goals', 'Infection Control Surveillance', 'Root Cause Analysis (RCA)', 'Clinical Indicator Dashboards'],
      skillGap: 'Strong in safety concepts; needs more audit documentation practice.',
      typicalProgression: 'Quality Officer → Quality Head → Director of Clinical Governance',
      requiredCertifications: ['Certified Professional in Healthcare Quality (CPHQ)', 'NABH Internal Auditor'],
    },
  ],
  'Supply Chain Management': [
    {
      id: 'cp_scm_1',
      specialization: 'Supply Chain Management',
      title: 'Supply Chain Analyst',
      matchScore: 92,
      description: 'Optimize end-to-end inventory health, multi-modal freight networks, strategic sourcing procurement, and vendor SLAs using quantitative forecasting models.',
      averageStartingSalary: '$78,000 – $110,000 / ₹12 - 20 LPA',
      topEmployers: ['Amazon Operations', 'Apple Supply Chain', 'DHL Global Forwarding', 'Procter & Gamble', 'Unilever', 'Maersk', 'Schneider Electric'],
      coreCompetencies: ['Inventory Optimization & EOQ', 'Multi-Modal Logistics & Freight', 'Strategic Procurement & TCO', 'Vendor SLA Management', 'S&OP Demand Forecasting'],
      skillGap: 'Deepen multi-echelon inventory optimization (MEIO) and automated ERP supply chain analytics.',
      typicalProgression: 'Supply Chain Analyst → Senior SCM Specialist → Supply Chain Manager → Director of Global Logistics & Supply Chain',
      requiredCertifications: ['APICS Certified Supply Chain Professional (CSCP)', 'Certified in Planning and Inventory Management (CPIM)'],
    },
    {
      id: 'cp_scm_2',
      specialization: 'Supply Chain Management',
      title: 'Strategic Sourcing & Procurement Specialist',
      matchScore: 86,
      description: 'Structure direct and indirect material RFPs, execute supplier negotiations, model Total Cost of Ownership (TCO), and build resilient vendor partnerships.',
      averageStartingSalary: '$82,000 – $115,000 / ₹14 - 22 LPA',
      topEmployers: ['Tesla', 'General Electric', 'Target Sourcing', 'Johnson & Johnson', 'Tata Motors'],
      coreCompetencies: ['Kraljic Spend Matrix', 'Total Cost of Ownership (TCO)', 'Contract Negotiation & Terms', 'Supplier Risk Audits', 'Raw Material Hedging'],
      skillGap: 'Enhance automated e-procurement RFP workflows and contract indemnity compliance.',
      typicalProgression: 'Procurement Specialist → Category Manager → Global Sourcing Director → Chief Procurement Officer (CPO)',
      requiredCertifications: ['Certified Professional in Supply Management (CPSM)'],
    },
  ],
  'Operations Management': [
    {
      id: 'cp_ops_1',
      specialization: 'Operations Management',
      title: 'Operations Manager',
      matchScore: 94,
      description: 'Lead plant and operational turnaround, line balancing, capacity planning, and Six Sigma continuous improvement to maximize throughput and operational efficiency.',
      averageStartingSalary: '$85,000 – $125,000 / ₹15 - 25 LPA',
      topEmployers: ['Tesla Gigafactory', 'General Electric', 'Boeing', 'Toyota Material Handling', 'Samsung Electronics', 'Caterpillar', 'ITC'],
      coreCompetencies: ['Process Flow & Value Stream Mapping', 'Lean Six Sigma (DMAIC)', 'Capacity Planning & Little’s Law', 'Overall Equipment Effectiveness (OEE)', 'Operational Efficiency & Kaizen'],
      skillGap: 'Master stochastic queuing simulation models and predictive maintenance telemetry.',
      typicalProgression: 'Operations Analyst → Area Operations Manager → Plant Manager → VP of Global Operations / Chief Operating Officer (COO)',
      requiredCertifications: ['Six Sigma Green/Black Belt (SSGB/SSBB)', 'Certified in Production and Inventory Management (CPIM)'],
    },
    {
      id: 'cp_ops_2',
      specialization: 'Operations Management',
      title: 'Process Improvement Specialist (Lean/Six Sigma)',
      matchScore: 89,
      description: 'Deploy Lean Six Sigma DMAIC methodologies across manufacturing or business operations to eliminate the 8 wastes, enhance process capability (Cp/Cpk), and elevate quality.',
      averageStartingSalary: '$80,000 – $115,000 / ₹13 - 22 LPA',
      topEmployers: ['Danaher', 'Honeywell', 'Siemens', 'McKinsey Operations Practice', 'Accenture Strategy & Ops'],
      coreCompetencies: ['DMAIC Project Management', 'Statistical Process Control (SPC)', 'Value Stream Mapping (VSM)', 'Single-Minute Exchange of Die (SMED)', 'Root Cause Analysis (RCA)'],
      skillGap: 'Strengthen Design of Experiments (DOE) factorial modeling for multi-variable process lines.',
      typicalProgression: 'Lean Specialist → Continuous Improvement Lead → Director of Operational Excellence',
      requiredCertifications: ['Lean Six Sigma Black Belt (LSSBB)', 'ASQ Certified Quality Engineer (CQE)'],
    },
  ],
};

export const learningHubModules: LearningHubModule[] = [
  {
    id: 'mod_fin_1',
    specialization: 'Finance',
    title: '3-Statement Financial Modeling & Mechanics',
    subject: 'Corporate Finance & Accounting',
    description: 'Master how transactions flow through Income Statement, Cash Flow Statement, and Balance Sheet with perfect equilibrium.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'Three Statement Linkage Cycle',
        description: 'Net Income from Income Statement flows to top of Cash Flow Statement. Cash from CFS balances Assets on the Balance Sheet. Retained Earnings links net profit to Equity.',
        frameworkOrFormula: 'Ending Cash = Beginning Cash + OCF + ICF + FCF; Assets = Liabilities + Equity',
      },
      {
        title: 'Working Capital Impact on Cash Flow',
        description: 'Increases in Current Assets (AR, Inventory) consume cash (-). Increases in Current Liabilities (AP, Accrued Expenses) provide cash (+).',
        frameworkOrFormula: 'ΔCash = -ΔCurrent Assets + ΔCurrent Liabilities',
      },
      {
        title: 'Depreciation Tax Shield Effect',
        description: 'Depreciation is a non-cash expense that shields taxable income. Every dollar of depreciation produces Cash equal to (Depreciation × Tax Rate).',
        frameworkOrFormula: 'Tax Shield = Depreciation × Tax Rate',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'Walk me through a $10 increase in depreciation with a 25% tax rate across all 3 statements.',
        modelKeyPoints: 'IS: EBIT down $10, Net Income down $7.50. CFS: Net Income -$7.50, add back $10 dep, Net Cash up $2.50. BS: Cash up $2.50, PP&E down $10 (Assets down $7.50), Retained Earnings down $7.50. Balances!',
      },
    ],
    quizTopicLink: '3-Statement Flow Mechanics',
  },
  {
    id: 'mod_fin_2',
    specialization: 'Finance',
    title: 'DCF & Terminal Value Valuation',
    subject: 'Valuation & DCF',
    description: 'Understand Unlevered Free Cash Flow projections, WACC discounting, Gordon Growth and Exit Multiples.',
    difficulty: 'Advanced',
    keyConcepts: [
      {
        title: 'Unlevered Free Cash Flow (FCFF)',
        description: 'Cash generated by core operations available to all capital providers (both debt and equity holders) after reinvestment in CapEx and NWC.',
        frameworkOrFormula: 'FCFF = EBIT × (1 - T) + D&A - CapEx - ΔNWC',
      },
      {
        title: 'Weighted Average Cost of Capital (WACC)',
        description: 'The hurdle rate reflecting the blended cost of equity (via CAPM) and after-tax cost of debt weighted by target capital structure.',
        frameworkOrFormula: 'WACC = (E/V × Ke) + (D/V × Kd × (1 - T))',
      },
      {
        title: 'Gordon Growth Terminal Value',
        description: 'Values cash flows generated beyond forecast horizon into perpetuity. The terminal growth rate must never exceed long-term GDP growth (2-3%).',
        frameworkOrFormula: 'Terminal Value = FCF_(n+1) / (WACC - g)',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'What happens to Enterprise Value if cost of debt rises?',
        modelKeyPoints: 'A higher cost of debt increases WACC. A higher discount rate reduces the present value of future cash flows, leading to a lower Enterprise Value.',
      },
    ],
    quizTopicLink: 'WACC & Capital Structure',
  },
  {
    id: 'mod_mkt_1',
    specialization: 'Marketing',
    title: 'Brand Positioning & Strategic Marketing (STP)',
    subject: 'Brand Management',
    description: 'Crafting customer-based brand equity, perceptual maps, brand architectures, and defending price premiums against commodity competitors.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'Segmentation, Targeting, Positioning (STP)',
        description: 'Deconstruct aggregate markets into homogenous groups, select highest-margin target segments, and establish unique cognitive association in consumer minds.',
        frameworkOrFormula: 'Positioning Statement = Target + Category + Point of Difference + Reason to Believe',
      },
      {
        title: 'Keller’s Brand Equity Pyramid (CBBE)',
        description: 'Progressing customers from basic Salience (awareness) to Performance & Imagery (meaning), then Judgments & Feelings (response), up to Brand Resonance (advocacy).',
        frameworkOrFormula: 'Salience -> Meaning -> Response -> Resonance',
      },
      {
        title: 'Points of Parity (POP) vs Points of Difference (POD)',
        description: 'POPs ensure you meet the category hygiene baseline; PODs deliver the proprietary differentiator why consumers choose you over substitutes.',
        frameworkOrFormula: 'Category POPs + Competitive POPs + Unique PODs',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'How do you convince consumers to pay a 40% price premium for a commoditized everyday item like drinking water or salt?',
        modelKeyPoints: 'Shift from product attributes to emotional resonance, purity heritage, designer packaging, sustainable sourcing narratives, and association with health and status.',
      },
    ],
    quizTopicLink: 'Brand Positioning & STP',
  },
  {
    id: 'mod_mkt_2',
    specialization: 'Marketing',
    title: 'Digital Funnel Economics & ROAS Optimization',
    subject: 'Digital Marketing & Analytics',
    description: 'Deconstruct CAC, LTV, conversion rate optimization (CRO), Meta/Google ad algorithms, and multi-touch attribution models.',
    difficulty: 'Applied',
    keyConcepts: [
      {
        title: 'CAC to LTV Unit Economics',
        description: 'Customer Acquisition Cost (CAC) must be amortized against the Customer Lifetime Value (LTV). Scalable ventures maintain at least 3x LTV:CAC.',
        frameworkOrFormula: 'LTV = Margin × Order Value × Purchase Frequency × Customer Lifespan; CAC = Spend / Acquired',
      },
      {
        title: 'Ad Fatigue & Creative Refresh Cycles',
        description: 'When ad frequency creeps above 3.5, CTR drops and CPMs rise as the audience experiences banner blindness. Continuous creative testing restores high ROAS.',
        frameworkOrFormula: 'Frequency = Impressions / Reach; ROAS = Attributed Revenue / Ad Spend',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'If CAC increases by 50% overnight, what three levers can a growth marketer pull immediately?',
        modelKeyPoints: '1. Improve landing page conversion rate (CRO). 2. Increase average order value (AOV) via product bundles. 3. Activate email/SMS retention flows to drive repeat orders with zero ad spend.',
      },
    ],
    quizTopicLink: 'Unit Economics & Performance Marketing',
  },
  {
    id: 'mod_hr_1',
    specialization: 'Human Resources (HR)',
    title: 'HR Metrics, Analytics & Workforce Planning',
    subject: 'HR Analytics',
    description: 'Data-driven talent strategy: calculate voluntary attrition, time-to-fill, cost-per-hire, and predict employee flight risk.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'Turnover & Attrition Rate Mechanics',
        description: 'Calculating annualized voluntary and involuntary turnover using average employee headcount, avoiding distortion during rapid headcount growth.',
        frameworkOrFormula: 'Attrition Rate% = (Voluntary Leavers / Average Headcount) × 100',
      },
      {
        title: 'McKinsey 9-Box Grid for Talent Calibration',
        description: 'Matrix evaluating employee past performance (X-axis) against future growth potential (Y-axis) to identify Stars, High Potentials, Core Performers, and Risks.',
        frameworkOrFormula: 'Performance (Low/Med/High) × Potential (Low/Med/High)',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'What is the difference between leading and lagging indicators in HR analytics?',
        modelKeyPoints: 'Lagging: Attrition rate, cost per hire, tenure. Leading: Pulse survey eNPS scores, 1-on-1 frequency, overtime hours, internal referral rates.',
      },
    ],
    quizTopicLink: 'Turnover & Retention Analysis',
  },
  {
    id: 'mod_ba_1',
    specialization: 'Business Analytics',
    title: 'SQL Window Functions & Analytical Querying',
    subject: 'SQL & Databases',
    description: 'Master advanced SQL: ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and Common Table Expressions (CTEs) for executive analytics.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'DENSE_RANK() vs RANK()',
        description: 'Window functions that calculate rankings partitioned by categorical groups. DENSE_RANK guarantees consecutive sequence numbers even when values tie.',
        frameworkOrFormula: 'DENSE_RANK() OVER (PARTITION BY category ORDER BY metric DESC)',
      },
      {
        title: 'Star Schema vs Snowflake Data Modeling',
        description: 'Star schemas de-normalize dimension tables directly around central fact tables, maximizing Power BI VertiPaq in-memory compression and lightning fast DAX.',
        frameworkOrFormula: 'Fact Table (Metrics/Foreign Keys) <-> Dimension Tables (Attributes/Primary Keys)',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'Explain how LEAD and LAG functions help calculate month-over-month revenue growth in SQL.',
        modelKeyPoints: 'LAG() accesses the revenue value of the preceding row based on date order, allowing immediate computation of ((Current - LAG(Current)) / LAG(Current)) without complex self-joins.',
      },
    ],
    quizTopicLink: 'Window Functions & Ranking',
  },
  {
    id: 'mod_agri_1',
    specialization: 'Agri-Business Management',
    title: 'Agri Supply Chains, Cold-Chain & Mandi Dynamics',
    subject: 'Agribusiness Supply Chain',
    description: 'Post-harvest logistics, farm-gate aggregation, APMC mandi regulations, and private modern trade contract farming.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'Post-Harvest Pre-Cooling & Cold Chain',
        description: 'Fresh produce respires rapidly post-harvest. Removing field heat within 3 hours slows ethylene production and preserves marketable shelf life.',
        frameworkOrFormula: 'Respiration Rate Q10 rule: Every 10°C drop reduces decay rate by half',
      },
      {
        title: 'The 4A Framework for Rural Marketing',
        description: 'CK Prahalad’s model for unlocking rural consumer adoption: Affordability, Availability, Awareness, and Acceptability.',
        frameworkOrFormula: 'Affordability + Availability + Awareness + Acceptability',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'Why do contract farming models often struggle with side-selling by farmers?',
        modelKeyPoints: 'When open market mandi spot prices surge above the contracted price, farmers face financial incentive to default and sell to local traders. Mitigate with floor-plus-variable price sharing mechanisms.',
      },
    ],
    quizTopicLink: 'Cold Chain & Post-Harvest Losses',
  },
  {
    id: 'mod_health_1',
    specialization: 'Healthcare Management',
    title: 'Hospital Operations, ARPOB & NABH Accreditations',
    subject: 'Hospital Operations',
    description: 'Managing inpatient bed occupancy, Emergency Department triage, International Patient Safety Goals, and Revenue Cycle Management.',
    difficulty: 'Core',
    keyConcepts: [
      {
        title: 'ARPOB (Average Revenue Per Occupied Bed)',
        description: 'The core operational yield metric reflecting clinical case mix, length of stay efficiency, and revenue realization across hospital specialties.',
        frameworkOrFormula: 'ARPOB = Inpatient Revenue / (Occupied Beds × Number of Days)',
      },
      {
        title: 'International Patient Safety Goals (IPSG)',
        description: 'Six core WHO/JCI safety mandates: 1. Identify patients correctly (2 identifiers); 2. Improve effective communication; 3. High-alert meds; 4. Safe surgery; 5. Reduce infection; 6. Prevent falls.',
        frameworkOrFormula: 'IPSG 1 to 6 Standards',
      },
    ],
    interviewFocusQuestions: [
      {
        question: 'What is the most effective operational strategy to reduce hospital bed turnaround time between discharge and new admission?',
        modelKeyPoints: 'Conduct discharge rounds before 10 AM, transfer cleared patients to a comfortable discharge lounge for pharmacy/ride pickup, and automate housekeeping paging with a strict 30-minute cleaning SLA.',
      },
    ],
    quizTopicLink: 'Hospital Capacity & ARPOB Metrics',
  },
];

export const sampleOpportunityListings: OpportunityListing[] = [
  {
    id: 'opp_1',
    company: 'Goldman Sachs',
    logoColor: 'bg-blue-600',
    role: 'Financial Analyst — Global Markets',
    specialization: 'Finance',
    type: 'Final Placement',
    location: 'Bengaluru / Mumbai / New York',
    stipendOrSalary: '₹24 - 28 LPA ($115,000)',
    minCgpa: 7.5,
    applicationDeadline: '25 Oct 2026',
    openings: 8,
    requiredSkills: [
      { skill: 'Accounting', minScore: 80 },
      { skill: 'Excel', minScore: 85 },
      { skill: 'Financial Modelling', minScore: 80 },
      { skill: 'Interview Skills', minScore: 80 },
    ],
    recruitmentProcess: ['Online Quantitative Aptitude Test', 'Financial Technical Interview', 'Superday M&A Case Round', 'Partner HR Fit'],
    description: 'Join the Global Markets division analyzing corporate capital structures, executing debt/equity offerings, and building detailed financial models.',
    preparationAdvice: [
      'Master 3-statement flow questions without hesitation (e.g. $10 depreciation change)',
      'Prepare a polished walkthrough of a public company DCF model you built',
      'Be ready for rapid mental math on multiples (EV/EBITDA, P/E)',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_2',
    company: 'Hindustan Unilever (HUL)',
    logoColor: 'bg-emerald-700',
    role: 'Management Trainee — Brand & Digital Marketing',
    specialization: 'Marketing',
    type: 'Final Placement',
    location: 'Mumbai / Pan-India',
    stipendOrSalary: '₹22 - 26 LPA',
    minCgpa: 7.0,
    applicationDeadline: '30 Oct 2026',
    openings: 12,
    requiredSkills: [
      { skill: 'Branding', minScore: 80 },
      { skill: 'Digital Marketing', minScore: 80 },
      { skill: 'Consumer Behaviour', minScore: 80 },
    ],
    recruitmentProcess: ['Online Gamified Assessment', 'Brand Case Study Presentation', 'Behavioral Competency Round', 'Director Interview'],
    description: 'Drive brand positioning, omnichannel product launches, and digital consumer funnels for India’s premier FMCG house.',
    preparationAdvice: [
      'Know the Keller CBBE pyramid and 4Ps application for rural vs urban markets',
      'Prepare a critique of a recent viral marketing campaign with proposed improvements',
      'Understand trade margins and channel distribution mechanics',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_3',
    company: 'Deloitte Consulting',
    logoColor: 'bg-slate-900',
    role: 'Human Capital Analyst — HR Transformation',
    specialization: 'Human Resources (HR)',
    type: 'Final Placement',
    location: 'Hyderabad / Bengaluru / Gurugram',
    stipendOrSalary: '₹14 - 18 LPA',
    minCgpa: 6.8,
    applicationDeadline: '15 Nov 2026',
    openings: 15,
    requiredSkills: [
      { skill: 'Recruitment & Sourcing', minScore: 75 },
      { skill: 'HR Analytics', minScore: 75 },
      { skill: 'Performance Management', minScore: 75 },
    ],
    recruitmentProcess: ['Aptitude & English Proficiency', 'HR Consulting Case Round', 'Behavioral Fitment Round'],
    description: 'Advise Fortune 500 leadership on HR operating model redesign, talent retention frameworks, and Workday HR analytics implementations.',
    preparationAdvice: [
      'Be prepared to analyze employee turnover data in Excel to propose retention interventions',
      'Understand the 9-Box grid and Kirkpatrick 4-level training evaluation model',
    ],
  },
  {
    id: 'opp_4',
    company: 'McKinsey & Company',
    logoColor: 'bg-blue-900',
    role: 'Analytics Fellow — Business Intelligence',
    specialization: 'Business Analytics',
    type: 'Final Placement',
    location: 'Gurugram / Bengaluru / Waltham',
    stipendOrSalary: '₹20 - 25 LPA',
    minCgpa: 7.5,
    applicationDeadline: '10 Nov 2026',
    openings: 10,
    requiredSkills: [
      { skill: 'SQL & Databases', minScore: 80 },
      { skill: 'Excel & Modelling', minScore: 85 },
      { skill: 'Power BI & Dashboards', minScore: 80 },
      { skill: 'Data Interpretation', minScore: 80 },
    ],
    recruitmentProcess: ['Solve Game (McKinsey Digital Assessment)', 'SQL Technical Live Test', 'Case Interview (Profitability & Churn)', 'Personal Experience Interview (PEI)'],
    description: 'Work alongside strategic consulting teams building client-facing Power BI analytics platforms, cohort retention models, and predictive algorithms.',
    preparationAdvice: [
      'Practice writing complex SQL with Window functions (ROW_NUMBER, DENSE_RANK, LAG)',
      'Prepare structured business case breakdowns using issue trees',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_5',
    company: 'ITC Agri-Business Division',
    logoColor: 'bg-amber-700',
    role: 'Summer Intern — Agri Supply Chain & e-Choupal',
    specialization: 'Agri-Business Management',
    type: 'Internship',
    location: 'Hyderabad / Indore / Guntur',
    stipendOrSalary: '₹60,000 / month Stipend (PPO Eligible)',
    minCgpa: 6.5,
    applicationDeadline: '20 Nov 2026',
    openings: 14,
    requiredSkills: [
      { skill: 'Agribusiness Management', minScore: 75 },
      { skill: 'Agri Supply Chain', minScore: 75 },
      { skill: 'Rural Marketing', minScore: 75 },
    ],
    recruitmentProcess: ['Agri-domain Written Test', 'Group Discussion on Mandi Reforms', 'Technical Interview with Operations Head'],
    description: 'Field-based project optimizing farm-gate wheat/soybean procurement, mandi price discovery networks, and cold storage logistics.',
    preparationAdvice: [
      'Study APMC mandi operations, e-NAM portal mechanics, and post-harvest storage standards',
      'Understand rural distribution challenges and farmer cooperative economics',
    ],
  },
  {
    id: 'opp_6',
    company: 'Apollo Hospitals Group',
    logoColor: 'bg-rose-700',
    role: 'Administrative Resident — Hospital Operations',
    specialization: 'Healthcare Management',
    type: 'Internship',
    location: 'Chennai / Hyderabad / Delhi NCR',
    stipendOrSalary: '₹50,000 / month Stipend (PPO Eligible)',
    minCgpa: 6.8,
    applicationDeadline: '18 Nov 2026',
    openings: 8,
    requiredSkills: [
      { skill: 'Healthcare Operations', minScore: 75 },
      { skill: 'Healthcare Quality & NABH', minScore: 75 },
      { skill: 'Healthcare Finance', minScore: 70 },
    ],
    recruitmentProcess: ['Healthcare Case Study Assessment', 'Panel Interview with Hospital COO', 'Quality & Compliance Round'],
    description: 'Hands-on operational residency focusing on bed turnaround optimization, OPD wait-time reduction, and NABH 5th edition audit compliance.',
    preparationAdvice: [
      'Review formulas for ARPOB, ALOS, and bed occupancy calculations',
      'Familiarize with the 6 International Patient Safety Goals (IPSG)',
    ],
  },
  {
    id: 'opp_7',
    company: 'JPMorgan Chase & Co.',
    logoColor: 'bg-slate-800',
    role: 'Corporate FP&A Summer Analyst',
    specialization: 'Finance',
    type: 'Internship',
    location: 'Mumbai / Bengaluru',
    stipendOrSalary: '₹85,000 / month Stipend (PPO Track)',
    minCgpa: 7.2,
    applicationDeadline: '22 Oct 2026',
    openings: 10,
    requiredSkills: [
      { skill: 'Accounting', minScore: 75 },
      { skill: 'Excel', minScore: 80 },
      { skill: 'Financial Analysis', minScore: 75 },
    ],
    recruitmentProcess: ['Pymetrics Assessment', 'HireVue Video Interview', 'Virtual Superday 2 Technical Rounds'],
    description: 'Support quarterly forecast cycles, multi-entity budget variance models, and strategic headcount financial plans.',
    preparationAdvice: [
      'Know DuPont ROE breakdown and variance analysis cold',
      'Practice Excel dynamic array and XLOOKUP shortcuts',
    ],
  },
  {
    id: 'opp_8',
    company: 'Nestlé India',
    logoColor: 'bg-blue-700',
    role: 'Commercial Trainee — Sales & Channel Distribution',
    specialization: 'Marketing',
    type: 'Final Placement',
    location: 'Gurugram / Pan-India',
    stipendOrSalary: '₹18 - 22 LPA',
    minCgpa: 6.8,
    applicationDeadline: '05 Nov 2026',
    openings: 16,
    requiredSkills: [
      { skill: 'Sales Strategy', minScore: 75 },
      { skill: 'Consumer Behaviour', minScore: 75 },
      { skill: 'Branding', minScore: 75 },
    ],
    recruitmentProcess: ['Online Cognitive Test', 'Distribution Case Simulation', 'Field Sales Ride-along Evaluation', 'Zonal VP Interview'],
    description: 'Drive modern trade, general trade distribution expansion, distributor ROI, and festive activation programs for iconic food brands.',
    preparationAdvice: [
      'Understand distributor margins, secondary sales, and FMCG stockist working capital',
    ],
  },
  {
    id: 'opp_swe_1',
    company: 'Google',
    logoColor: 'bg-blue-600',
    role: 'Full Stack Software Engineer',
    specialization: 'Software Engineering & Tech',
    type: 'Final Placement',
    location: 'Mountain View / New York / Bengaluru / Hyderabad',
    stipendOrSalary: '$135,000 – $165,000 / ₹32 - 45 LPA',
    minCgpa: 7.5,
    applicationDeadline: '28 Oct 2026',
    openings: 25,
    requiredSkills: [
      { skill: 'Data Structures & Algorithms', minScore: 85 },
      { skill: 'System Design & Architecture', minScore: 80 },
      { skill: 'Full Stack & APIs', minScore: 80 },
      { skill: 'Code Quality & Testing', minScore: 80 },
    ],
    recruitmentProcess: ['Online Coding Challenge (LeetCode Hard)', 'Technical Screening Round', 'Virtual Onsite (2 Algorithm + 1 System Design)', 'Googleyness & Leadership Fit'],
    description: 'Design and build world-scale web applications, distributed backend services, and next-generation cloud infrastructure used by billions of users worldwide.',
    preparationAdvice: [
      'Practice Medium-to-Hard graph, dynamic programming, and sliding window tree problems in under 35 minutes.',
      'Review distributed rate limiters, caching hierarchies (Redis/Memcached), and CAP theorem tradeoffs.',
      'Articulate time and space complexity (Big-O) proactively before writing any code.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_swe_2',
    company: 'Stripe',
    logoColor: 'bg-indigo-600',
    role: 'Payments Platform & Infrastructure Engineer',
    specialization: 'Software Engineering & Tech',
    type: 'Final Placement',
    location: 'San Francisco / Seattle / Dublin / Remote',
    stipendOrSalary: '$140,000 – $175,000 / ₹35 - 48 LPA',
    minCgpa: 7.2,
    applicationDeadline: '02 Nov 2026',
    openings: 14,
    requiredSkills: [
      { skill: 'System Design & Architecture', minScore: 85 },
      { skill: 'Full Stack & APIs', minScore: 85 },
      { skill: 'Database & Concurrency', minScore: 80 },
    ],
    recruitmentProcess: ['Take-home / Live Coding in Your Preferred IDE', 'System Design & Scalability Round', 'Bug Squashing & Refactoring Interview', 'Integration & Culture Fit'],
    description: 'Build mission-critical payment APIs, idempotent transaction processing engines, and real-time fraud mitigation microservices for global economic infrastructure.',
    preparationAdvice: [
      'Ensure familiarity with API idempotency keys, ACID vs BASE transactions, and distributed consensus.',
      'Test your code with boundary and failure conditions rather than only happy paths.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_swe_3',
    company: 'Microsoft',
    logoColor: 'bg-cyan-600',
    role: 'Cloud Engineering & DevOps Summer Intern',
    specialization: 'Software Engineering & Tech',
    type: 'Internship',
    location: 'Redmond / Bengaluru / Dublin',
    stipendOrSalary: '$9,500 / month / ₹1,20,000/mo (PPO Track)',
    minCgpa: 7.0,
    applicationDeadline: '15 Nov 2026',
    openings: 30,
    requiredSkills: [
      { skill: 'DevOps & Cloud Infrastructure', minScore: 75 },
      { skill: 'Full Stack & APIs', minScore: 75 },
      { skill: 'Data Structures & Algorithms', minScore: 75 },
    ],
    recruitmentProcess: ['Codility Online Assessment', 'Technical Problem Solving (2 Rounds)', 'Managerial Behavioral Discussion'],
    description: 'Hands-on 12-week summer internship building Azure cloud services, Kubernetes cluster orchestration, and automated CI/CD pipeline telemetry.',
    preparationAdvice: [
      'Review Docker containerization, Linux network namespaces, and basic IaC (Terraform or Bicep).',
    ],
  },
  {
    id: 'opp_ai_1',
    company: 'OpenAI',
    logoColor: 'bg-emerald-600',
    role: 'Generative AI & LLM Systems Fellow',
    specialization: 'AI & Data Science',
    type: 'Final Placement',
    location: 'San Francisco / New York / Remote Friendly',
    stipendOrSalary: '$160,000 – $210,000 + Equity',
    minCgpa: 8.0,
    applicationDeadline: '30 Oct 2026',
    openings: 8,
    requiredSkills: [
      { skill: 'Deep Learning & Neural Architectures', minScore: 85 },
      { skill: 'Generative AI & LLM Engineering', minScore: 90 },
      { skill: 'Data Engineering & MLOps', minScore: 80 },
    ],
    recruitmentProcess: ['Take-home Foundation Model Coding Project', 'Transformer Architecture Deep Dive', 'RAG & Vector Retrieval Live Case', 'Research & Safety Culture Interview'],
    description: 'Build enterprise-grade generative AI pipelines, multi-agent reasoning systems, fine-tuning infrastructure, and synthetic data validation suites.',
    preparationAdvice: [
      'Master multi-head attention mechanics, rotary position embeddings (RoPE), and KV cache optimization.',
      'Demonstrate practical experience mitigating RAG hallucinations with hybrid sparse/dense rerankers.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_ai_2',
    company: 'Databricks',
    logoColor: 'bg-orange-600',
    role: 'Machine Learning & Data Platform Associate',
    specialization: 'AI & Data Science',
    type: 'Final Placement',
    location: 'San Francisco / Amsterdam / Bengaluru',
    stipendOrSalary: '$130,000 – $165,000 / ₹28 - 40 LPA',
    minCgpa: 7.5,
    applicationDeadline: '12 Nov 2026',
    openings: 15,
    requiredSkills: [
      { skill: 'Machine Learning Fundamentals', minScore: 80 },
      { skill: 'Data Engineering & MLOps', minScore: 85 },
      { skill: 'Applied Statistics & Modeling', minScore: 80 },
    ],
    recruitmentProcess: ['PySpark / Python Data Challenge', 'Machine Learning System Design Interview', 'MLflow & Pipeline Production Round', 'Values Fitment'],
    description: 'Empower enterprise data teams with lakehouse architecture, MLflow model registries, distributed PySpark feature engineering, and automated retraining.',
    preparationAdvice: [
      'Understand data drift, concept drift, feature stores, and distributed matrix decomposition.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_pm_1',
    company: 'Google',
    logoColor: 'bg-red-500',
    role: 'Associate Product Manager (APM)',
    specialization: 'Product Management',
    type: 'Final Placement',
    location: 'Mountain View / New York / Zurich / Bengaluru',
    stipendOrSalary: '$125,000 – $155,000 / ₹28 - 38 LPA',
    minCgpa: 7.5,
    applicationDeadline: '20 Oct 2026',
    openings: 18,
    requiredSkills: [
      { skill: 'Product Strategy & Vision', minScore: 85 },
      { skill: 'User Research & Wireframing', minScore: 80 },
      { skill: 'Product Analytics & Metrics', minScore: 85 },
      { skill: 'Agile & Technical Execution', minScore: 80 },
    ],
    recruitmentProcess: ['APM Written Take-Home Product Critique', 'Product Design Interview (e.g. Design an alarm clock for the blind)', 'Analytical & Estimation Interview', 'Technical Architecture Round', 'Executive Director Final Round'],
    description: 'Join the premier rotational program for emerging technology leaders, setting vision, driving user discovery, and launching global consumer and enterprise products.',
    preparationAdvice: [
      'Practice user-first design frameworks: Clarify objective -> User segmentation -> Pain point prioritization -> Creative solutions -> Metrics & trade-offs.',
      'Prepare deep critiques of Google products with proposed 10x improvements.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_pm_2',
    company: 'Uber',
    logoColor: 'bg-black',
    role: 'Associate Product Manager Summer Intern',
    specialization: 'Product Management',
    type: 'Internship',
    location: 'San Francisco / Amsterdam / Hyderabad',
    stipendOrSalary: '$8,500 / month / ₹1,10,000/mo (PPO Track)',
    minCgpa: 7.0,
    applicationDeadline: '10 Nov 2026',
    openings: 12,
    requiredSkills: [
      { skill: 'Product Strategy & Vision', minScore: 80 },
      { skill: 'Product Analytics & Metrics', minScore: 80 },
      { skill: 'Go-to-Market & Monetization', minScore: 75 },
    ],
    recruitmentProcess: ['Marketplace Product Sense Case', 'Data Metric Tradeoff Simulation', 'Cross-Functional Team Behavioral Round'],
    description: 'Own two-sided marketplace experimentation, dynamic surge pricing UX, driver partner dispatch incentives, and multimodal transit features.',
    preparationAdvice: [
      'Study two-sided platform network effects, cross-side elasticity, and rider cancellation economics.',
    ],
  },
  {
    id: 'opp_ux_1',
    company: 'Figma',
    logoColor: 'bg-purple-600',
    role: 'Associate Product Designer',
    specialization: 'UI/UX & Product Design',
    type: 'Final Placement',
    location: 'San Francisco / New York / Remote',
    stipendOrSalary: '$120,000 – $150,000 + Equity',
    minCgpa: 7.2,
    applicationDeadline: '01 Nov 2026',
    openings: 6,
    requiredSkills: [
      { skill: 'Figma & Design Systems', minScore: 90 },
      { skill: 'User Research & Usability Testing', minScore: 85 },
      { skill: 'Interaction & Motion Design', minScore: 80 },
      { skill: 'Accessibility & WCAG', minScore: 80 },
    ],
    recruitmentProcess: ['Portfolio Presentation (Deep dive on 2 case studies)', 'Whiteboard Design Challenge (45 mins collaborative live redesign)', 'App Critique Round', 'Cross-Functional Partner Chat'],
    description: 'Craft collaborative creator tools, canvas interaction patterns, design system variables, and intuitive interfaces for millions of designers and engineers.',
    preparationAdvice: [
      'Bring a case study demonstrating your complete design process: problem framing, rejected wireframes, user testing feedback, and final production design system.',
      'Be ready to explain the rationale behind every typography, spacing, and micro-interaction decision.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_ux_2',
    company: 'Airbnb',
    logoColor: 'bg-rose-500',
    role: 'User Experience & Product Design Intern',
    specialization: 'UI/UX & Product Design',
    type: 'Internship',
    location: 'San Francisco / Remote Eligible',
    stipendOrSalary: '$8,200 / month (PPO Track)',
    minCgpa: 7.0,
    applicationDeadline: '14 Nov 2026',
    openings: 8,
    requiredSkills: [
      { skill: 'User Research & Usability Testing', minScore: 80 },
      { skill: 'Information Architecture & Wireframes', minScore: 80 },
      { skill: 'Figma & Design Systems', minScore: 80 },
    ],
    recruitmentProcess: ['Portfolio Screen', 'Virtual 1-on-1 Portfolio Walkthrough', 'Collaborative Design Session'],
    description: 'Reimagine guest and host discovery journeys, immersive category browsing, transparent checkout flows, and accessible multi-language travel experiences.',
    preparationAdvice: [
      'Emphasize empathy for dual user personas (hosts vs guests) and show clear evidence of usability test iterations.',
    ],
  },
  {
    id: 'opp_cons_1',
    company: 'Boston Consulting Group (BCG)',
    logoColor: 'bg-emerald-800',
    role: 'Associate Strategy Consultant',
    specialization: 'Management Consulting & Strategy',
    type: 'Final Placement',
    location: 'New York / Chicago / London / Mumbai / Gurugram',
    stipendOrSalary: '$120,000 – $145,000 / ₹26 - 36 LPA',
    minCgpa: 7.8,
    applicationDeadline: '24 Oct 2026',
    openings: 20,
    requiredSkills: [
      { skill: 'Case Interview Frameworks (MECE)', minScore: 85 },
      { skill: 'Market Sizing & Quantitative Estimation', minScore: 85 },
      { skill: 'Profitability & Turnaround Strategy', minScore: 80 },
      { skill: 'Executive Communication & Slide Architecture', minScore: 80 },
    ],
    recruitmentProcess: ['Casey AI Chatbot Assessment', 'First Round (2 Case Interviews + Behavioral)', 'Final Round / Decision Superday with Managing Directors & Partners'],
    description: 'Partner with C-suite leadership across Fortune 500 enterprises to solve existential challenges in digital transformation, green energy transition, and commercial strategy.',
    preparationAdvice: [
      'Master the MECE principle to synthesize messy business ambiguities into clean, mutually exclusive issue trees.',
      'Practice rapid mental math with currency conversions and percentage margin bridges without calculator aids.',
    ],
    isFeatured: true,
  },
  {
    id: 'opp_cons_2',
    company: 'Bain & Company',
    logoColor: 'bg-red-700',
    role: 'Associate Consultant Intern (ACI)',
    specialization: 'Management Consulting & Strategy',
    type: 'Internship',
    location: 'Boston / San Francisco / Bengaluru / New Delhi',
    stipendOrSalary: '$9,000 / month / ₹1,25,000/mo (PPO Track)',
    minCgpa: 7.5,
    applicationDeadline: '08 Nov 2026',
    openings: 16,
    requiredSkills: [
      { skill: 'Case Interview Frameworks (MECE)', minScore: 80 },
      { skill: 'Market Sizing & Quantitative Estimation', minScore: 80 },
      { skill: 'Competitive Strategy & Moats', minScore: 80 },
    ],
    recruitmentProcess: ['Online Video Assessment', '2 Case Interview Rounds (M&A Due Diligence / Market Entry)', 'Partner Fit Interview'],
    description: 'Immerse in client project teams conducting private equity due diligence, customer NPS benchmarking, and corporate restructuring roadmaps.',
    preparationAdvice: [
      'Read Bain Private Equity reports and understand EBITDA multiple expansion and cost-takeout levers.',
    ],
  },
];

export const sampleFacultyRoster: FacultyStudentRow[] = [
  {
    id: 'std_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    specialization: 'Finance',
    targetRole: 'Financial Analyst',
    quizzesCompleted: 14,
    avgQuizScore: 82,
    readinessScore: 76,
    interviewsCompleted: 6,
    status: 'In Progress',
    weakestTopic: 'Financial Modelling (Debt Schedules)',
    lastActive: '12 mins ago',
  },
  {
    id: 'std_02',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    specialization: 'Finance',
    targetRole: 'Investment Banking Analyst',
    quizzesCompleted: 22,
    avgQuizScore: 91,
    readinessScore: 88,
    interviewsCompleted: 11,
    status: 'Placement Ready',
    weakestTopic: 'LBO Modeling Mechanics',
    lastActive: '1 hour ago',
  },
  {
    id: 'std_03',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@university.edu',
    specialization: 'Marketing',
    targetRole: 'Brand Manager',
    quizzesCompleted: 16,
    avgQuizScore: 85,
    readinessScore: 82,
    interviewsCompleted: 8,
    status: 'Placement Ready',
    weakestTopic: 'ROAS & Attribution Metrics',
    lastActive: '3 hours ago',
  },
  {
    id: 'std_04',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@university.edu',
    specialization: 'Human Resources (HR)',
    targetRole: 'HR Business Partner',
    quizzesCompleted: 11,
    avgQuizScore: 78,
    readinessScore: 74,
    interviewsCompleted: 5,
    status: 'In Progress',
    weakestTopic: 'HR Predictive Analytics',
    lastActive: 'Yesterday',
  },
  {
    id: 'std_05',
    name: 'Devansh Verma',
    email: 'devansh.v@university.edu',
    specialization: 'Business Analytics',
    targetRole: 'BI Analyst',
    quizzesCompleted: 25,
    avgQuizScore: 94,
    readinessScore: 90,
    interviewsCompleted: 12,
    status: 'Placement Ready',
    weakestTopic: 'DAX Context Transitions',
    lastActive: '30 mins ago',
  },
  {
    id: 'std_06',
    name: 'Sunita Patel',
    email: 'sunita.patel@university.edu',
    specialization: 'Agri-Business Management',
    targetRole: 'Agri Supply Chain Manager',
    quizzesCompleted: 9,
    avgQuizScore: 68,
    readinessScore: 65,
    interviewsCompleted: 3,
    status: 'Needs Attention',
    weakestTopic: 'Cold Chain Logistics',
    lastActive: '2 days ago',
  },
  {
    id: 'std_07',
    name: 'Dr. Kabir Nair',
    email: 'kabir.nair@university.edu',
    specialization: 'Healthcare Management',
    targetRole: 'Hospital Operations Executive',
    quizzesCompleted: 15,
    avgQuizScore: 84,
    readinessScore: 81,
    interviewsCompleted: 7,
    status: 'Placement Ready',
    weakestTopic: 'NABH Audit Standards',
    lastActive: '4 hours ago',
  },
  {
    id: 'std_08',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@university.edu',
    specialization: 'Business Analytics',
    targetRole: 'Data Analytics Consultant',
    quizzesCompleted: 8,
    avgQuizScore: 64,
    readinessScore: 62,
    interviewsCompleted: 2,
    status: 'Needs Attention',
    weakestTopic: 'SQL Window Functions',
    lastActive: '3 days ago',
  },
];

export function generateFiveStepActionPlan(profile: StudentProfile): {
  lowestSkill: string;
  lowestScore: number;
  gap: number;
  steps: {
    step: number;
    actionType: 'Learn' | 'Practice Tool' | 'Solve Case' | 'Mock Interview' | 'Assess';
    title: string;
    description: string;
    targetTab: 'learning_hub' | 'quiz' | 'interview' | 'skills' | 'assistant';
  }[];
} {
  const skillsArray = Object.values(profile.skills);
  if (skillsArray.length === 0) {
    return {
      lowestSkill: 'Core Foundations',
      lowestScore: 60,
      gap: 20,
      steps: [],
    };
  }

  // Find lowest score
  const sorted = [...skillsArray].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const gap = Math.max(0, weakest.benchmark - weakest.score);

  return {
    lowestSkill: weakest.name,
    lowestScore: weakest.score,
    gap,
    steps: [
      {
        step: 1,
        actionType: 'Learn',
        title: `Master Fundamental Frameworks in ${weakest.name}`,
        description: `Review curriculum concept modules in the Learning Hub for ${weakest.name} to consolidate core principles.`,
        targetTab: 'learning_hub',
      },
      {
        step: 2,
        actionType: 'Practice Tool',
        title: `Interactive Drill on ${weakest.weaknesses[0] || 'Core Mechanics'}`,
        description: `Target high-frequency quiz questions with step-by-step mathematical or conceptual walkthroughs.`,
        targetTab: 'quiz',
      },
      {
        step: 3,
        actionType: 'Solve Case',
        title: `Consult AI Tutor on Problem Areas`,
        description: `Ask the AI Assistant: "Explain ${weakest.weaknesses[0] || weakest.name} step-by-step with real-world industry examples."`,
        targetTab: 'assistant',
      },
      {
        step: 4,
        actionType: 'Mock Interview',
        title: `Live Technical Walkthrough in Interview Simulator`,
        description: `Deliver typed answers under interview conditions to receive AI scoring, grade, and model answer comparison.`,
        targetTab: 'interview',
      },
      {
        step: 5,
        actionType: 'Assess',
        title: `Re-calibrate Competency Matrix & Validate Readiness`,
        description: `Verify that your calibrated score crosses the ${weakest.benchmark}% target benchmark for ${profile.targetRole}.`,
        targetTab: 'skills',
      },
    ],
  };
}

// Ensure alias specialization keys resolve cleanly across all modules
if (sampleQuizQuestionsBySpecialization['Finance']) {
  sampleQuizQuestionsBySpecialization['Finance & FinTech'] = sampleQuizQuestionsBySpecialization['Finance'];
}
if (sampleQuizQuestionsBySpecialization['Marketing']) {
  sampleQuizQuestionsBySpecialization['Marketing & Growth'] = sampleQuizQuestionsBySpecialization['Marketing'];
}
if (sampleQuizQuestionsBySpecialization['Human Resources (HR)']) {
  sampleQuizQuestionsBySpecialization['Human Resources & People Ops'] = sampleQuizQuestionsBySpecialization['Human Resources (HR)'];
}
if (sampleQuizQuestionsBySpecialization['Healthcare Management']) {
  sampleQuizQuestionsBySpecialization['Healthcare & Life Sciences'] = sampleQuizQuestionsBySpecialization['Healthcare Management'];
}

if (sampleInterviewQuestionsBySpecialization['Finance']) {
  sampleInterviewQuestionsBySpecialization['Finance & FinTech'] = sampleInterviewQuestionsBySpecialization['Finance'];
}
if (sampleInterviewQuestionsBySpecialization['Marketing']) {
  sampleInterviewQuestionsBySpecialization['Marketing & Growth'] = sampleInterviewQuestionsBySpecialization['Marketing'];
}
if (sampleInterviewQuestionsBySpecialization['Human Resources (HR)']) {
  sampleInterviewQuestionsBySpecialization['Human Resources & People Ops'] = sampleInterviewQuestionsBySpecialization['Human Resources (HR)'];
}
if (sampleInterviewQuestionsBySpecialization['Healthcare Management']) {
  sampleInterviewQuestionsBySpecialization['Healthcare & Life Sciences'] = sampleInterviewQuestionsBySpecialization['Healthcare Management'];
}

if (careerPathsBySpecialization['Finance']) {
  careerPathsBySpecialization['Finance & FinTech'] = careerPathsBySpecialization['Finance'];
}
if (careerPathsBySpecialization['Marketing']) {
  careerPathsBySpecialization['Marketing & Growth'] = careerPathsBySpecialization['Marketing'];
}
if (careerPathsBySpecialization['Human Resources (HR)']) {
  careerPathsBySpecialization['Human Resources & People Ops'] = careerPathsBySpecialization['Human Resources (HR)'];
}
if (careerPathsBySpecialization['Healthcare Management']) {
  careerPathsBySpecialization['Healthcare & Life Sciences'] = careerPathsBySpecialization['Healthcare Management'];
}

if (sampleQuizQuestionsBySpecialization['Supply Chain Management']) {
  sampleQuizQuestionsBySpecialization['Supply Chain'] = sampleQuizQuestionsBySpecialization['Supply Chain Management'];
}
if (sampleQuizQuestionsBySpecialization['Operations Management']) {
  sampleQuizQuestionsBySpecialization['Operations'] = sampleQuizQuestionsBySpecialization['Operations Management'];
}

if (sampleInterviewQuestionsBySpecialization['Supply Chain Management']) {
  sampleInterviewQuestionsBySpecialization['Supply Chain'] = sampleInterviewQuestionsBySpecialization['Supply Chain Management'];
}
if (sampleInterviewQuestionsBySpecialization['Operations Management']) {
  sampleInterviewQuestionsBySpecialization['Operations'] = sampleInterviewQuestionsBySpecialization['Operations Management'];
}

if (careerPathsBySpecialization['Supply Chain Management']) {
  careerPathsBySpecialization['Supply Chain'] = careerPathsBySpecialization['Supply Chain Management'];
}
if (careerPathsBySpecialization['Operations Management']) {
  careerPathsBySpecialization['Operations'] = careerPathsBySpecialization['Operations Management'];
}

