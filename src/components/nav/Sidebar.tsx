import { Brand } from './Brand'
import { IngredientList } from './IngredientList'
import { SiteLinks } from './SiteLinks'
import { ThemeToggle } from '../ThemeToggle'
import type { Theme } from '../../hooks/usePreference'

interface SidebarProps {
  current: string
  theme: Theme
  onThemeChange: (t: Theme) => void
}

// Desktop navigation (lg and up); MobileNav covers smaller screens
export function Sidebar({ current, theme, onThemeChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex print:!hidden flex-col w-60 shrink-0 sticky top-0 h-screen border-r border-zinc-200 dark:border-zinc-900">
      <div className="px-4 pt-6 pb-4">
        <Brand />
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <SiteLinks current={current} />
        <IngredientList current={current} />
      </div>
      <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-900">
        <ThemeToggle value={theme} onChange={onThemeChange} />
      </div>
    </aside>
  )
}
