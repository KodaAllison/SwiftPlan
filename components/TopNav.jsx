'use client';

import Image from 'next/image';
import { Menu } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

export default function TopNav({session}) {

  return (
    <header className="w-full text-black px-6 py-2 flex justify-between items-center shadow-2xl border-b-4 border-[#5F25D9]">
      <div className="flex items-center gap-2">
        <Link href="/Lesson/Dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="SwiftPlan Logo"
            width={48}
            height={48}
          />
        </Link>
        
      </div>
        <span className="text-2xl text-[#5F25D9] font-semibold tracking-wide">SwiftPlan</span>
      <div className="flex items-center gap-2">
      <Menu as="div" className="relative inline-block text-left">
          <MenuButton>

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
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
            <div className="py-1">
            <MenuItem as="button"
                onClick={() => signOut()}
                className={({ active }) =>
                  `w-full text-left px-4 py-2 text-sm text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                  }`
                }
              >
                Log out
            </MenuItem>

            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
