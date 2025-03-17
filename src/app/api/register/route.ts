import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/password'
import { NextRequest, NextResponse } from 'next/server'
import { signInSchema } from '@/lib/zod'

const prisma = new PrismaClient()


export async function POST(request: NextRequest) {
    try {
        const credentials = await request.json()
        const { email, password } = await signInSchema.parseAsync(credentials)

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        const user = await prisma.user.findFirst({ where: { email: email } })
        if (user !== null) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }

        await prisma.user.create({
            data: {
                email: email,
                passwordHash: await hashPassword(password),
            }
        })

        return NextResponse.json({ message: "User registered succesfully" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}