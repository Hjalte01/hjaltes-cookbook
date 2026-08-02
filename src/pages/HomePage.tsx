import { useMemo, useState } from 'react'
import type { Language } from '../types/recipe'
import { recipes } from '../data/recipes'
import { filterRecipes } from '../lib/recipes'
import { ui } from '../i18n'
import { RecipeCard } from '../components/RecipeCard'

interface Props {
  language: Language
}

export function HomePage({ language }: Props) {
  const copy = ui[language]
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('')

  const filters = useMemo(() => Array.from(
    new Map(recipes.flatMap((recipe) => recipe.categories).map((category) => [category.en, category])).values(),
  ), [])

  const matches = useMemo(
    () => filterRecipes(recipes, language, query, activeFilter),
    [language, query, activeFilter],
  )

  const clear = () => {
    setQuery('')
    setActiveFilter('')
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="kicker">{language === 'en' ? 'A personal recipe collection' : 'En personlig opskriftssamling'}</p>
          <h1>Hjalte’s <em>Cookbook</em></h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="search-wrap">
            <label htmlFor="recipe-search">{copy.searchLabel}</label>
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                id="recipe-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-index" aria-labelledby="recipe-heading">
        <div className="index-topline">
          <div>
            <p className="section-kicker">{language === 'en' ? 'From my kitchen' : 'Fra mit køkken'}</p>
            <h2 id="recipe-heading">{copy.home}</h2>
          </div>
          <p className="result-count" aria-live="polite">
            {matches.length} {matches.length === 1 ? copy.oneRecipe : copy.recipes}
          </p>
        </div>

        <div className="filter-row" role="group" aria-label={copy.filtersLabel}>
          <button className={!activeFilter ? 'active' : ''} aria-pressed={!activeFilter} onClick={() => setActiveFilter('')}>
            {copy.all}
          </button>
          {filters.map((filter) => (
            <button
              key={filter.en}
              className={activeFilter === filter.en ? 'active' : ''}
              aria-pressed={activeFilter === filter.en}
              onClick={() => setActiveFilter(filter.en)}
            >
              {filter[language]}
            </button>
          ))}
        </div>

        {matches.length ? (
          <div className="recipe-grid">
            {matches.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} language={language} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>{copy.noResults}</h3>
            <p>{copy.noResultsHint}</p>
            <button type="button" className="button" onClick={clear}>{copy.clearSearch}</button>
          </div>
        )}
      </section>
    </>
  )
}
