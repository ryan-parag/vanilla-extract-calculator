import { CookingPot } from '@phosphor-icons/react'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

export const condensedMilk: RatioRecipe = {
  base: {
    label: 'Whole milk',
    gPerMl: G_PER_ML.milk,
    description: 'Lower-fat milk works but turns out thinner',
  },
  yieldLabel: 'Condensed milk',
  yieldGPerMl: G_PER_ML.condensedMilk,
  // Reduced by roughly 40%
  yieldRange: [0.6, 0.65],
  yieldFrom: 'base',
  variants: [
    {
      id: 'classic',
      label: 'Classic',
      description: 'Milk and sugar',
      icon: CookingPot,
      // ⅔ cup sugar per 2 cups milk
      additions: [{ id: 'sugar', label: 'Granulated sugar', mlPerBaseMl: 1 / 3, gPerMl: G_PER_ML.sugar }],
    },
  ],
  defaults: { mode: 'yield', value: 1.25, unit: 'cup' },
  timing: { active: '10 min', wait: '35–50 min', waitNote: 'gentle simmer' },
  steps: ({ base, additions, yield: makes }) => [
    {
      title: 'Dissolve',
      body: `Combine ${base} of whole milk and ${additions.sugar} of sugar in a wide, heavy saucepan. Stir over medium heat until the sugar dissolves.`,
    },
    {
      title: 'Reduce',
      body: `Bring to a bare simmer, then lower the heat. Simmer gently, stirring every few minutes and scraping the sides, until it has reduced to ${makes} and turned a light cream color. Don't let it boil hard or it can scorch.`,
      duration: '35–50 min',
    },
    {
      title: 'Cool',
      body: 'Take it off the heat and let it cool. It thickens a lot as it cools. Strain it if any skin formed.',
    },
  ],
  storage: 'Refrigerate in a sealed jar for 1–2 weeks.',
  tips: [
    'One 14-oz can is about 1¼ cups.',
    'For a dairy-free version, use full-fat canned coconut milk and a little less sugar.',
    'A wide pan reduces faster than a tall one.',
  ],
  warnings: [],
}
