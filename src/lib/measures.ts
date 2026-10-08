import {
  BUTTER_UNITS, KITCHEN_UNITS, formatButter, formatVolume,
  type ButterUnit, type KitchenUnit, type MeasureSystem,
} from './kitchenUnits'

// How a recipe's base and yield are measured. Volume amounts are in ml, butter in grams.
export type Measure = 'volume' | 'butter'
export type AnyUnit = KitchenUnit | ButterUnit

export const UNITS_BY_MEASURE: Record<Measure, Record<string, { label: string; factor: number }>> = {
  volume: Object.fromEntries(Object.entries(KITCHEN_UNITS).map(([k, u]) => [k, { label: u.label, factor: u.toMl }])),
  butter: Object.fromEntries(Object.entries(BUTTER_UNITS).map(([k, u]) => [k, { label: u.label, factor: u.toG }])),
}

export function toCanonical(value: number, unit: AnyUnit, measure: Measure): number {
  return value * UNITS_BY_MEASURE[measure][unit].factor
}

// `gPerMl` lets volume amounts show as grams in the 'weight' system
export function formatMeasure(amount: number, measure: Measure, system: MeasureSystem, approx = false, gPerMl?: number): string {
  return measure === 'butter' ? formatButter(amount, system, approx) : formatVolume(amount, system, approx, gPerMl)
}
