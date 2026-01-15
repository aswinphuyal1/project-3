import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
import User from "../models/usermodel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//remannifn to usersatand
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // 1. Get all users except the logged-in user
    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // 2. Get all conversations of logged-in user
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).populate("messages");

    // 3. Store last message info for each conversation
    const lastMessageData = {};

    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];

      // Find the other user in the conversation
      const otherUserId = conversation.participants.find(
        (id) => id.toString() !== loggedInUserId.toString()
      );

      if (!otherUserId) continue;

      // If messages exist
      if (conversation.messages.length > 0) {
        const lastMessage =
          conversation.messages[conversation.messages.length - 1];

        lastMessageData[otherUserId.toString()] = {
          text: lastMessage.message || "View message",
          time: new Date(lastMessage.createdAt).getTime(),
        };
      } else {
        // No messages yet
        lastMessageData[otherUserId.toString()] = {
          text: "Start a conversation",
          time: new Date(conversation.updatedAt).getTime(),
        };
      }
    }

    // 4. Attach last message info to users
    const usersWithMessages = users.map((user) => {
      const userObj = user.toObject();
      const lastMsg = lastMessageData[user._id.toString()];

      if (lastMsg) {
        userObj.lastMsg = lastMsg.text;
        userObj.lastMsgTime = lastMsg.time;
      } else {
        userObj.lastMsg = null;
        userObj.lastMsgTime = 0;
      }

      return userObj;
    });

    // 5. Sort users by last message time (recent first)
    usersWithMessages.sort((a, b) => b.lastMsgTime - a.lastMsgTime);

    res.status(200).json(usersWithMessages);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
//