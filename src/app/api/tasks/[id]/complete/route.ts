import type { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { handleError, ok, fail, parseBody } from '@/lib/api';
import { completeTaskSchema } from '@/lib/validation';

// PATCH: Toggle completion and/or update notes for a task.
export async function PATCH(request: NextRequest, ctx: RouteContext<'/api/tasks/[id]/complete'>) {
  try {
    const { id } = await ctx.params;
    await connectDB();

    const { isCompleted, notes } = await parseBody(request, completeTaskSchema);

    const task = await Task.findById(id);
    if (!task) {
      return fail('Task not found', 404);
    }

    if (isCompleted !== undefined) {
      task.isCompleted = isCompleted;
      task.completedAt = isCompleted ? new Date() : undefined;
    }
    if (notes !== undefined) {
      task.notes = notes;
    }

    await task.save();
    return ok({ task });
  } catch (error) {
    return handleError('PATCH /api/tasks/[id]/complete', error);
  }
}
