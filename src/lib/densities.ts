import { CUP_ML, TSP_ML } from './kitchenUnits'

// Approximate grams per ml, for showing volume ingredients by weight.
// Dry goods are spooned and leveled, not packed or sifted; real weights vary with how you scoop.
const perCup = (g: number) => g / CUP_ML
const perTsp = (g: number) => g / TSP_ML

export const G_PER_ML = {
  flour: perCup(120),
  sugar: perCup(200),
  brownSugar: perCup(213),
  powderedSugar: perCup(113),
  cornstarch: perCup(120),
  arrowroot: perCup(128),
  molasses: perCup(340),
  cornSyrup: perCup(315),
  bakingSoda: perTsp(6),
  bakingPowder: perTsp(4),
  creamOfTartar: perTsp(3),
  salt: perTsp(6),
  cream: 0.99,
  milk: 1.03,
  buttermilk: 1.03,
  sourCream: 1.0,
  yogurt: 1.03,
  cremeFraiche: 1.0,
  mascarpone: 0.98,
  ricotta: 1.04,
  whey: 1.03,
  condensedMilk: 1.29,
  dulceDeLeche: 1.3,
  lemonJuice: 1.03,
  vinegar: 1.01,
  vodka: 0.95,
  vanillaExtract: 0.96,
  vanillaPaste: 1.15,
  glycerin: 1.26,
} as const

// Shown on the About page so the numbers behind "Weight" are out in the open
export const DENSITY_REFERENCE: { label: string; gPerMl: number; per: 'cup' | 'tsp' }[] = [
  { label: 'All-purpose flour', gPerMl: G_PER_ML.flour, per: 'cup' },
  { label: 'Granulated sugar', gPerMl: G_PER_ML.sugar, per: 'cup' },
  { label: 'Brown sugar, packed', gPerMl: G_PER_ML.brownSugar, per: 'cup' },
  { label: 'Powdered sugar', gPerMl: G_PER_ML.powderedSugar, per: 'cup' },
  { label: 'Cornstarch', gPerMl: G_PER_ML.cornstarch, per: 'cup' },
  { label: 'Heavy cream', gPerMl: G_PER_ML.cream, per: 'cup' },
  { label: 'Whole milk', gPerMl: G_PER_ML.milk, per: 'cup' },
  { label: 'Vodka', gPerMl: G_PER_ML.vodka, per: 'cup' },
  { label: 'Baking soda', gPerMl: G_PER_ML.bakingSoda, per: 'tsp' },
  { label: 'Baking powder', gPerMl: G_PER_ML.bakingPowder, per: 'tsp' },
  { label: 'Fine salt', gPerMl: G_PER_ML.salt, per: 'tsp' },
]
