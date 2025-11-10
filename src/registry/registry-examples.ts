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
  {
    name: 'multistep-form-demo',
    type: 'registry:example',
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: [
      'multistep-form',
      'button',
      'card',
      'field',
      'input',
    ],
    files: [
      {
        path: 'new-york/examples/multistep-form-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
];
