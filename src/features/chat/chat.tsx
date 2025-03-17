"use client"

import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import UserButton from '../auth/components/user-button';

export default function Home() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const maxMessageLength = 100;

    useEffect(() => {
        socketRef.current = io('http://localhost:8080');

        const socket = socketRef.current;

        if (socket) {
            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('message', (msg: string) => {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, msg];
                    return updatedMessages.length > maxMessageLength
                        ? updatedMessages.slice(updatedMessages.length - maxMessageLength)
                        : updatedMessages;
                });
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        }
    }, [messages]);

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (socketRef.current) {
            socketRef.current.emit('message', input);
            setInput('');
        }
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='flex-grow overflow-y-auto p-4'>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className='flex w-full p-2'>
                <UserButton />
                <form onSubmit={sendMessage} className='flex w-full'>
                    <input
                        className='border-zinc-400 border rounded-sm m-1 p-1 flex-grow'
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className='m-1' type='submit' >Send</Button>
                </form>
            </div>

        </div>
    );
}