# Hjalte’s Cookbook

A warm, bilingual personal recipe site built with React, TypeScript and Vite. It is completely static: recipes are TypeScript data, search happens in the browser, and deployment uses GitHub Pages.

English is the default language. The English/Danish switch is saved in the browser’s local storage.

## Run it locally

You need [Node.js](https://nodejs.org/) 22 or newer and npm. GitHub Actions builds the deployed site with Node.js 24.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173/hjaltes-cookbook/`). Changes update immediately.

Useful commands:

```bash
npm test          # Run interaction and search tests
npm run lint      # Check the TypeScript/React source
npm run build     # Type-check and create the production site in dist/
npm run preview   # Preview the production build locally
```

To serve the project at `/` during local development instead of the GitHub Pages subpath:

```bash
VITE_BASE_PATH=/ npm run dev
```

## Deploy to GitHub Pages

Deployment is automatic through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push the repository to `git@github.com:Hjalte01/hjaltes-cookbook.git` on the `main` branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`, or run the workflow manually from the **Actions** tab.

The exact commands for the normal deployment flow are:

```bash
git add .
git commit -m "Update cookbook"
git push origin main
```

For the first push from a newly initialized local folder, connect it once with:

```bash
git init
git branch -M main
git remote add origin git@github.com:Hjalte01/hjaltes-cookbook.git
git add .
git commit -m "Create Hjalte's Cookbook"
git push -u origin main
```

The action installs dependencies, runs tests and linting, builds the site, then publishes `dist/`. Vite’s base path is configured for `https://hjalte01.github.io/hjaltes-cookbook/` in [`vite.config.ts`](vite.config.ts).

Recipe URLs use hash routing, such as:

```text
https://hjalte01.github.io/hjaltes-cookbook/#/recipes/easy-everyday-wrap
```

The `#` is intentional. It makes direct links and browser refreshes work on GitHub Pages without a server or a custom 404 redirect.

## Add a normal recipe

All content is in [`src/data/recipes.ts`](src/data/recipes.ts), separate from the components. The reusable schema is in [`src/types/recipe.ts`](src/types/recipe.ts).

Keep every recipe concise: a short description, ingredients, and compact steps. Include essential timings and technique; skip long introductions, repeated advice, and unnecessary notes.

Add another object to the exported `recipes` array. A standard recipe looks like this:

```ts
{
  id: 'tomato-pasta',
  slug: 'tomato-pasta',
  title: text('Simple Tomato Pasta', 'Enkel tomatpasta'),
  description: text('A quick weeknight pasta.', 'En hurtig pasta til hverdagen.'),
  image: 'images/tomato-pasta.jpg',
  imageAlt: text('Tomato pasta in a shallow bowl', 'Tomatpasta i en flad skål'),
  prepTime: text('10 minutes', '10 minutter'),
  cookTime: text('20 minutes', '20 minutter'),
  servings: text('2', '2'),
  categories: [text('Dinner', 'Aftensmad')],
  tags: [text('Pasta', 'Pasta'), text('Quick', 'Hurtig')],
  ingredientSections: [{
    id: 'main',
    ingredients: [
      ingredient('pasta', 'Pasta', 'Pasta', '200 g', '200 g'),
    ],
  }],
  instructions: [
    text('Cook the pasta.', 'Kog pastaen.'),
  ],
}
```

Keep `id` and `slug` unique. Use lowercase words separated by hyphens for the slug. The URL is created automatically at `#/recipes/your-slug`, and the home page and search need no component changes.

## Add a customizable recipe

Use `choiceGroups` when ingredients should be selectable instead of one fixed list. Each group has an ID, a bilingual title, optional help text, and reusable ingredient-shaped items:

```ts
choiceGroups: [{
  id: 'protein',
  title: text('Choose a protein', 'Vælg en proteinkilde'),
  selectionHint: text('Select one or more.', 'Vælg én eller flere.'),
  items: [
    ingredient('tofu', 'Tofu', 'Tofu'),
    ingredient('beans', 'Beans', 'Bønner'),
  ],
}],
```

You can use `choiceGroups` together with ordinary `ingredientSections`, as the meal-prep salad does for its optional dressing. Selections are deliberately temporary and are reset when the page reloads.

## Add or edit translations

Every reader-facing recipe value uses `{ en, da }`, normally created with the small `text()` helper:

```ts
text('English text', 'Dansk tekst')
```

Add both languages for titles, descriptions, image alt text, times, ingredient names and notes, instructions, categories, tags, variations, notes and storage guidance. Interface translations such as button labels live in [`src/i18n.ts`](src/i18n.ts).

## Add or replace an image

Recipe images are static local files in [`public/images`](public/images). The starter artwork is original SVG placeholder art stored there; no external image host is used.

To replace one:

1. Add your `.jpg`, `.webp`, `.png` or `.svg` file to `public/images/`.
2. Change the recipe’s `image` field, for example to `images/my-salad.webp`.
3. Update both versions of `imageAlt` to describe the new photograph.
4. Run `npm run build` and check the card and recipe page.

Landscape images work best on cards. The layout crops with `object-fit: cover`, so keep the important food near the centre. If a file is missing or cannot load, the site shows an accessible fallback instead of a broken-image icon.

## Project structure

```text
public/images/             Local recipe artwork and photos
src/components/            Reusable layout, cards and image components
src/data/recipes.ts        All recipe content
src/lib/recipes.ts         Browser search logic
src/pages/                 Home and recipe views
src/types/recipe.ts        Reusable recipe data schema
src/i18n.ts                Interface translations
src/styles.css             Responsive visual design
.github/workflows/         GitHub Pages deployment
```

There is no backend, database, account system, API key or secret. Adding a recipe is a content-only edit unless the data model itself needs a new capability.
