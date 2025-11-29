import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const isValid = verifyAdmin(username, password);
    
    if (isValid) {
      // Set a simple session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
