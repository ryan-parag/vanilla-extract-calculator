import { Select } from '@base-ui/react/select'
import { CaretDown, Check } from '@phosphor-icons/react'
import { RecipeActions } from './recipe/RecipeActions'
import type { CalcResult, VolumeUnit, WeightUnit } from '../hooks/useVanillaCalc'
import { VOLUME_UNITS, WEIGHT_UNITS, type Formula, type Fold, FORMULAS, FOLDS } from '../hooks/useVanillaCalc'

interface ResultsPanelProps {
  result: CalcResult
  formula: Formula
  fold: Fold
  volumeDisplayUnit: VolumeUnit
  setVolumeDisplayUnit: (u: VolumeUnit) => void
  weightDisplayUnit: WeightUnit
  setWeightDisplayUnit: (u: WeightUnit) => void
  recipeText: () => string
}

const KeyValPair = ({ k, v }: { k: string; v: string }) => (
  <div className="grid grid-cols-3 gap-1">
    <div className="text-sm text-accent-800 dark:text-accent-100">{k}</div>
    <div className="text-sm font-semibold text-accent-700 dark:text-accent-400 col-span-2">{v}</div>
  </div>
)


const selectTriggerCls = `
  flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-zinc-700
  bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-900 dark:text-zinc-100
  px-2 py-2 text-sm cursor-pointer whitespace-nowrap
  hover:border-zinc-400 dark:hover:border-zinc-600
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
  transition-colors
`

const selectPopupCls = `
  z-50 min-w-[110px] rounded-xl border border-zinc-200 dark:border-zinc-700
  bg-white dark:bg-zinc-900 shadow-lg py-1
  data-[starting-style]:opacity-0 data-[ending-style]:opacity-0
  transition-opacity duration-150
`

const selectItemCls = `
  flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer
  text-zinc-700 dark:text-zinc-300
  data-[highlighted]:bg-accent-50 dark:data-[highlighted]:bg-accent-950/30
  data-[highlighted]:text-accent-700 dark:data-[highlighted]:text-accent-400
`


export function ResultsPanel({
  result,
  formula,
  fold,
  volumeDisplayUnit,
  setVolumeDisplayUnit,
  weightDisplayUnit,
  setWeightDisplayUnit,
  recipeText,
}: ResultsPanelProps) {
  const volLabel = VOLUME_UNITS[volumeDisplayUnit].label
  const wtLabel = WEIGHT_UNITS[weightDisplayUnit].label
  const foldLabel = FOLDS.find(f => f.value === fold)?.label ?? ''

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Check size={20} weight="bold"/>  
          <h2 className="text-lg font-bold">Results</h2>
        </div>
        <div className="flex gap-2 print:hidden">
          {/* Volume display unit selector */}
          <Select.Root value={volumeDisplayUnit} onValueChange={(v) => v && setVolumeDisplayUnit(v as VolumeUnit)}>
            <Select.Trigger className={selectTriggerCls}>
              <Select.Value />
              <Select.Icon className="text-zinc-400"><CaretDown size={12} weight="bold" /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4} align="end">
                <Select.Popup className={selectPopupCls}>
                  {(Object.entries(VOLUME_UNITS) as [VolumeUnit, { label: string }][]).map(([key, u]) => (
                    <Select.Item key={key} value={key} className={selectItemCls}>
                      <Select.ItemIndicator className="text-accent-600 dark:text-accent-400"><Check size={12} weight="bold" /></Select.ItemIndicator>
                      <Select.ItemText>{u.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>

          {/* Weight display unit selector */}
          <Select.Root value={weightDisplayUnit} onValueChange={(v) => v && setWeightDisplayUnit(v as WeightUnit)}>
            <Select.Trigger className={selectTriggerCls}>
              <Select.Value />
              <Select.Icon className="text-zinc-400"><CaretDown size={12} weight="bold" /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4} align="end">
                <Select.Popup className={selectPopupCls}>
                  {(Object.entries(WEIGHT_UNITS) as [WeightUnit, { label: string }][]).map(([key, u]) => (
                    <Select.Item key={key} value={key} className={selectItemCls}>
                      <Select.ItemIndicator className="text-accent-600 dark:text-accent-400"><Check size={12} weight="bold" /></Select.ItemIndicator>
                      <Select.ItemText>{u.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="rounded-lg border border-accent-500/20 bg-accent-500/10 p-3 flex flex-col gap-2 break-inside-avoid">
          <h4 className="text-lg font-bold text-accent-700 dark:text-accent-300">Extract formulation</h4>
          <KeyValPair k="Formula" v={FORMULAS[formula].label} />
          <KeyValPair k="Fold strength" v={foldLabel} />
          <KeyValPair k="Container size" v={`${result.containerDisplay} ${volLabel}`} />
          <KeyValPair k="Vanilla beans" v={`${result.beansDisplay} ${wtLabel}`} />
          <KeyValPair k="Alcohol" v={`${result.alcoholDisplay} ${volLabel}`} />
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/10 p-2 space-y-1">
        <p className="text-sm font-bold text-blue-800 dark:text-blue-400">Displacement note</p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Beans displace <strong>{result.displacementMl.toFixed(1)} ml</strong> of liquid.
          Add <strong>{result.alcoholDisplay} {volLabel}</strong> of alcohol to a jar, then add
          <strong> {result.beansDisplay} {wtLabel}</strong> of beans — total jar fill will be
          <strong> {result.containerDisplay} {volLabel}</strong>.
        </p>
      </div>

      <RecipeActions recipeText={recipeText} />
    </div>
  )
}
