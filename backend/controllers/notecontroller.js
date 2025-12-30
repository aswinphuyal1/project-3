import { v2 as cloudinary } from "cloudinary";
import Note from "../models/notemodel.js";
import userModel from "../models/usermodel.js";

const uploadNote = async (req, res) => {
    try {
        const { title, description, category, price, semester } = req.body;
        const userid = req.userId;
        const file = req.file;

        if (!file) {
            return res.json({ success: false, message: "No file uploaded" });
        }

        if (!userid) {
            return res.json({ success: false, message: "User authentication failed" });
        }

        // Determine file type
        let fileType = 'doc';
        if (file.mimetype.startsWith('image/')) fileType = 'image';
        else if (file.mimetype === 'application/pdf') fileType = 'pdf';
        else if (file.mimetype.startsWith('video/')) fileType = 'video';

        // Upload to Cloudinary
        let resourceType = "auto";

        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: resourceType,
            format: fileType === 'pdf' ? 'pdf' : undefined
        });

        const newNote = new Note({
            title,
            description,
            fileUrl: result.secure_url,
            fileType,
            category: category || "General",
            semester: semester || "",
            price: price || 0,
            uploader: userid
        });

        await newNote.save();

        res.json({ success: true, message: "Note uploaded successfully", note: newNote });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).populate("uploader", "name email").sort({ createdAt: -1 });
        res.json({ success: true, notes });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { uploadNote, getNotes };
