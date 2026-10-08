import { Drop, Jar } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML } from '../lib/kitchenUnits'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

export const butter: RatioRecipe = {
  base: {
    label: 'Heavy cream',
    gPerMl: G_PER_ML.cream,
    description: '36%+ fat; more fat means more butter',
  },
  yieldLabel: 'Butter',
  yieldMeasure: 'butter',
  // Grams of butter per ml of cream
  yieldRange: [0.36, 0.42],
  yieldFrom: 'base',
  byproducts: [{ label: 'Buttermilk', range: [0.45, 0.55], gPerMl: G_PER_ML.buttermilk }],
  variantHeading: 'Style',
  variants: [
    {
      id: 'sweet',
      label: 'Sweet cream',
      description: 'Fresh and mild, ready in minutes',
      icon: Drop,
      recommended: true,
      additions: [],
    },
    {
      id: 'cultured',
      label: 'Cultured',
      description: 'Tangy, European-style',
      icon: Jar,
      additions: [{ id: 'culture', label: 'Cultured buttermilk', mlPerBaseMl: TBSP_ML / CUP_ML, gPerMl: G_PER_ML.buttermilk }],
    },
  ],
  defaults: { mode: 'base', value: 2, unit: 'cup', yieldValue: 1, yieldUnit: 'stick' },
  timing: { active: '20 min', wait: '12–24 hr', waitNote: 'culturing, cultured only', waitIsOptional: true },
  steps: ({ base, additions, variant }) => [
    ...(variant.id === 'cultured'
      ? [{
          title: 'Culture the cream',
          body: `Stir ${additions.culture} of cultured buttermilk into ${base} of heavy cream. Cover loosely and leave at room temperature until slightly thick and tangy, then chill for at least an hour.`,
          temp: '70–78°F / 21–26°C',
          duration: '12–24 hr',
        }]
      : []),
    {
      title: 'Whip',
      body: `${variant.id === 'cultured' ? 'Pour the cream' : `Pour ${base} of heavy cream`} into a stand mixer bowl, no more than half full. Whip on medium-high past whipped cream until it turns grainy, then suddenly splits into yellow clumps and liquid. Drape a towel over the mixer for the splashy part.`,
      temp: 'cool, about 55–60°F / 13–16°C',
      duration: '5–10 min',
    },
    {
      title: 'Drain',
      body: 'Pour through a fine sieve set over a bowl. Save the liquid: that is your buttermilk.',
    },
    {
      title: 'Wash',
      body: 'Knead the butter in a bowl of ice water, pressing and folding, changing the water until it stays clear. Leftover buttermilk is what makes butter spoil.',
      duration: '3–5 min',
    },
    {
      title: 'Shape',
      body: 'Press out as much water as you can, knead in salt if you like, then wrap and chill.',
    },
  ],
  storage: 'Wrapped and refrigerated, up to 2 weeks if washed well. Freezes for months.',
  tips: [
    'For salted butter, knead in about ¼ tsp of fine salt per stick.',
    'Cream straight from the fridge is too cold to churn quickly. Let it sit out for 15 minutes first.',
    'The buttermilk from sweet cream is thin and mild, not tangy like store-bought. Use it in pancakes or bread.',
  ],
  warnings: [],
}
