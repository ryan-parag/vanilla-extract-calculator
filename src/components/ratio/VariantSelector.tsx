import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { Flask, Sparkle } from '@phosphor-icons/react'
import { CollapsibleCard } from '../CollapsibleCard'
import type { RecipeVariant } from '../../recipes/types'

interface VariantSelectorProps {
  heading: string
  variants: RecipeVariant[]
  value: string
  onChange: (id: string) => void
}

export function VariantSelector({ heading, variants, value, onChange }: VariantSelectorProps) {
  return (
    <CollapsibleCard title={heading} icon={<Flask size={20} weight="bold" />}>
      <ToggleGroup
        value={[value]}
        onValueChange={(vals) => {
          if (vals.length > 0) onChange(vals[0] as string)
        }}
        className="grid grid-cols-2 gap-2"
      >
        {variants.map((v) => (
          <Toggle key={v.id} value={v.id} aria-label={v.label} className="toggle-card relative">
            {v.recommended && (
              <div className="p-1 bg-accent-500/20 text-accent-700 dark:text-accent-500 absolute top-0 right-0 inline-flex items-center justify-center rounded-bl-md text-[10px] uppercase font-semibold tracking-wide gap-1">
                <Sparkle size={14} weight="bold" />
                Recommended
              </div>
            )}
            <div className="h-10 w-10 p-2 inline-flex items-center justify-center rounded-full text-xs font-bold bg-accent-500/20 text-accent-700 dark:text-accent-300 mb-1">
              <v.icon size={20} weight="bold" />
            </div>
            <p className="toggle-card__title">{v.label}</p>
            <p className="toggle-card__description">{v.description}</p>
          </Toggle>
        ))}
      </ToggleGroup>
    </CollapsibleCard>
  )
}
