import { useEffect, useState } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { GROUPS, PAGES } from '../../recipes'

interface IngredientListProps {
  current: string
  // Lets the mobile drawer close itself when a link is chosen
  onNavigate?: () => void
}

type Group = typeof GROUPS[number]

function groupOf(slug: string): Group | undefined {
  return PAGES.find(p => p.slug === slug)?.group
}

export function IngredientList({ current, onNavigate }: IngredientListProps) {
  // Groups start collapsed, except the one holding the current page
  const [openGroups, setOpenGroups] = useState<Set<Group>>(() => new Set(
    [groupOf(current)].filter((g): g is Group => !!g),
  ))

  // Navigating into another group opens it; groups the reader opened stay open
  useEffect(() => {
    const group = groupOf(current)
    if (group) setOpenGroups(prev => prev.has(group) ? prev : new Set(prev).add(group))
  }, [current])

  function toggle(group: Group) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  return (
    <nav aria-label="Ingredients" className="space-y-1">
      {GROUPS.map((group) => {
        const pages = PAGES.filter(p => p.group === group)
        const open = openGroups.has(group)
        // Still show where you are when the current page's group is collapsed
        const holdsCurrent = !open && pages.some(p => p.slug === current)
        const listId = `nav-group-${group.toLowerCase()}`
        return (
          <div key={group}>
            <button
              type="button"
              onClick={() => toggle(group)}
              aria-expanded={open}
              aria-controls={listId}
              className={`
                w-full flex items-center gap-2 rounded-lg px-3 py-1.5
                text-sm font-semibold
                hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
                ${holdsCurrent
                  ? 'text-accent-800 dark:text-accent-200'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}
              `}
            >
              <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                <CaretRight size={10} weight="bold" />
              </motion.span>
              <span className="flex-1 text-left">{group}</span>
              {!open && <span className="tabular-nums font-normal normal-case tracking-normal">{pages.length}</span>}
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  id={listId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5 overflow-hidden pb-2"
                >
                  {pages.map((p) => {
                    const active = p.slug === current
                    return (
                      <li key={p.slug}>
                        <a
                          href={`#/${p.slug}`}
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
                          <p.icon size={16} weight="bold" className="shrink-0" />
                          <span className="flex-1 truncate">{p.name}</span>
                        </a>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
