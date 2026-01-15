import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false }, // Optional for now if auth not fully integrated
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String },
    semester: { type: String },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const noteModel = mongoose.models.note || mongoose.model("note", noteSchema);

export default noteModel;
