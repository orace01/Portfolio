"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CONTACT_TERMINAL, SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type LineTone = "system" | "echo" | "error" | "success";

interface TerminalLine {
  id: number;
  text: string;
  tone: LineTone;
}

type Stage = "booting" | "name" | "email" | "message" | "confirm" | "advancing" | "success";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPE_SPEED_MS = 14;
const LINE_PAUSE_MS = 120;

const INPUT_LABEL: Partial<Record<Stage, string>> = {
  name: "Your name",
  email: "Your email address",
  message: "Your message",
  confirm: "Confirm dispatch, Y or N",
};

const LINE_TONE_CLASS: Record<LineTone, string> = {
  system: "text-[#00E5FF]/90",
  echo: "text-white/80",
  error: "text-amber-400",
  success: "text-emerald-400",
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function generateTransmissionId() {
  const hex = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
  return `#${hex}`;
}

/** Builds a mailto: link so "dispatching" the transmission actually opens a real email, prefilled. */
function buildMailto(form: FormState) {
  const subject = `Portfolio transmission from ${form.name || "unknown sender"}`;
  const body = `${form.message}\n\n—\n${form.name}\n${form.email}`;
  const params = new URLSearchParams({ subject, body });
  return `mailto:${SITE.email}?${params.toString()}`;
}

export default function TerminalContact() {
  const reducedMotion = usePrefersReducedMotion();

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [stage, setStage] = useState<Stage>("booting");
  const [inputValue, setInputValue] = useState("");
  const [flashing, setFlashing] = useState(false);
  const formRef = useRef<FormState>({ name: "", email: "", message: "" });

  const idRef = useRef(0);
  // Bumped whenever the boot effect (re)starts, so a stale in-flight typewriter loop from a
  // previous run (e.g. React StrictMode's dev-only mount/cleanup/remount) can recognize it's
  // stale and stop, instead of a shared boolean that both runs would otherwise reset for each other.
  const runIdRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, stage]);

  const typeLine = async (text: string, tone: LineTone, runId: number) => {
    const id = idRef.current++;
    if (reducedMotion) {
      await Promise.resolve();
      if (runId !== runIdRef.current) return;
      setLines((prev) => [...prev, { id, text, tone }]);
      return;
    }
    setLines((prev) => [...prev, { id, text: "", tone }]);
    for (let i = 1; i <= text.length; i++) {
      await sleep(TYPE_SPEED_MS);
      if (runId !== runIdRef.current) return;
      const slice = text.slice(0, i);
      setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text: slice } : line)));
    }
    await sleep(LINE_PAUSE_MS);
  };

  const print = async (texts: string[], tone: LineTone, runId: number) => {
    for (const text of texts) {
      if (runId !== runIdRef.current) return;
      await typeLine(text, tone, runId);
    }
  };

  const echo = (text: string) => {
    setLines((prev) => [...prev, { id: idRef.current++, text: `> ${text}`, tone: "echo" }]);
  };

  useEffect(() => {
    const runId = ++runIdRef.current;
    async function boot() {
      await print(CONTACT_TERMINAL.bootLines, "system", runId);
      await print(CONTACT_TERMINAL.step1, "system", runId);
      if (runId === runIdRef.current) setStage("name");
    }
    void boot();
    return () => {
      // Intentionally reads the ref's *current* value at cleanup time (not a
      // stale snapshot) to invalidate any in-flight typewriter loop.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      runIdRef.current++;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const handleEnter = async (raw: string) => {
    const runId = runIdRef.current;
    const value = raw.trim();

    if (stage === "name") {
      if (!value) {
        await print(["[ERROR] FIELD REQUIRED. TRY AGAIN:"], "error", runId);
        return;
      }
      echo(value);
      formRef.current.name = value;
      setInputValue("");
      setStage("advancing");
      await print(CONTACT_TERMINAL.step2, "system", runId);
      if (runId === runIdRef.current) setStage("email");
      return;
    }

    if (stage === "email") {
      if (!EMAIL_PATTERN.test(value)) {
        echo(value);
        await print(["[ERROR] INVALID EMAIL FORMAT. RE-ENTER:"], "error", runId);
        setInputValue("");
        return;
      }
      echo(value);
      formRef.current.email = value;
      setInputValue("");
      setStage("advancing");
      await print(CONTACT_TERMINAL.step3, "system", runId);
      if (runId === runIdRef.current) setStage("message");
      return;
    }

    if (stage === "message") {
      if (!value) {
        await print(["[ERROR] FIELD REQUIRED. TRY AGAIN:"], "error", runId);
        return;
      }
      echo(value);
      formRef.current.message = value;
      setInputValue("");
      setStage("advancing");
      await print([CONTACT_TERMINAL.confirmLine], "system", runId);
      if (runId === runIdRef.current) setStage("confirm");
      return;
    }

    if (stage === "confirm") {
      const answer = value.toUpperCase();
      if (answer === "N") {
        echo(value || "N");
        setInputValue("");
        setStage("advancing");
        await print(["> TRANSMISSION ABORTED. RESTARTING..."], "system", runId);
        formRef.current = { name: "", email: "", message: "" };
        await print(CONTACT_TERMINAL.step1, "system", runId);
        if (runId === runIdRef.current) setStage("name");
        return;
      }
      echo(value || "Y");
      setInputValue("");
      setStage("advancing");
      setFlashing(true);
      setTimeout(() => setFlashing(false), 550);
      await sleep(300);
      const txId = generateTransmissionId();
      await print(
        [
          "[INITIALIZING TRANSMISSION...]",
          `[SUCCESS] Payload dispatched. Transmission ID: ${txId}`,
          "> OPENING MAIL CLIENT TO COMPLETE HANDSHAKE...",
        ],
        "success",
        runId
      );
      if (typeof window !== "undefined") {
        window.location.href = buildMailto(formRef.current);
      }
      if (runId === runIdRef.current) setStage("success");
    }
  };

  const handleReset = async () => {
    const runId = runIdRef.current;
    formRef.current = { name: "", email: "", message: "" };
    setInputValue("");
    setLines([]);
    setStage("advancing");
    await print(["> NEW SESSION STARTED."], "system", runId);
    await print(CONTACT_TERMINAL.step1, "system", runId);
    if (runId === runIdRef.current) setStage("name");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (stage === "confirm") {
      const key = e.key.toLowerCase();
      if (key === "y") {
        e.preventDefault();
        void handleEnter("Y");
        return;
      }
      if (key === "n") {
        e.preventDefault();
        void handleEnter("N");
        return;
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      void handleEnter(inputValue);
    }
  };

  const isInputStage =
    stage === "name" || stage === "email" || stage === "message" || stage === "confirm";

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-[#00E5FF]/30 bg-black/60 text-left shadow-[0_0_40px_-15px_rgba(0,229,255,0.3)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-2.5">
        <span className="truncate font-mono text-xs text-white/40">{CONTACT_TERMINAL.session}</span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-emerald-400">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          Status: Connected
        </span>
      </div>

      <div
        ref={bodyRef}
        onClick={focusInput}
        className="h-80 cursor-text overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed sm:h-96"
      >
        {lines.map((line) => (
          <p key={line.id} className={`whitespace-pre-wrap break-words ${LINE_TONE_CLASS[line.tone]}`}>
            {line.text}
          </p>
        ))}

        {isInputStage && (
          <div className="flex items-center gap-2 text-[#00E5FF]">
            <span aria-hidden="true">{">"}</span>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={INPUT_LABEL[stage]}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white caret-transparent outline-none"
            />
            <span aria-hidden="true" className="h-4 w-2 shrink-0 animate-terminal-blink bg-[#00E5FF]" />
          </div>
        )}

        {stage === "success" && (
          <button
            type="button"
            onClick={() => void handleReset()}
            className="mt-3 font-mono text-xs uppercase tracking-wider text-emerald-400 transition-colors hover:text-emerald-300"
          >
            {"[ New Transmission ]"}
          </button>
        )}
      </div>

      {flashing && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 animate-terminal-flash bg-[#00E5FF]/30" />
        </div>
      )}
    </div>
  );
}
