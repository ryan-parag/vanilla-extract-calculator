import { BowlFood, Drop, Jar } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const cremeFraiche: RatioRecipe = {
  base: {
    label: 'Heavy cream',
    description: '36%+ fat, any pasteurization',
  },
  yieldLabel: 'Crème fraîche',
  yieldRange: [1, 1],
  variantHeading: 'Culture',
  variants: [
    {
      id: 'buttermilk',
      label: 'Buttermilk',
      description: 'Classic, mild tang',
      icon: Drop,
      recommended: true,
      additions: [{ id: 'culture', label: 'cultured buttermilk', mlPerBaseMl: TBSP_ML / CUP_ML }],
    },
    {
      id: 'sour-cream',
      label: 'Sour cream',
      description: 'Thicker, a little richer',
      icon: BowlFood,
      additions: [{ id: 'culture', label: 'sour cream', mlPerBaseMl: (TBSP_ML * 2) / CUP_ML }],
    },
    {
      id: 'yogurt',
      label: 'Plain yogurt',
      description: 'Tangier, more sour finish',
      icon: Jar,
      additions: [{ id: 'culture', label: 'plain yogurt', mlPerBaseMl: TBSP_ML / CUP_ML }],
    },
  ],
  defaults: { mode: 'base', value: 1, unit: 'cup' },
  timing: { active: '5 min', wait: '12–24 hr', waitNote: 'at room temperature, then chill' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Take the chill off',
      body: `Pour ${base} of heavy cream into a clean glass jar. Let it sit out, or warm it gently, until it's just barely warm.`,
      temp: 'no higher than 85°F / 29°C',
    },
    {
      title: 'Add the culture',
      body: `Stir in ${additions.culture} of ${variant.additions[0].label} until fully combined.`,
    },
    {
      title: 'Culture',
      body: "Cover with a cloth or a loosely set lid and leave somewhere warm until it's thick like loose yogurt. The longer it sits, the tangier it gets.",
      temp: '70–78°F / 21–26°C',
      duration: '12–24 hr',
    },
    {
      title: 'Chill',
      body: 'Stir, seal, and refrigerate. It thickens further as it chills.',
      duration: '8+ hr',
    },
  ],
  storage: 'Refrigerate, covered, up to about 10 days. Save a spoonful to culture your next batch.',
  tips: [
    'Ultra-pasteurized cream works but can take longer to thicken.',
    'A cooler kitchen just means a slower culture. Give it more time before giving up.',
  ],
  warnings: [
    'Use buttermilk, sour cream, or yogurt labeled "live and active cultures."',
    'Throw it out if you see pink, orange, or fuzzy mold, or if it smells unpleasant rather than pleasantly sour.',
  ],
}
