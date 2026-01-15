// "use client"

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";


const Page = async () => {
    const session = await auth()
    if (session === null) {
        return redirect("/auth");
    }

    const users = await prisma.user.findMany()
    
    return (
        <div>
            {users.map((user, ind) => {
                return (
                    <div key={ind}>
                        <div >Name:{user.name}</div>
                        <div >Email:{user.email}</div>
                        <div >Id:{user.id}</div>
                    </div>)
            })}
        </div>
    );
}

export default Page;