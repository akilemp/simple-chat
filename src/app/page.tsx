import { auth } from "@/auth";

import { SignOut } from "@/features/auth/components/sing-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (session === null) {
    return redirect("/auth");
  }

  return (
    <div>Logged in
      <SignOut />
    </div>
  );

}
