import { useMemo, useState } from 'react'
import { ArrowRight, Calculator, ListChecks, MagnifyingGlass, Scales, Timer, X } from '@phosphor-icons/react'
import { GROUPS, PAGES, searchText, timeHint } from '../recipes'

const HOW_IT_WORKS = [
  { icon: ListChecks, title: 'Pick a staple', body: `${PAGES.length} pantry and fridge basics, from vanilla extract to ricotta.` },
  { icon: Scales, title: 'Enter what you have or need', body: 'Start from the cream in your fridge, or from what your recipe calls for.' },
  { icon: Calculator, title: 'Get exact amounts', body: 'Ingredients in cups and spoons or grams, with steps scaled to your batch.' },
]

export function HomePage() {
  const [query, setQuery] = useState('')

  // Every word typed has to match somewhere: name, tagline, or ingredients
  const matches = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    return PAGES.filter(p => words.every(w => searchText(p).includes(w)))
  }, [query])

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
          Make your own pantry staples
        </h1>
        <p className="text-base lg:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Calculators for extracts, cultured dairy, butter, sugars, and baking swaps, scaled to exactly
          what you have or what your recipe needs.
        </p>
      </header>

      <ol className="grid sm:grid-cols-3 gap-3">
        {HOW_IT_WORKS.map((s, i) => (
          <li key={s.title} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-accent-500/20 text-accent-700 dark:text-accent-300">
                <s.icon size={16} weight="bold" />
              </span>
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">Step {i + 1}</span>
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{s.title}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{s.body}</p>
          </li>
        ))}
      </ol>

      <section className="space-y-6">
        <div className="relative max-w-md">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or ingredient, like “cream”"
            aria-label="Search calculators"
            className="
              w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950
              pl-9 pr-9 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400
              focus:outline-none focus:ring-2 focus:ring-accent-400
              [&::-webkit-search-cancel-button]:hidden
            "
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {matches.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Nothing matches “{query}”. Try an ingredient you have, like milk, sugar, or butter.
          </p>
        )}

        {GROUPS.map((group) => {
          const pages = matches.filter(p => p.group === group)
          if (pages.length === 0) return null
          return (
            <div key={group} className="space-y-3">
              <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{group}</h2>
              <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {pages.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`#/${p.slug}`}
                      className="
                        group card h-full flex flex-col gap-3 p-4 transition-colors
                        hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-white/5
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
                      "
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="h-10 w-10 inline-flex items-center justify-center rounded-full"
                          style={{ backgroundColor: `${p.accent[500]}26`, color: p.accent[500] }}
                        >
                          <p.icon size={20} weight="bold" />
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <Timer size={12} weight="bold" />
                          {timeHint(p)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100">
                          {p.name}
                          <ArrowRight size={14} weight="bold" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.tagline}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>
    </div>
  )
}
