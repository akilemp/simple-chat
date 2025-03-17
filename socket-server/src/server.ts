import { Server } from 'socket.io';

interface Message {
    username: string;
    message: string;
}

const io = new Server(8080, {
    cors: {
        origin: 'http://localhost:3000', // Allow your Next.js app's origin
        methods: ['GET', 'POST'],
    },
});

const messageCache: string[] = []; // In-memory message cache
const cacheLimit = 100; // Limit the number of cached messages

io.on('connection', (socket) => {
    console.log('A user connected');

    messageCache.forEach((msg) => {
        socket.emit('message', msg);
    });

    socket.on('message', (message) => {
        io.emit('message', message);

        // Cache the message
        messageCache.push(message);

        // Enforce cache limit
        if (messageCache.length > cacheLimit) {
            messageCache.shift(); // Remove the oldest message
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

console.log('Socket.IO server started on port 8080');