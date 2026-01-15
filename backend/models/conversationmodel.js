//// Import the mongoose library which provides MongoDB object modeling
import mongoose from "mongoose";

// Define a new Mongoose schema for conversations
const conversationSchema = new mongoose.Schema(
  {
    // The 'participants' field is an array of User references
    participants: [
      {
        // Each element in the array is an ObjectId (MongoDB's unique identifier)
        type: mongoose.Schema.Types.ObjectId,
        // This creates a reference/population link to the 'user' collection/model
        ref: "user",
      },
    ],

    // The 'messages' field is an array of Message references
    messages: [
      {
        // Each element is an ObjectId referencing messages
        type: mongoose.Schema.Types.ObjectId,
        // References the 'Message' collection/model
        ref: "Message",
        // Default value is an empty array if no messages exist
        default: [],
      },
    ],
  },
  // Schema options: 'timestamps' automatically adds createdAt and updatedAt fields
  { timestamps: true }
);

// Check if Conversation model already exists (to prevent recompilation errors in development)
// If it exists, use the existing model; otherwise, create a new one
const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

// Export the Conversation model for use in other parts of the application
export default Conversation;

