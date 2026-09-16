import {
  StudentProfile,
  QuizQuestion,
  InterviewQuestionItem,
  CareerPathOption,
  SkillRecommendation,
  SavedInterviewRecord,
} from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'std_2026_0891',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  college: 'School of Business & Economics',
  degree: 'B.S. in Finance',
  specialization: 'Finance',
  targetRole: 'Financial Analyst',
  graduationYear: 2026,
  cgpa: 8.4,
  academicScore: 82,
  overallSkillScore: 75,
  interviewReadinessScore: 68,
  placementReadinessScore: 75,
  placementStatus: 'Building Foundations',
  completedQuizzesCount: 14,
  completedInterviewsCount: 6,
  questionsAskedCount: 42,
  skills: {
    Accounting: {
      name: 'Accounting',
      score: 78,
      benchmark: 80,
      strengths: ['Three-Statement Linkages', 'Revenue Recognition (ASC 606)', 'Working Capital Mechanics'],
      weaknesses: ['Deferred Tax Assets/Liabilities (DTA/DTL)', 'Stock-Based Compensation Cash Flow Impact'],
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
      strengths: ['XLOOKUP & INDEX/MATCH', 'Dynamic Array & SUMIFS/COUNTIFS', 'Sensitivity Tables (Data Tables)'],
      weaknesses: ['Power Query ETL pipelines', 'VBA & Automated Macro Debugging'],
      subSkills: [
        { name: 'Core Formulas & Lookups', score: 94, weight: 0.3 },
        { name: 'Financial Logic (IRR, NPV, XIRR)', score: 88, weight: 0.25 },
        { name: 'Data Tables & Scenario Managers', score: 80, weight: 0.25 },
        { name: 'Keyboard Shortcuts & Speed Modelling', score: 70, weight: 0.2 },
      ],
      lastAssessedDate: '3 days ago',
    },
    'Financial Modelling': {
      name: 'Financial Modelling',
      score: 64,
      benchmark: 85,
      strengths: ['Top-Line Revenue Drivers', 'COGS & SG&A Schedules'],
      weaknesses: ['Circular Interest Debt Schedule', 'DCF Terminal Value Sensitivities', 'Balance Sheet Balancing under M&A'],
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
      strengths: ['DuPont 3-Way ROE Decomposition', 'Liquidity, Solvency & Coverage Ratios', 'EBITDA vs Free Cash Flow Bridge'],
      weaknesses: ['Valuation Multiple Pitfalls (EV/EBIT vs EV/EBITDA)', 'WACC Capital Structure Weighting'],
      subSkills: [
        { name: 'Profitability & Efficiency Metrics', score: 88, weight: 0.3 },
        { name: 'Liquidity & Solvency Profiling', score: 85, weight: 0.25 },
        { name: 'Comparable Company Analysis (Comps)', score: 76, weight: 0.25 },
        { name: 'Capital Budgeting (NPV vs IRR Conflicts)', score: 78, weight: 0.2 },
      ],
      lastAssessedDate: '1 week ago',
    },
    'Interview Skills': {
      name: 'Interview Skills',
      score: 68,
      benchmark: 85,
      strengths: ['Clear Articulation & Professional Tone', 'Polished "Tell Me About Yourself" Pitch'],
      weaknesses: ['Structuring Technical M&A Walkthroughs Under Pressure', 'STAR Method Specificity for Conflict Scenarios'],
      subSkills: [
        { name: 'HR & Behavioral Fit (STAR Method)', score: 76, weight: 0.3 },
        { name: 'Technical Statement Walkthroughs', score: 62, weight: 0.35 },
        { name: 'Situational & Workplace Dilemmas', score: 70, weight: 0.2 },
        { name: 'Case-based Brainteasers & Market Sizing', score: 60, weight: 0.15 },
      ],
      lastAssessedDate: '2 days ago',
    },
  },
};

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'q_fin_1',
    subject: 'Corporate Finance',
    topic: 'WACC & Capital Structure',
    difficulty: 'Intermediate',
    question: 'Why is the cost of debt in the Weighted Average Cost of Capital (WACC) equation multiplied by (1 - Tax Rate)?',
    options: [
      'Debt holders require a lower rate of return because interest payments are legally guaranteed',
      'Interest expenses are tax-deductible, creating an interest tax shield that reduces the effective cost of debt',
      'Corporate tax codes mandate that equity dividends receive equal tax deductions as debt coupons',
      'The government subsidizes 50% of the principal repayments for qualified corporate debentures',
    ],
    correctAnswerIndex: 1,
    explanation: 'Interest expense paid on debt is tax-deductible for corporations (an interest tax shield). Therefore, the effective after-tax cost of debt to the company is Kd * (1 - T). Dividend payments to equity holders, in contrast, come out of after-tax net income.',
    formula: 'Cost of Debt (after-tax) = Pre-tax Kd × (1 - Tax Rate)',
    keyTakeaway: 'Always use after-tax cost of debt in WACC calculations because interest is tax-deductible.',
  },
  {
    id: 'q_fin_2',
    subject: 'Financial Accounting',
    topic: '3-Statement Flow Mechanics',
    difficulty: 'Intermediate',
    question: 'If Depreciation expense increases by $10 million and the corporate tax rate is 25%, what is the net change on the Cash Flow Statement at the end of Year 1?',
    options: [
      'Cash increases by $2.5 million',
      'Cash decreases by $10 million',
      'Cash decreases by $7.5 million',
      'Cash increases by $7.5 million',
    ],
    correctAnswerIndex: 0,
    explanation: 'Step 1 (IS): Operating income drops by $10M. At 25% tax, Net Income decreases by $7.5M ($10M × (1 - 0.25)). Step 2 (CFS): Cash from Operations starts with Net Income (-$7.5M). Since Depreciation is a non-cash expense, we add back the entire $10M. Overall Net Cash Flow increases by +$2.5M due to the tax shield savings ($10M × 25%).',
    formula: 'ΔCash = (Depreciation × Tax Rate) = $10M × 25% = +$2.5M',
    keyTakeaway: 'Depreciation increases cash because it shelters pretax income from taxes.',
  },
  {
    id: 'q_fin_3',
    subject: 'Excel for Finance',
    topic: 'Advanced Lookup & Dynamic Formulas',
    difficulty: 'Beginner',
    question: 'What is the key structural advantage of using XLOOKUP over traditional VLOOKUP in financial modeling?',
    options: [
      'XLOOKUP automatically updates cell color formats based on conditional rules',
      'XLOOKUP defaults to exact match and can look up values to the left without requiring column index restructuring',
      'XLOOKUP converts circular references into iterative calculations automatically',
      'XLOOKUP is strictly limited to 256 rows to prevent workbook corruption',
    ],
    correctAnswerIndex: 1,
    explanation: 'XLOOKUP defaults to exact match (eliminating the need for FALSE/0), does not break when columns are inserted or moved, and easily looks left or right. In contrast, VLOOKUP requires a rigid column index number and only looks to the right.',
    formula: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])',
    keyTakeaway: 'XLOOKUP makes dynamic models robust against column insertions and removals.',
  },
  {
    id: 'q_fin_4',
    subject: 'Valuation & DCF',
    topic: 'Enterprise Value vs Equity Value',
    difficulty: 'Intermediate',
    question: 'A company issues $50 million in new debt and keeps the entire proceeds in its bank account as cash. What happens to its Enterprise Value immediately upon issuance?',
    options: [
      'Enterprise Value increases by $50 million',
      'Enterprise Value decreases by $50 million',
      'Enterprise Value remains unchanged',
      'Enterprise Value doubles due to financial leverage',
    ],
    correctAnswerIndex: 2,
    explanation: 'Enterprise Value = Equity Value + Total Debt - Cash. When the company borrows $50M, Total Debt increases by +$50M, but Cash also increases by +$50M. Net Debt (Total Debt - Cash) is unchanged ($50M - $50M = 0), so Enterprise Value remains unchanged.',
    formula: 'EV = Equity Value + Net Debt = Equity Value + (Debt - Cash)',
    keyTakeaway: 'Raising debt to hold cash does not change Enterprise Value because Net Debt is neutral.',
  },
  {
    id: 'q_fin_5',
    subject: 'Financial Statement Analysis',
    topic: 'DuPont Framework',
    difficulty: 'Advanced',
    question: 'Under the 3-Step DuPont Analysis, Return on Equity (ROE) is decomposed into which three multiplicative components?',
    options: [
      'Gross Margin × Current Ratio × Debt-to-Equity',
      'Net Profit Margin × Asset Turnover × Financial Leverage Multiplier (Equity Multiplier)',
      'Operating Margin × Inventory Days × Free Cash Flow Conversion',
      'EBITDA Margin × Return on Invested Capital × Dividend Payout Ratio',
    ],
    correctAnswerIndex: 1,
    explanation: 'The classic 3-step DuPont model decomposes ROE = (Net Income / Revenue) × (Revenue / Total Assets) × (Total Assets / Shareholders Equity), which represents Net Profit Margin (profitability) × Asset Turnover (operational efficiency) × Equity Multiplier (financial leverage).',
    formula: 'ROE = Net Profit Margin × Asset Turnover × Equity Multiplier',
    keyTakeaway: 'DuPont tells you whether higher ROE comes from pricing power, asset utilization, or higher leverage debt.',
  },
  {
    id: 'q_fin_6',
    subject: 'Corporate Finance',
    topic: 'Capital Budgeting (NPV vs IRR)',
    difficulty: 'Intermediate',
    question: 'When evaluating mutually exclusive investment projects with conflicting NPV and IRR rankings, which metric should the financial analyst prioritize and why?',
    options: [
      'IRR, because percentage returns are independent of initial project scale',
      'NPV, because it directly measures shareholder wealth creation and assumes realistic reinvestment at the cost of capital',
      'Payback Period, because early liquidity always trumps total discounted cash flow',
      'Profitability Index, because it ignores the discount rate altogether',
    ],
    correctAnswerIndex: 1,
    explanation: 'NPV is theoretically superior to IRR for mutually exclusive projects. NPV directly reflects total dollar wealth created for shareholders and assumes cash flows can be reinvested at the firm cost of capital (WACC). IRR unrealistically assumes reinvestment at the IRR rate itself.',
    formula: 'NPV = Σ [CF_t / (1 + r)^t] - Initial Investment',
    keyTakeaway: 'Always choose the highest NPV project when there is an NPV vs IRR conflict.',
  },
  {
    id: 'q_fin_7',
    subject: 'Excel for Finance',
    topic: 'Sensitivities & Data Tables',
    difficulty: 'Intermediate',
    question: 'In financial modeling, what is the shortcut to recalculate Data Tables in Excel when workbook calculation mode is set to "Automatic except for Data Tables"?',
    options: [
      'F9',
      'Shift + F9',
      'Ctrl + Alt + F9',
      'Alt + Enter',
    ],
    correctAnswerIndex: 0,
    explanation: 'Pressing F9 recalculates all open workbooks including data tables. Financial modelers frequently set Calculation to "Automatic except for Data Tables" so large sensitivity matrices do not slow down everyday typing, and press F9 when they want the matrix updated.',
    formula: 'Shortcuts: F9 (Full Recalc), Shift+F9 (Active Sheet Only)',
    keyTakeaway: 'Prevent Excel lag by setting Data Tables to manual and refreshing with F9.',
  },
  {
    id: 'q_fin_8',
    subject: 'Valuation & DCF',
    topic: 'Gordon Growth Terminal Value',
    difficulty: 'Advanced',
    question: 'In a Discounted Cash Flow model, what happens if the Perpetual Terminal Growth Rate (g) is set higher than the Long-Term GDP Growth Rate of the economy?',
    options: [
      'The company valuation will automatically converge to zero',
      'The model is economically irrational because the company will eventually become larger than the entire global economy',
      'WACC will automatically decrease to negative numbers',
      'The terminal value formula denominator becomes negative and generates an error',
    ],
    correctAnswerIndex: 1,
    explanation: 'The perpetual terminal growth rate in a Gordon Growth DCF model represents the company growth rate into infinity. If g exceeds long-term GDP growth (typically 2-3%), the mathematical implication is that the company will eventually outgrow the entire macroeconomy.',
    formula: 'Terminal Value = [FCF_(n+1)] / (WACC - g)',
    keyTakeaway: 'Keep perpetual growth rates conservative (2% - 3%) aligned with GDP and inflation.',
  },
  {
    id: 'q_fin_9',
    subject: 'Business Analytics',
    topic: 'Variance Analysis & KPI Tracking',
    difficulty: 'Intermediate',
    question: 'In corporate FP&A, if Actual Gross Revenue was $120M vs Budget of $100M, but Gross Margin dropped from 40% to 32%, what was the most likely underlying driver?',
    options: [
      'Favorable price elasticity with premium branding and lower unit costs',
      'Volume-driven growth achieved through aggressive price discounting or severe cost of goods inflation',
      'A change in tax withholding regulations for international subsidiaries',
      'An increase in corporate executive stock options vesting during the quarter',
    ],
    correctAnswerIndex: 1,
    explanation: 'Revenue increased by 20%, but gross margin contracted by 800 basis points. This indicates that additional revenue came from selling products at heavy discounts or unit input costs (COGS/raw materials/freight) escalated significantly faster than sales volume.',
    formula: 'Gross Margin = (Revenue - COGS) / Revenue',
    keyTakeaway: 'Always isolate price variance vs volume variance in FP&A bridge analysis.',
  },
];

export const sampleInterviewQuestions: InterviewQuestionItem[] = [
  {
    id: 'int_1',
    type: 'Technical',
    role: 'Financial Analyst',
    title: '3-Statement Flow: $100 Depreciation Walkthrough',
    question: 'Walk me through the three financial statements if Depreciation increases by $100. Assume a 20% corporate tax rate.',
    promptContext: 'This is the most common technical accounting question on Wall Street and in corporate FP&A interviews. Test your ability to walk step-by-step through Income Statement, Cash Flow Statement, and Balance Sheet.',
    expectedKeyPoints: [
      'Income Statement: Operating Income drops by $100. At 20% tax, Net Income drops by $80.',
      'Cash Flow Statement: Net Income -$80 at top. Add back non-cash Depreciation of +$100. Net Cash Flow increases by +$20.',
      'Balance Sheet: Cash increases by +$20. Net PP&E decreases by -$100 (due to accumulated depreciation). Total Assets decrease by -$80.',
      'Balance Sheet Liabilities & Equity: No liability change. Retained Earnings (Equity) decreases by -$80 from Net Income. Both sides balance at -$80.',
    ],
    modelAnswer: `1. Income Statement:
Operating Income (EBIT) decreases by $100. Assuming a 20% tax rate, tax expense decreases by $20 ($100 × 20%). Therefore, Net Income drops by $80.

2. Cash Flow Statement:
We start with Net Income of -$80. Since depreciation is a non-cash expense, we add back the entire $100 in the Operating Activities section. Net change in cash is +$20 (cash savings from the tax shield).

3. Balance Sheet:
On the Assets side: Cash is up by +$20, but Net PP&E is down by -$100 due to accumulated depreciation. Total Assets decrease by -$80.
On the Liabilities & Equity side: Liabilities are unchanged. Retained Earnings under Shareholders' Equity decreases by -$80 due to lower Net Income.
Both Assets and Liabilities + Equity decrease by $80, and the Balance Sheet balances.`,
  },
  {
    id: 'int_2',
    type: 'HR',
    role: 'Financial Analyst',
    title: 'Why Financial Analyst & Career Motivation',
    question: 'Why do you want to pursue a career as a Financial Analyst, and what preparation sets you apart from other college candidates?',
    promptContext: 'Assess motivation, genuine interest in numbers and business decision-making, and proactive self-learning beyond classroom coursework.',
    expectedKeyPoints: [
      'Specific catalyst or experience that sparked passion for finance (e.g. investment club, case competition, personal project)',
      'Appreciation for translating complex operating metrics into actionable executive decisions',
      'Concrete skill mastery: financial modelling, Excel shortcuts, 3-statement forecasting',
      'Demonstrated diligence, attention to detail, and commercial curiosity',
    ],
    modelAnswer: `I want to be a Financial Analyst because I genuinely enjoy being at the intersection of business strategy and quantitative rigor. While coursework gave me foundational theory, my passion crystallized when I built a full 3-statement operating model for our university's student-managed investment fund. I realized that a financial model isn't just rows of formulas—it's a living roadmap of a company's operational narrative.

What sets me apart is proactive technical preparation. Beyond classes, I earned certifications in financial modeling, mastered advanced Excel functions like dynamic arrays and sensitivity tables, and regularly practice DCF and trading comps valuations. I combine quantitative discipline with the ability to clearly explain 'so-what' implications to senior decision-makers.`,
  },
  {
    id: 'int_3',
    type: 'Situational',
    role: 'Financial Analyst',
    title: 'Prioritizing Conflicting Tight Deadlines',
    question: 'Your Director gives you an urgent request to prepare a Board of Directors variance deck due in 3 hours, while a Senior Manager expects a refined DCF model for an active M&A deal by 4 PM. How do you handle this conflict?',
    promptContext: 'Evaluates time management, communication transparency, stakeholder alignment, and composure under pressure.',
    expectedKeyPoints: [
      'Assess scope, critical path, and true hard deadlines for both deliverables',
      'Immediately communicate proactively with both managers rather than staying silent',
      'Propose a structured compromise or phased delivery (e.g. preliminary numbers or splitting tasks)',
      'Leverage templates, prior work, or ask for peer support if available',
      'Ensure accuracy is not compromised by rush',
    ],
    modelAnswer: `First, I would take 5 minutes to assess the critical path for both deliverables. I would determine if either timeline has flexibility or if a staged output (such as executive summary slides first) satisfies immediate needs.

Second, I would immediately communicate with both stakeholders proactively. I would approach the Senior Manager and explain: 'The Director requested the Board variance deck for an 2 PM deadline. I can deliver the core DCF valuation outputs by 3 PM and the complete sensitivity tables by 5 PM. Does that keep the deal team on track, or should we align with the Director on priority?'

By presenting a proposed solution rather than just an excuse, I enable senior leadership to decide organizational priorities while showing accountability and ensuring quality is maintained.`,
  },
  {
    id: 'int_4',
    type: 'Case-based',
    role: 'Financial Analyst',
    title: 'M&A Accretion / Dilution Rapid Case',
    question: 'Company A wants to acquire Company B for $500 million. Company A has a P/E of 20x and Company B has a P/E of 10x. If the deal is 100% stock-financed with no synergies and zero transaction costs, is the acquisition accretive or dilutive to Company A\'s EPS? Explain the intuitive rule.',
    promptContext: 'Tests candidate intuition on all-stock mergers, P/E multiples, and shares issued vs earnings acquired.',
    expectedKeyPoints: [
      'The deal is accretive to Company A’s EPS',
      'Rule in 100% stock deals: If Buyer P/E > Target P/E (or Buyer Earnings Yield < Target Earnings Yield), the deal is accretive',
      'Company A is trading at 20x (earnings yield of 5%), while Company B is trading at 10x (earnings yield of 10%)',
      'Company A is issuing high-value stock to acquire relatively cheaper earnings',
    ],
    modelAnswer: `The acquisition is accretive to Company A's EPS.

In a 100% stock-funded acquisition with no synergies, there is an established financial rule:
- If the Acquirer's P/E multiple is GREATER than the Target's P/E multiple, the deal is ACCRETIVE.
- If the Acquirer's P/E is LESS than the Target's P/E, it is DILUTIVE.

Here, Company A trades at 20x earnings (an earnings yield of 5%), while Company B trades at 10x earnings (an earnings yield of 10%). Company A is issuing shares that are valued at 20 times earnings to buy earnings that cost only 10 times earnings. Because Company A acquires more earnings per dollar of stock issued than its existing baseline, consolidated EPS increases.`,
  },
  {
    id: 'int_5',
    type: 'Technical',
    role: 'Financial Analyst',
    title: 'Working Capital & Free Cash Flow Dynamics',
    question: 'How does an increase in Accounts Receivable affect Free Cash Flow, and why does this happen even if Revenue increased?',
    promptContext: 'Examines comprehension of cash conversion cycle, revenue recognition timing, and cash flow adjustments.',
    expectedKeyPoints: [
      'An increase in Accounts Receivable reduces Free Cash Flow (cash outflow / use of cash)',
      'Accounts Receivable represents sales recognized on the Income Statement for which cash has not yet been collected from customers',
      'Working capital formula impact: ΔNet Working Capital increases, subtracting from FCF',
    ],
    modelAnswer: `An increase in Accounts Receivable is a use of cash that REDUCES Free Cash Flow.

Here is why: Under accrual accounting, Revenue is recognized on the Income Statement when products or services are delivered, even if the customer bought on credit. This increases Net Income.

However, since the physical cash has not yet been deposited in the bank account, the Cash Flow Statement must adjust for this discrepancy. When Accounts Receivable increases from period 1 to period 2, it indicates that uncollected credit sales exceeded cash collections. Therefore, the increase in AR is subtracted from Operating Cash Flow, reducing Free Cash Flow.`,
  },
];

export const careerPathsData: CareerPathOption[] = [
  {
    id: 'cp_financial_analyst',
    title: 'Financial Analyst (Corporate FP&A)',
    matchScore: 88,
    description: 'Lead annual budget forecasting, monthly variance analysis, capital expenditure evaluation, and executive board reporting for enterprise corporations.',
    averageStartingSalary: '$75,000 – $92,000 + Bonus',
    topEmployers: ['Microsoft', 'Johnson & Johnson', 'Amazon', 'P&G', 'JPMorgan Corporate'],
    coreCompetencies: ['Budgeting & Forecasting', 'Excel Dynamic Modeling', 'Variance Commentary', 'SQL/Tableau Basics'],
    skillGap: 'Minor: Needs deeper debt schedule modeling and power query automation.',
    typicalProgression: 'Financial Analyst (Y1-2) → Senior Analyst (Y3-4) → Finance Manager (Y5-7) → Director of FP&A → VP Finance',
  },
  {
    id: 'cp_investment_banking',
    title: 'Investment Banking Analyst',
    matchScore: 72,
    description: 'Advise corporate clients and private equity firms on mergers & acquisitions, debt/equity capital raises, LBO modeling, and client pitchbooks.',
    averageStartingSalary: '$110,000 – $135,000 + $60k-$90k Bonus',
    topEmployers: ['Goldman Sachs', 'Morgan Stanley', 'Evercore', 'Centerview', 'Lazard'],
    coreCompetencies: ['Complex 3-Statement Modeling', 'LBO & DCF Valuation', 'M&A Accretion/Dilution', 'High-Pressure Technical Polish'],
    skillGap: 'Moderate: Significant gap in advanced DCF terminal value sensitivity and speed modeling.',
    typicalProgression: 'Analyst (Y1-3) → Associate (Y4-6) → VP (Y7-9) → Managing Director',
  },
  {
    id: 'cp_equity_research',
    title: 'Equity Research Associate',
    matchScore: 79,
    description: 'Publish in-depth sector research, build detailed financial forecasting models, and recommend BUY/HOLD/SELL ratings to institutional investors.',
    averageStartingSalary: '$85,000 – $105,000 + Bonus',
    topEmployers: ['Bernstein', 'Baird', 'Jefferies', 'Barclays Research', 'Fidelity'],
    coreCompetencies: ['Industry Deep-Dives', 'Segment Revenue Forecasting', 'Earnings Call Analysis', 'Target Price Justification'],
    skillGap: 'Low-to-Moderate: Strong in financial analysis, needs more practice writing investment theses.',
    typicalProgression: 'Research Associate → Senior Research Analyst → Sector Head / Portfolio Manager',
  },
  {
    id: 'cp_credit_risk',
    title: 'Credit & Risk Analyst',
    matchScore: 84,
    description: 'Assess borrower creditworthiness, analyze debt service coverage ratios (DSCR), model default probabilities, and structure commercial loan facilities.',
    averageStartingSalary: '$72,000 – $88,000 + Bonus',
    topEmployers: ['Moody’s', 'S&P Global', 'Bank of America Commercial', 'Wells Fargo', 'Fitch Ratings'],
    coreCompetencies: ['Solvency & Liquidity Ratios', 'Cash Flow Volatility Modeling', 'Covenant Compliance', 'Debt Covenants'],
    skillGap: 'Minimal: Strong foundation in DuPont and coverage metrics; ready for commercial underwriting cases.',
    typicalProgression: 'Credit Analyst → Senior Underwriter → Portfolio Risk Manager → Chief Credit Officer',
  },
];

export const initialRecommendations: SkillRecommendation[] = [
  {
    id: 'rec_1',
    title: 'Master Debt Schedules & Circular Interest Loops',
    category: 'Financial Modelling',
    priority: 'High',
    estimatedHours: 8,
    status: 'In Progress',
    whyItMatters: 'Financial Analyst technical rounds rigorously test your ability to forecast principal paydown, mandatory amortization, and interest expense based on average cash balances.',
    recommendedActions: [
      'Complete the "Debt Waterfall & Interest Circularity" Quiz module',
      'Practice building a 3-statement model with revolver sweeps and minimum cash balances',
      'Learn how to enable iterative calculations in Excel safely without crashing workbooks',
    ],
    linkedTopic: 'Valuation & DCF',
  },
  {
    id: 'rec_2',
    title: 'Perfect the "3-Statement Flow" Mock Interview',
    category: 'Interview Skills',
    priority: 'High',
    estimatedHours: 4,
    status: 'Not Started',
    whyItMatters: 'Candidates who hesitate on Depreciation or Working Capital changes are frequently disqualified within the first 15 minutes of an analyst interview.',
    recommendedActions: [
      'Record 3 rounds in PathWay AI Mock Interview simulator for Technical Walkthroughs',
      'Use the standardized 3-step script: 1. Income Statement, 2. Cash Flow Statement, 3. Balance Sheet check',
      'Memorize tax shield formula: ΔCash = Non-Cash Expense × Tax Rate',
    ],
    linkedTopic: '3-Statement Flow Mechanics',
  },
  {
    id: 'rec_3',
    title: 'Deferred Taxes & Stock-Based Comp Accounting',
    category: 'Accounting',
    priority: 'Medium',
    estimatedHours: 6,
    status: 'Not Started',
    whyItMatters: 'High-growth tech companies and modern corporations make heavy use of SBC and deferred taxes, which distort GAAP Operating Margins.',
    recommendedActions: [
      'Take the "Deferred Taxes & Special Items" specialized quiz',
      'Review why DTL acts like an interest-free loan from the government',
      'Ask PathWay AI Assistant: "Walk me through how Stock-Based Compensation flows across 3 statements"',
    ],
    linkedTopic: 'Financial Accounting',
  },
  {
    id: 'rec_4',
    title: 'Excel Dynamic Arrays & Financial Sensitivity Matrices',
    category: 'Excel',
    priority: 'Medium',
    estimatedHours: 5,
    status: 'Completed',
    whyItMatters: 'Wall Street and Big 4 corporate finance teams evaluate modeling candidates on how cleanly they structure two-variable data tables (WACC vs Terminal Growth).',
    recommendedActions: [
      'Master =XLOOKUP, =LET, and dynamic spill operators (#)',
      'Build a two-way Data Table evaluating Share Price across Cost of Capital (8%-12%) and Terminal Growth (1.5%-3.5%)',
    ],
    linkedTopic: 'Excel for Finance',
  },
];

export const samplePastInterviewRecords: SavedInterviewRecord[] = [
  {
    id: 'rec_int_01',
    date: '2 days ago',
    type: 'Technical',
    role: 'Financial Analyst',
    question: 'Walk me through the three financial statements if Depreciation increases by $100. Assume a 20% corporate tax rate.',
    studentAnswer: 'On the income statement, operating income drops by $100, and with 20% taxes, net income drops by $80. On the cash flow statement, we start with net income of -$80 and add back $100 of depreciation, so cash goes up by $20. On the balance sheet, cash is up $20, PP&E is down $100, so assets are down $80. Retained earnings is down $80, so it balances.',
    evaluation: {
      score: 88,
      grade: 'A',
      summary: 'Excellent, concise, and structured walkthrough. You nailed the tax shield benefit and balanced both sides of the balance sheet accurately.',
      strengths: [
        'Immediate, clear step-by-step progression through all 3 statements in correct order',
        'Accurately explained that net cash goes up by $20 due to the non-cash add-back and tax shield',
        'Demonstrated exact balance sheet equilibrium with both sides down $80',
      ],
      areasForImprovement: [
        'Mention explicitly that accumulated depreciation increases by $100, which reduces Net PP&E',
        'State clearly upfront that tax expense decreases by $20 to show exact tax math',
      ],
      benchmarkModelResponse: 'Operating Income drops by $100. Tax expense decreases by $20, reducing Net Income by $80. On Cash Flow from Operations, Net Income is -$80; we add back the non-cash $100 depreciation, so ending cash increases by +$20. On the Balance Sheet, Cash is +$20, Net PP&E is -$100, bringing Total Assets to -$80. On the other side, Retained Earnings drops by -$80, balancing the balance sheet.',
      rubricScores: {
        technicalAccuracy: 9,
        structureAndClarity: 9,
        commercialAwareness: 8,
        depthOfExamples: 8,
      },
    },
  },
];
