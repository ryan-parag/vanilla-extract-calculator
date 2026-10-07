import { Bread } from '@phosphor-icons/react'
import { CUP_ML, TSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const selfRisingFlour: RatioRecipe = {
  base: {
    label: 'All-purpose flour',
    description: 'Spooned into the cup and leveled',
  },
  yieldLabel: 'Self-rising flour',
  // Leavening and salt barely change the volume
  yieldRange: [1, 1],
  yieldFrom: 'base',
  variants: [
    {
      id: 'standard',
      label: 'Standard',
      description: 'Baking powder and salt',
      icon: Bread,
      additions: [
        { id: 'leavening', label: 'baking powder', mlPerBaseMl: (TSP_ML * 1.5) / CUP_ML },
        { id: 'salt', label: 'fine salt', mlPerBaseMl: (TSP_ML / 4) / CUP_ML },
      ],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '2 min' },
  steps: ({ base, additions }) => [
    {
      title: 'Measure',
      body: `Spoon ${base} of all-purpose flour into a bowl. Add ${additions.leavening} of baking powder and ${additions.salt} of fine salt.`,
    },
    {
      title: 'Whisk',
      body: 'Whisk thoroughly so the baking powder is evenly distributed; pockets of it taste bitter.',
      duration: '30 sec',
    },
  ],
  storage: 'Best mixed as needed. Stored airtight it keeps a few months, but the baking powder slowly loses strength.',
  tips: [
    "If the recipe already calls for salt and baking powder, it doesn't need self-rising flour. This is for recipes that list it on its own.",
    'Check that your baking powder is fresh: a spoonful in hot water should fizz right away.',
  ],
  warnings: [],
}
