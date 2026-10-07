// Calculator inputs live in the hash query (#/butter?v=cultured&a=2&u=cup) so any
// batch can be shared as a link.

export function parseHash(hash = window.location.hash) {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?')
  return { path, params: new URLSearchParams(query) }
}

export function readParams(): URLSearchParams {
  return parseHash().params
}

// replaceState doesn't fire hashchange, so updating the link never re-routes
export function writeParams(values: Record<string, string | number>) {
  const { path } = parseHash()
  const query = new URLSearchParams(Object.entries(values).map(([k, v]) => [k, String(v)])).toString()
  const next = `#/${path}${query ? `?${query}` : ''}`
  if (next !== window.location.hash) history.replaceState(history.state, '', next)
}

// Number from the link, if it's a usable amount
export function numberParam(params: URLSearchParams, key: string): number | undefined {
  const n = Number(params.get(key))
  return params.has(key) && Number.isFinite(n) && n >= 0 ? n : undefined
}

// String from the link, if it's one of the allowed values
export function oneOf<T extends string>(params: URLSearchParams, key: string, allowed: readonly T[]): T | undefined {
  const v = params.get(key)
  return allowed.includes(v as T) ? v as T : undefined
}
