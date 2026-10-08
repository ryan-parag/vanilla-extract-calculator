import type { Icon } from '@phosphor-icons/react'
import type { AnyUnit, Measure } from '../lib/measures'

// An ingredient added in proportion to the base (e.g. lemon juice per cup of cream).
// Measured by volume, by weight (mint leaves), or by count (lemons, vanilla beans).
// "BaseMl" is per ml of base, or per gram when the base is measured as butter.
// `gPerMl` (from lib/densities) lets volume amounts be shown by weight.
export type Addition = { id: string; label: string } & (
  | { mlPerBaseMl: number; gPerMl?: number }
  | { gramsPerBaseMl: number }
  | {
      countPerBaseMl: number
      noun: [singular: string, plural: string]
      // 'whole' rounds up (zest of 4 lemons); 'half' rounds to the nearest ½ (1½ beans)
      round: 'whole' | 'half'
      // Shown alongside the count, e.g. grams of zest per lemon
      gramsEach?: number
    }
)

export interface RecipeVariant {
  id: string
  label: string
  description: string
  icon: Icon
  recommended?: boolean
  additions: Addition[]
}

export interface Step {
  title: string
  body: string
  temp?: string
  duration?: string
}

// Formatted amounts handed to a recipe's steps
export interface StepContext {
  variant: RecipeVariant
  base: string
  additions: Record<string, string>
  // e.g. "about 1¼ cups"
  yield: string
}

export interface Byproduct {
  label: string
  // Amount per unit of base, in `measure`'s units (min, max)
  range: [number, number]
  measure?: Measure
  gPerMl?: number
}

export interface RatioRecipe {
  // `measure` defaults to volume
  // `gPerMl` on volume amounts lets them be shown by weight
  base: { label: string; description: string; measure?: Measure; gPerMl?: number }
  yieldLabel: string
  yieldMeasure?: Measure
  yieldGPerMl?: number
  // Finished amount per unit of `yieldFrom`, in `yieldMeasure`'s units (min, max)
  yieldRange: [number, number]
  // 'total' = base + additions (default); 'base' = base alone, e.g. when molasses just coats the sugar
  yieldFrom?: 'total' | 'base'
  // Label for the yield row, e.g. "Equivalent to" when the mix replaces more than its own volume
  yieldLineLabel?: string
  // Useful leftovers, e.g. buttermilk from churning butter
  byproducts?: Byproduct[]
  // Only shown when there's more than one variant
  variantHeading?: string
  variants: RecipeVariant[]
  // Starting input; swaps default to 'yield' since recipes call for the finished ingredient
  // `yieldValue`/`yieldUnit` override the starting yield input when it's measured differently
  defaults: { mode: 'base' | 'yield'; value: number; unit: AnyUnit; yieldValue?: number; yieldUnit?: AnyUnit }
  // `waitIsOptional` when only some variants wait, e.g. cultured butter
  timing: { active: string; wait?: string; waitNote?: string; waitIsOptional?: boolean }
  steps: (ctx: StepContext) => Step[]
  storage: string
  tips: string[]
  warnings: string[]
}
