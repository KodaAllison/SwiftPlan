import { prisma } from '../../../../../../lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { decode } from 'html-entities';

function cleanLessonContent(content) {
  return decode(content)
    .replace(/<\/?(p|br|h1|h2|h3|h4|h5|h6)[^>]*>/gi, '\n\n') // replace block-level HTML with newlines
    .replace(/<[^>]+>/g, '') // strip all remaining HTML tags
    .replace(/##\s*/g, '\n\n') // handle markdown headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // strip markdown bold
    .replace(/\n{3,}/g, '\n\n') // collapse extra newlines
    .replace(/[ \t]+$/gm, '') // trim trailing whitespace
    .trim();
}


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
