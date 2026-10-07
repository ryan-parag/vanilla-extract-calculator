import { Flask, OrangeSlice } from '@phosphor-icons/react'
import { CUP_ML, TBSP_ML, TSP_ML } from '../lib/kitchenUnits'
import type { RatioRecipe } from './types'

export const mascarpone: RatioRecipe = {
  base: {
    label: 'Heavy cream',
    description: '36%+ fat, pasteurized (not ultra-pasteurized)',
  },
  yieldLabel: 'Mascarpone',
  // Whey drains off overnight; varies with fat content and straining time
  yieldRange: [0.65, 0.8],
  variantHeading: 'Acid',
  variants: [
    {
      id: 'lemon',
      label: 'Lemon juice',
      description: 'Easy to find, faint citrus note',
      icon: OrangeSlice,
      recommended: true,
      additions: [{ id: 'acid', label: 'fresh lemon juice', mlPerBaseMl: (TBSP_ML / 2) / CUP_ML }],
    },
    {
      id: 'tartaric',
      label: 'Tartaric acid',
      description: 'Traditional, cleanest flavor',
      icon: Flask,
      additions: [{ id: 'acid', label: 'tartaric acid powder', mlPerBaseMl: (TSP_ML / 16) / CUP_ML }],
    },
  ],
  defaults: { mode: 'base', value: 2, unit: 'cup' },
  timing: { active: '30 min', wait: '12–24 hr', waitNote: 'straining in the fridge' },
  steps: ({ variant, base, additions }) => [
    {
      title: 'Heat the cream',
      body: `Pour ${base} of heavy cream into a heavy saucepan (or a bowl set over simmering water). Warm over medium-low, stirring often.`,
      temp: '185–190°F / 85–88°C',
    },
    {
      title: 'Add the acid',
      body: variant.id === 'tartaric'
        ? `Dissolve ${additions.acid} of tartaric acid in a teaspoon of water, then stir it in. Hold at temperature, stirring gently, until the cream thickens enough to coat a spoon. It won't form curds like ricotta.`
        : `Stir in ${additions.acid} of fresh lemon juice. Hold at temperature, stirring gently, until the cream thickens enough to coat a spoon. It won't form curds like ricotta.`,
      duration: '5–10 min',
    },
    {
      title: 'Cool',
      body: 'Take the pan off the heat and let it cool at room temperature.',
      duration: '20–30 min',
    },
    {
      title: 'Strain',
      body: 'Line a fine sieve with 2–4 layers of cheesecloth or a coffee filter and set it over a bowl. Pour in the cream, cover, and refrigerate.',
      duration: '12–24 hr',
    },
    {
      title: 'Finish',
      body: 'Scrape the mascarpone into a container and stir until smooth. The drained whey can replace milk or water in baking.',
    },
  ],
  storage: 'Refrigerate in a covered container and use within 5–7 days.',
  tips: [
    'Ultra-pasteurized cream often stays loose. Look for plain "pasteurized" on the label.',
    "A thermometer makes this reliable: too cool and it won't thicken, much hotter and it can turn grainy.",
    "If it hasn't thickened after 10 minutes at temperature, add a little more acid.",
    'Strain longer for a firm, tiramisu-ready texture; shorter for a soft, spreadable one.',
  ],
  warnings: [],
}
