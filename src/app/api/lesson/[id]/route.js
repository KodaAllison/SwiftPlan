import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../../../lib/db/prisma';

/**
 * GET /api/lesson/[id]
 * 
 * Fetches a specific lesson plan by ID, only if the requesting user owns the plan.
 *
 * @param {Request} req - Incoming request object
 * @param {object} context - Route context containing dynamic params
 * @returns {Response} JSON containing the lesson data or an error
 */

export async function GET(req, context) {
  const params = await context.params; 
  const id = params.id;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const lesson = await prisma.lessonPlan.findUnique({
      where: { id },
    });

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

    if (!user || lesson.userId !== user.id) {
      return NextResponse.json({ error: 'Not found or access denied' }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (err) {
    console.error('[GET LESSON ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * PUT /api/lesson/[id]
 *
 * Updates the content of a specific lesson plan, only if owned by the user.
 *
 * @param {Request} req - Incoming PUT request with JSON body
 * @param {object} context - Route context containing dynamic params
 * @returns {Response} JSON with updated lesson or error message
 */

export async function PUT(req, context) {
    const params = await context.params;
    const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json({ error: 'Missing updated content' }, { status: 400 });
  }

  try {
    const lesson = await prisma.lessonPlan.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(lesson);
  } catch (err) {
    console.error('[UPDATE LESSON ERROR]', err);
    return NextResponse.json({ error: 'Server error updating lesson' }, { status: 500 });
  }
}

/**
 * DELETE /api/lesson/[id]
 *
 * Deletes a lesson plan only if the authenticated user is the owner.
 *
 * @param {Request} req - Incoming DELETE request
 * @param {object} context - Route context containing dynamic params
 * @returns {Response} JSON indicating success or appropriate error
 */

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const lesson = await prisma.lessonPlan.findUnique({ where: { id } });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });

    if (!user || lesson.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await prisma.lessonPlan.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE LESSON ERROR]", error);
    return NextResponse.json({ error: "Server error deleting lesson" }, { status: 500 });
  }
}
