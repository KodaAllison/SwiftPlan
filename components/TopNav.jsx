'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function TopNav() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-black text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        {/* You can swap this for your actual app logo */}
        <Image
          src="/logo.png"
          alt="SwiftPlan Logo"
          width={32}
          height={32}
        />
        <span className="font-semibold tracking-wide">SwiftPlan</span>
      </div>

      <div className="flex items-center gap-2">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full" />
        )}
      </div>
    </header>
  );
}
