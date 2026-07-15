import connectDB from '@/lib/db';
import University from '@/models/University';
import { handleError, ok, fail, parseBody } from '@/lib/api';
import { createUniversitySchema, updateUniversitySchema } from '@/lib/validation';

// GET: Fetch all universities
export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({}).sort({ ranking: 1 });
    return ok({ universities });
  } catch (error) {
    return handleError('GET /api/universities', error);
  }
}

// POST: Add a new university
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await parseBody(request, createUniversitySchema);
    const university = await University.create(data);
    return ok({ university }, 201);
  } catch (error) {
    return handleError('POST /api/universities', error);
  }
}

// PUT: Update an existing university
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...updateData } = await parseBody(request, updateUniversitySchema);

    const university = await University.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!university) {
      return fail('University not found', 404);
    }
    return ok({ university });
  } catch (error) {
    return handleError('PUT /api/universities', error);
  }
}

// DELETE: Remove a university
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return fail('University ID is required', 400);
    }

    const deleted = await University.findByIdAndDelete(id);
    if (!deleted) {
      return fail('University not found', 404);
    }
    return ok({ message: 'University deleted successfully' });
  } catch (error) {
    return handleError('DELETE /api/universities', error);
  }
}
