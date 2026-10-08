import { useRatioCalc } from '../hooks/useRatioCalc'
import { formatMeasure, type Measure } from '../lib/measures'
import { formatButterRange, type MeasureSystem } from '../lib/kitchenUnits'
import { formatAddition } from '../lib/formatAddition'
import { methodLines } from '../lib/recipeActions'
import { VariantSelector } from '../components/ratio/VariantSelector'
import { RatioInputPanel } from '../components/ratio/RatioInputPanel'
import { RatioResultsPanel, type IngredientLine } from '../components/ratio/RatioResultsPanel'
import { StepsPanel } from '../components/ratio/StepsPanel'
import { RecipeNotes } from '../components/recipe/RecipeNotes'
import { StorageCard, TimingCard } from '../components/recipe/InfoCards'
import { RelatedRecipes } from '../components/recipe/RelatedRecipes'
import type { RatioRecipe } from '../recipes/types'

interface RatioRecipePageProps {
  slug: string
  name: string
  recipe: RatioRecipe
}

function formatRange(min: number, max: number, measure: Measure, system: MeasureSystem, gPerMl?: number) {
  if (measure === 'butter') return `about ${formatButterRange(min, max, system)}`
  const lo = formatMeasure(min, measure, system, true, gPerMl)
  const hi = formatMeasure(max, measure, system, true, gPerMl)
  return lo === hi ? `about ${lo}` : `about ${lo} – ${hi}`
}

export function RatioRecipePage({ slug, name, recipe }: RatioRecipePageProps) {
  const calc = useRatioCalc(recipe, slug)
  const { result, system, variant } = calc

  const baseAmount = formatMeasure(result.baseAmount, recipe.base.measure ?? 'volume', system, false, recipe.base.gPerMl)
  const additionAmounts = Object.fromEntries(
    variant.additions.map(a => [a.id, formatAddition(a, result.baseAmount, system)]),
  )

  const details: IngredientLine[] = recipe.variants.length > 1
    ? [{ label: recipe.variantHeading ?? 'Variation', amount: variant.label }]
    : []

  const ingredients: IngredientLine[] = [
    { label: recipe.base.label, amount: baseAmount },
    ...variant.additions.map(a => ({
      label: a.label.charAt(0).toUpperCase() + a.label.slice(1),
      amount: additionAmounts[a.id],
    })),
  ]

  const yieldLine = {
    label: recipe.yieldLineLabel ?? 'Makes',
    amount: formatRange(result.yieldMin, result.yieldMax, recipe.yieldMeasure ?? 'volume', system, recipe.yieldGPerMl),
  }

  const byproductLines: IngredientLine[] = (recipe.byproducts ?? []).map(b => ({
    label: `Plus ${b.label.toLowerCase()}`,
    amount: formatRange(result.baseAmount * b.range[0], result.baseAmount * b.range[1], b.measure ?? 'volume', system, b.gPerMl),
  }))

  const steps = recipe.steps({ variant, base: baseAmount, additions: additionAmounts, yield: yieldLine.amount })

  function generateRecipeText() {
    return [
      name,
      ...details.map(d => `${d.label}: ${d.amount}`),
      ``,
      `Ingredients`,
      ...ingredients.map(i => `- ${i.label}: ${i.amount}`),
      ``,
      `${yieldLine.label} ${yieldLine.amount}`,
      ...byproductLines.map(b => `${b.label}: ${b.amount}`),
      `Active: ${recipe.timing.active}${recipe.timing.wait ? ` · Wait: ${recipe.timing.wait} (${recipe.timing.waitNote})` : ''}`,
      ``,
      `Method`,
      ...methodLines(steps),
      ``,
      `Storage: ${recipe.storage}`,
      ``,
      window.location.href,
    ].join('\n')
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_14rem] gap-6 items-start">
      <div className="space-y-5">
        {recipe.variants.length > 1 && (
          <section className="card print:hidden">
            <VariantSelector
              heading={recipe.variantHeading ?? 'Variation'}
              variants={recipe.variants}
              value={variant.id}
              onChange={calc.setVariantId}
            />
          </section>
        )}

        <section className="card print:hidden">
          <RatioInputPanel
            recipe={recipe}
            mode={calc.mode}
            onModeChange={calc.setMode}
            baseValue={calc.baseValue}
            setBaseValue={calc.setBaseValue}
            baseUnit={calc.baseUnit}
            setBaseUnit={calc.setBaseUnit}
            yieldValue={calc.yieldValue}
            setYieldValue={calc.setYieldValue}
            yieldUnit={calc.yieldUnit}
            setYieldUnit={calc.setYieldUnit}
          />
        </section>

        <section className="card px-4 py-3 bg-zinc-100 dark:bg-zinc-900">
          <RatioResultsPanel
            heading={`${recipe.yieldLabel} batch`}
            details={details}
            ingredients={ingredients}
            yieldLine={yieldLine}
            byproducts={byproductLines}
            system={system}
            setSystem={calc.setSystem}
            recipeText={generateRecipeText}
          />
        </section>

        <section className="card">
          <StepsPanel steps={steps} />
        </section>

        <RecipeNotes tips={recipe.tips} warnings={recipe.warnings} />

        <RelatedRecipes slug={slug} />
      </div>

      {/* Timing and storage at a glance; below the calculator until there's room beside it */}
      <aside className="grid sm:grid-cols-2 xl:flex xl:flex-col gap-4 xl:sticky xl:top-8">
        <TimingCard timing={recipe.timing} />
        <StorageCard storage={recipe.storage} />
      </aside>
    </div>
  )
}
