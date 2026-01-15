// src/features/chat/Chat.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import MessageList, { ChatMessage } from "./components/MessageList";
import ChatInput from "./components/ChatInput";

interface ChatProps {
    username: string;          // <-- new prop
}

export default function Chat({ username }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const maxMessageLength = 100;

    /* ---------- socket handling ---------- */
    useEffect(() => {
        // Encode the username to avoid issues with special characters
        const encodedName = encodeURIComponent(username);
        const socket = io("http://localhost:8080", {
            query: { username: encodedName },   // <-- send it as a query param
        });

        socketRef.current = socket;

        socket.on("connect", () => console.log("Connected as", username));
        socket.on("disconnect", () => console.log("Disconnected"));

        socket.on("message", (msg: ChatMessage) => {
            setMessages((prev) => {
                const updated = [...prev, msg];
                return updated.length > maxMessageLength
                    ? updated.slice(updated.length - maxMessageLength)
                    : updated;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [username]); // re‑run if the username ever changes

    const sendMessage = (text: string) => {
        if (socketRef.current) {
            // Include the username in the payload so the server can broadcast it
            socketRef.current.emit("message", { text, username });
        }
    };

    return (
        <div className="flex h-full flex-col bg-gray-50">
            <MessageList messages={messages} />
            <ChatInput onSend={sendMessage} />
        </div>
    );
}
