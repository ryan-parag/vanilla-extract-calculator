import { Coffee, CoffeeBean } from '@phosphor-icons/react'
import { CUP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const coffeeExtract: RatioRecipe = {
  base: {
    label: 'Vodka',
    description: '80 proof (40% ABV) or stronger',
  },
  yieldLabel: 'Coffee extract',
  // Grounds hold on to a fair bit of liquid
  yieldRange: [0.75, 0.85],
  yieldFrom: 'base',
  variantHeading: 'Grind',
  variants: [
    {
      id: 'coarse',
      label: 'Coarse ground',
      description: 'Faster, like French press',
      icon: Coffee,
      recommended: true,
      additions: [{ id: 'coffee', label: 'Coarse-ground coffee', gramsPerBaseMl: 45 / CUP_ML }],
    },
    {
      id: 'cracked',
      label: 'Cracked beans',
      description: 'Slower, clearer, easy to strain',
      icon: CoffeeBean,
      additions: [{ id: 'coffee', label: 'Cracked coffee beans', gramsPerBaseMl: 45 / CUP_ML }],
    },
  ],
  defaults: { mode: 'base', value: 1, unit: 'cup' },
  timing: { active: '10 min', wait: '2–3 wk', waitNote: 'steeping in the dark' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Prep the coffee',
      body: variant.id === 'cracked'
        ? `Crack ${additions.coffee} of whole beans by pulsing briefly in a grinder or crushing under a heavy pan.`
        : `Grind ${additions.coffee} of beans coarsely, about as coarse as for a French press.`,
    },
    {
      title: 'Combine',
      body: `Put the coffee in a clean glass jar, pour in ${base} of vodka, and seal.`,
    },
    {
      title: 'Steep',
      body: 'Store somewhere cool and dark, shaking every few days. Taste weekly and strain when it is strong but not bitter.',
      duration: variant.id === 'cracked' ? '3 weeks' : '2 weeks',
    },
    {
      title: 'Strain',
      body: 'Strain through a fine sieve, then again through a coffee filter, into a clean bottle.',
    },
  ],
  storage: 'Keeps in a cool, dark cupboard for about a year.',
  tips: [
    'Medium or dark roasts give the deepest flavor. Decaf works just as well.',
    'Fine grinds over-extract and cloud the extract, so keep it coarse.',
    'Use it in place of espresso powder in brownies and chocolate cakes, about 1 tsp per batch.',
  ],
  warnings: [],
}
