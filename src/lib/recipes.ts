import type { Language, Recipe } from '../types/recipe'

const normalize = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

export const recipeSearchText = (recipe: Recipe, language: Language) => {
  const localized = (value: Record<Language, string>) => value[language]
  const ingredients = recipe.ingredientSections?.flatMap((section) =>
    section.ingredients.flatMap((item) => [localized(item.name), item.note ? localized(item.note) : '']),
  ) ?? []
  const choices = recipe.choiceGroups?.flatMap((group) => [
    localized(group.title),
    localized(group.description ?? { en: '', da: '' }),
    ...group.items.flatMap((item) => [localized(item.name), item.note ? localized(item.note) : '']),
  ]) ?? []

  return normalize([
    localized(recipe.title),
    localized(recipe.description),
    ...recipe.categories.map(localized),
    ...recipe.tags.map(localized),
    ...ingredients,
    ...choices,
  ].join(' '))
}

export const filterRecipes = (
  recipes: Recipe[],
  language: Language,
  query: string,
  filter: string,
) => {
  const normalizedQuery = normalize(query)
  return recipes.filter((recipe) => {
    const matchesQuery = !normalizedQuery || recipeSearchText(recipe, language).includes(normalizedQuery)
    const labels = [...recipe.categories, ...recipe.tags].flatMap((label) => [label.en, label.da])
    return matchesQuery && (!filter || labels.includes(filter))
  })
}
