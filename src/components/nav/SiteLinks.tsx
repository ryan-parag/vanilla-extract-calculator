import { House, Info } from '@phosphor-icons/react'

const LINKS = [
  { path: '', label: 'All calculators', icon: House },
  { path: 'about', label: 'About', icon: Info },
]

export function SiteLinks({ current, onNavigate }: { current: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-0.5 pb-3 mb-3 border-b border-zinc-200 dark:border-zinc-900">
      {LINKS.map((l) => {
        const active = l.path === current
        return (
          <li key={l.path}>
            <a
              href={`#/${l.path}`}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`
                flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-400
                ${active
                  ? 'bg-accent-500/15 text-accent-700 dark:text-accent-400 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100'}
              `}
            >
              <l.icon size={16} weight="bold" className="shrink-0" />
              {l.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
