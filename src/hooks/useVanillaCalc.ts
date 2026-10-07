import { useState, useMemo, useEffect } from 'react'
import { loadJson, saveJson } from '../lib/storage'
import { numberParam, oneOf, readParams, writeParams } from '../lib/urlState'

export type Formula = 'fda' | 'coop' | 'budget'
export type Fold = 1 | 1.5 | 2 | 3
export type CalcMode = 'container' | 'alcohol' | 'vanilla'
export type VolumeUnit = 'ml' | 'floz' | 'cup' | 'pint' | 'quart' | 'liter' | 'gallon'
export type WeightUnit = 'g' | 'oz'

export const FORMULAS: Record<Formula, { label: string; beansPerHundredMl: number; description: string; recommended: boolean }> = {
  fda: { label: 'FDA standard',
    beansPerHundredMl: 10.0,
    description: 'USA Legal standard minimum',
    recommended: false
  },
  coop: {
    label: 'Home cooks',
    beansPerHundredMl: 12.0,
    description: '20% stronger, easy conversions',
    recommended: true
  },
  budget: {
    label: 'Budget Grade A',
    beansPerHundredMl: 10.5,
    description: 'Slightly above FDA',
    recommended: false
  },
}

export const FOLDS: { value: Fold; label: string; description: string, recommended: boolean }[] = [
  { value: 1,   label: 'Single fold', description: 'Classic strength', recommended: false },
  { value: 1.5, label: '1.5 fold',    description: 'Moderately stronger', recommended: false },
  { value: 2,   label: 'Double fold', description: 'Twice the strength', recommended: true },
  { value: 3,   label: 'Triple fold', description: 'Intensely concentrated', recommended: false },
]

export const VOLUME_UNITS: Record<VolumeUnit, { label: string; toMl: number }> = {
  ml:     { label: 'ml',       toMl: 1 },
  floz:   { label: 'fl oz',    toMl: 29.5735 },
  cup:    { label: 'cups',     toMl: 236.588 },
  pint:   { label: 'pints',    toMl: 473.176 },
  quart:  { label: 'quarts',   toMl: 946.353 },
  liter:  { label: 'liters',   toMl: 1000 },
  gallon: { label: 'gallons',  toMl: 3785.41 },
}

export const WEIGHT_UNITS: Record<WeightUnit, { label: string; toGrams: number }> = {
  g:  { label: 'grams',  toGrams: 1 },
  oz: { label: 'ounces', toGrams: 28.3495 },
}

// 1g of vanilla bean displaces ~0.9ml of liquid
const ML_DISPLACEMENT_PER_GRAM = 0.9

function toMl(value: number, unit: VolumeUnit): number {
  return value * VOLUME_UNITS[unit].toMl
}

function fromMl(ml: number, unit: VolumeUnit): number {
  return ml / VOLUME_UNITS[unit].toMl
}

function toGrams(value: number, unit: WeightUnit): number {
  return value * WEIGHT_UNITS[unit].toGrams
}

function fromGrams(g: number, unit: WeightUnit): number {
  return g / WEIGHT_UNITS[unit].toGrams
}

export interface CalcResult {
  alcoholMl: number
  beanGrams: number
  containerMl: number
  displacementMl: number
  netAlcoholMl: number
  beansDisplay: string
  alcoholDisplay: string
  containerDisplay: string
}

const STORAGE_KEY = 'recipe:vanilla-extract'

interface SavedInputs {
  formula: Formula
  fold: Fold
  mode: CalcMode
  containerValue: number
  containerUnit: VolumeUnit
  alcoholValue: number
  alcoholUnit: VolumeUnit
  vanillaValue: number
  vanillaUnit: WeightUnit
  volumeDisplayUnit: VolumeUnit
  weightDisplayUnit: WeightUnit
}

const DEFAULTS: SavedInputs = {
  formula: 'fda', fold: 1, mode: 'container',
  containerValue: 250, containerUnit: 'ml',
  alcoholValue: 250, alcoholUnit: 'ml',
  vanillaValue: 25, vanillaUnit: 'g',
  volumeDisplayUnit: 'ml', weightDisplayUnit: 'g',
}

// Starting inputs: a shared link wins, then this browser's last visit, then the defaults
function initialInputs(): SavedInputs {
  const saved = { ...DEFAULTS, ...loadJson<Partial<SavedInputs>>(STORAGE_KEY) }
  const params = readParams()
  const volumeUnits = Object.keys(VOLUME_UNITS) as VolumeUnit[]
  const weightUnits = Object.keys(WEIGHT_UNITS) as WeightUnit[]
  const fold = numberParam(params, 'fold')
  const mode = oneOf(params, 'm', ['container', 'alcohol', 'vanilla'] as const) ?? saved.mode
  const amount = numberParam(params, 'a')
  const volumeUnit = oneOf(params, 'u', volumeUnits)
  const weightUnit = oneOf(params, 'u', weightUnits)

  return {
    ...saved,
    formula: oneOf(params, 'f', Object.keys(FORMULAS) as Formula[]) ?? saved.formula,
    fold: FOLDS.some(f => f.value === fold) ? fold as Fold : saved.fold,
    mode,
    ...(mode === 'container' ? { containerValue: amount ?? saved.containerValue, containerUnit: volumeUnit ?? saved.containerUnit } : {}),
    ...(mode === 'alcohol' ? { alcoholValue: amount ?? saved.alcoholValue, alcoholUnit: volumeUnit ?? saved.alcoholUnit } : {}),
    ...(mode === 'vanilla' ? { vanillaValue: amount ?? saved.vanillaValue, vanillaUnit: weightUnit ?? saved.vanillaUnit } : {}),
  }
}

export function useVanillaCalc() {
  const [initial] = useState(initialInputs)
  const [formula, setFormula] = useState<Formula>(initial.formula)
  const [fold, setFold] = useState<Fold>(initial.fold)
  const [mode, setMode] = useState<CalcMode>(initial.mode)

  const [containerValue, setContainerValue] = useState<number>(initial.containerValue)
  const [containerUnit, setContainerUnit] = useState<VolumeUnit>(initial.containerUnit)

  const [alcoholValue, setAlcoholValue] = useState<number>(initial.alcoholValue)
  const [alcoholUnit, setAlcoholUnit] = useState<VolumeUnit>(initial.alcoholUnit)

  const [vanillaValue, setVanillaValue] = useState<number>(initial.vanillaValue)
  const [vanillaUnit, setVanillaUnit] = useState<WeightUnit>(initial.vanillaUnit)

  const [volumeDisplayUnit, setVolumeDisplayUnit] = useState<VolumeUnit>(initial.volumeDisplayUnit)
  const [weightDisplayUnit, setWeightDisplayUnit] = useState<WeightUnit>(initial.weightDisplayUnit)

  // Remember inputs for next time, and keep the link shareable
  useEffect(() => {
    saveJson(STORAGE_KEY, {
      formula, fold, mode, containerValue, containerUnit, alcoholValue, alcoholUnit,
      vanillaValue, vanillaUnit, volumeDisplayUnit, weightDisplayUnit,
    } satisfies SavedInputs)
    const [amount, unit] = mode === 'container' ? [containerValue, containerUnit]
      : mode === 'alcohol' ? [alcoholValue, alcoholUnit]
      : [vanillaValue, vanillaUnit]
    writeParams({ f: formula, fold, m: mode, a: amount, u: unit })
  }, [formula, fold, mode, containerValue, containerUnit, alcoholValue, alcoholUnit,
      vanillaValue, vanillaUnit, volumeDisplayUnit, weightDisplayUnit])

  const result = useMemo<CalcResult>(() => {
    const baseRatio = FORMULAS[formula].beansPerHundredMl * fold // g per 100ml

    let alcoholMl: number
    let beanGrams: number

    if (mode === 'container') {
      const containerMlRaw = toMl(containerValue, containerUnit)
      // Container = alcohol + bean displacement
      // beanGrams = baseRatio * alcoholMl / 100
      // alcoholMl = containerMl - beanGrams * displacement
      // Solve: alcoholMl = containerMl - (baseRatio * alcoholMl / 100) * displacement
      // alcoholMl * (1 + baseRatio * displacement / 100) = containerMl
      alcoholMl = containerMlRaw / (1 + (baseRatio * ML_DISPLACEMENT_PER_GRAM) / 100)
      beanGrams = (baseRatio * alcoholMl) / 100
    } else if (mode === 'alcohol') {
      alcoholMl = toMl(alcoholValue, alcoholUnit)
      beanGrams = (baseRatio * alcoholMl) / 100
    } else {
      // mode === 'vanilla'
      beanGrams = toGrams(vanillaValue, vanillaUnit)
      alcoholMl = (beanGrams * 100) / baseRatio
    }

    const displacementMl = beanGrams * ML_DISPLACEMENT_PER_GRAM
    const containerMl = alcoholMl + displacementMl
    const netAlcoholMl = alcoholMl

    const beansDisplay = fromGrams(beanGrams, weightDisplayUnit).toFixed(2)
    const alcoholDisplay = fromMl(alcoholMl, volumeDisplayUnit).toFixed(2)
    const containerDisplay = fromMl(containerMl, volumeDisplayUnit).toFixed(2)

    return {
      alcoholMl,
      beanGrams,
      containerMl,
      displacementMl,
      netAlcoholMl,
      beansDisplay,
      alcoholDisplay,
      containerDisplay,
    }
  }, [
    formula, fold, mode,
    containerValue, containerUnit,
    alcoholValue, alcoholUnit,
    vanillaValue, vanillaUnit,
    volumeDisplayUnit, weightDisplayUnit,
  ])

  return {
    formula, setFormula,
    fold, setFold,
    mode, setMode,
    containerValue, setContainerValue,
    containerUnit, setContainerUnit,
    alcoholValue, setAlcoholValue,
    alcoholUnit, setAlcoholUnit,
    vanillaValue, setVanillaValue,
    vanillaUnit, setVanillaUnit,
    volumeDisplayUnit, setVolumeDisplayUnit,
    weightDisplayUnit, setWeightDisplayUnit,
    result,
  }
}
