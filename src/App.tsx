import { useState, useEffect } from 'react'
import { useVanillaCalc } from './hooks/useVanillaCalc'
import { FormulaSelector } from './components/FormulaSelector'
import { FoldSelector } from './components/FoldSelector'
import { InputPanel } from './components/InputPanel'
import { ResultsPanel } from './components/ResultsPanel'
import { JarVisual } from './components/JarVisual'
import { DarkModeToggle } from './components/DarkModeToggle'
import Logo from './components/Logo'
import { motion } from "motion/react"

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('darkMode', String(dark))
  }, [dark])

  return { dark, toggleDark: () => setDark(d => !d) }
}

export default function App() {
  const { dark, toggleDark } = useDarkMode()
  const calc = useVanillaCalc()

  return (
    <div className="h-full w-full bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center flex-col w-full">
            <div className="flex flex-col text-center items-center gap-0">
              <motion.div
                className="inline-flex h-10 w-10 lg:h-14 lg:w-14 p-1 border border-zinc-300 dark:border-zinc-800 relative rounded-xl lg:rounded-2xl overflow-hidden bg-black mb-2 lg:mb-4 shadow-2xl shadow-vanilla-500/70"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.24, delay: 0.2, type: "spring", stiffness: 150 }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-white/20 to-transparent"/>
                <Logo />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                Vanilla Extract Calculator
              </h1>
              <p className="text-base lg:text-lg mt-1 lg:mt-2 text-zinc-500 dark:text-zinc-400">
              Precision recipes for homemade extract
            </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          {/* Main calculator column */}
          <div className="space-y-5">
            {/* Formula Card */}
            <section className="card">
              <FormulaSelector value={calc.formula} onChange={calc.setFormula} />
            </section>

            {/* Fold Card */}
            <section className="card">
              <FoldSelector value={calc.fold} onChange={calc.setFold} />
            </section>

            {/* Input Card */}
            <section className="card">
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
                result={calc.result}
                formula={calc.formula}
                fold={calc.fold}
                volumeDisplayUnit={calc.volumeDisplayUnit}
                setVolumeDisplayUnit={calc.setVolumeDisplayUnit}
                weightDisplayUnit={calc.weightDisplayUnit}
                setWeightDisplayUnit={calc.setWeightDisplayUnit}
              />
            </section>
          </div>

          {/* Sidebar: Jar Visual */}
          <aside className="hidden lg:flex flex-col items-center gap-4 sticky top-8">
            <div className="card p-4 w-full">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-center mb-3">
                Strength Preview
              </p>
              <JarVisual fold={calc.fold} formula={calc.formula} />
            </div>

            {/* Quick stats */}
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-4 w-full text-center space-y-2">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Rate</p>
              <p className="text-lg font-bold text-vanilla-700 dark:text-vanilla-400 tabular-nums">
                {(calc.result.beanGrams / (calc.result.alcoholMl / 100)).toFixed(1)}
                <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400"> g/100ml</span>
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">beans per 100ml alcohol</p>
            </div>
          </aside>
        </div>

        {/* Mobile jar (visible on small screens) */}
        <div className="lg:hidden mt-5">
          <div className="card">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
              Strength Preview
            </p>
            <JarVisual fold={calc.fold} formula={calc.formula} />
          </div>
        </div>

        <footer className="mt-8 flex flex-col md:flex-row gap-1 justify-between text-center text-xs text-zinc-400 dark:text-zinc-600">
          <span>
            Formulas based on{' '}
            <a
              href="https://danieltalsky.com/vanilla"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-vanilla-600 dark:hover:text-vanilla-500"
            >
              danieltalsky.com/vanilla
            </a>
          </span>
          <DarkModeToggle dark={dark} onToggle={toggleDark} />
        </footer>
      </div>
    </div>
  )
}
