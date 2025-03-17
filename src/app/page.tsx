import { auth } from "@/auth";
import UserButton from "@/features/auth/components/user-button";
import { SessionProvider } from "next-auth/react";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (session === null || session.user === undefined) {
    return redirect("/auth");
  }

  return (
    <SessionProvider>
      <div>Logged in as {session.user.email}
        <UserButton />
      </div>
    </SessionProvider>

  );

}
