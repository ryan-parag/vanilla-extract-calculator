import { formatCount, formatVolume, formatWeight, type MeasureSystem } from './kitchenUnits'
import type { Addition } from '../recipes/types'

// Amount of an addition for `baseMl` of base, formatted for the page and the steps
export function formatAddition(a: Addition, baseMl: number, system: MeasureSystem): string {
  if ('mlPerBaseMl' in a) return formatVolume(baseMl * a.mlPerBaseMl, system, false, a.gPerMl)
  if ('gramsPerBaseMl' in a) return formatWeight(baseMl * a.gramsPerBaseMl, system)
  const n = baseMl * a.countPerBaseMl
  const count = formatCount(n, a.noun, a.round)
  return a.gramsEach ? `${count} (~${formatWeight(n * a.gramsEach, 'metric')})` : count
}

// Only volume additions add to the batch; weighed or counted solids get strained out or dissolve
export function addedMlPerBaseMl(additions: Addition[]): number {
  return additions.reduce((sum, a) => sum + ('mlPerBaseMl' in a ? a.mlPerBaseMl : 0), 0)
}
