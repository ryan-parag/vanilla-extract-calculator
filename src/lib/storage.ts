// localStorage can throw (private mode, blocked site data), so every access is guarded

export function loadJson<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? undefined : JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

export function saveJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Preferences are a convenience; carry on without them
  }
}
