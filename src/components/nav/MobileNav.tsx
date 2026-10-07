import { useState } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import { CaretDown, List, X } from '@phosphor-icons/react'
import { Brand } from './Brand'
import { IngredientList } from './IngredientList'
import { SiteLinks } from './SiteLinks'
import { ThemeToggle } from '../ThemeToggle'
import type { Theme } from '../../hooks/usePreference'
import type { Icon } from '@phosphor-icons/react'

interface MobileNavProps {
  current: string
  // What the top bar shows for the current page
  label: { name: string; icon: Icon }
  theme: Theme
  onThemeChange: (t: Theme) => void
}

// Top bar with a slide-out ingredient drawer, below lg
export function MobileNav({ current, label, theme, onThemeChange }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden print:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b border-zinc-200 dark:border-zinc-900 bg-white/85 dark:bg-black/85 backdrop-blur">
      <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="left">
        <Drawer.Trigger
          aria-label="Choose an ingredient"
          className="
            flex items-center gap-2 min-w-0 rounded-lg border border-zinc-300 dark:border-zinc-800 px-3 py-1.5
            text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
          "
        >
          <List size={16} weight="bold" className="shrink-0" />
          <label.icon size={16} weight="bold" className="shrink-0 text-accent-600 dark:text-accent-400" />
          <span className="truncate">{label.name}</span>
          <CaretDown size={12} weight="bold" className="shrink-0 text-zinc-400" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
          <Drawer.Viewport className="fixed inset-0 z-50 pointer-events-none">
            <Drawer.Popup
              className="
                pointer-events-auto fixed inset-y-0 left-0 flex flex-col w-72 max-w-[85vw]
                bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 shadow-2xl
                transition-transform duration-300 ease-out
                [transform:translateX(var(--drawer-swipe-movement-x,0px))]
                data-[starting-style]:[transform:translateX(-100%)] data-[ending-style]:[transform:translateX(-100%)]
                data-[swiping]:transition-none
              "
            >
              <Drawer.Content className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-200 dark:border-zinc-900">
                  <Drawer.Title render={<div />}>
                    <Brand />
                  </Drawer.Title>
                  <Drawer.Close
                    aria-label="Close"
                    className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    <X size={18} weight="bold" />
                  </Drawer.Close>
                </div>
                <div className="flex-1 overflow-y-auto px-2 py-4">
                  <SiteLinks current={current} onNavigate={() => setOpen(false)} />
                  <IngredientList current={current} onNavigate={() => setOpen(false)} />
                </div>
                <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-900">
                  <ThemeToggle value={theme} onChange={onThemeChange} />
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
