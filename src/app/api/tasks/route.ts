import connectDB from '@/lib/db';
import Task from '@/models/Task';
import University from '@/models/University';
import Project from '@/models/Project';
import Finance from '@/models/Finance';
import { handleError, ok, fail } from '@/lib/api';
import { createTaskSchema } from '@/lib/validation';
import {
  roadmapTasks,
  initialUniversities,
  initialProjects,
  initialFinance,
} from '@/data/roadmap';

// GET: Fetch all tasks sorted by sequenceOrder
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ sequenceOrder: 1 });
    return ok({ tasks });
  } catch (error) {
    return handleError('GET /api/tasks', error);
  }
}

// POST: Seed the database (only when empty) or create a single task.
export async function POST(request: Request) {
  try {
    await connectDB();
    const raw: unknown = await request.json().catch(() => ({}));

    if (raw && typeof raw === 'object' && (raw as { action?: unknown }).action === 'seed') {
      // Guard: never wipe an already-populated database.
      const existing = await Task.estimatedDocumentCount();
      if (existing > 0) {
        return fail('Database is already seeded. Delete existing data before re-seeding.', 409);
      }

      await Task.insertMany(roadmapTasks);
      await University.insertMany(initialUniversities);
      await Project.insertMany(initialProjects);
      await Finance.create({ ...initialFinance, date: new Date() });

      return ok({ message: 'Database successfully seeded with 104-week plan!' });
    }

    // Otherwise create a new task.
    const { title, description, category, phase, weekNumber } = createTaskSchema.parse(raw);
    const task = await Task.create({
      title,
      description,
      category,
      phase,
      weekNumber,
      sequenceOrder: weekNumber,
      isCompleted: false,
    });
    return ok({ task }, 201);
  } catch (error) {
    return handleError('POST /api/tasks', error);
  }
}
