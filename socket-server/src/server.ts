import { Server } from 'socket.io';

interface Message {
    username: string;
    message: string;
}

const io = new Server(8080, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const messageCache: string[] = [];
const cacheLimit = 100;

io.on('connection', (socket) => {
    console.log('A user connected');

    messageCache.forEach((msg) => {
        socket.emit('message', msg);
    });

    socket.on('message', (message) => {
        io.emit('message', message);


        messageCache.push(message);


        if (messageCache.length > cacheLimit) {
            messageCache.shift();
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

console.log('Socket.IO server started on port 8080');