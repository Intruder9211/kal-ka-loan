"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Calculator } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! 👋 I'm Rapid, your intelligent Home Loan AI powered by moneyviora. Ask me any question or tell me to calculate an EMI!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Lock body scroll when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const callGeminiAPI = async (userText: string, currentMessages: Message[]) => {
    setIsLoading(true);
    
    // Convert to history format but exclude the very first generic greeting to save tokens
    const history = currentMessages.slice(1).map(m => ({
      sender: m.sender,
      text: m.text
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: `⚠️ Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: "Sorry, I am having trouble connecting to the network right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    
    // Call API
    await callGeminiAPI(userMessage.text, messages);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[9000] p-4 bg-brand-mint text-brand-deep rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300",
          isOpen && "rotate-90 scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open Chatbot"
      >
        <MessageSquare size={28} className="animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-0 md:bottom-8 right-0 md:right-8 z-[9000] w-full md:w-[380px] h-[85vh] md:h-[600px] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right border border-gray-200",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-20 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-brand-deep p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-mint/20 rounded-full flex items-center justify-center">
              <Image src="/logo_white.png" alt="Money Viora" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <h3 className="font-bold">Money Viora</h3>
              <p className="text-xs text-brand-mint">Powered by moneyviora</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex max-w-[85%] animate-fade-up",
                msg.sender === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
              )}
            >
              <div 
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                  msg.sender === "user" 
                    ? "bg-brand-mint text-brand-deep rounded-br-none" 
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                )}
              >
                {/* Simple bold parsing for the EMI result */}
                {msg.text.split('**').map((part, i) => (
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about loans or calculate EMI..." 
              className="flex-1 bg-gray-100 rounded-full pl-4 pr-12 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-mint/50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1 top-1 bottom-1 w-10 bg-brand-deep text-brand-mint rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-brand-deep/90 transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-brand-mint border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
          <div className="mt-2 text-center flex items-center justify-center gap-1 text-[10px] text-gray-400">
            <Calculator size={10} /> AI can make mistakes. Verify with bank.
          </div>
        </div>
      </div>
    </>
  );
}
