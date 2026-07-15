// Shared client-side domain types for the dashboard.

export interface ITask {
  _id: string;
  weekNumber: number;
  phase: string;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  completedAt?: string;
  sequenceOrder: number;
  notes?: string;
}

export interface IUniversity {
  _id?: string;
  name: string;
  city: string;
  ranking: string;
  tuitionFees: string;
  scholarships: string;
  ieltsRequirement: string;
  deadline: string;
  duration: string;
  livingCost: string;
  status: 'Researching' | 'Applying' | 'Submitted' | 'Accepted' | 'Rejected';
}

export interface IProjectFeature {
  name: string;
  completed: boolean;
  _id?: string;
}

export interface IProject {
  _id: string;
  name: string;
  type: string;
  description: string;
  techStack: string[];
  features: IProjectFeature[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  status: 'Idea' | 'In Progress' | 'Completed' | 'Deployed';
}

export interface ITransaction {
  _id: string;
  description: string;
  amount: number;
  type: 'Deposit' | 'Withdrawal';
  category: 'Sponsor' | 'Business Income' | 'Savings' | 'Expenses';
  date: string;
}

export interface UploadedDoc {
  title: string;
  fileUrl: string;
}

export type DashboardTab = 'focus' | 'goals' | 'projects' | 'finance' | 'docs';

export interface AddTaskForm {
  title: string;
  description: string;
  category: string;
  phase: string;
  weekNumber: string;
}

export interface EditTaskForm {
  title: string;
  description: string;
  category: string;
  phase: string;
  weekNumber: string;
  isCompleted: boolean;
  notes: string;
}

export interface NewTransactionForm {
  description: string;
  amount: string;
  type: string;
  category: string;
  date: string;
}

export const TASK_CATEGORY_OPTIONS = [
  'IELTS', 'Portfolio', 'GitHub', 'Skills', 'SaaS', 'University',
  'Documents', 'Finance', 'Visa', 'Arrival', 'Career',
] as const;

export const TASK_PHASE_OPTIONS = [
  'Phase 1: IELTS & Portfolio',
  'Phase 2: Build Enterprise SaaS & Advanced Skills',
  'Phase 3: University Research & Documents',
  'Phase 4: Financial Preparation',
  'Phase 5: University & Universitaly',
  'Phase 6: Visa',
  'Phase 7: Landing in Italy',
  'Phase 8: Career & Professional Growth in Italy',
] as const;
