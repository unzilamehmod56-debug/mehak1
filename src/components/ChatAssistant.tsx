/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Flame, User } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello, lovely! I am your premium beauty concierge chatbot for Makeover by Mehak. How can I help you discover or book your dream transformation today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Gather last 8 turns of history (excluding welcome id)
      const chatHistory = messages
        .filter((m) => m.id !== "welcome")
        .slice(-8)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      const data = await res.json();
      const botText = data.text || "I apologize, let's explore our custom Menu options or call Mehak at 0320 4123381 for direct guidance.";

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        role: "model",
        text: botText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-err`,
          role: "model",
          text: "My apologies! My connection to our Atelier server is fluctuating. You can always customization packages directly on this page or text Mehak on WhatsApp at 0320 4123381!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const menuChips = [
    { text: "Bridal Couture pricing?", label: "Bridal Pricing" },
    { text: "Suggest glamorous hair styles?", label: "Hair Style Tips" },
    { text: "Where is the Atelier located?", label: "Atelier Map" },
    { text: "Tell me how to book a consultation?", label: "Consultation" },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[330px] sm:w-[380px] h-[500px] glass-card backdrop-blur-xl bg-[#fbfbe2]/95 border border-primary/25 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header portion */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fbfbe2] flex items-center justify-center text-primary shadow-sm">
                  <Sparkles size={18} className="animate-spin-slow text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold leading-none">
                    Mehak's Advisor
                  </h4>
                  <span className="font-sans text-[10px] text-white/70 uppercase tracking-widest mt-1 inline-block">
                    Atelier Concierge
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages flow body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[320px]">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                        M
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[13px] font-sans leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-primary/5 text-lux-dark rounded-bl-none border border-primary/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    M
                  </div>
                  <div className="bg-primary/5 border border-primary/10 px-4 py-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1.5 items-center justify-center h-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></span>
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Helper Preset Chips */}
            <div className="px-4 py-2 bg-primary/5 divide-y divide-primary/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-2 border-t border-b border-primary/10">
              {menuChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.text)}
                  className="px-3 py-1.5 rounded-full bg-white text-[11px] text-primary font-sans font-semibold border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-1 cursor-pointer"
                >
                  ✨ {chip.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white flex gap-2 border-t border-primary/5 h-16 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about bridal couture packages..."
                className="flex-1 px-4 py-2 bg-primary/5 border border-primary/5 rounded-full text-xs font-sans focus:outline-none focus:border-primary focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center transition-all ${
                  inputText.trim() ? "hover:bg-primary-light active:scale-90" : "opacity-45"
                }`}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4af37] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group relative focus:outline-none"
        aria-label="Toggle beauty assistant chatbot"
      >
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25 group-hover:hidden"></span>
        <MessageCircle size={24} className="relative z-10" />
      </button>
    </div>
  );
}
