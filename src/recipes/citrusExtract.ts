import { Orange, OrangeSlice, Plant } from '@phosphor-icons/react'
import { CUP_ML } from '../lib/kitchenUnits'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

export const citrusExtract: RatioRecipe = {
  base: {
    label: 'Vodka',
    gPerMl: G_PER_ML.vodka,
    description: '80 proof (40% ABV) or stronger',
  },
  yieldLabel: 'Citrus extract',
  yieldGPerMl: G_PER_ML.vodka,
  // The zest soaks up some alcohol when strained
  yieldRange: [0.85, 0.95],
  yieldFrom: 'base',
  variantHeading: 'Fruit',
  variants: [
    {
      id: 'lemon',
      label: 'Lemon',
      description: 'Bright and classic',
      icon: OrangeSlice,
      recommended: true,
      additions: [{ id: 'zest', label: 'Lemon zest', countPerBaseMl: 4 / CUP_ML, noun: ['lemon', 'lemons'], round: 'whole', gramsEach: 6 }],
    },
    {
      id: 'orange',
      label: 'Orange',
      description: 'Sweeter, rounder',
      icon: Orange,
      additions: [{ id: 'zest', label: 'Orange zest', countPerBaseMl: 3 / CUP_ML, noun: ['orange', 'oranges'], round: 'whole', gramsEach: 10 }],
    },
    {
      id: 'lime',
      label: 'Lime',
      description: 'Sharp and floral',
      icon: Plant,
      additions: [{ id: 'zest', label: 'Lime zest', countPerBaseMl: 6 / CUP_ML, noun: ['lime', 'limes'], round: 'whole', gramsEach: 3 }],
    },
  ],
  defaults: { mode: 'base', value: 1, unit: 'cup' },
  timing: { active: '15 min', wait: '4–6 wk', waitNote: 'steeping in the dark' },
  steps: ({ base, additions }) => [
    {
      title: 'Zest',
      body: `Wash and dry the fruit, then zest ${additions.zest} with a microplane or peeler. Take only the colored peel; the white pith is bitter.`,
    },
    {
      title: 'Combine',
      body: `Put the zest in a clean glass jar, pour in ${base} of vodka, and seal.`,
    },
    {
      title: 'Steep',
      body: 'Store somewhere cool and dark, shaking every few days. It is ready when the peel looks pale and the extract smells strongly of citrus.',
      duration: '4–6 weeks',
    },
    {
      title: 'Strain',
      body: 'Strain through a fine sieve or coffee filter into a clean bottle.',
    },
  ],
  storage: 'Keeps in a cool, dark cupboard for about a year. Citrus fades faster than vanilla, so smaller batches are better.',
  tips: [
    'Use unwaxed or organic fruit, or scrub waxed fruit well under hot water.',
    'Strips from a vegetable peeler are easier to strain than fine zest, but take longer to steep.',
    'Zested fruit keeps a few days in the fridge wrapped tightly, so juice it soon.',
  ],
  warnings: [],
}
