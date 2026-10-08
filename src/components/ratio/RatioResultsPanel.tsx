import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { Check } from '@phosphor-icons/react'
import type { MeasureSystem } from '../../lib/kitchenUnits'
import { RecipeActions } from '../recipe/RecipeActions'

export interface IngredientLine {
  label: string
  amount: string
}

interface RatioResultsPanelProps {
  heading: string
  // e.g. "Acid: Lemon juice", shown above the ingredients
  details: IngredientLine[]
  ingredients: IngredientLine[]
  yieldLine: IngredientLine
  byproducts: IngredientLine[]
  system: MeasureSystem
  setSystem: (s: MeasureSystem) => void
  recipeText: () => string
}

const KeyValPair = ({ k, v }: { k: string; v: string }) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="text-sm text-accent-800 dark:text-accent-100">{k}</div>
    <div className="text-sm font-semibold text-accent-700 dark:text-accent-400">{v}</div>
  </div>
)

const SYSTEMS: { value: MeasureSystem; label: string }[] = [
  { value: 'us', label: 'US' },
  { value: 'metric', label: 'Metric' },
  { value: 'weight', label: 'Weight' },
]

export function RatioResultsPanel({
  heading, details, ingredients, yieldLine, byproducts, system, setSystem, recipeText,
}: RatioResultsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Check size={20} weight="bold" />
          <h2 className="text-lg font-bold">Results</h2>
        </div>
        <ToggleGroup
          value={[system]}
          onValueChange={(vals) => {
            if (vals.length > 0) setSystem(vals[0] as MeasureSystem)
          }}
          aria-label="Measurement system"
          className="flex rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden print:hidden"
        >
          {SYSTEMS.map((s) => (
            <Toggle
              key={s.value}
              value={s.value}
              className="
                px-3 py-1.5 text-sm cursor-pointer bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400
                hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors
                data-[pressed]:bg-accent-500/15 data-[pressed]:text-accent-700 dark:data-[pressed]:text-accent-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
              "
            >
              {s.label}
            </Toggle>
          ))}
        </ToggleGroup>
      </div>

      <div className="rounded-lg border border-accent-500/20 bg-accent-500/10 p-3 flex flex-col gap-2 break-inside-avoid">
        <h4 className="text-lg font-bold text-accent-700 dark:text-accent-300">{heading}</h4>
        {details.map((d) => (
          <KeyValPair key={d.label} k={d.label} v={d.amount} />
        ))}
        {details.length > 0 && <div className="border-t border-accent-500/20" />}
        {ingredients.map((i) => (
          <KeyValPair key={i.label} k={i.label} v={i.amount} />
        ))}
        <div className="border-t border-accent-500/20 pt-2 flex flex-col gap-2">
          <KeyValPair k={yieldLine.label} v={yieldLine.amount} />
          {byproducts.map((b) => (
            <KeyValPair key={b.label} k={b.label} v={b.amount} />
          ))}
        </div>
      </div>

      <RecipeActions recipeText={recipeText} />
    </div>
  )
}
