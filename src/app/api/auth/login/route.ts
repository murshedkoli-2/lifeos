import { handleError, ok, fail, parseBody } from '@/lib/api';
import { loginSchema } from '@/lib/validation';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyPassword,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await parseBody(request, loginSchema);

    if (!verifyPassword(password)) {
      return fail('Incorrect password', 401);
    }

    const response = ok({ message: 'Signed in' });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: createSessionToken(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    return handleError('POST /api/auth/login', error);
  }
}
