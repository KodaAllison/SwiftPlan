'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user.name}</p>
        <button className="py-3 px-3 bg-black text-white" onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
