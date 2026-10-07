import type { ReactNode } from 'react'
import { Flask, Lock, Ruler, Warning } from '@phosphor-icons/react'
import { PAGES } from '../recipes'

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="card p-5 space-y-3">
      <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        <span className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-accent-500/20 text-accent-700 dark:text-accent-300">
          {icon}
        </span>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{children}</div>
    </section>
  )
}

export function AboutPage() {
  const sourced = PAGES.filter(p => p.source)
  const untested = PAGES.filter(p => p.untested)

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="p-6 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white flex flex-col gap-2">
        <p>👋 Hey, I'm <a href="https://ryanparag.com" target="_blank" rel="noopener noreferrer" className="underline">Ryan Parag</a>!
        </p>
        <p>I'm a product designer living in Sunny 🌞 Tampa Bay.I strive to help build useful products with an interdisciplinary skillset, bred from my fascination of systems, art, and code.</p>
        <p>
          This started as a vanilla extract calculator and grew into a set of calculators for staples
          you can make at home instead of buying: extracts, cultured dairy, butter, sugars, and baking
          swaps. Each one scales a recipe to the amount you have or the amount you need, and walks you
          through making it.
        </p>
      </div>

      <Section icon={<Ruler size={16} weight="bold" />} title="How the numbers work">
        <p>
          Every calculator is built on a ratio, like 1 tbsp of molasses per cup of sugar. You can start from
          what you have (“2 cups of cream”) or from what your recipe calls for (“1 stick of butter”), and
          everything else scales from there.
        </p>
        <p>
          <strong className="text-zinc-800 dark:text-zinc-200">Measurements are rounded the way you’d measure them.</strong>{' '}
          US results use cups and spoons (“1 cup + 1½ tbsp”), butter comes in sticks and tablespoons, and
          small amounts use spoons in either system. Metric results use ml and grams.
        </p>
        <p>
          <strong className="text-zinc-800 dark:text-zinc-200">“About” means it varies.</strong>{' '}
          How much mascarpone you get depends on how long it drains; how much butter you get depends on your
          cream. Where results depend on technique, you’ll see a range, and calculating from what you need
          aims for the middle of it.
        </p>
      </Section>

      <Section icon={<Flask size={16} weight="bold" />} title="Sources and testing">
        {sourced.map(p => (
          <p key={p.slug}>
            <a href={`#/${p.slug}`} className="font-semibold text-zinc-800 dark:text-zinc-200 underline">{p.name}</a>{' '}
            formulas are based on{' '}
            <a href={p.source!.url} target="_blank" rel="noopener noreferrer" className="underline">{p.source!.label}</a>.
          </p>
        ))}
        <p>
          The other calculators use common home-kitchen ratios. Some of them, or their expected yields,
          haven’t been confirmed with a test batch yet. Those pages say so under the title:
        </p>
        <ul className="space-y-2">
          {untested.map(p => (
            <li key={p.slug} className="flex gap-2">
              <span
                aria-hidden
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: p.accent[500] }}
              />
              <span>
                <a href={`#/${p.slug}`} className="font-semibold text-zinc-800 dark:text-zinc-200 underline">{p.name}</a>
                {': '}{p.untested}
              </span>
            </li>
          ))}
        </ul>
        <p>Taste as you go, and trust what you see in the pan or jar over the numbers.</p>
      </Section>

      <Section icon={<Warning size={16} weight="bold" />} title="Food safety">
        <p>
          These are home recipes, not lab-tested products. Use clean jars and utensils, follow the
          temperatures and times on each page, and keep dairy refrigerated once it’s made.
        </p>
        <p>
          If anything looks or smells wrong, like fuzzy mold, pink or orange spots, or a smell that’s
          off rather than pleasantly sour, throw it out.
        </p>
      </Section>

      <Section icon={<Lock size={16} weight="bold" />} title="Your data">
        <p>
          Your inputs, measurement system, and theme are saved in this browser so they’re there next
          time. Nothing is sent anywhere. The link in your address bar holds your current batch, so
          you can share it with <strong className="text-zinc-800 dark:text-zinc-200">Copy link</strong>.
        </p>
      </Section>
    </div>
  )
}
