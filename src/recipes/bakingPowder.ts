import { Jar, Lightning } from '@phosphor-icons/react'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

// 1 tsp baking powder = ½ tsp cream of tartar + ¼ tsp baking soda (+ ¼ tsp cornstarch)
export const bakingPowder: RatioRecipe = {
  base: {
    label: 'Cream of tartar',
    gPerMl: G_PER_ML.creamOfTartar,
    description: 'The acid half of the mix',
  },
  yieldLabel: 'Baking powder',
  yieldGPerMl: G_PER_ML.bakingPowder,
  // Leavening power, not volume: cornstarch adds bulk but no lift
  yieldRange: [2, 2],
  yieldFrom: 'base',
  yieldLineLabel: 'Replaces',
  variantHeading: 'Mix',
  variants: [
    {
      id: 'storable',
      label: 'To store',
      description: 'Cornstarch keeps it dry',
      icon: Jar,
      recommended: true,
      additions: [
        { id: 'soda', label: 'baking soda', mlPerBaseMl: 0.5, gPerMl: G_PER_ML.bakingSoda },
        { id: 'starch', label: 'cornstarch', mlPerBaseMl: 0.5, gPerMl: G_PER_ML.cornstarch },
      ],
    },
    {
      id: 'immediate',
      label: 'Use right away',
      description: 'No cornstarch, mix and bake',
      icon: Lightning,
      additions: [{ id: 'soda', label: 'baking soda', mlPerBaseMl: 0.5, gPerMl: G_PER_ML.bakingSoda }],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'tsp' },
  timing: { active: '2 min' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Measure',
      body: variant.id === 'storable'
        ? `Combine ${base} of cream of tartar, ${additions.soda} of baking soda, and ${additions.starch} of cornstarch.`
        : `Combine ${base} of cream of tartar and ${additions.soda} of baking soda.`,
    },
    {
      title: 'Whisk or sift',
      body: 'Mix thoroughly so there are no lumps of baking soda, which taste soapy in the finished bake.',
    },
    {
      title: 'Use it',
      body: variant.id === 'storable'
        ? 'Use it in place of the same amount of store-bought baking powder.'
        : 'Use it all, right away, in place of the baking powder your recipe calls for.',
    },
  ],
  storage: 'With cornstarch, store airtight for up to a few months. Without, mix only what you need.',
  tips: [
    'Homemade baking powder is single-acting: it starts working as soon as it gets wet. Get batters into the oven right away.',
    'Check that your baking soda is fresh: a pinch in vinegar should fizz hard.',
  ],
  warnings: [],
}
