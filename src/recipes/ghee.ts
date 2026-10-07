import { Drop, Fire } from '@phosphor-icons/react'
import type { RatioRecipe } from './types'

export const ghee: RatioRecipe = {
  base: {
    label: 'Unsalted butter',
    description: 'Salt concentrates as the butter cooks down',
    measure: 'butter',
  },
  yieldLabel: 'Ghee',
  yieldMeasure: 'butter',
  // Water cooks off and milk solids are strained out
  yieldRange: [0.75, 0.8],
  variantHeading: 'Style',
  variants: [
    {
      id: 'ghee',
      label: 'Ghee',
      description: 'Cooked longer, nutty and golden',
      icon: Fire,
      recommended: true,
      additions: [],
    },
    {
      id: 'clarified',
      label: 'Clarified butter',
      description: 'Pulled early, clean butter flavor',
      icon: Drop,
      additions: [],
    },
  ],
  defaults: { mode: 'base', value: 2, unit: 'stick' },
  timing: { active: '20–30 min' },
  steps: ({ base, variant }) => [
    {
      title: 'Melt',
      body: `Melt ${base} of unsalted butter in a heavy saucepan over medium-low heat.`,
    },
    {
      title: 'Simmer',
      body: variant.id === 'ghee'
        ? 'Let it simmer gently, skimming off the foam. Keep going after the bubbling slows, until the solids on the bottom turn golden-brown and the fat is clear and golden.'
        : 'Let it simmer gently, skimming off the foam. Stop once the bubbling slows and the milk solids have sunk to the bottom, while they are still pale.',
      duration: variant.id === 'ghee' ? '15–25 min' : '8–12 min',
    },
    {
      title: 'Strain',
      body: 'Pour through a sieve lined with cheesecloth or a coffee filter into a clean, completely dry jar, leaving the solids behind.',
    },
  ],
  storage: 'Strained well, it keeps about 3 months at room temperature in a sealed jar, or longer in the fridge. Always use a dry spoon.',
  tips: [
    'With the milk solids gone, it can take high heat without burning, so it is great for searing and frying.',
    'Save the browned solids from ghee: they are delicious stirred into rice or spread on toast.',
  ],
  warnings: [],
}
