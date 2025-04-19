'use client';

import Image from 'next/image';
import { Button, Text } from '@mantine/core';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔄 Auto-redirect if signed in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/Lesson/New');
    }
  }, [status, router]);

  // While checking auth, don't flash login UI
  if (status === 'loading') return null;

  return (
    <main className="flex min-h-screen">
      <section className="bg-[#5F25D9] text-white flex-1 flex flex-col items-center justify-center p-8">
        <Image
          src="/logo.png"
          alt="SwiftPlan Logo"
          width={160}
          height={160}
        />
        <h1 className="text-3xl font-bold mt-6">Welcome to SwiftPlan</h1>
        <p className="mt-2 text-[#00ff99] font-medium text-sm">
          Smarter planning. Focus on what matters.
        </p>
      </section>

      <section className="bg-white text-[#5f25d9] flex-1 flex flex-col items-center justify-center p-8">
        <Text fw={600} size="xl" mb={8}>
          Login to Continue
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Use your Google account to start generating lesson plans
        </Text>
        <Button
          onClick={() => signIn('google')}
          size="md"
          radius="xl"
          styles={{
            root: {
              backgroundColor: '#f5f5f5',
              color: '#333',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          Sign in with Google
        </Button>
      </section>
    </main>
  );
}
