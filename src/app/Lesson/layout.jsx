'use client';

import TopNav from "../../../components/TopNav";
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function LessonLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // 🔁 Redirect unauthenticated users to landing
    redirect('/');
  }

  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
