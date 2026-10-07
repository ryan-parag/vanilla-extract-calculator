import { CoffeeBean, Recycle, Sparkle } from '@phosphor-icons/react'
import { CUP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

const bean: ['vanilla bean', 'vanilla beans'] = ['vanilla bean', 'vanilla beans']

export const vanillaSugar: RatioRecipe = {
  base: {
    label: 'Granulated sugar',
    description: 'Plain white sugar, or raw sugar for a crunchier topping',
  },
  yieldLabel: 'Vanilla sugar',
  yieldRange: [1, 1],
  yieldFrom: 'base',
  variantHeading: 'Vanilla',
  variants: [
    {
      id: 'whole',
      label: 'Whole beans',
      description: 'Steeped, subtle and fragrant',
      icon: CoffeeBean,
      recommended: true,
      additions: [{ id: 'vanilla', label: 'Vanilla beans', countPerBaseMl: 1 / (CUP_ML * 2), noun: bean, round: 'half' }],
    },
    {
      id: 'spent',
      label: 'Spent pods',
      description: 'Reuse pods from extract',
      icon: Recycle,
      additions: [{ id: 'vanilla', label: 'Spent vanilla pods', countPerBaseMl: 3 / (CUP_ML * 2), noun: ['pod', 'pods'], round: 'whole' }],
    },
    {
      id: 'seeds',
      label: 'Scraped seeds',
      description: 'Ready today, speckled',
      icon: Sparkle,
      additions: [{ id: 'vanilla', label: 'Vanilla beans, scraped', countPerBaseMl: 1 / CUP_ML, noun: bean, round: 'half' }],
    },
  ],
  defaults: { mode: 'yield', value: 2, unit: 'cup' },
  timing: { active: '5 min', wait: '1–2 wk', waitNote: 'sealed, for the steeped kinds' },
  steps: ({ base, additions, variant }) => {
    if (variant.id === 'seeds') {
      return [
        {
          title: 'Scrape',
          body: `Split ${additions.vanilla} lengthwise and scrape out the seeds.`,
        },
        {
          title: 'Blend',
          body: `Pulse the seeds with ${base} of sugar in a food processor, or rub them in with your fingertips, until evenly speckled.`,
          duration: '1 min',
        },
        {
          title: 'Use or store',
          body: 'It is ready now. Tuck the scraped pods into the jar for extra flavor over time.',
        },
      ]
    }
    return [
      {
        title: 'Prep the vanilla',
        body: variant.id === 'spent'
          ? `Let ${additions.vanilla} from a finished batch of extract dry on a plate overnight, then cut them into pieces.`
          : `Split ${additions.vanilla} lengthwise and cut into a few pieces.`,
      },
      {
        title: 'Combine',
        body: `Bury the vanilla in ${base} of sugar in an airtight jar and seal.`,
      },
      {
        title: 'Steep',
        body: 'Leave it at room temperature, shaking every few days, until the sugar smells strongly of vanilla.',
        duration: '1–2 weeks',
      },
    ]
  },
  storage: 'Keeps indefinitely in an airtight jar. Top it up with fresh sugar as you use it; the vanilla keeps working for months.',
  tips: [
    'Spent pods from your vanilla extract are perfect here. Dry them first so the sugar does not clump.',
    'Sprinkle on muffins and shortbread before baking, or use in place of plain sugar in whipped cream.',
  ],
  warnings: [],
}
