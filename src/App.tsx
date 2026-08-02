import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'
import type { Language } from './types/recipe'

const LANGUAGE_KEY = 'hjaltes-cookbook-language'

const getHashRoute = () => window.location.hash.replace(/^#/, '') || '/'

function getInitialLanguage(): Language {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'da' ? 'da' : 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [route, setRoute] = useState(getHashRoute)

  useEffect(() => {
    const updateRoute = () => setRoute(getHashRoute())
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem(LANGUAGE_KEY, language)
    } catch {
      // The site still works if storage is disabled.
    }
  }, [language])

  const recipeMatch = route.match(/^\/recipes\/([^/]+)\/?$/)

  return (
    <Layout language={language} onLanguageChange={setLanguage} route={route}>
      {recipeMatch
        ? <RecipePage language={language} slug={decodeURIComponent(recipeMatch[1])} />
        : <HomePage language={language} />}
    </Layout>
  )
}
