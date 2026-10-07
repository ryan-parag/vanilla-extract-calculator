import { Grains, Spiral } from '@phosphor-icons/react'
import { TBSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

// 1 cup cake flour = 14 tbsp all-purpose + 2 tbsp starch
const STARCH_PER_FLOUR = (TBSP_ML * 2) / (TBSP_ML * 14)

export const cakeFlour: RatioRecipe = {
  base: {
    label: 'All-purpose flour',
    description: 'Spooned into the cup and leveled',
  },
  yieldLabel: 'Cake flour',
  yieldRange: [1, 1],
  variantHeading: 'Starch',
  variants: [
    {
      id: 'cornstarch',
      label: 'Cornstarch',
      description: 'The classic swap',
      icon: Grains,
      recommended: true,
      additions: [{ id: 'starch', label: 'cornstarch', mlPerBaseMl: STARCH_PER_FLOUR }],
    },
    {
      id: 'arrowroot',
      label: 'Arrowroot',
      description: 'Works the same, corn-free',
      icon: Spiral,
      additions: [{ id: 'starch', label: 'arrowroot powder', mlPerBaseMl: STARCH_PER_FLOUR }],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '5 min' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Measure',
      body: `Spoon ${base} of all-purpose flour into your measuring cups and level it off. Add ${additions.starch} of ${variant.additions[0].label}.`,
    },
    {
      title: 'Sift together',
      body: 'Sift the two together 3–5 times, or whisk hard, so the starch is spread evenly.',
    },
  ],
  storage: 'Mix as needed, or store airtight with your other flour.',
  tips: [
    'Sifting matters more than usual here: it blends the starch and aerates the flour, both of which make a lighter crumb.',
    'Bleached cake flour behaves a little differently, so very delicate cakes like chiffon may be slightly less tender.',
  ],
  warnings: [],
}
