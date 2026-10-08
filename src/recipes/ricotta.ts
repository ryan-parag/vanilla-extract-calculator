import { Flask, OrangeSlice } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML, TSP_ML } from '../lib/kitchenUnits'
import { G_PER_ML } from '../lib/densities'
import type { RatioRecipe } from './types'

// Per 4 cups milk: 3 tbsp acid, ½ tsp salt
const PER_MILK = CUP_ML * 4
const salt = { id: 'salt', label: 'Fine salt', mlPerBaseMl: (TSP_ML / 2) / PER_MILK, gPerMl: G_PER_ML.salt }

export const ricotta: RatioRecipe = {
  base: {
    label: 'Whole milk',
    gPerMl: G_PER_ML.milk,
    description: 'Pasteurized, not ultra-pasteurized',
  },
  yieldLabel: 'Ricotta',
  yieldGPerMl: G_PER_ML.ricotta,
  // Depends on fat content and how long it drains
  yieldRange: [0.22, 0.28],
  yieldFrom: 'base',
  byproducts: [{ label: 'Whey', range: [0.7, 0.75], gPerMl: G_PER_ML.whey }],
  variantHeading: 'Acid',
  variants: [
    {
      id: 'lemon',
      label: 'Lemon juice',
      description: 'Soft curds, faint citrus',
      icon: OrangeSlice,
      recommended: true,
      additions: [{ id: 'acid', label: 'Fresh lemon juice', mlPerBaseMl: (TBSP_ML * 3) / PER_MILK, gPerMl: G_PER_ML.lemonJuice }, salt],
    },
    {
      id: 'vinegar',
      label: 'White vinegar',
      description: 'Neutral flavor, firmer curds',
      icon: Flask,
      additions: [{ id: 'acid', label: 'White vinegar', mlPerBaseMl: (TBSP_ML * 3) / PER_MILK, gPerMl: G_PER_ML.vinegar }, salt],
    },
  ],
  defaults: { mode: 'yield', value: 1, unit: 'cup' },
  timing: { active: '20 min', wait: '15–60 min', waitNote: 'resting and draining' },
  steps: ({ base, additions, variant }) => [
    {
      title: 'Heat the milk',
      body: `Warm ${base} of whole milk with ${additions.salt} of salt in a heavy pot over medium heat, stirring often so it doesn't scorch.`,
      temp: '185–190°F / 85–88°C',
    },
    {
      title: 'Add the acid',
      body: `Take it off the heat, pour in ${additions.acid} of ${variant.additions[0].label.toLowerCase()}, and stir gently just two or three times.`,
    },
    {
      title: 'Rest',
      body: 'Leave it undisturbed while curds form and separate from the yellowish whey.',
      duration: '10 min',
    },
    {
      title: 'Drain',
      body: 'Ladle the curds into a sieve lined with damp cheesecloth. Drain briefly for soft, spoonable ricotta, or longer for firm ricotta for lasagna or cannoli.',
      duration: '5–60 min',
    },
  ],
  storage: 'Refrigerate in a covered container and use within 4–5 days.',
  tips: [
    'For richer ricotta, swap 1 cup of the milk for heavy cream.',
    "Ultra-pasteurized milk often won't form curds. Check the label.",
    'Use the whey in bread dough or to cook rice and oats.',
  ],
  warnings: [],
}
