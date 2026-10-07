import { CookingPot } from '@phosphor-icons/react'
import { CUP_ML, TSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

const QUART_ML = CUP_ML * 4

export const dulceDeLeche: RatioRecipe = {
  base: {
    label: 'Whole milk',
    description: 'Whole milk gives the creamiest result',
  },
  yieldLabel: 'Dulce de leche',
  // Cooks down to about a quarter of the milk
  yieldRange: [0.25, 0.3],
  yieldFrom: 'base',
  variants: [
    {
      id: 'stovetop',
      label: 'Stovetop',
      description: 'Milk, sugar, and baking soda',
      icon: CookingPot,
      additions: [
        { id: 'sugar', label: 'Granulated sugar', mlPerBaseMl: (CUP_ML * 1.25) / QUART_ML },
        { id: 'soda', label: 'Baking soda', mlPerBaseMl: (TSP_ML / 4) / QUART_ML },
      ],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '20 min', wait: '1½–2½ hr', waitNote: 'slow simmer' },
  steps: ({ base, additions, yield: makes }) => [
    {
      title: 'Dissolve',
      body: `Combine ${base} of whole milk and ${additions.sugar} of sugar in a large, heavy pot; it will foam up later. Stir over medium heat until the sugar dissolves and the milk is steaming.`,
    },
    {
      title: 'Add baking soda',
      body: `Take the pot off the heat and stir in ${additions.soda} of baking soda. It will foam, then settle.`,
    },
    {
      title: 'Simmer',
      body: 'Return to low heat and simmer gently, uncovered, stirring now and then. Stir more often as it darkens and thickens toward the end.',
      duration: '1½–2½ hr',
    },
    {
      title: 'Finish',
      body: `It's done at a deep caramel color, thick enough to coat a spoon, about ${makes.replace(/^about /, '')}. It thickens more as it cools. Blend briefly if it looks grainy.`,
    },
  ],
  storage: 'Refrigerate in a sealed jar for 2–3 weeks. Warm gently to loosen.',
  tips: [
    'Shortcut: pour sweetened condensed milk into a baking dish, cover with foil, and bake in a water bath at 425°F (220°C) for 1–1½ hours, stirring occasionally.',
    'A wide pot cooks down faster than a tall one.',
  ],
  warnings: [
    "Don't heat unopened cans of condensed milk. They can burst.",
  ],
}
