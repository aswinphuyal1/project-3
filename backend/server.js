//npm i cors dotenv express jsonwebtoken mongoose multer nodemon validator bcrypt socket.io

import express from "express";
import cors from "cors";
import "dotenv/config";

import connectdb from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";
import userrouter from "./routes/userroute.js";
import messagerouter from "./routes/messageroute.js"; // Import message routes
import { app, server } from "./socket/socket.js"; // Import app and server from socket

//app config (Already defined in socket.js, so we use 'app' from there)
const port = process.env.PORT || 4000;

connectdb();
connectcloudinary();

//middlewares
app.use(express.json());
app.use(cors());

/*
CORS allows your API to be accessed from different domains.
Without it, browsers block requests from frontends on different ports/domains.
Example: Frontend on localhost:3000 can call backend on localhost:4000
*/

app.use("/api/user", userrouter);
app.use("/api/messages", messagerouter); // Use message routes

app.get("/", (req, res) => {
  res.send("Api working");
});

// Use server.listen instead of app.listen to support sockets
server.listen(port, () => console.log("serve started on port :", port));
