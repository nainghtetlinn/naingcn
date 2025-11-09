import { type Registry } from 'shadcn/schema';

export const ui: Registry['items'] = [
  {
    name: 'nrc-input',
    type: 'registry:ui',
    title: 'Myanmar NRC Input',
    description: 'A simple myanmar nrc input component.',
    registryDependencies: ['select', 'input'],
    files: [
      {
        path: 'new-york/ui/nrc-input.tsx',
        type: 'registry:ui',
      },
      { path: 'new-york/lib/nrc-data.ts', type: 'registry:lib' },
    ],
  },
];
