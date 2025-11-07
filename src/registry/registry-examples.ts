import { type Registry } from 'shadcn/schema';

export const examples: Registry['items'] = [
  {
    name: 'nrc-input-demo',
    type: 'registry:example',
    registryDependencies: ['nrc-input'],
    files: [
      {
        path: 'new-york/examples/nrc-input-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
];
