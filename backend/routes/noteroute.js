import express from "express";
import { uploadNote, getAllNotes, getNoteById, getUserNotes, deleteNote } from "../controllers/notecontroller.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminauth.js";

const noteRouter = express.Router();

noteRouter.post("/upload", upload.single("file"), uploadNote);
noteRouter.get("/list", authMiddleware, getAllNotes);
noteRouter.get("/:id", authMiddleware, getNoteById);
noteRouter.get("/user/:userId", authMiddleware, getUserNotes);
noteRouter.delete("/delete/:id", authMiddleware, deleteNote);

// Admin Routes
noteRouter.get("/admin/list", adminAuth, getAllNotes);
noteRouter.delete("/admin/delete/:id", adminAuth, deleteNote);

export default noteRouter;
//