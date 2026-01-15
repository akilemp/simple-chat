// src/server/socketServer.ts
import { Server, Socket } from "socket.io";

/* -------------------------------------------------------------
   Payload shape that will be stored & broadcast
   ------------------------------------------------------------- */
interface ChatPayload {
    user: string;      // sender name
    time: string;      // ISO‑8601 timestamp (UTC)
    text: string;      // message body
}

/* -------------------------------------------------------------
   Create the Socket.IO server (CORS set for Next app)
   ------------------------------------------------------------- */
const io = new Server(8080, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

/* -------------------------------------------------------------
   Simple in‑memory cache – stores the enriched payload objects
   ------------------------------------------------------------- */
const messageCache: ChatPayload[] = [];
const CACHE_LIMIT = 100;

/* -------------------------------------------------------------
   Middleware – pull the username from the query string
   ------------------------------------------------------------- */
io.use((socket: Socket, next) => {
    const { username } = socket.handshake.query as { username?: string };
    if (!username) {
        // If you prefer to allow anonymous users, just set a default name
        socket.data.user = "Anonymous";
    } else {
        socket.data.user = username;
    }
    next();
});

/* -------------------------------------------------------------
   Connection handling
   ------------------------------------------------------------- */
io.on("connection", (socket: Socket) => {
    console.log("🟢 User connected:", socket.id, "as", socket.data.user);

    //   Send cached history to the newly‑connected client
    messageCache.forEach((msg) => socket.emit("message", msg));

    //   Handle incoming messages
    socket.on("message", (payload) => {
        // -----------------------------------------------------------------
        // Accept two formats:
        //     A plain string – client only sends the text.
        //     An object { text: string, username?: string }
        // -----------------------------------------------------------------
        let text: string;
        let user: string;

        if (typeof payload === "string") {
            text = payload;
            // Use the username attached to the socket (from the middleware)
            user = socket.data.user;
        } else if (typeof payload === "object" && payload !== null) {
            const obj = payload as { text?: string; username?: string };
            text = obj.text ?? "";
            // Prefer an explicit username sent by the client; fall back to socket data
            user = obj.username ?? socket.data.user;
        } else {
            // Invalid payload – ignore silently
            return;
        }

        // Build the enriched message
        const chatMsg: ChatPayload = {
            user,
            time: new Date().toISOString(), // UTC ISO‑8601
            text,
        };

        // Broadcast to **all** connected clients
        io.emit("message", chatMsg);

        // Store in the bounded cache
        messageCache.push(chatMsg);
        if (messageCache.length > CACHE_LIMIT) {
            messageCache.shift();
        }
    });

    // -----------------------------------------------------------------
    // c  Disconnect handling
    // -----------------------------------------------------------------
    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

console.log("🚀 Socket.IO server listening on :8080");
