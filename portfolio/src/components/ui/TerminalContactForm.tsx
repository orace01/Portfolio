import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useCaine } from '@/context/CaineContext'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

type LineTone = 'system' | 'echo' | 'error' | 'success'

interface TerminalLine {
  id: number
  text: string
  tone: LineTone
}

type Stage = 'booting' | 'name' | 'email' | 'message' | 'confirm' | 'advancing' | 'success'

interface FormState {
  name: string
  email: string
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TYPE_SPEED_MS = 16
const LINE_PAUSE_MS = 140

const BOOT_LINES = [
  '> INITIALIZING TRANSMISSION PROTOCOL... [DONE]',
  '> CONNECTED TO ORACE_HONFIN_CORE [SYSTEMS: ONLINE]',
  '> LOCATION: COTONOU, BENIN [EPITECH NODE]',
]
const STEP1_LINES = ['> STEP 1/3: IDENTIFICATION', '> ENTER YOUR NAME OR ORGANIZATION:']
const STEP2_LINES = ['> STEP 2/3: RETURN ROUTE', '> ENTER YOUR EMAIL ADDRESS:']
const STEP3_LINES = ['> STEP 3/3: PAYLOAD', '> ENTER TRANSMISSION MESSAGE:']
const CONFIRM_LINE = '> DISPATCH SIGNAL TO ORACE HONFIN? (Y/N)'

const CAINE_CONFIRM_LINES = [
  "Message received — Caine's forwarding it now.",
  "Logged, encrypted, and yelled down the hallway to him.",
  "Transmission successful. He'll reply once the coffee kicks in.",
]

const INPUT_LABEL: Partial<Record<Stage, string>> = {
  name: 'Your name or organization',
  email: 'Your email address',
  message: 'Your transmission message',
  confirm: 'Confirm dispatch, Y or N',
}

const LINE_TONE_CLASS: Record<LineTone, string> = {
  system: 'text-cyan-neon/90',
  echo: 'text-neutral-200',
  error: 'text-amber-400',
  success: 'text-green-500',
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function generateTransmissionId() {
  const hex = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
  return `#${hex}`
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export default function TerminalContactForm() {
  const { say } = useCaine()
  const formReaction = useCaineReaction(HOVER_LINES['contact-form'])

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [stage, setStage] = useState<Stage>('booting')
  const [inputValue, setInputValue] = useState('')
  const [flashing, setFlashing] = useState(false)
  const formRef = useRef<FormState>({ name: '', email: '', message: '' })

  const idRef = useRef(0)
  // Bumped whenever the boot effect (re)starts, so a stale in-flight typewriter loop from a
  // previous run (e.g. React StrictMode's dev-only mount/cleanup/remount) can recognize it's
  // stale and stop, instead of a shared boolean that both runs would otherwise reset for each other.
  const runIdRef = useRef(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines, stage])

  const typeLine = async (text: string, tone: LineTone, runId: number) => {
    const id = idRef.current++
    if (prefersReducedMotion()) {
      // Yield a tick first so a stale run (e.g. React StrictMode's dev-only double-invoke) has
      // already been superseded before this checks in, instead of writing a line synchronously.
      await Promise.resolve()
      if (runId !== runIdRef.current) return
      setLines((prev) => [...prev, { id, text, tone }])
      return
    }
    setLines((prev) => [...prev, { id, text: '', tone }])
    for (let i = 1; i <= text.length; i++) {
      await sleep(TYPE_SPEED_MS)
      if (runId !== runIdRef.current) return
      const slice = text.slice(0, i)
      setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text: slice } : line)))
    }
    await sleep(LINE_PAUSE_MS)
  }

  const print = async (texts: string[], tone: LineTone, runId: number) => {
    for (const text of texts) {
      if (runId !== runIdRef.current) return
      await typeLine(text, tone, runId)
    }
  }

  const echo = (text: string) => {
    setLines((prev) => [...prev, { id: idRef.current++, text: `> ${text}`, tone: 'echo' }])
  }

  useEffect(() => {
    const runId = ++runIdRef.current
    async function boot() {
      await print(BOOT_LINES, 'system', runId)
      await print(STEP1_LINES, 'system', runId)
      if (runId === runIdRef.current) setStage('name')
    }
    void boot()
    return () => {
      runIdRef.current++
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const focusInput = () => inputRef.current?.focus()

  const handleEnter = async (raw: string) => {
    const runId = runIdRef.current
    const value = raw.trim()

    if (stage === 'name') {
      if (!value) {
        await print(['[ERROR] FIELD REQUIRED. TRY AGAIN:'], 'error', runId)
        return
      }
      echo(value)
      formRef.current.name = value
      setInputValue('')
      setStage('advancing')
      await print(STEP2_LINES, 'system', runId)
      if (runId === runIdRef.current) setStage('email')
      return
    }

    if (stage === 'email') {
      if (!EMAIL_PATTERN.test(value)) {
        echo(value)
        await print(['[ERROR] INVALID EMAIL FORMAT. RE-ENTER:'], 'error', runId)
        setInputValue('')
        return
      }
      echo(value)
      formRef.current.email = value
      setInputValue('')
      setStage('advancing')
      await print(STEP3_LINES, 'system', runId)
      if (runId === runIdRef.current) setStage('message')
      return
    }

    if (stage === 'message') {
      if (!value) {
        await print(['[ERROR] FIELD REQUIRED. TRY AGAIN:'], 'error', runId)
        return
      }
      echo(value)
      formRef.current.message = value
      setInputValue('')
      setStage('advancing')
      await print([CONFIRM_LINE], 'system', runId)
      if (runId === runIdRef.current) setStage('confirm')
      return
    }

    if (stage === 'confirm') {
      const answer = value.toUpperCase()
      if (answer === 'N') {
        echo(value || 'N')
        setInputValue('')
        setStage('advancing')
        await print(['> TRANSMISSION ABORTED. RESTARTING...'], 'system', runId)
        formRef.current = { name: '', email: '', message: '' }
        await print(STEP1_LINES, 'system', runId)
        if (runId === runIdRef.current) setStage('name')
        return
      }
      echo(value || 'Y')
      setInputValue('')
      setStage('advancing')
      setFlashing(true)
      setTimeout(() => setFlashing(false), 550)
      await sleep(300)
      const txId = generateTransmissionId()
      await print([`[SUCCESS] Payload dispatched. Transmission ID: ${txId}`], 'success', runId)
      say(CAINE_CONFIRM_LINES[Math.floor(Math.random() * CAINE_CONFIRM_LINES.length)])
      if (runId === runIdRef.current) setStage('success')
    }
  }

  const handleReset = async () => {
    const runId = runIdRef.current
    formRef.current = { name: '', email: '', message: '' }
    setInputValue('')
    setLines([])
    setStage('advancing')
    await print(['> NEW SESSION STARTED.'], 'system', runId)
    await print(STEP1_LINES, 'system', runId)
    if (runId === runIdRef.current) setStage('name')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (stage === 'confirm') {
      const key = e.key.toLowerCase()
      if (key === 'y') {
        e.preventDefault()
        void handleEnter('Y')
        return
      }
      if (key === 'n') {
        e.preventDefault()
        void handleEnter('N')
        return
      }
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      void handleEnter(inputValue)
    }
  }

  const isInputStage = stage === 'name' || stage === 'email' || stage === 'message' || stage === 'confirm'

  return (
    <div
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-[#00F0FF]/40 bg-[#05070E]/90 shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-md"
      {...formReaction}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-2.5">
        <span className="truncate font-mono text-xs text-neutral-500">
          session://caine-core/contact-transmission.sh
        </span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-green-500">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"
            style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
          />
          Status: Connected
        </span>
      </div>

      <div
        ref={bodyRef}
        onClick={focusInput}
        className="h-[26rem] cursor-text overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
      >
        {lines.map((line) => (
          <p key={line.id} className={`whitespace-pre-wrap break-words ${LINE_TONE_CLASS[line.tone]}`}>
            {line.text}
          </p>
        ))}

        {isInputStage && (
          <div className="flex items-center gap-2 text-cyan-neon">
            <span aria-hidden="true">{'>'}</span>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={INPUT_LABEL[stage]}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              className="flex-1 min-w-0 bg-transparent font-mono text-sm text-neutral-100 caret-transparent outline-none"
            />
            <span aria-hidden="true" className="h-4 w-2 shrink-0 animate-blink bg-cyan-neon" />
          </div>
        )}

        {stage === 'success' && (
          <button
            type="button"
            onClick={() => void handleReset()}
            className="bracket-btn mt-3 text-green-500 hover:text-green-400"
          >
            [ New Transmission ]
          </button>
        )}
      </div>

      {flashing && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 animate-flash-pulse bg-cyan-neon/40" />
          <div className="absolute inset-x-0 top-0 h-20 animate-scan-sweep bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </div>
      )}
    </div>
  )
}
