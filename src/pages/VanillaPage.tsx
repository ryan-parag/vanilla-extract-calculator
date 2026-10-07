import { FOLDS, FORMULAS, useVanillaCalc, VOLUME_UNITS, WEIGHT_UNITS } from '../hooks/useVanillaCalc'
import { methodLines } from '../lib/recipeActions'
import { vanillaNotes } from '../recipes/vanilla'
import { StepsPanel } from '../components/ratio/StepsPanel'
import { RecipeNotes } from '../components/recipe/RecipeNotes'
import { StorageCard, TimingCard } from '../components/recipe/InfoCards'
import { RelatedRecipes } from '../components/recipe/RelatedRecipes'
import { FormulaSelector } from '../components/FormulaSelector'
import { FoldSelector } from '../components/FoldSelector'
import { InputPanel } from '../components/InputPanel'
import { ResultsPanel } from '../components/ResultsPanel'
import { JarVisual } from '../components/JarVisual'

export function VanillaPage() {
  const calc = useVanillaCalc()
  const { result } = calc

  const vol = VOLUME_UNITS[calc.volumeDisplayUnit].label
  const wt = WEIGHT_UNITS[calc.weightDisplayUnit].label
  const steps = vanillaNotes.steps({
    beans: `${result.beansDisplay} ${wt}`,
    alcohol: `${result.alcoholDisplay} ${vol}`,
    container: `${result.containerDisplay} ${vol}`,
  })

  function generateRecipeText() {
    const foldLabel = FOLDS.find(f => f.value === calc.fold)?.label ?? ''
    return [
      'Vanilla Extract',
      `Formula: ${FORMULAS[calc.formula].label}, ${foldLabel.toLowerCase()}`,
      ``,
      `Ingredients`,
      `- Vanilla beans: ${result.beansDisplay} ${wt}`,
      `- Alcohol: ${result.alcoholDisplay} ${vol}`,
      `- Container: ${result.containerDisplay} ${vol} (beans displace about ${result.displacementMl.toFixed(1)} ml)`,
      ``,
      `Active: ${vanillaNotes.timing.active} · Wait: ${vanillaNotes.timing.wait} (${vanillaNotes.timing.waitNote})`,
      ``,
      `Method`,
      ...methodLines(steps),
      ``,
      `Storage: ${vanillaNotes.storage}`,
      ``,
      window.location.href,
    ].join('\n')
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_14rem] gap-6 items-start">
      {/* Main calculator column */}
      <div className="space-y-5">
        {/* Formula Card */}
        <section className="card print:hidden">
          <FormulaSelector value={calc.formula} onChange={calc.setFormula} />
        </section>

        {/* Fold Card */}
        <section className="card print:hidden">
          <FoldSelector value={calc.fold} onChange={calc.setFold} />
        </section>

        {/* Input Card */}
        <section className="card print:hidden">
          <InputPanel
            mode={calc.mode}
            onModeChange={calc.setMode}
            containerValue={calc.containerValue}
            setContainerValue={calc.setContainerValue}
            containerUnit={calc.containerUnit}
            setContainerUnit={calc.setContainerUnit}
            alcoholValue={calc.alcoholValue}
            setAlcoholValue={calc.setAlcoholValue}
            alcoholUnit={calc.alcoholUnit}
            setAlcoholUnit={calc.setAlcoholUnit}
            vanillaValue={calc.vanillaValue}
            setVanillaValue={calc.setVanillaValue}
            vanillaUnit={calc.vanillaUnit}
            setVanillaUnit={calc.setVanillaUnit}
          />
        </section>

        {/* Results Card */}
        <section className="card px-4 py-3 bg-zinc-100 dark:bg-zinc-900">
          <ResultsPanel
            result={result}
            formula={calc.formula}
            fold={calc.fold}
            volumeDisplayUnit={calc.volumeDisplayUnit}
            setVolumeDisplayUnit={calc.setVolumeDisplayUnit}
            weightDisplayUnit={calc.weightDisplayUnit}
            setWeightDisplayUnit={calc.setWeightDisplayUnit}
            recipeText={generateRecipeText}
          />
        </section>

        <section className="card">
          <StepsPanel steps={steps} />
        </section>

        <RecipeNotes tips={vanillaNotes.tips} />

        <RelatedRecipes slug="vanilla-extract" />
      </div>

      {/* Sidebar: jar preview and rate beside the calculator at xl; timing and storage below it before then */}
      <aside className="grid sm:grid-cols-2 xl:flex xl:flex-col xl:items-center gap-4 xl:sticky xl:top-8">
        <div className="card p-4 w-full hidden xl:block print:hidden">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-center mb-3">
            Strength preview
          </p>
          <JarVisual fold={calc.fold} formula={calc.formula} />
        </div>

        {/* Quick stats */}
        <div className="hidden xl:block print:hidden bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-4 w-full text-center space-y-2">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Rate</p>
          <p className="text-lg font-bold text-accent-700 dark:text-accent-400 tabular-nums">
            {(result.beanGrams / (result.alcoholMl / 100)).toFixed(1)}
            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400"> g/100ml</span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">beans per 100ml alcohol</p>
        </div>

        <TimingCard timing={vanillaNotes.timing} />
        <StorageCard storage={vanillaNotes.storage} />
      </aside>
    </div>
  )
}
