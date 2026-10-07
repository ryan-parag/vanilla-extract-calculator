import { Fire } from '@phosphor-icons/react'
import type { RatioRecipe } from './types'

export const brownButter: RatioRecipe = {
  base: {
    label: 'Butter',
    description: 'Unsalted, so you control the salt',
    measure: 'butter',
  },
  yieldLabel: 'Brown butter',
  yieldMeasure: 'butter',
  // Butter is ~16–18% water, which cooks off; the toasted milk solids stay
  yieldRange: [0.8, 0.85],
  variants: [
    {
      id: 'standard',
      label: 'Brown butter',
      description: 'Nutty, toasty butter',
      icon: Fire,
      additions: [],
    },
  ],
  defaults: { mode: 'base', value: 1, unit: 'stick' },
  timing: { active: '10 min' },
  steps: ({ base }) => [
    {
      title: 'Melt',
      body: `Cut ${base} of butter into even pieces and melt in a light-colored pan over medium heat, so you can see the color change.`,
    },
    {
      title: 'Foam',
      body: 'It will foam and sputter as the water cooks off. Keep swirling or stirring, scraping the bottom of the pan.',
      duration: '5–8 min',
    },
    {
      title: 'Brown',
      body: 'When the sputtering quiets and the specks on the bottom turn golden-brown and smell nutty, pour it straight into a heatproof bowl, browned bits and all. It goes from brown to burnt fast.',
      duration: '1–2 min',
    },
  ],
  storage: 'Refrigerate airtight for up to 2 weeks. It sets solid; warm it gently or use it chilled where a recipe calls for softened butter.',
  tips: [
    'Browning cooks off about 1 tbsp of water per stick. Some cookie recipes add it back as milk or water.',
    'Stir in 1 tbsp of nonfat milk powder per stick before browning for extra toasty bits.',
    'For recipes that need softened brown butter, chill it until it is just firm.',
  ],
  warnings: [],
}
