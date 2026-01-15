// src/features/chat/MessageList.tsx
"use client";

import { useEffect, useRef } from "react";

export interface ChatMessage {
    user: string;
    time: string; // ISO‑8601 from server
    text: string;
}

interface Props {
    messages: ChatMessage[];
}

/** Renders the scroll‑able list of chat messages */
export default function MessageList({ messages }: Props) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const format = ({ user, time, text }: ChatMessage) => {
        const d = new Date(time);
        const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `${user} [${t}]: ${text}`;
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
                <p key={i} className="text-sm text-gray-800">
                    {format(msg)}
                </p>
            ))}
            <div ref={endRef} />
        </div>
    );
}
