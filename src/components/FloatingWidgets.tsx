import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Minus, Send, ArrowRight, HelpCircle } from 'lucide-react';
import { faqAssistantEngine } from '../services/faqAssistant';
import type { AssistantMessage, PageRoute } from '../types';

interface FloatingWidgetsProps {
  onNavigate: (route: PageRoute) => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: faqAssistantEngine.getWelcomeMessage(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const suggestedQuestions = faqAssistantEngine.getSuggestedQuestions();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleAsk = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: AssistantMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: now,
    };

    const reply = await faqAssistantEngine.respond(trimmed);
    const botMsg: AssistantMessage = {
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'assistant',
      text: reply.text,
      action: reply.action,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  const handleOpenAssistant = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="AI Growth Lab Assistant"
          className="w-[calc(100vw-2rem)] sm:w-[390px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden mb-3 flex flex-col"
          style={{ maxHeight: isMinimized ? 'auto' : 'min(560px, 80vh)' }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#0B1020] text-white flex items-center justify-between gap-3 border-b border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 flex items-center justify-center text-[#4F8CFF] shrink-0">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold leading-tight truncate">
                  AI Growth Lab Assistant
                </h2>
                <p className="text-[11px] text-slate-300 truncate">
                  FAQ Guide · Instant Answers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsMinimized((prev) => !prev)}
                aria-label={isMinimized ? 'Expand assistant' : 'Minimize assistant'}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F7FB] min-h-[210px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#4F8CFF] text-white rounded-br-sm'
                          : 'bg-white border border-slate-200 text-[#172033] rounded-bl-sm shadow-2xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.action && (
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate(msg.action!.route);
                            setIsMinimized(true);
                          }}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1020] hover:bg-[#151D32] text-white text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Predefined Suggested Quick Questions */}
              <div className="px-3.5 py-2.5 bg-white border-t border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Suggested Questions
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-[108px] overflow-y-auto pr-1">
                  {suggestedQuestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAsk(item.question)}
                      className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-[#F5F7FB] hover:bg-[#E7EEFF] border border-slate-200 hover:border-[#4F8CFF]/50 text-[#172033] transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free-Text Input + Contact Link */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk(inputValue);
                }}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a keyword (e.g. website, WhatsApp)..."
                  aria-label="Ask a question about AI Growth Lab services"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-slate-300 bg-[#F5F7FB] text-sm text-[#172033] placeholder:text-slate-500 focus:bg-white focus:border-[#4F8CFF] focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send question"
                  className="w-10 h-10 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="px-3.5 py-2 bg-[#F5F7FB] border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Need specific help?</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('/contact');
                    setIsMinimized(true);
                  }}
                  className="font-semibold text-[#2F6BFF] hover:underline focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
                >
                  Go to Contact Form
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => (isOpen && !isMinimized ? setIsOpen(false) : handleOpenAssistant())}
        aria-expanded={isOpen && !isMinimized}
        aria-label="Open AI Growth Lab Assistant"
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#4F8CFF] hover:bg-[#3A78F0] text-white shadow-xl border border-white/20 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
      >
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
        <span>AI Assistant</span>
      </button>
    </div>
  );
};
