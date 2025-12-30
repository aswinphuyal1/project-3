import express from "express";
import { uploadNote, getNotes } from "../controllers/notecontroller.js";
import authuser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const noterouter = express.Router();

noterouter.post("/upload", authuser, upload.single("file"), uploadNote);
noterouter.get("/list", getNotes);

export default noterouter;
