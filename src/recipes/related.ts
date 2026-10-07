// Recipes that feed into or follow from each other, keyed by page slug
export const RELATED: Record<string, { slug: string; note: string }[]> = {
  'vanilla-extract': [
    { slug: 'vanilla-sugar', note: 'Dry your spent pods and bury them in sugar.' },
    { slug: 'vanilla-paste', note: 'Your extract is the base for homemade paste.' },
  ],
  'citrus-extract': [
    { slug: 'ricotta', note: 'Zested lemons still have juice: use it to set ricotta.' },
    { slug: 'mascarpone', note: 'Or use that lemon juice for mascarpone.' },
  ],
  'mint-extract': [
    { slug: 'vanilla-extract', note: 'Same jar-and-wait method, if you have one going.' },
  ],
  'coffee-extract': [
    { slug: 'vanilla-extract', note: 'Same jar-and-wait method, if you have one going.' },
  ],
  'vanilla-paste': [
    { slug: 'vanilla-extract', note: 'Make the extract first. Homemade is ideal here.' },
    { slug: 'vanilla-sugar', note: 'Put the scraped pods to work.' },
  ],
  'vanilla-sugar': [
    { slug: 'vanilla-extract', note: 'Spent pods from a finished extract are perfect here.' },
    { slug: 'powdered-sugar', note: 'Blend vanilla sugar for vanilla powdered sugar.' },
  ],
  'mascarpone': [
    { slug: 'ricotta', note: 'Same heat-and-acid method, made with milk.' },
    { slug: 'creme-fraiche', note: 'Another cream staple, cultured instead of heated.' },
  ],
  'creme-fraiche': [
    { slug: 'butter', note: 'Cultured butter gives you buttermilk that can start your next batch.' },
    { slug: 'buttermilk', note: "Note: the soured-milk substitute can't culture crème fraîche." },
  ],
  'buttermilk': [
    { slug: 'butter', note: 'Churning butter gives you real buttermilk.' },
    { slug: 'creme-fraiche', note: 'Needs cultured buttermilk, not this substitute.' },
  ],
  'ricotta': [
    { slug: 'mascarpone', note: 'Same method with cream, for a richer cheese.' },
  ],
  'butter': [
    { slug: 'creme-fraiche', note: 'Buttermilk from cultured butter has live cultures: use it to start crème fraîche.' },
    { slug: 'brown-butter', note: 'Take your fresh butter one step further.' },
    { slug: 'ghee', note: 'Or clarify it for high-heat cooking.' },
  ],
  'brown-butter': [
    { slug: 'ghee', note: 'Cook a little longer and strain it for ghee.' },
    { slug: 'butter', note: 'Start from butter you churned yourself.' },
  ],
  'ghee': [
    { slug: 'brown-butter', note: 'The same browning, without straining.' },
    { slug: 'butter', note: 'Start from butter you churned yourself.' },
  ],
  'condensed-milk': [
    { slug: 'dulce-de-leche', note: 'Bake it into dulce de leche.' },
  ],
  'dulce-de-leche': [
    { slug: 'condensed-milk', note: 'Shortcut: start from condensed milk and bake it.' },
  ],
  'brown-sugar': [
    { slug: 'powdered-sugar', note: 'Another sugar from what you have.' },
    { slug: 'vanilla-sugar', note: 'Or a fragrant one for topping bakes.' },
  ],
  'powdered-sugar': [
    { slug: 'vanilla-sugar', note: 'Blend vanilla sugar for vanilla powdered sugar.' },
  ],
  'cake-flour': [
    { slug: 'self-rising-flour', note: 'The other flour recipes ask for.' },
    { slug: 'baking-powder', note: 'Out of baking powder too?' },
  ],
  'self-rising-flour': [
    { slug: 'baking-powder', note: 'Mix your own baking powder first.' },
    { slug: 'cake-flour', note: 'The other flour swap.' },
  ],
  'baking-powder': [
    { slug: 'self-rising-flour', note: 'Use it in homemade self-rising flour.' },
    { slug: 'buttermilk', note: 'Another quick swap for baking.' },
  ],
}
