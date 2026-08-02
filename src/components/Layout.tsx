import { useEffect, type ReactNode } from 'react'
import type { Language } from '../types/recipe'
import { ui } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

interface Props {
  language: Language
  onLanguageChange: (language: Language) => void
  route: string
  children: ReactNode
}

export function Layout({ language, onLanguageChange, route, children }: Props) {
  const copy = ui[language]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#/" aria-label={`${copy.home} — Hjalte’s Cookbook`}>
            <span className="brand-mark" aria-hidden="true">H</span>
            <span>Hjalte’s Cookbook</span>
          </a>
          <div className="header-actions">
            <nav aria-label={copy.primaryNav}><a href="#/">{copy.home}</a></nav>
            <LanguageSwitcher language={language} onChange={onLanguageChange} label={copy.language} />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Hjalte’s Cookbook</span>
        <span>{copy.footer}</span>
      </footer>
    </div>
  )
}
