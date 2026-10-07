export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // fallback: do nothing silently
  }
}

interface TextStep {
  title: string
  body: string
  temp?: string
  duration?: string
}

// "1. Heat the cream (185–190°F): Pour 2 cups…" lines for copied recipes
export function methodLines(steps: TextStep[]): string[] {
  return steps.map((s, i) => {
    const meta = [s.temp, s.duration].filter(Boolean).join(', ')
    return `${i + 1}. ${s.title}${meta ? ` (${meta})` : ''}: ${s.body}`
  })
}
