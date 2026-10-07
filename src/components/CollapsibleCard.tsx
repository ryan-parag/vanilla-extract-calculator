import { useState, type ReactNode } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'

interface CollapsibleCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

// Same collapsible header used by FormulaSelector / FoldSelector / InputPanel
export function CollapsibleCard({ title, icon, children }: CollapsibleCardProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-3">
      <button
        aria-expanded={open}
        className="print:pointer-events-none px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition w-full flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center w-full gap-2">
          {icon}
          <span className="text-lg font-bold">{title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <CaretRight size={16} weight="bold" />
        </motion.div>
      </button>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="px-4 py-3"
        >
          {children}
        </motion.div>
      ) : (
        // Collapsed on screen, but still printed
        <div className="hidden print:block px-4 py-3">{children}</div>
      )}
    </div>
  )
}
