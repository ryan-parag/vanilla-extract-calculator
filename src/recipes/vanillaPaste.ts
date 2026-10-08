import { Drop, Flask } from '@phosphor-icons/react'
import { CUP_ML } from '../lib/kitchenUnits'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

// ½ cup paste = ¼ cup extract + ¼ cup syrup + seeds of 4 beans, so 1 tbsp ≈ 1 bean
export const vanillaPaste: RatioRecipe = {
  base: {
    label: 'Vanilla extract',
    gPerMl: G_PER_ML.vanillaExtract,
    description: 'Homemade is perfect',
  },
  yieldLabel: 'Vanilla bean paste',
  yieldGPerMl: G_PER_ML.vanillaPaste,
  yieldRange: [1, 1],
  variantHeading: 'Binder',
  variants: [
    {
      id: 'corn-syrup',
      label: 'Light corn syrup',
      description: 'Neutral and glossy',
      icon: Drop,
      recommended: true,
      additions: [
        { id: 'syrup', label: 'Light corn syrup', mlPerBaseMl: 1, gPerMl: G_PER_ML.cornSyrup },
        { id: 'beans', label: 'Vanilla beans', countPerBaseMl: 4 / (CUP_ML / 4), noun: ['vanilla bean', 'vanilla beans'], round: 'half' },
      ],
    },
    {
      id: 'glycerin',
      label: 'Glycerin',
      description: 'Food-grade, less sweet',
      icon: Flask,
      additions: [
        { id: 'syrup', label: 'Food-grade glycerin', mlPerBaseMl: 1, gPerMl: G_PER_ML.glycerin },
        { id: 'beans', label: 'Vanilla beans', countPerBaseMl: 4 / (CUP_ML / 4), noun: ['vanilla bean', 'vanilla beans'], round: 'half' },
      ],
    },
  ],
  defaults: { mode: 'yield', value: 0.5, unit: 'cup' },
  timing: { active: '15 min', wait: '1 day', waitNote: 'resting to thicken' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Scrape',
      body: `Split ${additions.beans} lengthwise and scrape the seeds into a small bowl.`,
    },
    {
      title: 'Mix',
      body: `Stir in ${additions.syrup} of ${variant.additions[0].label.toLowerCase()} and ${base} of vanilla extract until the seeds are evenly spread.`,
    },
    {
      title: 'Rest',
      body: 'Seal in a small jar and let it sit overnight so the flavor blooms and it thickens slightly.',
      duration: '1 day',
    },
  ],
  storage: 'Keeps for months in a sealed jar in a cool, dark place. Stir before using.',
  tips: [
    'Use it 1:1 in place of vanilla extract, or 1 tbsp in place of one vanilla bean.',
    "Don't throw away the scraped pods: put them in vanilla sugar or back into your extract bottle.",
    'For a thicker paste, use a little less extract.',
  ],
  warnings: [],
}
