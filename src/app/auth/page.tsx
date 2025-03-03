import { auth } from "@/auth";
import AuthScreen from "@/features/auth/components/auth-screen";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthPage = async () => {
    const session = await auth()
    if (session !== null) {
        return redirect("/");
    }

    return (
        <SessionProvider>
            <AuthScreen />
        </SessionProvider>

    );
}

export default AuthPage;