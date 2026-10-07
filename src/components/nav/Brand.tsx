import Logo from '../Logo'

export const SITE_NAME = 'Pantry Calculators'

export function Brand() {
  return (
    <a href="#/" className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400">
      <span className="relative inline-flex h-8 w-8 shrink-0 p-0 rounded-lg overflow-hidden bg-black border border-zinc-300 dark:border-zinc-800 shadow-xs shadow-accent-500/40">
        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        <Logo />
      </span>
      <span className="font-bold text-zinc-950 dark:text-white tracking-tight">{SITE_NAME}</span>
    </a>
  )
}
