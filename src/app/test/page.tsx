

import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const Page = async () => {

    try {
        const res = await prisma.user.create(
            {
                data: {
                    email: "test@mac.big",
                    name: "big mac"
                }
            });
        return (
            <div>
                {res.email}
            </div>
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

        }
    }
}

export default Page;