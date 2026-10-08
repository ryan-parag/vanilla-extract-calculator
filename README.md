# Homemade Staples Calculator

This started as a vanilla extract calculator and grew into a set of calculators for staples you can make at home instead of buying: extracts, cultured dairy, butter, sugars, and baking swaps. Each one scales a recipe to the amount you have or the amount you need, then walks you through making it.

## Calculators

| Group    | Calculators |
| -------- | ----------- |
| Extracts | Vanilla Extract, Citrus Extract, Mint Extract, Coffee Extract, Vanilla Bean Paste |
| Dairy    | Mascarpone, Crème Fraîche, Buttermilk, Ricotta |
| Butter   | Butter, Brown Butter, Ghee |
| Sweet    | Vanilla Sugar, Brown Sugar, Powdered Sugar, Condensed Milk, Dulce de Leche |
| Baking   | Cake Flour, Self-Rising Flour, Baking Powder |

Every calculator can:

- Start from what you have ("2 cups of cream") or from what your recipe calls for ("1 stick of butter")
- Show results in US cups and spoons, metric, or grams by weight
- Save your inputs, measurement system, and theme in the browser
- Put the current batch in the URL so you can share it with **Copy link**

## Getting started

Requires Node 18 or later.

```sh
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
```

The app uses hash routing (`#/mascarpone?a=2&u=cup`), so `dist/` can be deployed to any static host without rewrite rules.

## Stack

- React 19 and TypeScript, built with Vite
- Tailwind CSS
- [Base UI](https://base-ui.com) components
- [Motion](https://motion.dev) for animation
- [Phosphor](https://phosphoricons.com) icons

## Project structure

```
src/
  pages/        Home, About, the vanilla calculator, and the shared ratio recipe page
  recipes/      One file per recipe, plus the page registry (index.ts)
  components/   Input, results, and step panels; navigation
  hooks/        Routing, preferences, and the calculation hooks
  lib/          Units, densities, rounding, palettes, URL state, and storage
public/         Fonts, logo, and images
```

## Adding a calculator

Most calculators are ratio recipes: a base ingredient plus additions in proportion to it.

1. Create `src/recipes/<name>.ts` exporting a `RatioRecipe` (see `src/recipes/types.ts`). It defines the base, variants and their additions, expected yield, default inputs, timing, steps, storage, tips, and warnings. `src/recipes/buttermilk.ts` is a short example to copy from.
2. If any ingredient needs a weight conversion, add its density to `src/lib/densities.ts`.
3. Add an accent palette to `src/lib/palettes.ts`.
4. Register the page in `PAGES` in `src/recipes/index.ts` with its group, slug, name, tagline, icon, and accent. Set `untested` if the ratio or yield hasn't been confirmed with a test batch, and `source` if the formula comes from a published reference. Both show up on the About page.
5. Optionally, link it from related recipes in `src/recipes/related.ts`.

## Credits

Vanilla extract formulas are based on [danieltalsky.com/vanilla](https://danieltalsky.com/vanilla). Made by [Ryan Parag](https://ryanparag.com).
