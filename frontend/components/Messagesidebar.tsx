"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import axios from "axios";
import { useSocketContext } from "@/context/SocketContext";
import { useAuth } from "@/context/Authcontext";

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
};

type ConversationUser = {
  _id: string;
  name: string;
  email: string;
  lastMsg?: string;
  unread?: number;
};

const MessageSidebar = () => {
  const { socket, onlineUsers } = useSocketContext();
  const { user: authUser, token } = useAuth();

  const [conversations, setConversations] = useState<ConversationUser[]>([]);
  const [activeChat, setActiveChat] = useState<ConversationUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [displayedConversationsCount, setDisplayedConversationsCount] =
    useState(10);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  // 1. Fetch Users for Sidebar
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${BACKEND_URL}/api/messages/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, [token, BACKEND_URL]);

  // 2. Fetch Messages for Active Chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat || !token) return;
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/messages/${activeChat._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };
    fetchMessages();
  }, [activeChat, token, BACKEND_URL]);

  // 3. Listen for Incoming Messages
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      // Create a sound effect if desired

      // If chat is open with the sender, append message
      if (activeChat && newMessage.senderId === activeChat._id) {
        setMessages((prev) => [...prev, newMessage]);
      }

      // Reorder Sidebar: Move sender to top
      setConversations((prev) => {
        const senderIndex = prev.findIndex(
          (u) => u._id === newMessage.senderId
        );

        // If user is not in list (e.g. new user), we might need to handle that, 
        // but for now assume they are in the full list or we won't show them until refresh.
        // Actually, better to fetch user info if not found, but let's stick to simple reorder.
        if (senderIndex === -1) return prev;

        const updatedConversations = [...prev];
        const [senderUser] = updatedConversations.splice(senderIndex, 1);

        // Update metadata
        senderUser.lastMsg = "Just now";
        if (!activeChat || activeChat._id !== senderUser._id) {
          senderUser.unread = (senderUser.unread || 0) + 1;
        }

        return [senderUser, ...updatedConversations];
      });
    });

    return () => socket.off("newMessage");
  }, [socket, activeChat, conversations]);

  // 4. Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeChat || !token) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/messages/send/${activeChat._id}`,
        { message: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newMessage = res.data;
      setMessages([...messages, newMessage]);
      setInputValue("");

      // Reorder sidebar - move active chat to top
      setConversations((prev) => {
        const chatIndex = prev.findIndex((u) => u._id === activeChat._id);
        if (chatIndex === -1) return prev;

        const updatedConversations = [...prev];
        const [chatUser] = updatedConversations.splice(chatIndex, 1);
        chatUser.lastMsg = "Just now";
        return [chatUser, ...updatedConversations];
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper: Check online status
  const isOnline = (userId: string) => onlineUsers.includes(userId);

  // Helper: Format Time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto h-[800px] bg-white rounded-3xl overflow-hidden font-sans p-8 gap-10 shadow-sm border border-gray-100">
      {/* LEFT: Conversations List */}
      <div className="w-1/3 flex flex-col border-r border-gray-50 pr-6">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#222222] tracking-tight">
              MESSAGE
            </h1>
            <h2 className="text-xl text-[#FF6D1F] font-medium mt-1">us</h2>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Conversations
        </h3>

        <div
          className="space-y-1 overflow-y-auto"
          onScroll={(e) => {
            const target = e.currentTarget;
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
              setDisplayedConversationsCount((prev) => prev + 10);
            }
          }}
        >
          {conversations.slice(0, displayedConversationsCount).map((chat) => {
            const online = isOnline(chat._id);
            const isActive = activeChat?._id === chat._id;

            return (
              <div
                key={chat._id}
                onClick={() => {
                  setActiveChat(chat);
                  // Clear unread? 
                  // To do: logic to clear unreads in state
                }}
                className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all ${isActive ? "bg-[#F5E7C6]" : "hover:bg-gray-50"
                  }`}
              >
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/9.x/bottts/svg?seed=${chat._id}`}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-gray-100"
                  />
                  {online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-[#222222] text-sm">
                    {chat.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">
                    {chat.lastMsg || "Tap to chat"}
                  </p>
                </div>
                {(chat.unread || 0) > 0 && (
                  <div className="bg-[#FF6D1F] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Chat Screen */}
      <div className="flex-1 flex flex-col">
        {!activeChat ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Select a conversation to start chatting</p>
          </div>
        ) : (
          <>
            <div className="mb-6 border-b border-gray-50 pb-4">
              <h3 className="text-xl font-bold text-[#222222]">
                Real-time Chat Screen
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-gray-700">
                  {activeChat.name}
                </span>
                {isOnline(activeChat._id) && (
                  <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </span>
                )}
              </div>
            </div>

            {/* Message Display Area */}
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-hide">
              {messages.map((msg) => {
                const isMe = msg.senderId === authUser?.id;
                return (
                  <div
                    key={msg._id}
                    className={`flex flex-col max-w-[85%] ${isMe ? 'items-end self-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${isMe
                        ? 'bg-[#FF6D1F] text-white rounded-tr-none'
                        : 'bg-[#FAF3E1] text-[#222222] rounded-tl-none'
                        }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-tighter">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Unified Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100"
            >
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-[#FF6D1F] transition-colors"
              >
                <Paperclip size={20} />
              </button>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none py-3 px-1 text-sm outline-none text-[#222222]"
              />
              <button
                type="submit"
                className="bg-[#FF6D1F] p-3 rounded-xl text-white hover:bg-[#e85a15] transition-transform active:scale-95 shadow-lg shadow-[#FF6D1F]/20"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
