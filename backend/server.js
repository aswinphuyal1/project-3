
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectdb from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";

//app config
const app = express();
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


app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => console.log("serve started on port :", port));
