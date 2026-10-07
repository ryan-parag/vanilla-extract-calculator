import { Lightbulb, Warning } from '@phosphor-icons/react'

export function RecipeNotes({ tips, warnings = [] }: { tips: string[]; warnings?: string[] }) {
  return (
    <>
      {warnings.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 space-y-1 break-inside-avoid">
          <p className="flex items-center gap-1 text-sm font-bold text-amber-800 dark:text-amber-400">
            <Warning size={16} weight="bold" /> Food safety
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800 dark:text-amber-300">
            {warnings.map(w => <li key={w}>{w}</li>)}
          </ul>
        </div>
      )}

      {tips.length > 0 && (
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 space-y-1 break-inside-avoid">
          <p className="flex items-center gap-1 text-sm font-bold text-blue-800 dark:text-blue-400">
            <Lightbulb size={16} weight="bold" /> Tips
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-300">
            {tips.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      )}
    </>
  )
}
