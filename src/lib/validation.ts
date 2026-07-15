import { z } from 'zod';

// Schema-based validation at every API boundary. Enums mirror the Mongoose
// model enums so bad input is rejected before it reaches the database.

export const TASK_CATEGORIES = [
  'IELTS', 'Portfolio', 'GitHub', 'Skills', 'SaaS', 'University', 'Universitaly',
  'Documents', 'Finance', 'Visa', 'Arrival', 'Career',
] as const;

export const TASK_PHASES = [
  'Phase 1: IELTS & Portfolio',
  'Phase 2: Build Enterprise SaaS & Advanced Skills',
  'Phase 3: University Research & Documents',
  'Phase 4: Financial Preparation',
  'Phase 5: University & Universitaly',
  'Phase 6: Visa',
  'Phase 7: Landing in Italy',
  'Phase 8: Career & Professional Growth in Italy',
] as const;

// weekNumber arrives from the UI as a string; coerce and bound it.
const weekNumber = z.coerce.number().int().min(1).max(520);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(4000),
  category: z.string().trim().min(1).max(50),
  phase: z.string().trim().min(1).max(200),
  weekNumber,
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).max(4000).optional(),
    category: z.string().trim().min(1).max(50).optional(),
    phase: z.string().trim().min(1).max(200).optional(),
    weekNumber: weekNumber.optional(),
    isCompleted: z.boolean().optional(),
    notes: z.string().max(10000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: 'No fields provided to update' });

export const completeTaskSchema = z
  .object({
    isCompleted: z.boolean().optional(),
    notes: z.string().max(10000).optional(),
  })
  .refine((data) => data.isCompleted !== undefined || data.notes !== undefined, {
    message: 'Provide isCompleted and/or notes',
  });

export const UNIVERSITY_STATUSES = [
  'Researching', 'Applying', 'Submitted', 'Accepted', 'Rejected',
] as const;

export const createUniversitySchema = z.object({
  name: z.string().trim().min(1).max(200),
  city: z.string().trim().min(1).max(120),
  ranking: z.string().trim().max(50).optional().default(''),
  tuitionFees: z.string().trim().max(120).optional().default(''),
  scholarships: z.string().trim().max(300).optional().default(''),
  ieltsRequirement: z.string().trim().max(50).optional().default(''),
  deadline: z.string().trim().max(120).optional().default(''),
  duration: z.string().trim().max(120).optional().default(''),
  livingCost: z.string().trim().max(120).optional().default(''),
  status: z.enum(UNIVERSITY_STATUSES).optional().default('Researching'),
});

export const updateUniversitySchema = z
  .object({
    _id: z.string().trim().min(1),
    name: z.string().trim().min(1).max(200).optional(),
    city: z.string().trim().min(1).max(120).optional(),
    ranking: z.string().trim().max(50).optional(),
    tuitionFees: z.string().trim().max(120).optional(),
    scholarships: z.string().trim().max(300).optional(),
    ieltsRequirement: z.string().trim().max(50).optional(),
    deadline: z.string().trim().max(120).optional(),
    duration: z.string().trim().max(120).optional(),
    livingCost: z.string().trim().max(120).optional(),
    status: z.enum(UNIVERSITY_STATUSES).optional(),
  });

export const PROJECT_TYPES = ['SaaS', 'Enterprise', 'AI', 'Open Source', 'Portfolio'] as const;
export const PROJECT_STATUSES = ['Idea', 'In Progress', 'Completed', 'Deployed'] as const;

const projectFeatureSchema = z.object({
  name: z.string().trim().min(1).max(200),
  completed: z.boolean(),
  _id: z.string().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().trim().min(1).max(200),
  type: z.enum(PROJECT_TYPES),
  description: z.string().trim().max(2000).optional().default(''),
  techStack: z.array(z.string().trim().min(1).max(60)).max(50).optional().default([]),
  features: z.array(projectFeatureSchema).max(100).optional().default([]),
  status: z.enum(PROJECT_STATUSES).optional().default('Idea'),
});

const httpUrl = z.string().trim().url().max(2000);

export const updateProjectSchema = z
  .object({
    _id: z.string().trim().min(1),
    name: z.string().trim().min(1).max(200).optional(),
    type: z.enum(PROJECT_TYPES).optional(),
    description: z.string().trim().max(2000).optional(),
    techStack: z.array(z.string().trim().min(1).max(60)).max(50).optional(),
    features: z.array(projectFeatureSchema).max(100).optional(),
    status: z.enum(PROJECT_STATUSES).optional(),
    githubUrl: z.union([httpUrl, z.literal('')]).optional(),
    liveUrl: z.union([httpUrl, z.literal('')]).optional(),
    demoVideoUrl: z.union([httpUrl, z.literal('')]).optional(),
  });

export const FINANCE_TYPES = ['Deposit', 'Withdrawal'] as const;
export const FINANCE_CATEGORIES = ['Sponsor', 'Business Income', 'Savings', 'Expenses'] as const;

export const createFinanceSchema = z.object({
  description: z.string().trim().min(1).max(300),
  amount: z.coerce.number().positive().finite().max(1_000_000_000),
  type: z.enum(FINANCE_TYPES),
  category: z.enum(FINANCE_CATEGORIES),
  date: z.string().trim().optional(),
});

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1).max(200),
  fileUrl: z.string().trim().url().max(2000),
});

export const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

/** Sum deposits minus withdrawals. Shared by the finances route and its tests. */
export function computeTotalSavings(
  transactions: ReadonlyArray<{ type: string; amount: number }>
): number {
  return transactions.reduce(
    (acc, tx) => (tx.type === 'Deposit' ? acc + tx.amount : acc - tx.amount),
    0
  );
}

// Upload constraints (used by the upload route).
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_UPLOAD_MIME = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf',
] as const;
