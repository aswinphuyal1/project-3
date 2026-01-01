import noteModel from "../models/notemodel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Upload Note
const uploadNote = async (req, res) => {
    try {
        const { title, description, subject, semester, userId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto", // Let Cloudinary detect type (avoids 401 on raw PDFs if "Raw delivery" is restricted)
            folder: "notes",
            use_filename: true
        });

        // Delete local file after upload
        fs.unlinkSync(file.path);

        const newNote = new noteModel({
            title,
            description,
            subject,
            semester,
            fileUrl: uploadResponse.secure_url,
            fileName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            fileType: file.mimetype,
            userId: req.userId || userId || null
        });

        await newNote.save();

        res.status(201).json({ success: true, message: "Note uploaded successfully", note: newNote });

    } catch (error) {
        console.error(error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path); // Cleanup if error
        }
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({});
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get single note by ID
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.trim(); // Trim whitespace to avoid CastErrors

        const note = await noteModel.findById(cleanId).populate('userId', 'name email'); // Populate user info

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, note });
    } catch (error) {
        console.error("Error in getNoteById:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get notes by user ID
const getUserNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await noteModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Delete note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteModel.findById(id);

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        // Delete from Cloudinary (Optional optimization, but good practice)
        // const publicId = note.fileUrl.split('/').pop().split('.')[0]; 
        // await cloudinary.uploader.destroy(`notes/${publicId}`); 

        await noteModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Increment view count
const incrementViewCount = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteModel.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, views: note.views, message: "View counted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { uploadNote, getAllNotes, getNoteById, getUserNotes, deleteNote, incrementViewCount };
//