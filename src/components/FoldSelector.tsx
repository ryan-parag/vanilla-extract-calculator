import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { FOLDS, type Fold } from '../hooks/useVanillaCalc'
import { Scales } from '@phosphor-icons/react'

interface FoldSelectorProps {
  value: Fold
  onChange: (f: Fold) => void
}

export function FoldSelector({ value, onChange }: FoldSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
        <Scales size={20} weight="bold" />
        <span className="text-lg font-bold">
          Fold Strength
        </span>
      </div>
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
            <div className="h-7 w-7 inline-flex items-center justify-center rounded-full text-[10px] font-bold bg-vanilla-500/20 text-vanilla-700 dark:text-vanilla-300 mb-1">
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
    </div>
  )
}
