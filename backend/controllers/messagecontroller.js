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

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // 1. Get all users except logged in user
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // 2. Get conversations for logged in user to find recent chats
        const conversations = await Conversation.find({
            participants: loggedInUserId
        }).populate("messages");

        // 3. Map user IDs to their last message data
        const userConversationMap = {};
        conversations.forEach(conv => {
            const otherParticipantId = conv.participants.find(p => p.toString() !== loggedInUserId.toString());

            if (conv.messages.length > 0) {
                const lastMsg = conv.messages[conv.messages.length - 1];
                userConversationMap[otherParticipantId] = {
                    lastMsg: lastMsg.message ? lastMsg.message : "View message",
                    time: lastMsg.createdAt ? new Date(lastMsg.createdAt).getTime() : new Date(conv.updatedAt).getTime()
                };
            } else {
                userConversationMap[otherParticipantId] = {
                    lastMsg: "Start a conversation",
                    time: new Date(conv.updatedAt).getTime()
                };
            }
        });

        // 4. Attach metadata and Sort users
        const usersWithMetadata = allUsers.map(user => {
            const userObj = user.toObject();
            const data = userConversationMap[user._id.toString()];
            if (data) {
                userObj.lastMsg = data.lastMsg;
                userObj.lastMsgTime = data.time;
            } else {
                userObj.lastMsg = null;
                userObj.lastMsgTime = 0; // Oldest
            }
            return userObj;
        });

        const sortedUsers = usersWithMetadata.sort((a, b) => {
            // Primary sort: Last message time
            if (b.lastMsgTime !== a.lastMsgTime) return b.lastMsgTime - a.lastMsgTime;
            // Secondary sort: Name
            return a.name.localeCompare(b.name);
        });

        res.status(200).json(sortedUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
