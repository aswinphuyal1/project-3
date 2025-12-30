import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true }, // 'image', 'pdf', 'doc', 'video'
    category: { type: String, default: 'General' },
    semester: { type: String },
    price: { type: Number, default: 0 },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
