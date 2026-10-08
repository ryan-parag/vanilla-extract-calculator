import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Flask, House, Info } from '@phosphor-icons/react'
import { useHashRoute } from './hooks/useHashRoute'
import { useThemePreference } from './hooks/usePreference'
import { findPage, heroImage } from './recipes'
import { applyPalette, vanilla } from './lib/palettes'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { VanillaPage } from './pages/VanillaPage'
import { RatioRecipePage } from './pages/RatioRecipePage'
import { Sidebar } from './components/nav/Sidebar'
import { MobileNav } from './components/nav/MobileNav'
import { SITE_NAME } from './components/nav/Brand'
import { fadeUp } from './lib/motion'

// Applies the light/system/dark preference, and always prints light
function useTheme() {
  const [theme, setTheme] = useThemePreference()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.documentElement.classList.toggle(
      'dark', theme === 'dark' || (theme === 'system' && media.matches),
    )
    const lightForPrint = () => document.documentElement.classList.remove('dark')
    apply()
    media.addEventListener('change', apply)
    window.addEventListener('beforeprint', lightForPrint)
    window.addEventListener('afterprint', apply)
    return () => {
      media.removeEventListener('change', apply)
      window.removeEventListener('beforeprint', lightForPrint)
      window.removeEventListener('afterprint', apply)
    }
  }, [theme])

  return [theme, setTheme] as const
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const route = useHashRoute()
  const page = findPage(route)
  // Anything that isn't a calculator or the about page goes home
  const view = page ? 'recipe' : route === 'about' ? 'about' : 'home'
  const current = page?.slug ?? (view === 'about' ? 'about' : '')

  useEffect(() => {
    document.title = page?.title ?? (view === 'about' ? `About · ${SITE_NAME}` : SITE_NAME)
    applyPalette(page?.accent ?? vanilla)
    // Hash changes keep the old scroll position; start each page at the top
    window.scrollTo(0, 0)
  }, [page, view])

  const mobileLabel = page
    ? { name: page.name, icon: page.icon }
    : view === 'about' ? { name: 'About', icon: Info } : { name: 'All calculators', icon: House }

  return (
    <div className="min-h-full w-full bg-white dark:bg-black transition-colors duration-300 lg:flex">
      <Sidebar current={current} theme={theme} onThemeChange={setTheme} />
      <MobileNav current={current} label={mobileLabel} theme={theme} onThemeChange={setTheme} />

      <div className="flex-1 min-w-0">
        {/* Keyed by route so each page eases in as you navigate */}
          {page && (
            <header className="mb-8">
              <div
                className={`relative w-full h-60 lg:h-80 overflow-hidden print:hidden bg-cover bg-center`}
                style={{ backgroundImage: `url(${heroImage(page)})` }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white dark:to-black" />
              </div>
              <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-8 pb-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                  {page.title}
                </h1>
                <p className="text-base lg:text-lg mt-1 lg:mt-2 text-zinc-500 dark:text-zinc-400">
                  {page.tagline}
                </p>
                {page.untested && (
                  <p className="mt-3 inline-flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-300 print:hidden">
                    <Flask size={16} weight="bold" className="mt-0.5 shrink-0" />
                    <span>
                      <strong className="font-bold">Untested ratio.</strong> {page.untested}{' '}
                      <a href="#/about" className="underline">How we test</a>
                    </span>
                  </p>
                )}
              </div>
            </header>
          )}

          {view === 'about' && (
            <header className="max-w-5xl mx-auto px-4 lg:px-8 pt-8 pb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                About
              </h1>
              <p className="text-base lg:text-lg mt-1 lg:mt-2 text-zinc-500 dark:text-zinc-400">
                What this is, where the numbers come from, and how much to trust them
              </p>
            </header>
          )}
          <motion.div
            key={current || 'home'}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto px-4 lg:px-8 py-8"
          >
            <main>
              {page?.kind === 'vanilla' && <VanillaPage />}
              {page?.kind === 'ratio' && <RatioRecipePage key={page.slug} slug={page.slug} name={page.name} recipe={page.recipe} />}
              {view === 'about' && <AboutPage />}
              {view === 'home' && <HomePage />}
            </main>

            {page?.source && (
              <footer className="mt-8 text-xs text-zinc-600 dark:text-zinc-400">
                Formulas based on{' '}
                <a
                  href={page.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-zinc-600 dark:text-zinc-400 hover:text-accent-600 dark:hover:text-accent-500"
                >
                  {page.source.label}
                </a>
              </footer>
            )}
          </motion.div>
      </div>
    </div>
  )
}
