import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { handleError, ok, fail, parseBody } from '@/lib/api';
import { createProjectSchema, updateProjectSchema } from '@/lib/validation';

// GET: Fetch all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: 1 });
    return ok({ projects });
  } catch (error) {
    return handleError('GET /api/projects', error);
  }
}

// PUT: Update project details (status, feature completion, URLs, etc.)
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...updateData } = await parseBody(request, updateProjectSchema);

    const project = await Project.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return fail('Project not found', 404);
    }
    return ok({ project });
  } catch (error) {
    return handleError('PUT /api/projects', error);
  }
}

// POST: Create a new project
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await parseBody(request, createProjectSchema);
    const project = await Project.create(data);
    return ok({ project }, 201);
  } catch (error) {
    return handleError('POST /api/projects', error);
  }
}
