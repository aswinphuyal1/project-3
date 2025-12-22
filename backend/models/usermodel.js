import mongoose from "mongoose";
const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    supabase_id: { type: String, unique: true },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      required: true,
    },
  },
  { timestamps: true }
  /*timestamps: true is a Mongoose schema option that automatically adds two fields to your documents:
What it adds:

    createdAt - Date when the document was created

    updatedAt - Date when the document was last updated*/
);
const usermodel = mongoose.models.user || mongoose.model("user", userschema);
export default usermodel;
