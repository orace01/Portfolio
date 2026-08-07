import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { pickIdleLine, HOVER_LINES } from '@/lib/caine-lines'

interface CaineState {
  message: string
  excited: boolean
  say: (text: string) => void
  sayFor: (key: keyof typeof HOVER_LINES | string) => void
  reset: () => void
  bump: number
}

const CaineContext = createContext<CaineState | null>(null)

export function CaineProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [message, setMessage] = useState(() => pickIdleLine(pathname))
  const [excited, setExcited] = useState(false)
  const [bump, setBump] = useState(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMessage(pickIdleLine(pathname))
    setExcited(false)
  }, [pathname])

  const clearResetTimer = () => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current)
      resetTimer.current = null
    }
  }

  const say = useCallback((text: string) => {
    clearResetTimer()
    setMessage(text)
    setExcited(true)
    setBump((b) => b + 1)
  }, [])

  const sayFor = useCallback(
    (key: string) => {
      const line = HOVER_LINES[key]
      if (line) say(line)
    },
    [say],
  )

  const reset = useCallback(() => {
    clearResetTimer()
    resetTimer.current = setTimeout(() => {
      setExcited(false)
      setMessage(pickIdleLine(pathname))
    }, 220)
  }, [pathname])

  const value = useMemo(
    () => ({ message, excited, say, sayFor, reset, bump }),
    [message, excited, say, sayFor, reset, bump],
  )

  return <CaineContext.Provider value={value}>{children}</CaineContext.Provider>
}

export function useCaine() {
  const ctx = useContext(CaineContext)
  if (!ctx) throw new Error('useCaine must be used within CaineProvider')
  return ctx
}
