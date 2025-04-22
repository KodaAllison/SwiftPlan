import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import TopNav from '../../../components/TopNav';

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