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
/** On the home hero, Caine fills this fraction of his anchor column's height, leaving room below for the bubble. */
const HOME_FILL_RATIO = 0.68
const HOME_MIN_SIZE = 200
const HOME_MAX_SIZE = 550
/** Vertical offset of Caine's top edge as a fraction of the anchor height, keeping him past the column's midline. */
const HOME_TOP_OFFSET_RATIO = 0.06

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Mascot pixel size for the home hero: proportional to the anchor's real height when known, else a fixed fallback scale. */
function getHomeMascotSize(anchor: AnchorRect | null, isMobile: boolean) {
  if (anchor) {
    return clamp(anchor.height * HOME_FILL_RATIO, HOME_MIN_SIZE, HOME_MAX_SIZE)
  }
  return BASE_SIZE * (isMobile ? HOME_SCALE_MOBILE : HOME_SCALE_DESKTOP)
}

interface AnchorRect {
  left: number
  top: number
  width: number
  height: number
}

function getViewport() {
  return { w: window.innerWidth, h: window.innerHeight }
}

/** Bounding rect of the hero's right-column placeholder, in document coordinates. */
function getAnchorRect(anchorEl: HTMLDivElement | null): AnchorRect | null {
  if (!anchorEl) return null
  const rect = anchorEl.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return null
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  }
}

function computeMascotTarget(isHome: boolean, anchor: AnchorRect | null) {
  const { w, h } = getViewport()
  const isMobile = w < 640
  if (isHome) {
    const size = getHomeMascotSize(anchor, isMobile)
    const scale = size / BASE_SIZE
    if (anchor) {
      const x = anchor.left + anchor.width / 2 - size / 2
      const y = anchor.top + anchor.height * HOME_TOP_OFFSET_RATIO
      return { x, y, scale }
    }
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

function computeBubbleTarget(isHome: boolean, bubbleWidth: number, anchor: AnchorRect | null) {
  const { w, h } = getViewport()
  if (isHome) {
    const isMobile = w < 640
    const size = getHomeMascotSize(anchor, isMobile)
    if (anchor) {
      const mascotY = anchor.top + anchor.height * HOME_TOP_OFFSET_RATIO
      return { x: anchor.left + anchor.width / 2 - bubbleWidth / 2, y: mascotY + size * 0.86 }
    }
    const y = isMobile ? Math.max(h * 0.08, 120) : Math.max(h * 0.06, 100)
    return { x: w / 2 - bubbleWidth / 2, y: y + size * 0.86 }
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
  const { message, excited, bump, heroAnchorRef } = useCaine()
  const isHome = pathname === '/'
  const mascotRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [bubbleWidth, setBubbleWidth] = useState(() => getBubbleWidth(isHome))

  useLayoutEffect(() => {
    const anchor = getAnchorRect(heroAnchorRef.current)
    const initial = computeMascotTarget(isHome, anchor)
    if (mascotRef.current) {
      gsap.set(mascotRef.current, { transformOrigin: '0 0', ...initial })
    }
    if (bubbleRef.current) {
      gsap.set(bubbleRef.current, computeBubbleTarget(isHome, bubbleWidth, anchor))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const width = getBubbleWidth(isHome)
    setBubbleWidth(width)
    const anchor = getAnchorRect(heroAnchorRef.current)
    if (mascotRef.current) {
      gsap.to(mascotRef.current, { ...computeMascotTarget(isHome, anchor), duration: 1.15, ease: 'power3.inOut' })
    }
    if (bubbleRef.current) {
      gsap.to(bubbleRef.current, {
        ...computeBubbleTarget(isHome, width, anchor),
        duration: 1.15,
        ease: 'power3.inOut',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome])

  useEffect(() => {
    const onResize = () => {
      const width = getBubbleWidth(isHome)
      setBubbleWidth(width)
      const anchor = getAnchorRect(heroAnchorRef.current)
      if (mascotRef.current) gsap.set(mascotRef.current, computeMascotTarget(isHome, anchor))
      if (bubbleRef.current) gsap.set(bubbleRef.current, computeBubbleTarget(isHome, width, anchor))
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
        <div className="relative h-full w-full animate-float">
          {isHome && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,240,255,0.25), rgba(168,85,247,0.28) 45%, transparent 72%)',
              }}
            />
          )}
          <div
            className="h-full w-full"
            style={
              isHome
                ? { filter: 'drop-shadow(0 0 18px rgba(168,85,247,0.35)) drop-shadow(0 0 10px rgba(0,240,255,0.3))' }
                : undefined
            }
          >
            <CaineMascot excited={excited} talkKey={bump} />
          </div>
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
