import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getSession from './lib/getsession';
import { match } from 'assert';

export async function middleware(req: NextRequest) {
  const session = await getSession(); 

  const isCompleted = session?.is_completed ?? false;

  if (!session) {
     return NextResponse.redirect(new URL('/login', req.url));
  }
  else if (isCompleted) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sales'],
};