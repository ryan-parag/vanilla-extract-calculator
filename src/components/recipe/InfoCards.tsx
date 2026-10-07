import { Snowflake } from '@phosphor-icons/react'

interface Timing {
  active: string
  wait?: string
  waitNote?: string
}

export function TimingCard({ timing }: { timing: Timing }) {
  return (
    <div className="card p-4 w-full text-center space-y-3 break-inside-avoid">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Timing</p>
      <div className={`grid gap-3 ${timing.wait ? 'grid-cols-2 xl:grid-cols-1' : 'grid-cols-1'}`}>
        <div>
          <p className="text-lg font-bold text-accent-700 dark:text-accent-400 tabular-nums">{timing.active}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">hands-on</p>
        </div>
        {timing.wait && (
          <div>
            <p className="text-lg font-bold text-accent-700 dark:text-accent-400 tabular-nums">{timing.wait}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{timing.waitNote}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function StorageCard({ storage }: { storage: string }) {
  return (
    <div className="card p-4 w-full text-center space-y-2 break-inside-avoid">
      <p className="flex items-center justify-center gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        <Snowflake size={14} weight="bold" /> Storage
      </p>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{storage}</p>
    </div>
  )
}
