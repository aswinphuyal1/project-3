"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
// Import the Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

/* =======================
   PROPS & TYPES
======================= */
interface AIAssistantProps {
  title?: string;
  placeholder?: string;
  systemPrompt?: string;
  allowImages?: boolean;
  maxFileSizeMB?: number;
}

interface Message {
  role: "user" | "model";
  text: string;
  file?: { name: string; type: string; data?: string }; // Added data for persistence if needed
  isError?: boolean;
}

/* =======================
   ICONS
======================= */
const AttachIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

/* =======================
   MAIN COMPONENT
======================= */
const AI_Assistant: React.FC<AIAssistantProps> = ({
  title = "AI Study Assistant",
  placeholder = "Ask anything...",
  systemPrompt = "You are a helpful study assistant.",
  allowImages = true,
  maxFileSizeMB = 10,
}) => {
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );
  // Use the requested model "gemini-2.5-flash"
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  /* Helper to convert File to Gemini format */
  const fileToGenerativePart = async (file: File) => {
    const base64Data = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: base64Data, mimeType: file.type },
    };
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() && !attachedFile) return;
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert("API Key missing in environment variables.");
      return;
    }

    const currentInput = inputText;
    const currentFile = attachedFile;

    // 1. Update UI locally
    setHistory((h) => [
      ...h,
      {
        role: "user",
        text: currentInput || "Uploaded an image",
        file: currentFile
          ? { name: currentFile.name, type: currentFile.type }
          : undefined,
      },
    ]);

    // Reset inputs
    setInputText("");
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsLoading(true);

    try {
      // 2. Prepare Chat Parts
      const promptParts: any[] = [currentInput || "What is in this image?"];

      if (currentFile) {
        const filePart = await fileToGenerativePart(currentFile);
        promptParts.push(filePart);
      }

      // 3. Call API
      // Note: For simple stateless Q&A we use generateContent.
      // For multi-turn, you'd use model.startChat()
      const result = await model.generateContent(promptParts);
      const response = await result.response;
      const responseText = response.text();

      setHistory((h) => [...h, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setHistory((h) => [
        ...h,
        {
          role: "model",
          text: "Sorry, I encountered an error.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, attachedFile, model]);

  const clearChat = () => {
    if (confirm("Clear all messages?")) setHistory([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-screen max-w-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 overflow-x-hidden">
      {/* HEADER */}
      <header className="h-14 flex items-center justify-between px-4 bg-white border-b shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <h1 className="font-semibold text-sm">{title}</h1>
        </div>
        <button
          type="button"
          title="Clear Conversation"
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
        >
          <TrashIcon />
        </button>
      </header>

      {/* CHAT */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {history.length === 0 && (
            <div className="text-center py-20 text-slate-400 italic">
              How can I help you today?
            </div>
          )}

          {history.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm break-words ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-white border rounded-tl-sm"
                } ${m.isError ? "border-red-300 text-red-600" : ""}`}
              >
                {m.file && (
                  <div className="text-[10px] opacity-60 mb-1 truncate">
                    📎 {m.file.name}
                  </div>
                )}
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-200 h-10 w-24 rounded-xl animate-pulse" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* INPUT */}
      <footer className="bg-white border-t shadow-lg z-10 flex-shrink-0">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-2 bg-slate-50 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-200">
            {allowImages && (
              <button
                type="button"
                title="Attach Image"
                onClick={() => fileInputRef.current?.click()}
                className="text-slate-400 hover:bg-slate-200 p-2 rounded-lg"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                />
                <AttachIcon />
              </button>
            )}

            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                attachedFile ? `Attached: ${attachedFile.name}` : placeholder
              }
              className="flex-1 bg-transparent outline-none text-sm min-w-0"
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || (!inputText.trim() && !attachedFile)}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg disabled:opacity-30 flex-shrink-0 transition-opacity"
            >
              {isLoading ? "..." : "SEND"}
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            Powered by Gemini 1.5 Flash • Max {maxFileSizeMB}MB
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AI_Assistant;
