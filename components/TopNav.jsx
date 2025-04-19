'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function TopNav() {
  const { data: session } = useSession();

  return (
    <header className="w-full text-black px-6 py-2 flex justify-between items-center shadow-2xl border-b-4 border-[#5F25D9]">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="SwiftPlan Logo"
          width={48}
          height={48}
        />
        
      </div>
        <span className="text-2xl text-[#5F25D9] font-semibold tracking-wide">SwiftPlan</span>
      <div className="flex items-center gap-2">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full" />
        )}
      </div>
    </header>
  );
}
