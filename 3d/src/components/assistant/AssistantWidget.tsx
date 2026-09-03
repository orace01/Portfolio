"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ASSISTANT_FAQ, ASSISTANT_FALLBACK, ASSISTANT_GREETING, matchFaq } from "@/lib/assistant-faq";
import { cx } from "@/lib/utils";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

let nextId = 1;

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "assistant", text: ASSISTANT_GREETING },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const ask = (question: string) => {
    const value = question.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: value }]);
    setInputValue("");
    setTyping(true);
    const answer = matchFaq(value)?.answer ?? ASSISTANT_FALLBACK;
    const delay = 400 + Math.min(answer.length * 8, 900);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId++, role: "assistant", text: answer }]);
    }, delay);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ask(inputValue);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={cx(
          "w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right overflow-hidden rounded-2xl border border-[#00E5FF]/25 bg-black/70 shadow-[0_0_50px_-12px_rgba(0,229,255,0.35)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00E5FF]"
              style={{ boxShadow: "0 0 6px rgba(0,229,255,0.8)" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
              Orace // Assistant
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer l'assistant"
            className="rounded-full p-1 text-white/50 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={bodyRef} className="flex max-h-80 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cx(
                "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                m.role === "assistant"
                  ? "self-start border border-[#00E5FF]/20 bg-[#00E5FF]/[0.06] text-white/80"
                  : "self-end border border-white/15 bg-white/[0.06] text-white"
              )}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="self-start rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.06] px-3 py-2 text-xs text-white/50">
              <span className="inline-flex gap-1">
                <span className="h-1 w-1 animate-bounce rounded-full bg-white/50 [animation-delay:-0.2s]" />
                <span className="h-1 w-1 animate-bounce rounded-full bg-white/50 [animation-delay:-0.1s]" />
                <span className="h-1 w-1 animate-bounce rounded-full bg-white/50" />
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3">
          {ASSISTANT_FAQ.slice(0, 4).map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => ask(entry.prompt)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-[#00E5FF]/40 hover:text-[#00E5FF]"
            >
              {entry.prompt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question sur Orace..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-mono text-xs text-white placeholder:text-white/30 outline-none"
          />
          <button
            type="button"
            onClick={() => ask(inputValue)}
            disabled={!inputValue.trim()}
            aria-label="Envoyer"
            className="shrink-0 rounded-full border border-[#00E5FF]/30 p-1.5 text-[#00E5FF] transition-colors hover:bg-[#00E5FF]/10 disabled:opacity-30"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
              <path
                d="M17 3L3 9.5l6 2 2 6L17 3z"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-black/70 py-3 pl-4 pr-5 font-mono text-xs uppercase tracking-wider text-white shadow-[0_0_30px_-8px_rgba(0,229,255,0.5)] backdrop-blur-xl transition-all hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/10"
        aria-expanded={open}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]" />
        </span>
        {open ? "Fermer" : "Me demander à propos d'Orace"}
      </button>
    </div>
  );
}
