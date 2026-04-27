import type { Fold } from '../hooks/useVanillaCalc'

interface JarVisualProps {
  fold: Fold
  formula: string
}

const FOLD_CONFIG: Record<number, { fillPercent: number; liquidColor: string; labelColor: string; label: string }> = {
  1:   { fillPercent: 30, liquidColor: '#d4a847', labelColor: '#92400e', label: 'Light Amber' },
  1.5: { fillPercent: 52, liquidColor: '#b8832a', labelColor: '#78350f', label: 'Golden Amber' },
  2:   { fillPercent: 70, liquidColor: '#8b5e1a', labelColor: '#451a03', label: 'Deep Amber' },
  3:   { fillPercent: 90, liquidColor: '#4a2c0a', labelColor: '#1c0a00', label: 'Dark Mahogany' },
}

export function JarVisual({ fold }: JarVisualProps) {
  const config = FOLD_CONFIG[fold] ?? FOLD_CONFIG[1]
  const { fillPercent, liquidColor, label } = config

  // SVG jar dimensions
  const jarH = 160
  const jarW = 100
  const neckH = 24
  const neckW = 60
  const bodyH = jarH - neckH - 10
  const liquidH = (bodyH * fillPercent) / 100

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={jarW + 20} height={jarH + 20} viewBox={`0 0 ${jarW + 20} ${jarH + 20}`} className="drop-shadow-lg">
        <defs>
          <clipPath id="jarBody">
            <path d={`
              M${(jarW - neckW) / 2 + 10},10
              Q${(jarW - neckW) / 2 + 10},10 ${(jarW - neckW) / 2 + 10},${neckH + 10}
              Q${(jarW - neckW) / 2},${neckH + 20 + 10} 10,${neckH + 30 + 10}
              L10,${jarH + 5}
              Q10,${jarH + 15} 20,${jarH + 15}
              L${jarW},${jarH + 15}
              Q${jarW + 10},${jarH + 15} ${jarW + 10},${jarH + 5}
              L${jarW + 10},${neckH + 30 + 10}
              Q${jarW - (jarW - neckW) / 2 + 10},${neckH + 20 + 10} ${jarW - (jarW - neckW) / 2 + 10},${neckH + 10}
              L${jarW - (jarW - neckW) / 2 + 10},10
              Z
            `} />
          </clipPath>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={liquidColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={liquidColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={liquidColor} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="jarGlassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="30%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Jar body outline */}
        <path
          d={`
            M${(jarW - neckW) / 2 + 10},10
            Q${(jarW - neckW) / 2 + 10},10 ${(jarW - neckW) / 2 + 10},${neckH + 10}
            Q${(jarW - neckW) / 2},${neckH + 20 + 10} 10,${neckH + 30 + 10}
            L10,${jarH + 5}
            Q10,${jarH + 15} 20,${jarH + 15}
            L${jarW},${jarH + 15}
            Q${jarW + 10},${jarH + 15} ${jarW + 10},${jarH + 5}
            L${jarW + 10},${neckH + 30 + 10}
            Q${jarW - (jarW - neckW) / 2 + 10},${neckH + 20 + 10} ${jarW - (jarW - neckW) / 2 + 10},${neckH + 10}
            L${jarW - (jarW - neckW) / 2 + 10},10
            Z
          `}
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(180,140,80,0.5)"
          strokeWidth="2"
          className="dark:stroke-vanilla-600/60"
        />

        {/* Liquid fill */}
        <g clipPath="url(#jarBody)">
          <rect
            x="0"
            y={jarH + 15 - liquidH}
            width={jarW + 20}
            height={liquidH}
            fill="url(#liquidGrad)"
            className="transition-all duration-700 ease-in-out"
          />
        </g>

        {/* Glass shine overlay */}
        <path
          d={`
            M${(jarW - neckW) / 2 + 10},10
            Q${(jarW - neckW) / 2 + 10},10 ${(jarW - neckW) / 2 + 10},${neckH + 10}
            Q${(jarW - neckW) / 2},${neckH + 20 + 10} 10,${neckH + 30 + 10}
            L10,${jarH + 5}
            Q10,${jarH + 15} 20,${jarH + 15}
            L${jarW},${jarH + 15}
            Q${jarW + 10},${jarH + 15} ${jarW + 10},${jarH + 5}
            L${jarW + 10},${neckH + 30 + 10}
            Q${jarW - (jarW - neckW) / 2 + 10},${neckH + 20 + 10} ${jarW - (jarW - neckW) / 2 + 10},${neckH + 10}
            L${jarW - (jarW - neckW) / 2 + 10},10
            Z
          `}
          fill="url(#jarGlassGrad)"
        />

        {/* Lid */}
        <rect
          x={(jarW - neckW) / 2 + 5}
          y="2"
          width={neckW + 10}
          height="12"
          rx="4"
          fill="#78350f"
          className="dark:fill-vanilla-800"
        />
        <rect
          x={(jarW - neckW) / 2 + 8}
          y="4"
          width={neckW + 4}
          height="8"
          rx="3"
          fill="#92400e"
          className="dark:fill-vanilla-700"
        />
      </svg>

      <div className="text-center">
        <p className="text-xs font-medium text-vanilla-700 dark:text-vanilla-400">{label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{fillPercent}% intensity</p>
      </div>
    </div>
  )
}
