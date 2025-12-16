"use client";

import React, {
  useState,
  useCallback,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { GoogleGenAI, GenerateContentParameters } from "@google/genai";
import { marked } from "marked";

/* =======================
   PROPS (FLEXIBILITY)
======================= */
interface AIAssistantProps {
  title?: string;
  model?: string;
  placeholder?: string;
  systemPrompt?: string;
  allowImages?: boolean;
  maxFileSizeMB?: number;
  persistHistory?: boolean;
  storageKey?: string;
  subject?: string;
}

/* =======================
   TYPES
======================= */
interface Message {
  role: "user" | "model";
  text: string;
  file?: { name: string; type: string };
  isError?: boolean;
}

/* =======================
   ICONS
======================= */
const AttachIcon = () => (
  <svg
    className="h-6 w-6"
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

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
    U
  </div>
);

const AIAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
    AI
  </div>
);

/* =======================
   MAIN COMPONENT
======================= */
const AI_Assistant: React.FC<AIAssistantProps> = ({
  title = "AI Study Assistant",
  model = "gemini-2.5-flash",
  placeholder = "Ask your question...",
  systemPrompt,
  allowImages = true,
  maxFileSizeMB = 10,
  persistHistory = false,
  storageKey = "ai-study-chat",
  subject = "General",
}) => {
  const [inputText, setInputText] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* =======================
     GEMINI SETUP
  ======================= */
  const API_KEY =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_GEMINI_API_KEY
      : undefined;

  const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

  /* =======================
     LOAD / SAVE HISTORY
  ======================= */
  useEffect(() => {
    if (persistHistory) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (persistHistory) {
      localStorage.setItem(storageKey, JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  /* =======================
     FILE → BASE64
  ======================= */
  const fileToGenerativePart = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        base64
          ? resolve({
              inlineData: { data: base64, mimeType: file.type },
            })
          : reject();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /* =======================
     SEND HANDLER
  ======================= */
  const handleSend = useCallback(
    async (prompt: string, file: File | null) => {
      if (!prompt.trim() && !file) return;

      setHistory((h) => [
        ...h,
        {
          role: "user",
          text: prompt || "File attached",
          file: file ? { name: file.name, type: file.type } : undefined,
        },
      ]);

      setInputText("");
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (!ai) {
        setHistory((h) => [
          ...h,
          { role: "model", text: "API Key not configured.", isError: true },
        ]);
        return;
      }

      setIsLoading(true);

      try {
        const contents: GenerateContentParameters["contents"] = [
          { role: "user", parts: [] },
        ];

        const finalPrompt = `
Subject: ${subject}
${systemPrompt ?? ""}
Question: ${prompt}
        `.trim();

        if (prompt) contents[0].parts.push({ text: finalPrompt });

        if (file) {
          const part = await fileToGenerativePart(file);
          contents[0].parts.push(part as any);
        }

        const result = await ai.models.generateContent({
          model,
          contents,
        });

        setHistory((h) => [
          ...h,
          { role: "model", text: result.text || "No response." },
        ]);
      } catch {
        setHistory((h) => [
          ...h,
          { role: "model", text: "Something went wrong.", isError: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [ai, model, subject, systemPrompt]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputText, attachedFile);
  };

  /* =======================
     FILE HANDLING
  ======================= */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`File exceeds ${maxFileSizeMB}MB`);
      return;
    }
    setAttachedFile(file);
  };

  /* =======================
     MARKDOWN
  ======================= */
  const renderMarkdown = (text: string) => ({
    __html: marked(text, { gfm: true }),
  });

  /* =======================
     UI
  ======================= */
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="p-4 bg-white border-b font-bold text-xl">
        {title}
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {history.map((m, i) => (
          <div
            key={i}
            className={`flex mb-4 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "model" && <AIAvatar />}
            <div
              className={`max-w-[75%] p-4 rounded-xl shadow ${
                m.role === "user" ? "bg-blue-600 text-white" : "bg-white border"
              }`}
              dangerouslySetInnerHTML={
                m.isError ? undefined : renderMarkdown(m.text)
              }
            >
              {m.isError && <b>⚠ {m.text}</b>}
            </div>
            {m.role === "user" && <UserAvatar />}
          </div>
        ))}
        {isLoading && <p className="italic text-gray-400">AI thinking…</p>}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t flex gap-3 bg-white"
      >
        {allowImages && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              <AttachIcon />
            </button>
          </>
        )}

        <input
          className="flex-1 border rounded-full px-4 py-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-600 text-white px-5 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AI_Assistant;
