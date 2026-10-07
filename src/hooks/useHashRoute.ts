import { useEffect, useState } from 'react'
import { parseHash } from '../lib/urlState'

// Hash routing (#/mascarpone) works on any static host without rewrite rules.
// Returns just the path; calculator inputs in the query are read by each page.
export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash().path)

  useEffect(() => {
    const onChange = () => setRoute(parseHash().path)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
