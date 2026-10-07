// Formats raw ml amounts the way a home cook measures them:
// "1½ cups + 1 tbsp", "2 tbsp + ½ tsp", "⅛ tsp", or "350 ml".

export type MeasureSystem = 'us' | 'metric'

export const TSP_ML = 4.92892
export const TBSP_ML = TSP_ML * 3
export const CUP_ML = 236.588

export type KitchenUnit = 'tsp' | 'tbsp' | 'floz' | 'cup' | 'pint' | 'quart' | 'ml' | 'liter'

// Input units for ratio recipes; adds spoons to the vanilla calculator's list
export const KITCHEN_UNITS: Record<KitchenUnit, { label: string; toMl: number }> = {
  tsp:   { label: 'tsp',    toMl: TSP_ML },
  tbsp:  { label: 'tbsp',   toMl: TBSP_ML },
  floz:  { label: 'fl oz',  toMl: 29.5735 },
  cup:   { label: 'cups',   toMl: CUP_ML },
  pint:  { label: 'pints',  toMl: 473.176 },
  quart: { label: 'quarts', toMl: 946.353 },
  ml:    { label: 'ml',     toMl: 1 },
  liter: { label: 'liters', toMl: 1000 },
}

const GLYPHS: [number, string][] = [
  [1 / 8, '⅛'], [1 / 4, '¼'], [1 / 3, '⅓'], [1 / 2, '½'], [2 / 3, '⅔'], [3 / 4, '¾'],
]

function glyph(f: number): string {
  return GLYPHS.find(([v]) => Math.abs(v - f) < 1e-6)?.[1] ?? ''
}

function mixed(whole: number, frac: number): string {
  const g = frac > 0 ? glyph(frac) : ''
  if (whole === 0) return g || '0'
  return `${whole}${g}`
}

// Rounds `value` to the nearest whole + allowed fraction (fractions in [0, 1))
function roundToFractions(value: number, fracs: number[]): { whole: number; frac: number } {
  const whole = Math.floor(value)
  const rem = value - whole
  let best = 0
  let bestDist = rem
  for (const f of [...fracs, 1]) {
    const d = Math.abs(rem - f)
    if (d < bestDist) { best = f; bestDist = d }
  }
  return best === 1 ? { whole: whole + 1, frac: 0 } : { whole, frac: best }
}

function formatSpoons(ml: number): string {
  const tsp = ml / TSP_ML
  if (tsp >= 2.875) {
    let tbsp = Math.floor(tsp / 3)
    let rest = roundToFractions(tsp - tbsp * 3, [0.25, 0.5, 0.75])
    if (rest.whole >= 3) { tbsp += 1; rest = { whole: rest.whole - 3, frac: rest.frac } }
    const tbspText = `${tbsp} tbsp`
    if (rest.whole === 0 && rest.frac === 0) return tbspText
    return `${tbspText} + ${mixed(rest.whole, rest.frac)} tsp`
  }
  const r = roundToFractions(tsp, [0.125, 0.25, 0.5, 0.75])
  if (r.whole === 0 && r.frac === 0) return 'a pinch'
  return `${mixed(r.whole, r.frac)} tsp`
}

const CUP_FRACS = [0, 0.25, 1 / 3, 0.5, 2 / 3, 0.75]

function formatCups(ml: number, approx: boolean): string {
  const cups = ml / CUP_ML
  if (approx) {
    const r = roundToFractions(cups, CUP_FRACS.slice(1))
    return `${mixed(r.whole, r.frac)} ${r.whole + r.frac > 1 ? 'cups' : 'cup'}`
  }
  let whole = Math.floor(cups)
  const rem = cups - whole
  let i = CUP_FRACS.filter(f => f <= rem + 1e-9).length - 1
  let tbsp = Math.round((rem - CUP_FRACS[i]) * 16 * 2) / 2
  // Remainder rounded up into the next cup measure
  const next = i + 1 < CUP_FRACS.length ? CUP_FRACS[i + 1] : 1
  if (CUP_FRACS[i] + tbsp / 16 >= next - 1e-6) {
    tbsp = 0
    if (next === 1) { whole += 1; i = 0 } else { i += 1 }
  }
  const frac = CUP_FRACS[i]
  const total = whole + frac
  const cupText = `${mixed(whole, frac)} ${total > 1 ? 'cups' : 'cup'}`
  if (tbsp === 0) return cupText
  return `${cupText} + ${mixed(Math.floor(tbsp), tbsp % 1)} tbsp`
}

function formatMetric(ml: number, approx: boolean): string {
  if (ml >= 1000) return `${(ml / 1000).toFixed(approx ? 1 : 2).replace(/\.?0+$/, '')} L`
  if (approx && ml >= 100) return `${Math.round(ml / 10) * 10} ml`
  return `${Math.round(ml)} ml`
}

// `approx` rounds to the nearest cup measure / 10 ml, for estimates like yields
export function formatVolume(ml: number, system: MeasureSystem, approx = false): string {
  if (!(ml > 0)) return '0'
  // Spoon measures are universal; use them for small amounts in either system
  if (ml < (system === 'us' ? CUP_ML / 4 - TBSP_ML / 4 : 30)) {
    const spoons = formatSpoons(ml)
    return system === 'metric' && ml >= 1 ? `${spoons} (${ml.toFixed(1)} ml)` : spoons
  }
  return system === 'us' ? formatCups(ml, approx) : formatMetric(ml, approx)
}

const OZ_G = 28.3495

export function formatWeight(g: number, system: MeasureSystem): string {
  const grams = g >= 10 ? `${Math.round(g)} g` : `${g.toFixed(1).replace(/\.0$/, '')} g`
  if (system === 'metric' || g < OZ_G) return grams
  return `${(g / OZ_G).toFixed(1)} oz (${grams})`
}

// 'whole' rounds up so you never come up short on fruit; 'half' rounds to the nearest ½
export function formatCount(n: number, noun: [string, string], round: 'whole' | 'half'): string {
  let rounded = round === 'whole' ? Math.ceil(n - 0.05) : Math.round(n * 2) / 2
  if (n > 0 && rounded === 0) rounded = round === 'whole' ? 1 : 0.5
  const whole = Math.floor(rounded)
  const text = rounded % 1 ? (whole ? `${whole}½` : '½') : String(rounded)
  return `${text} ${rounded > 1 ? noun[1] : noun[0]}`
}

// Butter is sold and measured by weight: sticks and tablespoons in the US, grams elsewhere
export const BUTTER_TBSP_G = 14.175
export const STICK_G = BUTTER_TBSP_G * 8

export type ButterUnit = 'stick' | 'tbsp' | 'g' | 'oz' | 'lb'

export const BUTTER_UNITS: Record<ButterUnit, { label: string; toG: number }> = {
  stick: { label: 'sticks', toG: STICK_G },
  tbsp:  { label: 'tbsp',   toG: BUTTER_TBSP_G },
  g:     { label: 'grams',  toG: 1 },
  oz:    { label: 'ounces', toG: OZ_G },
  lb:    { label: 'pounds', toG: OZ_G * 16 },
}

function butterParts(g: number, approx: boolean): { us: string; grams: number } {
  const grams = approx && g >= 100 ? Math.round(g / 5) * 5 : Math.round(g)
  const tbsp = g / BUTTER_TBSP_G
  let sticks = Math.floor(tbsp / 8)
  let rest = approx ? Math.round(tbsp - sticks * 8) : Math.round((tbsp - sticks * 8) * 2) / 2
  if (rest >= 8) { sticks += 1; rest -= 8 }
  const restText = rest === 0 ? '' : `${Math.floor(rest) || ''}${rest % 1 ? '½' : ''} tbsp`
  const parts = [sticks ? `${sticks} ${sticks > 1 ? 'sticks' : 'stick'}` : '', restText].filter(Boolean)
  return { us: parts.join(' + ') || '½ tbsp', grams }
}

export function formatButter(g: number, system: MeasureSystem, approx = false): string {
  if (!(g > 0)) return '0'
  const { us, grams } = butterParts(g, approx)
  return system === 'metric' ? `${grams} g` : `${us} (${grams} g)`
}

// "6 – 7 tbsp (90–95 g)" rather than repeating the grams on each side
export function formatButterRange(lo: number, hi: number, system: MeasureSystem): string {
  const a = butterParts(lo, true)
  const b = butterParts(hi, true)
  const grams = a.grams === b.grams ? `${a.grams} g` : `${a.grams}–${b.grams} g`
  if (system === 'metric') return grams
  if (a.us === b.us) return `${a.us} (${grams})`
  // Share a trailing "tbsp" when both sides are plain tablespoons
  const lowText = /^\d+½? tbsp$/.test(a.us) && /^\d+½? tbsp$/.test(b.us) ? a.us.replace(' tbsp', '') : a.us
  return `${lowText} – ${b.us} (${grams})`
}
