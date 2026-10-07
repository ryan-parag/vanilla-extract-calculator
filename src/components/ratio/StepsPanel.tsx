import { ListNumbers, Thermometer, Timer } from '@phosphor-icons/react'
import { CollapsibleCard } from '../CollapsibleCard'
import type { Step } from '../../recipes/types'

const chipCls = 'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold'

export function StepsPanel({ steps }: { steps: Step[] }) {
  return (
    <CollapsibleCard title="Method" icon={<ListNumbers size={20} weight="bold" />}>
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <div className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-full text-xs font-bold bg-accent-500/20 text-accent-700 dark:text-accent-300">
              {i + 1}
            </div>
            <div className="space-y-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.title}</p>
                {s.temp && (
                  <span className={`${chipCls} bg-red-500/10 text-red-700 dark:text-red-400`}>
                    <Thermometer size={12} weight="bold" />
                    {s.temp}
                  </span>
                )}
                {s.duration && (
                  <span className={`${chipCls} bg-blue-500/10 text-blue-700 dark:text-blue-400`}>
                    <Timer size={12} weight="bold" />
                    {s.duration}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </CollapsibleCard>
  )
}
