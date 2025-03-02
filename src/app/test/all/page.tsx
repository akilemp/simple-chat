// "use client"

import { db } from "@/lib/db";

const Page = async () => {
    const res = await db.user.findMany(
        {

        }
    )
    return (
        <div>
            {res.map((user, ind) => {
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