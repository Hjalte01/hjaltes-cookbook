export type Language = 'en' | 'da'

export type LocalizedText = Record<Language, string>

export interface Ingredient {
  id: string
  name: LocalizedText
  amount?: LocalizedText
  note?: LocalizedText
}

export interface IngredientSection {
  id: string
  title?: LocalizedText
  ingredients: Ingredient[]
}

export interface ChoiceItem extends Ingredient {
  optional?: boolean
}

export interface IngredientChoiceGroup {
  id: string
  title: LocalizedText
  description?: LocalizedText
  selectionHint?: LocalizedText
  items: ChoiceItem[]
}

export interface Recipe {
  id: string
  slug: string
  title: LocalizedText
  description: LocalizedText
  image: string
  imageAlt: LocalizedText
  prepTime: LocalizedText
  cookTime: LocalizedText
  servings: LocalizedText
  categories: LocalizedText[]
  tags: LocalizedText[]
  ingredientSections?: IngredientSection[]
  choiceGroups?: IngredientChoiceGroup[]
  instructions: LocalizedText[]
  notes?: LocalizedText[]
  storage?: LocalizedText[]
  variations?: LocalizedText[]
}
