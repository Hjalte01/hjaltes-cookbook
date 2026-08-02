import type { Language } from '../types/recipe'

interface Props {
  language: Language
  onChange: (language: Language) => void
  label: string
}

export function LanguageSwitcher({ language, onChange, label }: Props) {
  return (
    <div className="language-switcher" role="group" aria-label={label}>
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        English
      </button>
      <button
        type="button"
        className={language === 'da' ? 'active' : ''}
        aria-pressed={language === 'da'}
        onClick={() => onChange('da')}
      >
        Dansk
      </button>
    </div>
  )
}
