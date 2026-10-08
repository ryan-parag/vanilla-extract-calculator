import { Fragment, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Calculator, ListChecks, MagnifyingGlass, Scales, Timer, X } from '@phosphor-icons/react'
import { GROUPS, PAGES, searchText, timeHint } from '../recipes'
import { fadeUp, stagger } from '../lib/motion'

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

      <motion.ol
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        animate="show"
        className="p-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-transparent grid sm:grid-cols-3 gap-6 rounded-lg"
      >
        {HOW_IT_WORKS.map((s, i) => (
          <motion.li key={s.title} variants={fadeUp} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-accent-500/20 text-accent-700 dark:text-accent-300">
                <s.icon size={16} weight="bold" />
              </span>
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Step {i + 1}</span>
            </div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{s.title}</p>
            <p className="text-base text-zinc-700 dark:text-zinc-300">{s.body}</p>
          </motion.li>
        ))}
      </motion.ol>

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

        {matches.length > 0 && (
          <div className="card overflow-hidden">
            {/* Rows that appear while searching mount into "hidden" and ease in on their own */}
            <motion.table variants={stagger(0.02, 0.15)} initial="hidden" animate="show" className="w-full text-left text-sm">
              <thead className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Calculator</th>
                  <th scope="col" className="hidden md:table-cell px-4 py-3">What it makes</th>
                  <th scope="col" className="px-4 py-3 text-right">Time</th>
                  <th scope="col" className="w-10"><span className="sr-only">Open</span></th>
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((group) => {
                  const pages = matches.filter(p => p.group === group)
                  if (pages.length === 0) return null
                  return (
                    <Fragment key={group}>
                      <motion.tr variants={fadeUp} className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
                        <th scope="colgroup" colSpan={4} className="px-4 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {group}
                        </th>
                      </motion.tr>
                      {pages.map((p) => (
                        <motion.tr
                          key={p.slug}
                          variants={fadeUp}
                          className="group relative border-t border-zinc-200 dark:border-zinc-900 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5 has-[a:focus-visible]:bg-zinc-50 dark:has-[a:focus-visible]:bg-white/5"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
                                style={{ backgroundColor: `${p.accent[500]}26`, color: p.accent[500] }}
                              >
                                <p.icon size={18} weight="bold" />
                              </span>
                              <div className="min-w-0">
                                {/* Stretched over the whole row so any cell is clickable */}
                                <a
                                  href={`#/${p.slug}`}
                                  className="font-bold text-zinc-900 dark:text-zinc-100 focus-visible:outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-accent-400"
                                >
                                  {p.name}
                                </a>
                                <p className="md:hidden text-xs text-zinc-500 dark:text-zinc-400">{p.tagline}</p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-4 py-3 text-zinc-500 dark:text-zinc-400">{p.tagline}</td>
                          <td className="px-4 py-3 text-right whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="inline-flex items-center gap-1">
                              <Timer size={12} weight="bold" />
                              {timeHint(p)}
                            </span>
                          </td>
                          <td className="pr-4 py-3 text-zinc-400">
                            <ArrowRight
                              size={14}
                              weight="bold"
                              className="opacity-0 -translate-x-1 transition duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-has-[a:focus-visible]:opacity-100 group-has-[a:focus-visible]:translate-x-0"
                            />
                          </td>
                        </motion.tr>
                      ))}
                    </Fragment>
                  )
                })}
              </tbody>
            </motion.table>
          </div>
        )}
      </section>
    </div>
  )
}
