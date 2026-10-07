import { Coffee, Drop } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const brownSugar: RatioRecipe = {
  base: {
    label: 'Granulated sugar',
    description: 'Plain white sugar',
  },
  yieldLabel: 'Brown sugar',
  // Molasses coats the crystals rather than adding volume
  yieldRange: [1, 1],
  yieldFrom: 'base',
  variantHeading: 'Shade',
  variants: [
    {
      id: 'light',
      label: 'Light brown',
      description: 'Most recipes mean this one',
      icon: Drop,
      recommended: true,
      additions: [{ id: 'molasses', label: 'molasses', mlPerBaseMl: TBSP_ML / CUP_ML }],
    },
    {
      id: 'dark',
      label: 'Dark brown',
      description: 'Deeper, more caramel flavor',
      icon: Coffee,
      additions: [{ id: 'molasses', label: 'molasses', mlPerBaseMl: (TBSP_ML * 2) / CUP_ML }],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '5 min' },
  steps: ({ base, additions }) => [
    {
      title: 'Combine',
      body: `Put ${base} of granulated sugar in a bowl and drizzle ${additions.molasses} of molasses over it.`,
    },
    {
      title: 'Work it in',
      body: 'Mash and stir with a fork, or run a stand mixer on low, until the color is even with no dark streaks.',
      duration: '2–3 min',
    },
  ],
  storage: 'Store airtight at room temperature. If it hardens, seal it in with a slice of bread overnight.',
  tips: [
    'Unsulphured molasses gives the cleanest flavor. Skip blackstrap; it is bitter.',
    'Oil the measuring spoon first and the molasses slides right out.',
    'Pack it into the cup when measuring, just like store-bought.',
  ],
  warnings: [],
}
