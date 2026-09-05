import type { Ingredient, LocalizedText, Recipe } from '../types/recipe'

const text = (en: string, da: string): LocalizedText => ({ en, da })

const ingredient = (
  id: string,
  en: string,
  da: string,
  amountEn?: string,
  amountDa?: string,
  noteEn?: string,
  noteDa?: string,
): Ingredient => ({
  id,
  name: text(en, da),
  ...(amountEn && amountDa ? { amount: text(amountEn, amountDa) } : {}),
  ...(noteEn && noteDa ? { note: text(noteEn, noteDa) } : {}),
})

export const recipes: Recipe[] = [
  {
    id: 'samosas',
    slug: 'samosas',
    title: text('Samosas', 'Samosaer'),
    description: text('Crisp parcels with spiced potato and peas.', 'Sprøde trekanter med krydrede kartofler og ærter.'),
    image: 'images/samosas.svg',
    imageAlt: text('Illustrated golden samosas on a plate with green chutney', 'Illustrerede gyldne samosaer på en tallerken med grøn chutney'),
    prepTime: text('About 50 minutes, including resting', 'Ca. 50 minutter, inkl. hviletid'),
    cookTime: text('20–30 minutes', '20–30 minutter'),
    servings: text('16 samosas', '16 samosaer'),
    categories: [text('Snack', 'Snack')],
    tags: [text('Indian', 'Indisk'), text('Vegan', 'Vegansk')],
    source: { name: 'Den Kinesiske Købmand', url: 'https://www.denkinesiskekoebmand.dk/opskrift?id_cookbook=20' },
    ingredientSections: [
      {
        id: 'dough',
        title: text('Dough', 'Dej'),
        ingredients: [
          ingredient('flour', 'Plain flour', 'Hvedemel', '250 g', '250 g'),
          ingredient('dough-salt', 'Salt', 'Salt', '1 tsp', '1 tsk.'),
          ingredient('dough-oil', 'Oil', 'Olie', '2 tbsp', '2 spsk.'),
          ingredient('water', 'Water', 'Vand', '120 ml', '120 ml'),
        ],
      },
      {
        id: 'filling',
        title: text('Filling', 'Fyld'),
        ingredients: [
          ingredient('potatoes', 'Large potatoes, boiled and mashed', 'Store kartofler, kogte og mosede', '2', '2'),
          ingredient('peas', 'Peas', 'Ærter', '100 g', '100 g'),
          ingredient('onion', 'Onion, finely chopped', 'Løg, finthakket', '1', '1'),
          ingredient('garlic', 'Garlic, finely chopped', 'Hvidløg, finthakket', '2 cloves', '2 fed'),
          ingredient('ginger', 'Fresh ginger, grated', 'Frisk ingefær, revet', '1 tsp', '1 tsk.'),
          ingredient('garam-masala', 'Garam masala', 'Garam masala', '1 tsp', '1 tsk.'),
          ingredient('cumin', 'Cumin', 'Spidskommen', '1 tsp', '1 tsk.'),
          ingredient('chilli', 'Chilli powder', 'Chilipulver', '½ tsp', '½ tsk.'),
          ingredient('filling-salt', 'Salt', 'Salt', 'To taste', 'Efter smag'),
          ingredient('frying-oil', 'Oil', 'Olie', 'For sautéing and deep-frying', 'Til stegning og friture'),
        ],
      },
    ],
    instructions: [
      text('Mix flour, salt and oil; gradually add water to form a firm dough. Knead 5–7 minutes, cover and rest 30 minutes.', 'Bland mel, salt og olie; tilsæt vand gradvist til en fast dej. Ælt 5–7 minutter, dæk til og hvil 30 minutter.'),
      text('Soften onion, garlic and ginger in a little oil. Stir in potatoes, peas, spices and salt; let cool.', 'Steg løg, hvidløg og ingefær bløde i lidt olie. Vend kartofler, ærter, krydderier og salt i; afkøl.'),
      text('Divide dough into 8 balls. Roll each into a thin circle and cut in half.', 'Del dejen i 8 kugler. Rul hver til en tynd cirkel, og skær den over.'),
      text('Fold each semicircle into a cone, overlapping and sealing the straight edge with water. Add about 1 tbsp filling; moisten and pinch the opening shut.', 'Fold hver halvcirkel til en kegle; lad den lige kant overlappe, og luk med vand. Kom ca. 1 spsk. fyld i; fugt og klem åbningen sammen.'),
      text('Deep-fry in batches until golden and crisp. Drain on kitchen paper; serve with chutney.', 'Frituresteg i hold til gyldne og sprøde. Lad dryppe af på køkkenrulle; servér med chutney.'),
    ],
    variations: [
      text('Oven: brush with oil and bake at 200°C for 25–30 minutes, until golden.', 'Ovn: pensl med olie, og bag ved 200 °C i 25–30 minutter til gyldne.'),
    ],
  },
  {
    id: 'meal-prep-salad',
    slug: 'meal-prep-salad',
    title: text("Hjalte’s Customizable Meal-Prep Salad", 'Hjaltes valgfri meal-prep-salat'),
    description: text(
      'Build a satisfying salad from what you have, then store each part so lunch stays fresh.',
      'Byg en mættende salat af det, du har, og opbevar delene, så frokosten holder sig frisk.',
    ),
    image: 'images/meal-prep-salad.svg',
    imageAlt: text(
      'Illustrated bowl of leafy salad with grains, tomatoes and walnuts',
      'Illustreret skål med grøn salat, korn, tomater og valnødder',
    ),
    prepTime: text('20 minutes', '20 minutter'),
    cookTime: text('0–30 minutes', '0–30 minutter'),
    servings: text('As many as you prepare', 'Så mange som du forbereder'),
    categories: [text('Lunch', 'Frokost'), text('Meal prep', 'Meal prep')],
    tags: [text('Customizable', 'Valgfri'), text('Salad', 'Salat'), text('High-protein', 'Proteinrig')],
    choiceGroups: [
      {
        id: 'leafy-base',
        title: text('Choose a leafy base', 'Vælg en grøn base'),
        selectionHint: text('Choose one or combine a few.', 'Vælg én eller bland flere.'),
        items: [
          ingredient('spinach', 'Spinach', 'Spinat'),
          ingredient('mixed-leaves', 'Mixed salad leaves', 'Blandede salatblade'),
          ingredient('kale', 'Kale', 'Grønkål'),
        ],
      },
      {
        id: 'starchy-base',
        title: text('Choose a grain or starchy base', 'Vælg en korn- eller stivelsesbase'),
        description: text(
          'Bulgur and quinoa must be cooked before use.',
          'Bulgur og quinoa skal koges før brug.',
        ),
        items: [
          ingredient('bulgur', 'Bulgur', 'Bulgur', undefined, undefined, 'Cook before use', 'Koges før brug'),
          ingredient('quinoa', 'Quinoa', 'Quinoa', undefined, undefined, 'Cook before use', 'Koges før brug'),
          ingredient('potatoes', 'Cooked potatoes', 'Kogte kartofler'),
        ],
      },
      {
        id: 'legumes',
        title: text('Choose one or more legumes', 'Vælg én eller flere bælgfrugter'),
        description: text(
          'Drain and rinse canned beans and lentils. Corn is an optional vegetable/starchy addition—not a legume.',
          'Dræn og skyl bønner og linser fra dåse. Majs er et valgfrit grøntsags-/stivelsestilbehør—ikke en bælgfrugt.',
        ),
        items: [
          ingredient('lentils', 'Lentils', 'Linser'),
          ingredient('kidney-beans', 'Kidney beans', 'Kidneybønner'),
          ingredient('chickpeas', 'Chickpeas', 'Kikærter'),
          { ...ingredient('corn', 'Corn', 'Majs'), optional: true },
        ],
      },
      {
        id: 'protein',
        title: text('Choose a primary protein', 'Vælg en primær proteinkilde'),
        selectionHint: text('Select one or more.', 'Vælg én eller flere.'),
        items: [
          ingredient('chicken', 'Roasted chicken', 'Stegt kylling'),
          ingredient('falafel', 'Falafel', 'Falafel'),
          ingredient('eggs', 'Hard-boiled eggs', 'Hårdkogte æg'),
          ingredient('salmon', 'Smoked salmon', 'Røget laks'),
        ],
      },
      {
        id: 'vegetables',
        title: text('Choose vegetables', 'Vælg grøntsager'),
        items: [
          ingredient('cucumber', 'Cucumber', 'Agurk'),
          ingredient('tomatoes', 'Whole or cherry tomatoes', 'Hele tomater eller cherrytomater'),
          ingredient('pepper', 'Bell pepper', 'Peberfrugt'),
          ingredient('carrot', 'Carrot', 'Gulerod'),
          { ...ingredient('other-vegetables', 'Other vegetables you enjoy', 'Andre grøntsager, du kan lide'), optional: true },
        ],
      },
      {
        id: 'toppings',
        title: text('Choose healthy fats and toppings', 'Vælg sunde fedtstoffer og toppings'),
        items: [
          ingredient('walnuts', 'Walnuts', 'Valnødder'),
          ingredient('other-nuts', 'Other nuts', 'Andre nødder'),
          ingredient('olive-oil', 'Extra-virgin olive oil', 'Ekstra jomfruolivenolie'),
        ],
      },
    ],
    ingredientSections: [
      {
        id: 'dressing',
        title: text('Optional simple dressing', 'Valgfri, enkel dressing'),
        ingredients: [
          ingredient('dressing-oil', 'Extra-virgin olive oil', 'Ekstra jomfruolivenolie', '2 parts', '2 dele'),
          ingredient('acid', 'Lemon juice or balsamic vinegar', 'Citronsaft eller balsamicoeddike', '1 part', '1 del'),
          ingredient('salt', 'Salt', 'Salt', 'To taste', 'Efter smag'),
          ingredient('black-pepper', 'Black pepper', 'Sort peber', 'To taste', 'Efter smag'),
        ],
      },
    ],
    instructions: [
      text('Cook the bulgur, quinoa or potatoes if using, then let them cool.', 'Kog bulgur, quinoa eller kartofler, hvis du bruger dem, og lad dem køle af.'),
      text('Drain and rinse canned legumes well.', 'Dræn og skyl bælgfrugter fra dåse grundigt.'),
      text('Prepare your selected protein and let hot ingredients cool before packing.', 'Tilbered den valgte proteinkilde, og lad varme ingredienser køle af før pakning.'),
      text('Wash and cut the vegetables. Keep tomatoes whole until use when practical.', 'Vask og skær grøntsagerne. Behold om muligt tomaterne hele indtil brug.'),
      text('Keep wet ingredients and delicate leaves such as spinach separate when useful.', 'Hold våde ingredienser og sarte blade som spinat adskilt, når det er nyttigt.'),
      text('Assemble the salad shortly before eating.', 'Saml salaten kort før, den skal spises.'),
      text('Add olive oil, dressing and walnuts at the end so everything keeps its texture.', 'Tilsæt olivenolie, dressing og valnødder til sidst, så alt bevarer sin konsistens.'),
    ],
    notes: [
      text('Use the builder as a guide, not a rule. The best combination is the one you will enjoy eating.', 'Brug byggeren som vejledning, ikke som regel. Den bedste kombination er den, du har lyst til at spise.'),
    ],
    storage: [
      text('Store chicken separately in a clean, covered container.', 'Opbevar kylling separat i en ren beholder med låg.'),
      text('Store cooked grains separately or together with the bean mixture.', 'Opbevar kogte korn separat eller sammen med bønneblandingen.'),
      text('Spinach stays fresher when kept relatively dry.', 'Spinat holder sig friskere, når den opbevares forholdsvis tør.'),
      text('Keep tomatoes whole until use when possible.', 'Behold om muligt tomaterne hele indtil brug.'),
      text('Refrigerate prepared ingredients promptly. Judge each ingredient separately rather than assuming every component stays fresh for the same number of days.', 'Sæt tilberedte ingredienser hurtigt på køl. Vurder hver ingrediens for sig i stedet for at antage, at alle dele holder sig friske lige længe.'),
    ],
  },
  {
    id: 'easy-everyday-wrap',
    slug: 'easy-everyday-wrap',
    title: text('Easy Everyday Wrap', 'Nem hverdagswrap'),
    description: text(
      'A quick, flexible wrap for lunch, leftovers or an uncomplicated dinner.',
      'En hurtig og fleksibel wrap til frokost, rester eller en ukompliceret aftensmad.',
    ),
    image: 'images/easy-everyday-wrap.svg',
    imageAlt: text(
      'Illustrated whole-grain wrap filled with leafy greens, tomato and vegetables',
      'Illustreret fuldkornswrap fyldt med salatblade, tomat og grøntsager',
    ),
    prepTime: text('10 minutes', '10 minutter'),
    cookTime: text('5 minutes', '5 minutter'),
    servings: text('1 wrap', '1 wrap'),
    categories: [text('Lunch', 'Frokost'), text('Quick meal', 'Hurtigt måltid')],
    tags: [text('Customizable', 'Valgfri'), text('Wrap', 'Wrap'), text('Leftovers', 'Rester')],
    ingredientSections: [
      {
        id: 'wrap',
        ingredients: [
          ingredient('tortilla', 'Whole-grain tortilla', 'Fuldkornstortilla', '1', '1'),
          ingredient('wrap-protein', 'Chicken or falafel', 'Kylling eller falafel', '1 portion', '1 portion'),
          ingredient('wrap-leaves', 'Spinach or salad leaves', 'Spinat eller salatblade', '1 handful', '1 håndfuld'),
          ingredient('wrap-cucumber', 'Cucumber, sliced', 'Agurk i skiver', 'A few slices', 'Et par skiver'),
          ingredient('wrap-tomato', 'Tomato, sliced', 'Tomat i skiver', '½', '½'),
          ingredient('wrap-pepper', 'Bell pepper, sliced', 'Peberfrugt i skiver', '¼', '¼'),
          ingredient('wrap-sauce', 'Hummus, Greek yogurt dressing or another simple sauce', 'Hummus, græsk yoghurtdressing eller en anden enkel sauce', '1–2 tbsp', '1–2 spsk.'),
          ingredient('wrap-legumes', 'Beans or lentils', 'Bønner eller linser', 'Optional', 'Valgfrit'),
          ingredient('wrap-seasoning', 'Salt and black pepper', 'Salt og sort peber', 'To taste', 'Efter smag'),
        ],
      },
    ],
    instructions: [
      text('Heat the tortilla briefly in a dry pan or microwave if desired.', 'Varm tortillaen kort på en tør pande eller i mikroovnen, hvis du har lyst.'),
      text('Spread the sauce over the centre, leaving a border around the edge.', 'Smør saucen ud på midten, og lad en kant være fri.'),
      text('Add the vegetables and protein in a compact strip.', 'Læg grøntsager og protein i en kompakt stribe.'),
      text('Avoid overfilling—it makes the wrap much easier to close.', 'Undgå at overfylde—så er wrappen meget nemmere at lukke.'),
      text('Fold the bottom edge upward over the filling.', 'Fold den nederste kant op over fyldet.'),
      text('Fold both sides inward.', 'Fold begge sider indad.'),
      text('Roll tightly away from you, keeping the sides tucked in.', 'Rul stramt væk fra dig, mens siderne holdes inde.'),
    ],
    variations: [
      text('Chicken wrap: use roasted chicken and Greek yogurt dressing.', 'Kyllingewrap: brug stegt kylling og græsk yoghurtdressing.'),
      text('Falafel wrap: add falafel, hummus and plenty of crunchy vegetables.', 'Falafelwrap: tilsæt falafel, hummus og masser af sprøde grøntsager.'),
      text('Egg and salmon wrap: combine sliced hard-boiled egg with smoked salmon.', 'Ægge- og laksewrap: kombiner hårdkogt æg i skiver med røget laks.'),
      text('Leftover salad wrap: drain off excess dressing before adding yesterday’s salad.', 'Wrap med salatrester: hæld overskydende dressing fra, før gårsdagens salat tilsættes.'),
    ],
    notes: [
      text('If packing for later, keep very wet ingredients separate until you are ready to roll.', 'Hvis wrappen pakkes til senere, så hold meget våde ingredienser adskilt, indtil du er klar til at rulle.'),
    ],
  },
]

export const findRecipeBySlug = (slug: string) => recipes.find((recipe) => recipe.slug === slug)
