import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Check, Copy, Link, Printer } from '@phosphor-icons/react'
import { copyText } from '../../lib/recipeActions'

const buttonCls = `
  transition flex items-center justify-center w-full py-2 px-2 gap-1 m-0 outline-0 border border-zinc-200 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-900 font-bold text-sm text-zinc-900 dark:text-white select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] active:border-t-zinc-300 focus-visible:outline-2 focus-visible:outline-accent-800 focus-visible:-outline-offset-1
`

// Copy recipe / Copy link / Print, with a moment of "Copied" feedback
export function RecipeActions({ recipeText }: { recipeText: () => string }) {
  const [copied, setCopied] = useState<'recipe' | 'link' | null>(null)

  async function copy(kind: 'recipe' | 'link') {
    await copyText(kind === 'recipe' ? recipeText() : window.location.href)
    setCopied(kind)
    setTimeout(() => setCopied(c => (c === kind ? null : c)), 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pt-1 print:hidden">
      <Button onClick={() => copy('recipe')} className={buttonCls}>
        {copied === 'recipe' ? <Check size={16} weight="bold" /> : <Copy size={16} weight="regular" />}
        {copied === 'recipe' ? 'Copied' : 'Copy recipe'}
      </Button>
      <Button onClick={() => copy('link')} className={buttonCls}>
        {copied === 'link' ? <Check size={16} weight="bold" /> : <Link size={16} weight="regular" />}
        {copied === 'link' ? 'Copied' : 'Copy link'}
      </Button>
      <Button onClick={() => window.print()} className={buttonCls}>
        <Printer size={16} weight="regular" />
        Print
      </Button>
    </div>
  )
}
