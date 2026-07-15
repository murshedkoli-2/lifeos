import { NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';

// Consistent response envelope + safe error handling for all route handlers.
// Internal error details are logged server-side but never returned to clients
// (avoids leaking Mongo/connection internals — see security guidelines).

export function ok<T extends Record<string, unknown>>(data: T, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function fail(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

/**
 * Log the real error server-side and return a generic client-safe response.
 * Zod validation errors are surfaced as 400s with field-level messages, since
 * those describe the caller's own bad input rather than server internals.
 */
export function handleError(context: string, error: unknown) {
  if (error instanceof ZodError) {
    const message = error.issues
      .map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`)
      .join('; ');
    return fail(message || 'Invalid request payload', 400);
  }

  console.error(`[${context}]`, error);
  return fail('An internal server error occurred. Please try again.', 500);
}

/** Parse and validate a JSON request body against a Zod schema. Throws ZodError on failure. */
export async function parseBody<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  const raw = await request.json().catch(() => {
    throw new ZodError([
      { code: 'custom', path: [], message: 'Request body must be valid JSON' } as never,
    ]);
  });
  return schema.parse(raw);
}
