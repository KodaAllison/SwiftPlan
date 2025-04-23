import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from "../../../../../lib/db/prisma";

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
