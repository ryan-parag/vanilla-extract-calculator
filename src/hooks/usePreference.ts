import { useCallback, useSyncExternalStore } from 'react'
import { loadJson, saveJson } from '../lib/storage'
import type { MeasureSystem } from '../lib/kitchenUnits'

// Site-wide preferences, shared by every page and kept in the browser
const listeners = new Set<() => void>()
const cache = new Map<string, unknown>()

function read<T>(key: string, fallback: T): T {
  if (!cache.has(key)) cache.set(key, loadJson<T>(key) ?? fallback)
  return cache.get(key) as T
}

function usePreference<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => read(key, fallback),
  )
  const set = useCallback((next: T) => {
    cache.set(key, next)
    saveJson(key, next)
    listeners.forEach(l => l())
  }, [key])
  return [value, set] as const
}

export function useMeasureSystem() {
  return usePreference<MeasureSystem>('measureSystem', 'us')
}

export type Theme = 'light' | 'system' | 'dark'

// Carry over the old on/off setting from before there was a "system" option
const legacyDark = loadJson<boolean>('darkMode')
const defaultTheme: Theme = legacyDark === undefined ? 'system' : legacyDark ? 'dark' : 'light'

export function useThemePreference() {
  return usePreference<Theme>('theme', defaultTheme)
}
