import React, { useState } from 'react'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { FOLDS, type Fold } from '../hooks/useVanillaCalc'
import { Scales, Sparkle } from '@phosphor-icons/react'
import { CaretRight } from '@phosphor-icons/react'
import { motion } from "motion/react"

interface FoldSelectorProps {
  value: Fold
  onChange: (f: Fold) => void
}

export function FoldSelector({ value, onChange }: FoldSelectorProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-3">
      <button
        className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition w-full flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center w-full gap-2">
          <Scales size={20} weight="bold" />
          <span className="text-lg font-bold">
            Fold Strength
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretRight size={16} weight="bold" />
        </motion.div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="px-4 py-3"
        >
          <ToggleGroup
            value={[String(value)]}
            onValueChange={(vals) => {
              if (vals.length > 0) onChange(Number(vals[0]) as Fold)
            }}
            className="grid grid-cols-2 gap-2"
          >
            {FOLDS.map((f) => (
              <Toggle
                key={f.value}
                value={String(f.value)}
                aria-label={f.label}
                className="relative toggle-card flex-col items-start h-full"
              >
                {
                  f.recommended && (
                    <div className="p-1 bg-vanilla-500/20 text-vanilla-700 dark:text-vanilla-500 absolute top-0 right-0 inline-flex items-center justify-center rounded-bl-md text-[10px] uppercase font-semibold tracking-wide gap-1">
                      <Sparkle
                        size={14}
                        weight="bold"
                      />
                      Recommended
                    </div>
                  )
                }
                <div className="h-10 w-10 inline-flex items-center justify-center rounded-full text-xs font-black bg-vanilla-500/20 text-vanilla-700 dark:text-vanilla-300 mb-1">
                  x{f.value}
                </div>
                <div className="relative">
                  <p className="toggle-card__title">
                    {f.label}
                  </p>
                  <p className="toggle-card__description">{f.description}</p>
                </div>
              </Toggle>
            ))}
          </ToggleGroup>
        </motion.div>
      )}
    </div>
  )
}
