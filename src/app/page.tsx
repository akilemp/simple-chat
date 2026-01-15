import { auth } from "@/auth";
import UserButton from "@/features/auth/components/user-button";
import Chat from "@/features/chat/chat";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  let username = "Anonymous";

  if (!session?.user) {
    redirect("/auth");
  }

  if (session.user.email) {
    username = session.user.email.split("@")[0];
  }

  return (
    <SessionProvider>
      {/* Full‑height flex column, no centering */}
      <main className="flex h-screen flex-col items-center bg-gray-50 p-4">
        {/* Header */}
        <header className="w-full max-w-4xl rounded-t-lg bg-white shadow-sm p-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, <span className="text-indigo-600">{session.user.email}</span>
          </h1>
          <UserButton />
        </header>

        {/* Chat – takes the remaining height */}
        <section className="w-full max-w-4xl flex-1 rounded-b-lg bg-white shadow-sm p-2 mt-2 overflow-y-auto">
          <Chat username={username} />
        </section>
      </main>
    </SessionProvider>
  );
}
