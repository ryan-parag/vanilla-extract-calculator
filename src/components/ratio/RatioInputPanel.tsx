import type { ReactNode } from 'react'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { CalculatorIcon, Drop, JarLabel } from '@phosphor-icons/react'
import { CollapsibleCard } from '../CollapsibleCard'
import { NumInput, VolumeSelect } from '../InputPanel'
import { UNITS_BY_MEASURE, type AnyUnit } from '../../lib/measures'
import type { RatioMode } from '../../hooks/useRatioCalc'
import type { RatioRecipe } from '../../recipes/types'

interface RatioInputPanelProps {
  recipe: RatioRecipe
  mode: RatioMode
  onModeChange: (m: RatioMode) => void
  baseValue: number
  setBaseValue: (v: number) => void
  baseUnit: AnyUnit
  setBaseUnit: (u: AnyUnit) => void
  yieldValue: number
  setYieldValue: (v: number) => void
  yieldUnit: AnyUnit
  setYieldUnit: (u: AnyUnit) => void
}

export function RatioInputPanel({
  recipe, mode, onModeChange,
  baseValue, setBaseValue, baseUnit, setBaseUnit,
  yieldValue, setYieldValue, yieldUnit, setYieldUnit,
}: RatioInputPanelProps) {
  const modes: { value: RatioMode; label: string; description: string; icon: ReactNode }[] = [
    { value: 'base',  label: `${recipe.base.label} amount`, description: 'What you have on hand', icon: <Drop size={16} weight="bold" /> },
    { value: 'yield', label: `${recipe.yieldLabel} wanted`, description: 'What your recipe calls for', icon: <JarLabel size={16} weight="bold" /> },
  ]

  return (
    <CollapsibleCard title="Calculate By" icon={<CalculatorIcon size={20} weight="bold" />}>
      <ToggleGroup
        value={[mode]}
        onValueChange={(vals) => {
          if (vals.length > 0) onModeChange(vals[0] as RatioMode)
        }}
        className="grid grid-cols-2 gap-2"
      >
        {modes.map((m) => (
          <Toggle key={m.value} value={m.value} aria-label={m.label} className="toggle-card">
            <div className="h-10 w-10 p-2 inline-flex items-center justify-center rounded-full text-xs font-bold bg-accent-500/20 text-accent-700 dark:text-accent-300 mb-1">
              {m.icon}
            </div>
            <p className="toggle-card__title">{m.label}</p>
            <p className="toggle-card__description">{m.description}</p>
          </Toggle>
        ))}
      </ToggleGroup>
      <div className="pt-3">
        {mode === 'base' ? (
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{recipe.base.label}</label>
            <div className="flex gap-2">
              <NumInput value={baseValue} onChange={setBaseValue} />
              <VolumeSelect<AnyUnit> value={baseUnit} onChange={setBaseUnit} units={UNITS_BY_MEASURE[recipe.base.measure ?? 'volume']} />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{recipe.base.description}</p>
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{recipe.yieldLabel} wanted</label>
            <div className="flex gap-2">
              <NumInput value={yieldValue} onChange={setYieldValue} />
              <VolumeSelect<AnyUnit> value={yieldUnit} onChange={setYieldUnit} units={UNITS_BY_MEASURE[recipe.yieldMeasure ?? 'volume']} />
            </div>
            {recipe.yieldRange[0] !== recipe.yieldRange[1] && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Yield varies batch to batch, so amounts aim for the middle of the expected range
              </p>
            )}
          </div>
        )}
      </div>
    </CollapsibleCard>
  )
}
