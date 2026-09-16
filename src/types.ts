export type SpecializationType =
  | 'Software Engineering & Tech'
  | 'AI & Data Science'
  | 'Product Management'
  | 'Finance & FinTech'
  | 'Marketing & Growth'
  | 'Business Analytics'
  | 'Human Resources & People Ops'
  | 'UI/UX & Product Design'
  | 'Management Consulting & Strategy'
  | 'Healthcare & Life Sciences'
  | 'Finance'
  | 'Marketing'
  | 'Human Resources (HR)'
  | 'Agri-Business Management'
  | 'Healthcare Management'
  | 'Supply Chain Management'
  | 'Operations Management';

export type UserRole = 'student' | 'faculty' | 'placement';
export type AppUserRole = UserRole;

export type StudentNavTab =
  | 'dashboard'
  | 'assistant'
  | 'learning_hub'
  | 'quiz'
  | 'interview'
  | 'skills'
  | 'guidance'
  | 'internships'
  | 'faculty'
  | 'placement';

export type SkillName = string;

export interface SubSkill {
  name: string;
  score: number; // 0-100
  weight: number;
}

export interface SkillCategoryData {
  name: string;
  score: number; // 0-100
  benchmark: number; // Benchmark score for target role (e.g. 80)
  strengths: string[];
  weaknesses: string[];
  subSkills: SubSkill[];
  lastAssessedDate: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  college: string;
  degree: string;
  specialization: SpecializationType;
  targetRole: string;
  graduationYear: number;
  cgpa: number;
  academicScore: number; // 0-100
  overallSkillScore: number; // 0-100
  interviewReadinessScore: number; // 0-100
  placementReadinessScore: number; // 0-100 overall composite
  placementStatus: 'Building Foundations' | 'Placement Ready' | 'Highly Competitive';
  skills: Record<string, SkillCategoryData>;
  completedQuizzesCount: number;
  completedInterviewsCount: number;
  questionsAskedCount: number;
}

export type QuizSubject = string;

export interface QuizQuestion {
  id: string;
  specialization?: SpecializationType;
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionType?: 'Conceptual' | 'Numerical' | 'Case-based' | 'MCQ';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  keyTakeaway?: string;
  formula?: string;
}

export interface QuizResult {
  id: string;
  specialization?: SpecializationType;
  subject: string;
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  answers: {
    questionId: string;
    question: string;
    options: string[];
    userSelected: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
  skillImpactSummary?: string;
  weakTopics?: string[];
}

export type InterviewType = 'HR' | 'Technical' | 'Situational' | 'Case-based';

export interface InterviewQuestionItem {
  id: string;
  specialization?: SpecializationType;
  type: InterviewType;
  role: string;
  title: string;
  question: string;
  promptContext: string;
  expectedKeyPoints: string[];
  modelAnswer: string;
}

export interface InterviewEvaluationResult {
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'Needs Work';
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  benchmarkModelResponse: string;
  rubricScores: {
    technicalAccuracy: number; // 0-10
    structureAndClarity: number; // 0-10
    commercialAwareness: number; // 0-10
    depthOfExamples: number; // 0-10
  };
}

export interface SavedInterviewRecord {
  id: string;
  date: string;
  specialization?: SpecializationType;
  type: InterviewType;
  role: string;
  question: string;
  studentAnswer: string;
  evaluation: InterviewEvaluationResult;
}

export interface CareerPathOption {
  id: string;
  specialization?: SpecializationType;
  title: string;
  matchScore: number; // 0-100
  description: string;
  averageStartingSalary: string;
  topEmployers: string[];
  coreCompetencies: string[];
  skillGap: string;
  typicalProgression: string;
  requiredCertifications?: string[];
}

export interface SkillRecommendation {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  whyItMatters: string;
  recommendedActions: string[];
  linkedTopic: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: string;
  suggestedFollowups?: string[];
}

export interface LearningHubModule {
  id: string;
  specialization: SpecializationType;
  title: string;
  subject: string;
  description: string;
  difficulty: 'Core' | 'Advanced' | 'Applied';
  keyConcepts: {
    title: string;
    description: string;
    frameworkOrFormula?: string;
  }[];
  interviewFocusQuestions: {
    question: string;
    modelKeyPoints: string;
  }[];
  quizTopicLink: string;
}

export interface OpportunityListing {
  id: string;
  company: string;
  logoColor: string;
  role: string;
  specialization: SpecializationType;
  type: 'Internship' | 'Final Placement';
  location: string;
  stipendOrSalary: string;
  minCgpa: number;
  applicationDeadline: string;
  openings: number;
  requiredSkills: { skill: string; minScore: number }[];
  recruitmentProcess: string[];
  description: string;
  preparationAdvice: string[];
  isFeatured?: boolean;
}

export interface FacultyStudentRow {
  id: string;
  name: string;
  email: string;
  specialization: SpecializationType;
  targetRole: string;
  quizzesCompleted: number;
  avgQuizScore: number;
  readinessScore: number;
  interviewsCompleted: number;
  status: 'Placement Ready' | 'In Progress' | 'Needs Attention';
  weakestTopic: string;
  lastActive: string;
}
