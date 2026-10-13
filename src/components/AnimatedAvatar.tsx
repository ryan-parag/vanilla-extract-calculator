import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// One step of the idle loop: which frame to show and for how long (ms).
// A [min, max] duration is re-rolled each loop so the timing doesn't feel mechanical.
export type AvatarStep = { frame: number; ms: number | [number, number] }

// Hair sway pivoting through the rest pose: rest → sway A → rest → sway B.
// Assumes frames are [rest, sway A, sway B].
export const IDLE: AvatarStep[] = [
  { frame: 0, ms: [700, 1100] },
  { frame: 1, ms: 160 },
  { frame: 0, ms: 160 },
  { frame: 2, ms: 160 },
]

// There's a single closed-eye frame, so the hold carries the whole blink; ~100–150ms reads as one
const BLINK_MS = 120
const BLINK_GAP: [number, number] = [2500, 5500]
const DOUBLE_BLINK_CHANCE = 0.2
// How long the rest pose settles before the eyes close
const BLINK_LEAD_MS = 150

const duration = (ms: AvatarStep['ms']) =>
  typeof ms === 'number' ? ms : ms[0] + Math.random() * (ms[1] - ms[0])

export function AnimatedAvatar({
  frames,
  blinkFrame,
  alt,
  sequence = IDLE,
  className = '',
}: {
  frames: string[]
  // Closed-eye version of frames[0]; blinks only play during the loop's first step so the rest of the pose matches
  blinkFrame?: string
  alt: string
  sequence?: AvatarStep[]
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(sequence[0].frame)
  const blinkIndex = frames.length

  useEffect(() => {
    if (reduceMotion) return
    let step = 0
    let nextBlinkAt = performance.now() + duration(BLINK_GAP)
    // Frames still to play before the idle loop advances (used to splice blinks into a hold)
    const queue: [frame: number, ms: number][] = []
    let id: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!queue.length) {
        step = (step + 1) % sequence.length
        const { frame, ms } = sequence[step]
        const hold = duration(ms)
        const now = performance.now()
        if (blinkFrame && step === 0 && now >= nextBlinkAt) {
          queue.push([frame, BLINK_LEAD_MS], [blinkIndex, BLINK_MS])
          if (Math.random() < DOUBLE_BLINK_CHANCE) queue.push([frame, 90], [blinkIndex, BLINK_MS])
          queue.push([frame, Math.max(hold - BLINK_LEAD_MS, 200)])
          nextBlinkAt = now + duration(BLINK_GAP)
        } else {
          queue.push([frame, hold])
        }
      }
      const [frame, ms] = queue.shift()!
      setCurrent(frame)
      id = setTimeout(tick, ms)
    }

    id = setTimeout(tick, duration(sequence[0].ms))
    return () => clearTimeout(id)
  }, [sequence, blinkFrame, blinkIndex, reduceMotion])

  const shown = reduceMotion ? sequence[0].frame : current
  const all = blinkFrame ? [...frames, blinkFrame] : frames

  // Every frame stays mounted so they're all loaded up front and swaps never flash.
  // Swaps are hard cuts (no transition) so it reads as a sprite, not a crossfade.
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {all.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          aria-hidden={i !== 0 || undefined}
          className={`z-10 transform scale-110 top-1 rounded-full overflow-hidden absolute inset-0 h-full w-full object-cover ${i === shown ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-b from-amber-500 via-emerald-500 to-blue-500 transform rotate-45 opacity-30 blur-sm"/>
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-b from-pink-500 to-transparent opacity-50 blur-sm animate-spin" style={{ animationDuration: '4000ms' }}/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg bg-white w-8 h-8 z-0"/>
      
    </div>
  )
}
