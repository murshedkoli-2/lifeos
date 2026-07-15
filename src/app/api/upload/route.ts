import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { handleError, ok, fail } from '@/lib/api';
import { MAX_UPLOAD_BYTES, ALLOWED_UPLOAD_MIME } from '@/lib/validation';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Secure server-side document upload. Requests reaching here are already
// authenticated by proxy.ts; here we enforce file size and MIME allow-list
// before streaming to Cloudinary to prevent storage/cost abuse.
export async function POST(request: Request) {
  try {
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName || cloudName === 'demo') {
      return fail(
        'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME in your .env.local file.',
        400
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return fail('No file uploaded', 400);
    }
    if (file.size === 0) {
      return fail('Uploaded file is empty', 400);
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return fail(`File exceeds the ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB limit`, 413);
    }
    if (!ALLOWED_UPLOAD_MIME.includes(file.type as (typeof ALLOWED_UPLOAD_MIME)[number])) {
      return fail('Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, PDF.', 415);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'lifeos_documents',
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error('Upload returned no result'));
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return ok({ secure_url: uploadResult.secure_url });
  } catch (error) {
    return handleError('POST /api/upload', error);
  }
}
