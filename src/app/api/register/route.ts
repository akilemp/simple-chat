import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/password'

const prisma = new PrismaClient()


export async function GET() {
    const user = await prisma.user.create({
        data: {
            name: 'Aki',
            passwordHash: await hashPassword("kissa-koira"),
            email: 'Aki@test.io',
        },
    })
    console.log(user)


    return Response.json({ message: user })
}