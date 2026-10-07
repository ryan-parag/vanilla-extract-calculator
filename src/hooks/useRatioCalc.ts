import { useState, useMemo, useEffect } from 'react'
import { toCanonical, UNITS_BY_MEASURE, type AnyUnit } from '../lib/measures'
import { addedMlPerBaseMl } from '../lib/formatAddition'
import { loadJson, saveJson } from '../lib/storage'
import { numberParam, oneOf, readParams, writeParams } from '../lib/urlState'
import { useMeasureSystem } from './usePreference'
import type { RatioRecipe } from '../recipes/types'

export type RatioMode = 'base' | 'yield'

// Amounts are in ml, or grams for butter measures
export interface RatioResult {
  baseAmount: number
  yieldMin: number
  yieldMax: number
}

interface SavedInputs {
  variantId: string
  mode: RatioMode
  baseValue: number
  baseUnit: AnyUnit
  yieldValue: number
  yieldUnit: AnyUnit
}

// Starting inputs: a shared link wins, then this browser's last visit, then the recipe's defaults
function initialInputs(recipe: RatioRecipe, slug: string): SavedInputs {
  const { defaults } = recipe
  const baseUnits = Object.keys(UNITS_BY_MEASURE[recipe.base.measure ?? 'volume']) as AnyUnit[]
  const yieldUnits = Object.keys(UNITS_BY_MEASURE[recipe.yieldMeasure ?? 'volume']) as AnyUnit[]
  const variantIds = recipe.variants.map(v => v.id)

  const saved = loadJson<Partial<SavedInputs>>(`recipe:${slug}`) ?? {}
  const params = readParams()
  const mode = oneOf(params, 'm', ['base', 'yield'] as const) ?? saved.mode ?? defaults.mode
  const linkAmount = numberParam(params, 'a')
  const linkUnit = oneOf(params, 'u', mode === 'base' ? baseUnits : yieldUnits)

  const pick = <T,>(value: T | undefined, allowed: T[], fallback: T) =>
    value !== undefined && allowed.includes(value) ? value : fallback

  return {
    variantId: oneOf(params, 'v', variantIds)
      ?? pick(saved.variantId, variantIds, (recipe.variants.find(v => v.recommended) ?? recipe.variants[0]).id),
    mode,
    baseValue: (mode === 'base' ? linkAmount : undefined) ?? saved.baseValue ?? defaults.value,
    baseUnit: (mode === 'base' ? linkUnit : undefined) ?? pick(saved.baseUnit, baseUnits, defaults.unit),
    yieldValue: (mode === 'yield' ? linkAmount : undefined) ?? saved.yieldValue ?? defaults.yieldValue ?? defaults.value,
    yieldUnit: (mode === 'yield' ? linkUnit : undefined) ?? pick(saved.yieldUnit, yieldUnits, defaults.yieldUnit ?? defaults.unit),
  }
}

export function useRatioCalc(recipe: RatioRecipe, slug: string) {
  const baseMeasure = recipe.base.measure ?? 'volume'
  const yieldMeasure = recipe.yieldMeasure ?? 'volume'

  const [initial] = useState(() => initialInputs(recipe, slug))
  const [variantId, setVariantId] = useState(initial.variantId)
  const [mode, setMode] = useState<RatioMode>(initial.mode)
  const [baseValue, setBaseValue] = useState(initial.baseValue)
  const [baseUnit, setBaseUnit] = useState<AnyUnit>(initial.baseUnit)
  const [yieldValue, setYieldValue] = useState(initial.yieldValue)
  const [yieldUnit, setYieldUnit] = useState<AnyUnit>(initial.yieldUnit)

  const [system, setSystem] = useMeasureSystem()

  // Remember inputs for next time, and keep the link shareable
  useEffect(() => {
    saveJson(`recipe:${slug}`, { variantId, mode, baseValue, baseUnit, yieldValue, yieldUnit })
    writeParams({
      ...(recipe.variants.length > 1 ? { v: variantId } : {}),
      m: mode,
      a: mode === 'base' ? baseValue : yieldValue,
      u: mode === 'base' ? baseUnit : yieldUnit,
    })
  }, [slug, recipe, variantId, mode, baseValue, baseUnit, yieldValue, yieldUnit])

  const variant = recipe.variants.find(v => v.id === variantId) ?? recipe.variants[0]

  const result = useMemo<RatioResult>(() => {
    // Amount that the yield range applies to, per unit of base
    const yieldBasisPerBase = recipe.yieldFrom === 'base'
      ? 1
      : 1 + addedMlPerBaseMl(variant.additions)
    const [yMin, yMax] = recipe.yieldRange

    const baseAmount = mode === 'base'
      ? toCanonical(baseValue, baseUnit, baseMeasure)
      // Aim for the middle of the expected yield
      : toCanonical(yieldValue, yieldUnit, yieldMeasure) / (yieldBasisPerBase * (yMin + yMax) / 2)

    return {
      baseAmount,
      yieldMin: baseAmount * yieldBasisPerBase * yMin,
      yieldMax: baseAmount * yieldBasisPerBase * yMax,
    }
  }, [recipe, variant, mode, baseValue, baseUnit, yieldValue, yieldUnit, baseMeasure, yieldMeasure])

  return {
    variant, setVariantId,
    mode, setMode,
    baseValue, setBaseValue,
    baseUnit, setBaseUnit,
    yieldValue, setYieldValue,
    yieldUnit, setYieldUnit,
    system, setSystem,
    result,
  }
}
