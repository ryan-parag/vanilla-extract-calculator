import { Flask, OrangeSlice } from '@phosphor-icons/react'
import { TBSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

// 1 cup buttermilk = 1 tbsp acid topped up with milk to 1 cup (15 tbsp)
const ACID_PER_MILK = TBSP_ML / (TBSP_ML * 15)

export const buttermilk: RatioRecipe = {
  base: {
    label: 'Milk',
    description: 'Whole milk thickens best',
  },
  yieldLabel: 'Buttermilk',
  yieldRange: [1, 1],
  variantHeading: 'Acid',
  variants: [
    {
      id: 'lemon',
      label: 'Lemon juice',
      description: 'Fresh, slightly fruity',
      icon: OrangeSlice,
      recommended: true,
      additions: [{ id: 'acid', label: 'lemon juice', mlPerBaseMl: ACID_PER_MILK }],
    },
    {
      id: 'vinegar',
      label: 'White vinegar',
      description: 'Neutral, always in the pantry',
      icon: Flask,
      additions: [{ id: 'acid', label: 'white vinegar', mlPerBaseMl: ACID_PER_MILK }],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '1 min', wait: '5–10 min', waitNote: 'standing to thicken' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Add the acid',
      body: `Pour ${additions.acid} of ${variant.additions[0].label} into a liquid measuring cup.`,
    },
    {
      title: 'Top up with milk',
      body: `Add ${base} of milk and stir once.`,
    },
    {
      title: 'Let it stand',
      body: "Leave it at room temperature until it's slightly thickened and a little curdled at the edges. Stir before using.",
      duration: '5–10 min',
    },
  ],
  storage: 'Use it right away. It works like buttermilk in baking but does not keep like the real thing.',
  tips: [
    "It reacts with baking soda just like buttermilk, so it's a drop-in swap for pancakes, biscuits, and cakes.",
    "It won't be as thick as cultured buttermilk. For dressings, thin plain yogurt with milk instead.",
  ],
  warnings: [
    "This has no live cultures, so it can't be used to start crème fraîche.",
  ],
}
