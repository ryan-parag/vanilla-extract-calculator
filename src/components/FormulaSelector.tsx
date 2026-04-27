import { useState } from 'react'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { FORMULAS, type Formula } from '../hooks/useVanillaCalc'
import { Flask } from '@phosphor-icons/react'
import { CaretRight, Sparkle } from '@phosphor-icons/react'
import { motion } from "motion/react"

interface FormulaSelectorProps {
  value: Formula
  onChange: (f: Formula) => void
}

const IconRender = ({ formula }: { formula: string }) => {

  const getIcon = (x: string) => {
    switch(x) {
      case "FDA Standard":
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_143_16565)"><path d="M1.23519 16.8275H0.147461V7.1876H9.71032C13.905 7.1876 14.5669 10.9558 14.5669 10.9558L16.9208 7.1876H19.3874L23.8961 14.4965L22.4837 16.8272H16.5385V15.6644H23.1882L18.1514 7.1875C18.1514 7.1875 14.8319 12.9636 14.1193 14.0888C13.4066 15.2141 12.0679 16.8269 9.77504 16.8269H6.2238V11.0881H7.34907V15.6641H9.93713C11.0817 15.6641 13.5379 14.6889 13.5379 11.932C13.5379 9.1752 10.9123 8.31252 10.0496 8.31252H1.23509V16.8267L1.23519 16.8275ZM1.61027 16.8275V12.7391H5.81118V13.8643H2.73549V16.8275H1.61022L1.61027 16.8275ZM5.81118 12.2514V11.0887H2.73549V9.85537H9.8129C10.8738 9.85537 12.0002 10.7136 12.0002 11.9701C12.0002 13.2266 10.8617 14.0893 10.0498 14.0893H8.94655V11.0886H7.78378V15.2146H10.0498C11.485 15.2146 13.1442 13.9689 13.1442 12.0076C13.1442 10.0651 11.6352 8.72562 9.83077 8.72562H1.61052V12.2514H5.81143L5.81118 12.2514ZM12.9938 16.8275L18.1514 8.31332L22.3898 15.2146H16.5388V14.0893H20.3271L18.1516 10.5448L14.5696 16.8276H12.9942L12.9938 16.8275Z" fill="currentColor"/></g><defs><clipPath id="clip0_143_16565"><rect width="24" height="9.89147" fill="currentColor" transform="translate(0 7.05469)"/></clipPath></defs></svg>
      case "Budget Grade A":
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M7.4 21.3746L6 19.9746L12 13.9746L18 19.9746L16.6 21.3746L12 16.7996L7.4 21.3746ZM7.4 15.3746L6 13.9746L12 7.97461L18 13.9746L16.6 15.3746L12 10.7996L7.4 15.3746ZM7.4 9.37461L6 7.97461L12 1.97461L18 7.97461L16.6 9.37461L12 4.79961L7.4 9.37461Z" fill="currentColor"/></svg>
      case "Home cooks":
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M9 14H11V9H9V14ZM5 12.5C4.23333 12.1167 3.625 11.5625 3.175 10.8375C2.725 10.1125 2.5 9.325 2.5 8.475C2.5 7.225 2.92917 6.16667 3.7875 5.3C4.64583 4.43333 5.7 4 6.95 4C7.15 4 7.35417 4.01667 7.5625 4.05C7.77083 4.08333 7.975 4.125 8.175 4.175C8.59167 3.49167 9.13333 2.95833 9.8 2.575C10.4667 2.19167 11.2 2 12 2C12.8 2 13.5333 2.19167 14.2 2.575C14.8667 2.95833 15.4083 3.49167 15.825 4.175C16.025 4.125 16.225 4.08333 16.425 4.05C16.625 4.01667 16.8333 4 17.05 4C18.3 4 19.3542 4.43333 20.2125 5.3C21.0708 6.16667 21.5 7.225 21.5 8.475C21.5 9.325 21.275 10.1125 20.825 10.8375C20.375 11.5625 19.7667 12.1167 19 12.5V18H5V12.5ZM13 14H15V9H13V14ZM7 16H17V11.275L18.1 10.725C18.5333 10.5083 18.875 10.2042 19.125 9.8125C19.375 9.42083 19.5 8.98333 19.5 8.5C19.5 7.8 19.2625 7.20833 18.7875 6.725C18.3125 6.24167 17.7333 6 17.05 6C16.8667 6 16.7 6.01667 16.55 6.05C16.4 6.08333 16.2417 6.125 16.075 6.175L14.9 6.5L14.125 5.2C13.8917 4.81667 13.5875 4.52083 13.2125 4.3125C12.8375 4.10417 12.4333 4 12 4C11.5667 4 11.1625 4.10417 10.7875 4.3125C10.4125 4.52083 10.1083 4.81667 9.875 5.2L9.1 6.5L7.9 6.175C7.73333 6.14167 7.57083 6.10417 7.4125 6.0625C7.25417 6.02083 7.09167 6 6.925 6C6.24167 6 5.66667 6.24167 5.2 6.725C4.73333 7.20833 4.5 7.8 4.5 8.5C4.5 8.98333 4.625 9.42083 4.875 9.8125C5.125 10.2042 5.46667 10.5083 5.9 10.725L7 11.275V16ZM5 18H7V20H17V18H19V22H5V18Z" fill="currentColor"/></svg>
      default:
        return null
    }
  }

  return getIcon(formula)
}

export function FormulaSelector({ value, onChange }: FormulaSelectorProps) {

  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-3">
      <button
        className="px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition w-full flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center w-full gap-2">
          <Flask size={20} weight="bold" />
          <span className="text-lg font-bold">
            Formula
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretRight size={16} weight="bold" />
        </motion.div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="px-4 py-3"
        >
          <ToggleGroup
            value={[value]}
            onValueChange={(vals) => {
              if (vals.length > 0) onChange(vals[0] as Formula)
            }}
            className="grid grid-cols-2 gap-2"
          >
            {(Object.entries(FORMULAS) as [Formula, typeof FORMULAS[Formula]][]).map(([key, f]) => (
              <Toggle
                key={key}
                value={key}
                aria-label={f.label}
                className="toggle-card relative"
              >
                {
                  f.recommended && (
                    <div className="p-1 bg-vanilla-500/20 text-vanilla-700 dark:text-vanilla-500 absolute top-0 right-0 inline-flex items-center justify-center rounded-bl-md text-[10px] uppercase font-semibold tracking-wide gap-1">
                      <Sparkle
                        size={14}
                        weight="bold"
                      />
                      Recommended
                    </div>
                  )
                }
                <div className="h-10 w-10 p-2 inline-flex items-center justify-center rounded-full text-xs font-bold bg-vanilla-500/20 text-vanilla-700 dark:text-vanilla-300 mb-1">
                  <IconRender formula={f.label} />
                </div>
                <p className="toggle-card__title">
                  {f.label}
                </p>
                <p className="toggle-card__description">{f.description}</p>
              </Toggle>
            ))}
          </ToggleGroup>
        </motion.div>
      )}
    </div>
  )
}
