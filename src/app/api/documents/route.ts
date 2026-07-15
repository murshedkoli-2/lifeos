import connectDB from '@/lib/db';
import DocumentModel from '@/models/Document';
import { handleError, ok, parseBody } from '@/lib/api';
import { createDocumentSchema } from '@/lib/validation';

// GET: Fetch all saved documents
export async function GET() {
  try {
    await connectDB();
    const documents = await DocumentModel.find({});
    return ok({ documents });
  } catch (error) {
    return handleError('GET /api/documents', error);
  }
}

// POST: Create or update a document mapping a title to a Cloudinary URL
export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, fileUrl } = await parseBody(request, createDocumentSchema);

    const document = await DocumentModel.findOneAndUpdate(
      { title },
      { fileUrl, uploadedAt: new Date() },
      { new: true, upsert: true }
    );
    return ok({ document });
  } catch (error) {
    return handleError('POST /api/documents', error);
  }
}
