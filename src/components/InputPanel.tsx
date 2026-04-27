import { NumberField } from '@base-ui/react/number-field'
import { Select } from '@base-ui/react/select'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { CaretDown, Check, CalculatorIcon } from '@phosphor-icons/react'
import { type CalcMode, type VolumeUnit, type WeightUnit, VOLUME_UNITS, WEIGHT_UNITS } from '../hooks/useVanillaCalc'

interface InputPanelProps {
  mode: CalcMode
  onModeChange: (m: CalcMode) => void

  containerValue: number
  setContainerValue: (v: number) => void
  containerUnit: VolumeUnit
  setContainerUnit: (u: VolumeUnit) => void

  alcoholValue: number
  setAlcoholValue: (v: number) => void
  alcoholUnit: VolumeUnit
  setAlcoholUnit: (u: VolumeUnit) => void

  vanillaValue: number
  setVanillaValue: (v: number) => void
  vanillaUnit: WeightUnit
  setVanillaUnit: (u: WeightUnit) => void
}

const MODES: { value: CalcMode; label: string; description: string }[] = [
  { value: 'container', label: 'Container Size',  description: "I know the volume of my container" },
  { value: 'alcohol',   label: 'Alcohol Amount',  description: "I know how much alcohol I have" },
  { value: 'vanilla',   label: 'Vanilla Amount',  description: "I know how many vanilla beans I have" },
]

const selectTriggerCls = `
  flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-zinc-700
  bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-900 dark:text-zinc-100
  px-2 py-2 text-sm cursor-pointer whitespace-nowrap
  hover:border-zinc-400 dark:hover:border-zinc-600
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vanilla-400
  transition-colors
`

const selectPopupCls = `
  z-50 min-w-[120px] rounded-xl border border-zinc-200 dark:border-zinc-700
  bg-white dark:bg-zinc-900 shadow-lg py-1
  data-[starting-style]:opacity-0 data-[ending-style]:opacity-0
  transition-opacity duration-150
`

const selectItemCls = `
  flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer
  text-zinc-700 dark:text-zinc-300
  data-[highlighted]:bg-vanilla-50 dark:data-[highlighted]:bg-vanilla-950/30
  data-[highlighted]:text-vanilla-700 dark:data-[highlighted]:text-vanilla-400
`

function VolumeSelect({ value, onChange }: { value: VolumeUnit; onChange: (u: VolumeUnit) => void }) {
  return (
    <Select.Root value={value} onValueChange={(v) => v && onChange(v as VolumeUnit)}>
      <Select.Trigger className={selectTriggerCls}>
        <Select.Value />
        <Select.Icon className="text-zinc-400">
          <CaretDown size={14} weight="bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4} align="end">
          <Select.Popup className={selectPopupCls}>
            {(Object.entries(VOLUME_UNITS) as [VolumeUnit, { label: string }][]).map(([key, u]) => (
              <Select.Item key={key} value={key} className={selectItemCls}>
                <Select.ItemIndicator className="text-vanilla-600 dark:text-vanilla-400">
                  <Check size={12} weight="bold" />
                </Select.ItemIndicator>
                <Select.ItemText>{u.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

function WeightSelect({ value, onChange }: { value: WeightUnit; onChange: (u: WeightUnit) => void }) {
  return (
    <Select.Root value={value} onValueChange={(v) => v && onChange(v as WeightUnit)}>
      <Select.Trigger className={selectTriggerCls}>
        <Select.Value />
        <Select.Icon className="text-zinc-400">
          <CaretDown size={14} weight="bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4} align="end">
          <Select.Popup className={selectPopupCls}>
            {(Object.entries(WEIGHT_UNITS) as [WeightUnit, { label: string }][]).map(([key, u]) => (
              <Select.Item key={key} value={key} className={selectItemCls}>
                <Select.ItemIndicator className="text-vanilla-600 dark:text-vanilla-400">
                  <Check size={12} weight="bold" />
                </Select.ItemIndicator>
                <Select.ItemText>{u.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

function NumInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <NumberField.Root
      value={value}
      onValueChange={(v) => { if (v !== null && v >= 0) onChange(v) }}
      min={0}
      step="any"
      className="flex-1 min-w-0"
    >
      <NumberField.Group className="flex rounded-lg border border-zinc-300 dark:border-zinc-800 overflow-hidden focus-within:ring-2 focus-within:ring-vanilla-400 dark:focus-within:ring-vanilla-600 transition-shadow">
        <NumberField.Decrement className="
          px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-800
          text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800
          text-sm font-bold select-none cursor-pointer active:bg-zinc-200 dark:active:bg-zinc-500
          focus-visible:outline-none
        ">
          −
        </NumberField.Decrement>
        <NumberField.Input className="
          flex-1 min-w-0 px-3 py-2 text-sm font-mono
          bg-white dark:bg-black text-zinc-900 dark:text-zinc-100
          focus:outline-none
        " />
        <NumberField.Increment className="
          px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-300 dark:border-zinc-800
          text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800
          text-sm font-bold select-none cursor-pointer active:bg-zinc-200 dark:active:bg-zinc-500
          focus-visible:outline-none
        ">
          +
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}


export function InputPanel({
  mode, onModeChange,
  containerValue, setContainerValue, containerUnit, setContainerUnit,
  alcoholValue, setAlcoholValue, alcoholUnit, setAlcoholUnit,
  vanillaValue, setVanillaValue, vanillaUnit, setVanillaUnit,
}: InputPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <CalculatorIcon size={20} weight="bold" />
          <span className="text-lg font-bold">
            Calculate By
          </span>
        </div>
        <ToggleGroup
          value={[mode]}
          onValueChange={(vals) => {
            if (vals.length > 0) onModeChange(vals[0] as CalcMode)
          }}
          className="grid grid-cols-2 gap-2"
        >
          {MODES.map((m) => (
            <Toggle
              key={m.value}
              value={m.value}
              aria-label={m.label}
              className="toggle-card"
            >
              <p className="toggle-card__title">
                {m.label}
              </p>
              <p className="toggle-card__description">{m.description}</p>
            </Toggle>
          ))}
        </ToggleGroup>
      </div>

      <div className="pt-1">
        {mode === 'container' && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Container / Jar Size</label>
            <div className="flex gap-2">
              <NumInput value={containerValue} onChange={setContainerValue} />
              <VolumeSelect value={containerUnit} onChange={setContainerUnit} />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Alcohol amount will be calculated accounting for bean displacement (~0.9ml/g)
            </p>
          </div>
        )}

        {mode === 'alcohol' && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Alcohol Amount</label>
            <div className="flex gap-2">
              <NumInput value={alcoholValue} onChange={setAlcoholValue} />
              <VolumeSelect value={alcoholUnit} onChange={setAlcoholUnit} />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Net liquid volume of alcohol (before bean displacement)
            </p>
          </div>
        )}

        {mode === 'vanilla' && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Vanilla Beans Weight</label>
            <div className="flex gap-2">
              <NumInput value={vanillaValue} onChange={setVanillaValue} />
              <WeightSelect value={vanillaUnit} onChange={setVanillaUnit} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
