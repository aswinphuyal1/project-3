import express from "express";
import { uploadNote, getAllNotes, getNoteById, getUserNotes, deleteNote } from "../controllers/notecontroller.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/auth.js"; // Optional: Use if protected

const noteRouter = express.Router();

noteRouter.post("/upload",authMiddleware, upload.single("file"), uploadNote);
noteRouter.get("/list", authMiddleware,getAllNotes);
noteRouter.get("/user/:userId", authMiddleware, getUserNotes);
noteRouter.delete("/delete/:id",authMiddleware, deleteNote);

export default noteRouter;
//