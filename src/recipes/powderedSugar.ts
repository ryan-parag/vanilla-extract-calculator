import { Grains, Spiral } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const powderedSugar: RatioRecipe = {
  base: {
    label: 'Granulated sugar',
    description: 'Plain white sugar',
  },
  yieldLabel: 'Powdered sugar',
  // Ground sugar is fluffier than crystals; depends on how fine it's blended
  yieldRange: [1.5, 1.75],
  yieldFrom: 'base',
  variantHeading: 'Anti-caking starch',
  variants: [
    {
      id: 'cornstarch',
      label: 'Cornstarch',
      description: 'Matches store-bought',
      icon: Grains,
      recommended: true,
      additions: [{ id: 'starch', label: 'cornstarch', mlPerBaseMl: TBSP_ML / CUP_ML }],
    },
    {
      id: 'arrowroot',
      label: 'Arrowroot',
      description: 'Corn-free, no starchy taste',
      icon: Spiral,
      additions: [{ id: 'starch', label: 'arrowroot powder', mlPerBaseMl: TBSP_ML / CUP_ML }],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '5 min' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Load the blender',
      body: `Add ${base} of granulated sugar and ${additions.starch} of ${variant.additions[0].label} to a dry blender or spice grinder.`,
    },
    {
      title: 'Blend',
      body: 'Blend on high until it is a fine, soft powder with no grit when you rub it between your fingers.',
      duration: '1–2 min',
    },
    {
      title: 'Let it settle',
      body: 'Wait a minute before opening the lid so the sugar dust settles, then sift out any remaining crystals.',
    },
  ],
  storage: 'Store airtight at room temperature. Sift before using if it clumps.',
  tips: [
    'A high-speed blender or spice grinder works best. Work in batches of about a cup at most.',
    'For a glaze or frosting, sift after measuring to keep it lump-free.',
  ],
  warnings: [],
}
