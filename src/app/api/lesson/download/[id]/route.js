import { prisma } from '../../../../../../lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

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

      const content = lesson.content

    const safeTitle = (lesson.title || 'lesson-plan')
      .replace(/[^a-z0-9]/gi, '-')  
      .toLowerCase();

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${safeTitle}.txt"`,
      },
    });
  } catch (error) {
    console.error('[DOWNLOAD LESSON ERROR]', error);
    return NextResponse.json({ error: 'Server error downloading lesson' }, { status: 500 });
  }
}
