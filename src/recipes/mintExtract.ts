import { Leaf, Plant } from '@phosphor-icons/react'
import { CUP_ML } from '../lib/kitchenUnits'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

export const mintExtract: RatioRecipe = {
  base: {
    label: 'Vodka',
    gPerMl: G_PER_ML.vodka,
    description: '80 proof (40% ABV) or stronger',
  },
  yieldLabel: 'Mint extract',
  yieldGPerMl: G_PER_ML.vodka,
  // Leaves soak up some alcohol when strained
  yieldRange: [0.85, 0.95],
  yieldFrom: 'base',
  variantHeading: 'Mint',
  variants: [
    {
      id: 'peppermint',
      label: 'Peppermint',
      description: 'Cool and sharp, like candy canes',
      icon: Leaf,
      recommended: true,
      additions: [{ id: 'leaves', label: 'Fresh peppermint leaves', gramsPerBaseMl: 30 / CUP_ML }],
    },
    {
      id: 'spearmint',
      label: 'Spearmint',
      description: 'Softer and sweeter',
      icon: Plant,
      additions: [{ id: 'leaves', label: 'Fresh spearmint leaves', gramsPerBaseMl: 30 / CUP_ML }],
    },
  ],
  defaults: { mode: 'base', value: 1, unit: 'cup' },
  timing: { active: '10 min', wait: '3–6 wk', waitNote: 'steeping in the dark' },
  steps: ({ base, additions }) => [
    {
      title: 'Prep the leaves',
      body: `Rinse ${additions.leaves} of mint leaves, dry them completely, and strip them from the stems. Tear or lightly bruise them to release the oils.`,
    },
    {
      title: 'Combine',
      body: `Pack the leaves into a clean glass jar and pour in ${base} of vodka. Push the leaves down so they're fully covered, then seal.`,
    },
    {
      title: 'Steep',
      body: 'Store somewhere cool and dark, shaking every few days. Start tasting at three weeks. The leaves will darken; that is normal.',
      duration: '3–6 weeks',
    },
    {
      title: 'Strain',
      body: 'Strain through a fine sieve or coffee filter into a clean bottle, pressing the leaves to get all the liquid out.',
    },
  ],
  storage: 'Keeps in a cool, dark cupboard for about a year.',
  tips: [
    'Dry the leaves thoroughly; leftover water dilutes the extract.',
    'For a stronger extract, strain after two weeks and add a fresh batch of leaves for two more.',
    'Expect a greenish-brown color, not the clear look of store-bought, which is usually made from mint oil.',
  ],
  warnings: [],
}
