const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("APi working");
});
app.listen(port, () => console.log("server started on port :", port));
