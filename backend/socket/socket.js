// 1. Import Socket.IO Server class
//    Socket.IO enables real-time, bidirectional communication between client and server
import { Server } from "socket.io";

// 2. Import Node.js built-in HTTP module to create HTTP server
import http from "http";

// 3. Import Express framework for handling HTTP requests
import express from "express";

// 4. Create an Express application instance
const app = express();

// 5. Create an HTTP server using the Express app
//    This server will handle both regular HTTP requests and WebSocket connections
const server = http.createServer(app);

// 6. Create a new Socket.IO server instance
const io = new Server(server, {
  // 7. Configure CORS (Cross-Origin Resource Sharing) settings
  cors: {
    // 8. Allow connections only from this origin (frontend URL)
    origin: [process.env.FRONTEND_URL],
    // 9. Allow only GET and POST HTTP methods for handshake
    methods: ["GET", "POST"],
  },
});

// 10. Export helper function to get socket ID of a specific user
//     This can be used in other parts of the app to send messages to specific users
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Returns socket ID if user is online, undefined otherwise
};

// 11. Create an object to map user IDs to their socket IDs
//     Format: { "user_id_123": "socket_id_abc" }
const userSocketMap = {}; // {userId: socketId}

// 12. Listen for new socket connections
//     This event fires when a client connects to the Socket.IO server
io.on("connection", (socket) => {
  // 13. Log when a user connects, showing their unique socket ID
  console.log("a user connected", socket.id);

  // 14. Extract userId from handshake query parameters
  //     When client connects, they should send userId in connection query
  //     Example: socket.io-client connects with query: { userId: "user_123" }
  const userId = socket.handshake.query.userId;
  
  // 15. Store mapping if userId is provided and not "undefined" string
  if (userId != "undefined")
    { userSocketMap[userId] = socket.id;}

  // 16. Emit "getOnlineUsers" event to ALL connected clients
  //     Sends array of user IDs who are currently online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 17. Listen for "disconnect" event on this specific socket
  socket.on("disconnect", () => {
    // 18. Log when user disconnects
    console.log("user disconnected", socket.id);

    // 19. Remove user from userSocketMap when they disconnect
    delete userSocketMap[userId];

    // 20. Notify ALL clients about updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// 21. Export app, io, and server for use in other files
//     - app: Express app for regular HTTP routes
//     - io: Socket.IO instance for real-time events
//     - server: HTTP server instance
export { app, io, server };
//