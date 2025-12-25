"use client"
import React, { useState } from "react";
import { Send, Paperclip } from "lucide-react";

const MessageSidebar = () => {
  // Dummy Data for Users
  const [conversations] = useState([
    {
      id: 1,
      name: "Dr. Sarah Lee",
      lastMsg: "1 minute ago",
      status: "online",
      unread: 1,
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 2,
      name:"Aswin phuyal",
      lastMsg: "2 hours ago",
      status: "offline",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?u=question",
    },
    {
      id: 3,
      name: "Prof. Alex Chen",
      lastMsg: "2m ago",
      status: "online",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, I had a chance to look over the Mathematics series you sent, they are really detailed and helpful.",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "The section on calculus was especially clear, I think the students will find it very easy to follow.",
      time: "10:30 AM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
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
            <h2 className="text-xl text-[#FF6D1F] font-medium mt-1">
              us
            </h2>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Conversations
        </h3>

        <div className="space-y-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all ${
                activeChat.id === chat.id ? "bg-[#F5E7C6]" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                {chat.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-bold text-[#222222] text-sm">
                  {chat.name}
                </h4>
                <p className="text-xs text-gray-500">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-[#FF6D1F] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Chat Screen */}
      <div className="flex-1 flex flex-col">
        <div className="mb-6 border-b border-gray-50 pb-4">
          <h3 className="text-xl font-bold text-[#222222]">
            Real-time Chat Screen
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-gray-700">
              {activeChat.name}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        </div>

        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-start max-w-[85%]">
              <div className="bg-[#FAF3E1] p-4 rounded-2xl rounded-tl-none text-[#222222] text-sm leading-relaxed shadow-sm">
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-tighter">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Single Unified Input Box */}
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
      </div>
    </div>
  );
};

export default MessageSidebar;
