import type { Language, Recipe } from '../types/recipe'
import { ui } from '../i18n'
import { RecipeImage } from './RecipeImage'

interface Props {
  recipe: Recipe
  language: Language
}

export function RecipeCard({ recipe, language }: Props) {
  const copy = ui[language]
  return (
    <article className="recipe-card">
      <a href={`#/recipes/${recipe.slug}`} className="card-image-link" aria-label={`${copy.viewRecipe}: ${recipe.title[language]}`}>
        <RecipeImage
          path={recipe.image}
          alt={recipe.imageAlt[language]}
          fallbackLabel={copy.imageUnavailable}
          className="card-image"
        />
      </a>
      <div className="card-body">
        <div className="tag-list" aria-label={recipe.categories.map((category) => category[language]).join(', ')}>
          {recipe.categories.map((category) => <span className="eyebrow" key={category.en}>{category[language]}</span>)}
        </div>
        <h2><a href={`#/recipes/${recipe.slug}`}>{recipe.title[language]}</a></h2>
        <p>{recipe.description[language]}</p>
        <div className="card-footer">
          <span className="time"><span aria-hidden="true">◷</span> {recipe.prepTime[language]}</span>
          <a className="text-link" href={`#/recipes/${recipe.slug}`}>{copy.viewRecipe}<span aria-hidden="true"> →</span></a>
        </div>
      </div>
    </article>
  )
}
