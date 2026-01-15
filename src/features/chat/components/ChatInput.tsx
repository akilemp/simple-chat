// src/features/chat/ChatInput.tsx
"use client";

import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/user-button";
import { FormEvent, useState } from "react";

/** Props that the parent (Chat) passes down */
export interface ChatInputProps {
    /** Called with the message text when the user submits */
    onSend: (msg: string) => void;
}

/** Fixed bar at the bottom containing the user button and the text field */
export default function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (trimmed) {
            onSend(trimmed);
            setInput("");
        }
    };

    return (
        <div className="border-t border-gray-300 bg-white p-2 flex items-center">
            <UserButton />
            <form onSubmit={handleSubmit} className="flex flex-1 ml-2">
                <input
                    className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button className="ml-2" type="submit">
                    Send
                </Button>
            </form>
        </div>
    );
}
