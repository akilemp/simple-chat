import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { signInSchema } from "./lib/zod"
import { verifyPassword } from "./lib/password"
import { ZodError } from "zod"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    // debug: true,
    providers: [
        GitHub,
        Google,
        Credentials({
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials, req) => {
                try {
                    let user = null;

                    const { email, password } = await signInSchema.parseAsync(credentials)

                    // logic to verify if the user exists
                    user = await prisma.user.findUniqueOrThrow({
                        where: { email: email }
                    })

                    if (!user || !user.passwordHash) {
                        throw new Error("Invalid credentials.")
                    }

                    if (!await verifyPassword(password, user.passwordHash)) {
                        throw new Error("Invalid credentials.")
                    }

                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }

                    return null
                }
            },
        }),
    ],
})

