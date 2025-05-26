import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import TopNav from '../../../components/TopNav';

/**
 * LessonLayout
 *
 * Server layout for all /Lesson routes
 * Checks if user is authenticate by getServerSession
 * If not logged in, redirect to landing page
 * If logged in, renders dash
 * 
 */

export default async function LessonLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <TopNav session={session} />
      <main>{children}</main>
    </>
  );
}