import type { Icon } from '@phosphor-icons/react'
import { BowlFood, Bread, Cake, Cheese, Cloud, Coffee, CoffeeBean, CookingPot, Cube, Drop, Fire, Jar, Leaf, Lightning, OrangeSlice, Sparkle, Spiral, Square, Sun, Waves } from '@phosphor-icons/react'
import * as palettes from '../lib/palettes'
import type { Palette } from '../lib/palettes'
import type { RatioRecipe } from './types'
import { mascarpone } from './mascarpone'
import { cremeFraiche } from './cremeFraiche'
import { brownSugar } from './brownSugar'
import { powderedSugar } from './powderedSugar'
import { cakeFlour } from './cakeFlour'
import { selfRisingFlour } from './selfRisingFlour'
import { buttermilk } from './buttermilk'
import { bakingPowder } from './bakingPowder'
import { citrusExtract } from './citrusExtract'
import { mintExtract } from './mintExtract'
import { coffeeExtract } from './coffeeExtract'
import { vanillaSugar } from './vanillaSugar'
import { vanillaPaste } from './vanillaPaste'
import { butter } from './butter'
import { brownButter } from './brownButter'
import { ghee } from './ghee'
import { condensedMilk } from './condensedMilk'
import { dulceDeLeche } from './dulceDeLeche'
import { ricotta } from './ricotta'
import { vanillaNotes } from './vanilla'

export const GROUPS = ['Extracts', 'Dairy', 'Butter', 'Sweet', 'Baking'] as const

interface PageBase {
  group: typeof GROUPS[number]
  slug: string
  name: string
  title: string
  tagline: string
  icon: Icon
  accent: Palette
  source?: { label: string; url: string }
  // Set when a ratio or yield hasn't been test-made yet; says what's uncertain
  untested?: string
}

export type Page =
  | (PageBase & { kind: 'vanilla' })
  | (PageBase & { kind: 'ratio'; recipe: RatioRecipe })

export const PAGES: Page[] = [
  {
    kind: 'vanilla',
    group: 'Extracts',
    slug: 'vanilla-extract',
    name: 'Vanilla Extract',
    title: 'Vanilla Extract Calculator',
    tagline: 'Precision recipes for homemade extract',
    icon: CoffeeBean,
    accent: palettes.vanilla,
    source: { label: 'danieltalsky.com/vanilla', url: 'https://danieltalsky.com/vanilla' },
  },
  {
    kind: 'ratio',
    group: 'Extracts',
    slug: 'citrus-extract',
    name: 'Citrus Extract',
    title: 'Citrus Extract Calculator',
    tagline: 'Lemon, orange, or lime zest steeped in vodka',
    icon: OrangeSlice,
    accent: palettes.citrusExtract,
    recipe: citrusExtract,
  },
  {
    kind: 'ratio',
    group: 'Extracts',
    slug: 'mint-extract',
    untested: '30 g of leaves per cup is a starting point. Taste as it steeps.',
    name: 'Mint Extract',
    title: 'Mint Extract Calculator',
    tagline: 'Fresh mint, bottled for baking',
    icon: Leaf,
    accent: palettes.mintExtract,
    recipe: mintExtract,
  },
  {
    kind: 'ratio',
    group: 'Extracts',
    slug: 'coffee-extract',
    untested: '45 g per cup and the steeping time are starting points. Taste weekly.',
    name: 'Coffee Extract',
    title: 'Coffee Extract Calculator',
    tagline: 'Deep coffee flavor without the water',
    icon: Coffee,
    accent: palettes.coffeeExtract,
    recipe: coffeeExtract,
  },
  {
    kind: 'ratio',
    group: 'Sweet',
    slug: 'vanilla-sugar',
    name: 'Vanilla Sugar',
    title: 'Vanilla Sugar Calculator',
    tagline: 'Sugar that tastes like the whole bean',
    icon: Sparkle,
    accent: palettes.vanillaSugar,
    recipe: vanillaSugar,
  },
  {
    kind: 'ratio',
    group: 'Extracts',
    slug: 'vanilla-paste',
    untested: '4 beans per ¼ cup of extract is a starting point.',
    name: 'Vanilla Bean Paste',
    title: 'Vanilla Bean Paste Calculator',
    tagline: 'Extract and seeds in one spoonful',
    icon: Spiral,
    accent: palettes.vanillaPaste,
    recipe: vanillaPaste,
  },
  {
    kind: 'ratio',
    group: 'Dairy',
    slug: 'mascarpone',
    untested: 'The 65–80% yield is an estimate. The cream-to-acid ratio is standard.',
    name: 'Mascarpone',
    title: 'Mascarpone Calculator',
    tagline: 'Rich, spoonable cheese from two ingredients',
    icon: Cheese,
    accent: palettes.mascarpone,
    recipe: mascarpone,
  },
  {
    kind: 'ratio',
    group: 'Dairy',
    slug: 'creme-fraiche',
    name: 'Crème Fraîche',
    title: 'Crème Fraîche Calculator',
    tagline: 'Tangy cultured cream, made on the counter',
    icon: Jar,
    accent: palettes.cremeFraiche,
    recipe: cremeFraiche,
  },
  {
    kind: 'ratio',
    group: 'Sweet',
    slug: 'brown-sugar',
    name: 'Brown Sugar',
    title: 'Brown Sugar Calculator',
    tagline: 'White sugar plus molasses, in any shade',
    icon: Cube,
    accent: palettes.brownSugar,
    recipe: brownSugar,
  },
  {
    kind: 'ratio',
    group: 'Sweet',
    slug: 'powdered-sugar',
    untested: 'The 1½–1¾ cups per cup of sugar depends on your blender and hasn\'t been measured.',
    name: 'Powdered Sugar',
    title: 'Powdered Sugar Calculator',
    tagline: 'Confectioners’ sugar from your blender',
    icon: Cloud,
    accent: palettes.powderedSugar,
    recipe: powderedSugar,
  },
  {
    kind: 'ratio',
    group: 'Baking',
    slug: 'cake-flour',
    name: 'Cake Flour',
    title: 'Cake Flour Calculator',
    tagline: 'A tender crumb from all-purpose flour',
    icon: Cake,
    accent: palettes.cakeFlour,
    recipe: cakeFlour,
  },
  {
    kind: 'ratio',
    group: 'Baking',
    slug: 'self-rising-flour',
    name: 'Self-Rising Flour',
    title: 'Self-Rising Flour Calculator',
    tagline: 'Flour with the leavening built in',
    icon: Bread,
    accent: palettes.selfRisingFlour,
    recipe: selfRisingFlour,
  },
  {
    kind: 'ratio',
    group: 'Dairy',
    slug: 'buttermilk',
    name: 'Buttermilk',
    title: 'Buttermilk Substitute Calculator',
    tagline: 'Soured milk for baking, ready in minutes',
    icon: Drop,
    accent: palettes.buttermilk,
    recipe: buttermilk,
  },
  {
    kind: 'ratio',
    group: 'Baking',
    slug: 'baking-powder',
    name: 'Baking Powder',
    title: 'Baking Powder Calculator',
    tagline: 'Mix your own from cream of tartar and soda',
    icon: Lightning,
    accent: palettes.bakingPowder,
    recipe: bakingPowder,
  },
  {
    kind: 'ratio',
    group: 'Dairy',
    slug: 'ricotta',
    untested: 'The 22–28% yield depends on your milk and how long it drains.',
    name: 'Ricotta',
    title: 'Ricotta Calculator',
    tagline: 'Fresh curds from milk and a little acid',
    icon: BowlFood,
    accent: palettes.ricotta,
    recipe: ricotta,
  },
  {
    kind: 'ratio',
    group: 'Butter',
    slug: 'butter',
    untested: 'Butter and buttermilk yields depend on your cream\'s fat content.',
    name: 'Butter',
    title: 'Butter Calculator',
    tagline: 'Churned from cream, with buttermilk on the side',
    icon: Square,
    accent: palettes.butter,
    recipe: butter,
  },
  {
    kind: 'ratio',
    group: 'Butter',
    slug: 'brown-butter',
    name: 'Brown Butter',
    title: 'Brown Butter Calculator',
    tagline: 'Toasted, nutty, and worth the extra minutes',
    icon: Fire,
    accent: palettes.brownButter,
    recipe: brownButter,
  },
  {
    kind: 'ratio',
    group: 'Butter',
    slug: 'ghee',
    name: 'Ghee',
    title: 'Ghee Calculator',
    tagline: 'Clarified butter for high heat',
    icon: Sun,
    accent: palettes.ghee,
    recipe: ghee,
  },
  {
    kind: 'ratio',
    group: 'Sweet',
    slug: 'condensed-milk',
    name: 'Condensed Milk',
    title: 'Sweetened Condensed Milk Calculator',
    tagline: 'Milk and sugar, simmered down',
    icon: CookingPot,
    accent: palettes.condensedMilk,
    recipe: condensedMilk,
  },
  {
    kind: 'ratio',
    group: 'Sweet',
    slug: 'dulce-de-leche',
    untested: 'The 25–30% yield depends on how far you cook it down.',
    name: 'Dulce de Leche',
    title: 'Dulce de Leche Calculator',
    tagline: 'Slow-cooked milk caramel',
    icon: Waves,
    accent: palettes.dulceDeLeche,
    recipe: dulceDeLeche,
  },
]

export function findPage(slug: string): Page | undefined {
  return PAGES.find(p => p.slug === slug)
}

// Words the home page search matches against, beyond the name
export function searchText(page: Page): string {
  const extra = page.kind === 'ratio'
    ? [page.recipe.base.label, page.recipe.yieldLabel, ...page.recipe.variants.flatMap(v => [v.label, ...v.additions.map(a => a.label)])]
    : ['vanilla beans', 'vodka', 'alcohol', 'bourbon']
  return [page.name, page.tagline, page.group, ...extra].join(' ').toLowerCase()
}

// Rough time to make, for the home page cards
export function timeHint(page: Page): string {
  const timing = page.kind === 'ratio' ? page.recipe.timing : vanillaNotes.timing
  if (timing.wait && 'waitIsOptional' in timing && timing.waitIsOptional) return timing.active
  return timing.wait ?? timing.active
}
