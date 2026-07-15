import { ok } from '@/lib/api';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  const response = ok({ message: 'Signed out' });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
