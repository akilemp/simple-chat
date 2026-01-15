
import { auth } from "@/auth";
import Chat from "@/features/chat/chat";
import { redirect } from "next/navigation";


const Page = async () => {
    const session = await auth()
    if (session === null || session.user === undefined) {
        return redirect("/auth");
    }

    return (
        <Chat username="test" />
    )
}

export default Page;