interface DarkModeToggleProps {
  dark: boolean
  onToggle: () => void
}

export function DarkModeToggle({ dark, onToggle }: DarkModeToggleProps) {
  return (
    <>
      <div className="inline-flex items-center gap-1">
        <button
          className={`text-xs text-zinc-600 dark:text-zinc-400 ${dark ? 'font-normal hover:text-vanilla-500 dark:hover:text-vanilla-300 hover:underline' : 'underline font-semibold'}`}
          onClick={onToggle}
        >
          Light
        </button>
        <button
          className={`text-xs text-zinc-600 dark:text-zinc-400 ${!dark ? 'font-normal hover:text-vanilla-600 dark:hover:text-vanilla-300 hover:underline' : 'underline font-semibold'}`}
          onClick={onToggle}
        >
          Dark
        </button>
      </div>
    </>
  )
}
