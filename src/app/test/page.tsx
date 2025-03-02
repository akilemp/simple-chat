// "use client"

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const Page = async () => {
    // const res = await db.user.create(
    //     {
    //         data: {
    //             email: "test@mac.big",
    //             name: "big mac"
    //         }
    //     }
    // )
    // return (
    //     <div>
    //         {res.email}
    //     </div>
    // );
    try {
        const res = await db.user.create(
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
            return (
                <div>
                    {error.name}
                </div>
            );
        }
    }
}

export default Page;