import type { Step } from './types'

// Method and notes for the vanilla calculator, which keeps its own fold/displacement math
export const vanillaNotes = {
  timing: { active: '15 min', wait: '8–12 wk', waitNote: 'steeping; longer for higher folds' },
  steps: ({ beans, alcohol, container }: { beans: string; alcohol: string; container: string }): Step[] => [
    {
      title: 'Weigh the beans',
      body: `Weigh out ${beans} of vanilla beans.`,
    },
    {
      title: 'Split and jar',
      body: `Split the beans lengthwise and scrape them, then put the seeds and pods in a clean ${container} jar. Cut long pods to fit if needed.`,
    },
    {
      title: 'Add the alcohol',
      body: `Pour in ${alcohol} of alcohol. 80-proof (40% ABV) vodka is the neutral choice. Make sure the beans are covered, then seal tightly.`,
    },
    {
      title: 'Steep',
      body: 'Store somewhere cool and dark and shake every few days. It is usable at 8 weeks for single fold, and keeps improving for months. Higher folds take longer.',
      duration: '8–12 weeks',
    },
  ],
  storage: 'Keeps indefinitely in a cool, dark cupboard. The flavor keeps deepening for months.',
  tips: [
    'Grade B ("extract grade") beans are drier and cheaper, and ideal for extract.',
    'Bourbon, rum, or brandy add their own character; vodka lets the vanilla stand alone.',
    'Leave the beans in as you use it, and top up with alcohol for a never-ending bottle.',
  ],
}
