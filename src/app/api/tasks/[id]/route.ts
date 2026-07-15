import type { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { handleError, ok, fail, parseBody } from '@/lib/api';
import { updateTaskSchema } from '@/lib/validation';

// PUT: Update an existing task's details
export async function PUT(request: NextRequest, ctx: RouteContext<'/api/tasks/[id]'>) {
  try {
    const { id } = await ctx.params;
    await connectDB();

    const data = await parseBody(request, updateTaskSchema);

    const task = await Task.findById(id);
    if (!task) {
      return fail('Task not found', 404);
    }

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.category !== undefined) task.category = data.category;
    if (data.phase !== undefined) task.phase = data.phase;
    if (data.weekNumber !== undefined) {
      task.weekNumber = data.weekNumber;
      task.sequenceOrder = data.weekNumber;
    }
    if (data.isCompleted !== undefined) {
      task.isCompleted = data.isCompleted;
      task.completedAt = data.isCompleted ? new Date() : undefined;
    }
    if (data.notes !== undefined) task.notes = data.notes;

    await task.save();
    return ok({ task });
  } catch (error) {
    return handleError('PUT /api/tasks/[id]', error);
  }
}

// DELETE: Remove a task from the database
export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/tasks/[id]'>) {
  try {
    const { id } = await ctx.params;
    await connectDB();

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return fail('Task not found', 404);
    }
    return ok({ message: 'Task deleted successfully' });
  } catch (error) {
    return handleError('DELETE /api/tasks/[id]', error);
  }
}
