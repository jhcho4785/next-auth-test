'use client';

import {signIn, useSession} from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn()}>Sign In</button>
      <pre>{JSON.stringify(data?.user.accessToken)}</pre>
    </main>
  )
}
