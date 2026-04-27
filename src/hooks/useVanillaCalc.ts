import { useState, useMemo } from 'react'

export type Formula = 'fda' | 'coop' | 'budget'
export type Fold = 1 | 1.5 | 2 | 3
export type CalcMode = 'container' | 'alcohol' | 'vanilla'
export type VolumeUnit = 'ml' | 'floz' | 'cup' | 'pint' | 'quart' | 'liter' | 'gallon'
export type WeightUnit = 'g' | 'oz'

export const FORMULAS: Record<Formula, { label: string; beansPerHundredMl: number; description: string }> = {
  fda: { label: 'FDA Standard',
    beansPerHundredMl: 10.0,
    description: 'USA Legal standard minimum'
  },
  coop: {
    label: 'Home cooks',
    beansPerHundredMl: 12.0,
    description: '20% stronger, easy conversions'
  },
  budget: {
    label: 'Budget Grade A',
    beansPerHundredMl: 10.5,
    description: 'Slightly above FDA for Grade A beans'
  },
}

export const FOLDS: { value: Fold; label: string; description: string }[] = [
  { value: 1,   label: 'Single Fold', description: 'Classic strength' },
  { value: 1.5, label: '1.5 Fold',    description: 'Moderately stronger' },
  { value: 2,   label: 'Double Fold', description: 'Twice the strength' },
  { value: 3,   label: 'Triple Fold', description: 'Intensely concentrated' },
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

export function useVanillaCalc() {
  const [formula, setFormula] = useState<Formula>('fda')
  const [fold, setFold] = useState<Fold>(1)
  const [mode, setMode] = useState<CalcMode>('container')

  const [containerValue, setContainerValue] = useState<number>(250)
  const [containerUnit, setContainerUnit] = useState<VolumeUnit>('ml')

  const [alcoholValue, setAlcoholValue] = useState<number>(250)
  const [alcoholUnit, setAlcoholUnit] = useState<VolumeUnit>('ml')

  const [vanillaValue, setVanillaValue] = useState<number>(25)
  const [vanillaUnit, setVanillaUnit] = useState<WeightUnit>('g')

  const [volumeDisplayUnit, setVolumeDisplayUnit] = useState<VolumeUnit>('ml')
  const [weightDisplayUnit, setWeightDisplayUnit] = useState<WeightUnit>('g')

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
