import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Basic session tracking using a cookie to avoid counting the same user multiple times per day
    const cookieStore = cookies();
    const hasVisited = cookieStore.get('has_visited_today');

    if (!hasVisited) {
      // Increment the counter
      await prisma.siteAnalytics.upsert({
        where: { id: 'main' },
        update: {
          visits: { increment: 1 }
        },
        create: {
          id: 'main',
          visits: 1
        }
      });

      // Set cookie for 24 hours
      const response = NextResponse.json({ success: true, tracked: true });
      response.cookies.set('has_visited_today', 'true', {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      
      return response;
    }

    return NextResponse.json({ success: true, tracked: false, reason: 'already_visited' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
