import { useState } from 'react'
import { findRecipeBySlug } from '../data/recipes'
import type { Language } from '../types/recipe'
import { ui } from '../i18n'
import { RecipeImage } from '../components/RecipeImage'

interface Props {
  language: Language
  slug: string
}

export function RecipePage({ language, slug }: Props) {
  const recipe = findRecipeBySlug(slug)
  const copy = ui[language]
  const [selected, setSelected] = useState<Set<string>>(() => new Set())

  if (!recipe) {
    return (
      <section className="not-found page-width">
        <p className="kicker">404</p>
        <h1>{copy.notFound}</h1>
        <p>{copy.notFoundText}</p>
        <a className="button" href="#/">← {copy.back}</a>
      </section>
    )
  }

  const toggleChoice = (groupId: string, itemId: string) => {
    const key = `${groupId}:${itemId}`
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <article className="recipe-page">
      <div className="recipe-hero page-width">
        <div className="recipe-hero-copy">
          <a className="back-link" href="#/">← {copy.back}</a>
          <div className="tag-list">
            {recipe.categories.map((category) => <span className="eyebrow" key={category.en}>{category[language]}</span>)}
          </div>
          <h1>{recipe.title[language]}</h1>
          <p className="recipe-deck">{recipe.description[language]}</p>
          <dl className="metadata">
            <div><dt>{copy.prep}</dt><dd>{recipe.prepTime[language]}</dd></div>
            <div><dt>{copy.cook}</dt><dd>{recipe.cookTime[language]}</dd></div>
            <div><dt>{copy.servings}</dt><dd>{recipe.servings[language]}</dd></div>
          </dl>
        </div>
        <RecipeImage
          key={recipe.image}
          path={recipe.image}
          alt={recipe.imageAlt[language]}
          fallbackLabel={copy.imageUnavailable}
          className="recipe-hero-image"
        />
      </div>

      <div className="recipe-content page-width">
        <div className="ingredients-column">
          {recipe.choiceGroups && (
            <section className="builder" aria-labelledby="builder-title">
              <p className="section-kicker">{copy.ingredients}</p>
              <h2 id="builder-title">{copy.buildSalad}</h2>
              <p className="section-intro">{copy.buildHelp}</p>
              <div className="builder-status" aria-live="polite">
                <span>{selected.size} {copy.selected}</span>
                {selected.size > 0 && <button type="button" onClick={() => setSelected(new Set())}>{copy.clearSelections}</button>}
              </div>
              <div className="choice-groups">
                {recipe.choiceGroups.map((group) => (
                  <section className="choice-group" key={group.id} aria-labelledby={`${group.id}-title`}>
                    <h3 id={`${group.id}-title`}>{group.title[language]}</h3>
                    {group.description && <p className="choice-description">{group.description[language]}</p>}
                    {group.selectionHint && <p className="selection-hint">{group.selectionHint[language]}</p>}
                    <div className="choice-list">
                      {group.items.map((item) => {
                        const key = `${group.id}:${item.id}`
                        const isSelected = selected.has(key)
                        return (
                          <button
                            type="button"
                            className={`choice-chip${isSelected ? ' selected' : ''}`}
                            aria-pressed={isSelected}
                            onClick={() => toggleChoice(group.id, item.id)}
                            key={item.id}
                          >
                            <span className="check" aria-hidden="true">{isSelected ? '✓' : '+'}</span>
                            <span>{item.name[language]}{item.optional ? <small>{copy.optional}</small> : null}</span>
                            {item.note && <small>{item.note[language]}</small>}
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          )}

          {recipe.ingredientSections?.map((section, sectionIndex) => (
            <section className="ingredient-section" key={section.id} aria-labelledby={`${section.id}-heading`}>
              {!recipe.choiceGroups && sectionIndex === 0 && <p className="section-kicker">{copy.ingredients}</p>}
              <h2 id={`${section.id}-heading`}>{section.title?.[language] ?? copy.ingredients}</h2>
              <ul className="ingredient-list">
                {section.ingredients.map((item) => (
                  <li key={item.id}>
                    <span>{item.name[language]}{item.note && <small>{item.note[language]}</small>}</span>
                    {item.amount && <strong>{item.amount[language]}</strong>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="method-column">
          <section aria-labelledby="instructions-heading">
            <p className="section-kicker">{language === 'en' ? 'Method' : 'Metode'}</p>
            <h2 id="instructions-heading">{copy.instructions}</h2>
            <ol className="instruction-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={instruction.en}><span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{instruction[language]}</p></li>
              ))}
            </ol>
          </section>

          {recipe.variations && (
            <section className="info-panel" aria-labelledby="variations-heading">
              <h2 id="variations-heading">{copy.variations}</h2>
              <ul>{recipe.variations.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
            </section>
          )}
          {recipe.notes && (
            <section className="info-panel note-panel" aria-labelledby="notes-heading">
              <h2 id="notes-heading">{copy.notes}</h2>
              <ul>{recipe.notes.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
            </section>
          )}
          {recipe.storage && (
            <section className="info-panel storage-panel" aria-labelledby="storage-heading">
              <h2 id="storage-heading">{copy.storage}</h2>
              <ul>{recipe.storage.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
            </section>
          )}
          {recipe.source && (
            <p>{language === 'en' ? 'Adapted from' : 'Tilpasset fra'} <a href={recipe.source.url}>{recipe.source.name}</a>.</p>
          )}
        </div>
      </div>
      <div className="recipe-bottom page-width"><a className="button secondary" href="#/">← {copy.back}</a></div>
    </article>
  )
}
