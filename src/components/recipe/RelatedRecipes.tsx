import { ArrowRight } from '@phosphor-icons/react'
import { findPage } from '../../recipes'
import { RELATED } from '../../recipes/related'

export function RelatedRecipes({ slug }: { slug: string }) {
  const links = (RELATED[slug] ?? []).flatMap(r => {
    const page = findPage(r.slug)
    return page ? [{ ...r, page }] : []
  })
  if (links.length === 0) return null

  return (
    <section className="print:hidden space-y-3">
      <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">Related recipes</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {links.map(({ page, note }) => (
          <a
            key={page.slug}
            href={`#/${page.slug}`}
            className="
              group card flex items-start gap-3 p-3 transition-colors
              hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-white/5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
            "
          >
            <span
              className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${page.accent[500]}26`, color: page.accent[500] }}
            >
              <page.icon size={18} weight="bold" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex items-center gap-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {page.name}
                <ArrowRight size={12} weight="bold" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{note}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
