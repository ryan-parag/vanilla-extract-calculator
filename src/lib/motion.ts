import type { Transition, Variants } from 'motion/react'

// Ease-out quint: quick to respond, long gentle settle
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const ease: Transition = { duration: 0.35, ease: EASE_OUT }

// Content sliding up into place, used for page entrances and list items
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: ease },
}

// Parent that reveals its fadeUp children one after another
export const stagger = (gap = 0.04, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})
