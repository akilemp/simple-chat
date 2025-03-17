"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"



const UserButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage src="" />
                    <AvatarFallback ><img src="/images/test.png" alt="" /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}  >
                    <LogOut
                        className="size-4 mr-2"
                    /> Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export default UserButton;