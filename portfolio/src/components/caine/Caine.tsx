import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useCaine } from '@/context/CaineContext'
import CaineMascot from './CaineMascot'
import SpeechBubble from './SpeechBubble'

const BASE_SIZE = 300
const DOCK_MARGIN_X = 16
const DOCK_MARGIN_Y = 92
const DOCK_SCALE_MOBILE = 0.4
const DOCK_SCALE_DESKTOP = 0.56
const HOME_SCALE_MOBILE = 0.72
const HOME_SCALE_DESKTOP = 1.2
const DOCK_BUBBLE_WIDTH_MOBILE = 180
const DOCK_BUBBLE_WIDTH_DESKTOP = 240

function getViewport() {
  return { w: window.innerWidth, h: window.innerHeight }
}

function computeMascotTarget(isHome: boolean) {
  const { w, h } = getViewport()
  const isMobile = w < 640
  if (isHome) {
    const scale = isMobile ? HOME_SCALE_MOBILE : HOME_SCALE_DESKTOP
    const size = BASE_SIZE * scale
    const y = isMobile ? Math.max(h * 0.08, 120) : Math.max(h * 0.06, 100)
    return { x: w / 2 - size / 2, y, scale }
  }
  const scale = isMobile ? DOCK_SCALE_MOBILE : DOCK_SCALE_DESKTOP
  const size = BASE_SIZE * scale
  return { x: w - size - DOCK_MARGIN_X, y: h - size - DOCK_MARGIN_Y, scale }
}

function getDockBubbleWidth() {
  return window.innerWidth < 640 ? DOCK_BUBBLE_WIDTH_MOBILE : DOCK_BUBBLE_WIDTH_DESKTOP
}

function computeBubbleTarget(isHome: boolean, bubbleWidth: number) {
  const { w, h } = getViewport()
  if (isHome) {
    const scale = w < 640 ? HOME_SCALE_MOBILE : HOME_SCALE_DESKTOP
    const y = w < 640 ? Math.max(h * 0.08, 120) : Math.max(h * 0.06, 100)
    return { x: w / 2 - bubbleWidth / 2, y: y + BASE_SIZE * scale * 0.86 }
  }
  return { x: w - bubbleWidth - DOCK_MARGIN_X - 8, y: h - DOCK_MARGIN_Y - 22 }
}

function getHomeBubbleWidth() {
  const w = window.innerWidth
  const desired = w < 640 ? 270 : 420
  return Math.min(desired, w - 48)
}

function getBubbleWidth(isHome: boolean) {
  return isHome ? getHomeBubbleWidth() : getDockBubbleWidth()
}

export default function Caine() {
  const { pathname } = useLocation()
  const { message, excited, bump } = useCaine()
  const isHome = pathname === '/'
  const mascotRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [bubbleWidth, setBubbleWidth] = useState(() => getBubbleWidth(isHome))

  useLayoutEffect(() => {
    const initial = computeMascotTarget(isHome)
    if (mascotRef.current) {
      gsap.set(mascotRef.current, { transformOrigin: '0 0', ...initial })
    }
    if (bubbleRef.current) {
      gsap.set(bubbleRef.current, computeBubbleTarget(isHome, bubbleWidth))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const width = getBubbleWidth(isHome)
    setBubbleWidth(width)
    if (mascotRef.current) {
      gsap.to(mascotRef.current, { ...computeMascotTarget(isHome), duration: 1.15, ease: 'power3.inOut' })
    }
    if (bubbleRef.current) {
      gsap.to(bubbleRef.current, { ...computeBubbleTarget(isHome, width), duration: 1.15, ease: 'power3.inOut' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome])

  useEffect(() => {
    const onResize = () => {
      const width = getBubbleWidth(isHome)
      setBubbleWidth(width)
      if (mascotRef.current) gsap.set(mascotRef.current, computeMascotTarget(isHome))
      if (bubbleRef.current) gsap.set(bubbleRef.current, computeBubbleTarget(isHome, width))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome])

  return (
    <>
      <div
        ref={mascotRef}
        className={`pointer-events-none left-0 top-0 z-40 ${isHome ? 'absolute' : 'fixed'}`}
        style={{ width: BASE_SIZE, height: BASE_SIZE }}
      >
        <div className="h-full w-full animate-float">
          <CaineMascot excited={excited} talkKey={bump} />
        </div>
      </div>
      <div
        ref={bubbleRef}
        className={`pointer-events-none left-0 top-0 z-40 transition-[width] duration-300 ${
          isHome ? 'absolute' : 'fixed'
        }`}
        style={{ width: bubbleWidth }}
      >
        <SpeechBubble message={message} compact={!isHome} />
      </div>
    </>
  )
}
