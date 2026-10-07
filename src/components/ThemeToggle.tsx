import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { Desktop, Moon, Sun } from '@phosphor-icons/react'
import type { Theme } from '../hooks/usePreference'

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Desktop },
  { value: 'dark', label: 'Dark', icon: Moon },
]

export function ThemeToggle({ value, onChange }: { value: Theme; onChange: (t: Theme) => void }) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(vals) => {
        if (vals.length > 0) onChange(vals[0] as Theme)
      }}
      aria-label="Color theme"
      className="flex w-full rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5"
    >
      {OPTIONS.map((o) => (
        <Toggle
          key={o.value}
          value={o.value}
          aria-label={o.label}
          className="
            flex-1 flex items-center justify-center gap-1 rounded-md py-1 text-xs cursor-pointer
            text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors
            data-[pressed]:bg-zinc-100 dark:data-[pressed]:bg-zinc-800 data-[pressed]:text-zinc-900 dark:data-[pressed]:text-zinc-100
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
          "
        >
          <o.icon size={14} weight="bold" />
          {o.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}
