import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { FORMULAS, type Formula } from '../hooks/useVanillaCalc'
import { Flask } from '@phosphor-icons/react'

interface FormulaSelectorProps {
  value: Formula
  onChange: (f: Formula) => void
}

export function FormulaSelector({ value, onChange }: FormulaSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
        <Flask size={20} weight="bold" />
        <span className="text-lg font-bold">
          Formula
        </span>
      </div>
      <ToggleGroup
        value={[value]}
        onValueChange={(vals) => {
          if (vals.length > 0) onChange(vals[0] as Formula)
        }}
        className="grid grid-cols-2 gap-2"
      >
        {(Object.entries(FORMULAS) as [Formula, typeof FORMULAS[Formula]][]).map(([key, f]) => (
          <Toggle
            key={key}
            value={key}
            aria-label={f.label}
            className="toggle-card"
          >
            <p className="toggle-card__title">
              {f.label}
            </p>
            <p className="toggle-card__description">{f.description}</p>
          </Toggle>
        ))}
      </ToggleGroup>
    </div>
  )
}
