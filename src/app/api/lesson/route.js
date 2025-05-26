import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from "../../../../lib/db/prisma";

/**
 * GET /api/lesson
 *
 * Fetches all lesson plans created by the currently logged in user.
 *
 * @returns {Response} JSON array of lessons, ordered newest first, or error response
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const lessons = await prisma.lessonPlan.findMany({
      where: {
        user: { email: session.user.email },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(lessons);
  } catch (err) {
    console.error('[GET LESSONS ERROR]', err);
    return NextResponse.json({ error: 'Server error fetching lessons' }, { status: 500 });
  }
}

/**
 * POST /api/lesson
 *
 * Saves a new lesson plan for the user.
 *
 * @param {Request} req - Incoming request with JSON payload
 * @returns {Response} JSON containing the new lesson ID or error message
 */

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, subject, yearGroup, tags } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = await prisma.lessonPlan.create({
      data: {
        title,
        content,
        subject,
        yearGroup,
        tags: tags ?? [],
        userId: user.id,
      },
    });

    return NextResponse.json({ id: plan.id }, { status: 200 });
  } catch (err) {
    console.error('[SAVE LESSON ERROR]', err);
    return NextResponse.json({ error: 'Server error saving lesson' }, { status: 500 });
  }
}
