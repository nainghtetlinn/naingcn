import { type Registry } from 'shadcn/schema';

export const lib: Registry['items'] = [
  {
    name: 'nrc-data',
    type: 'registry:lib',
    files: [
      {
        path: 'new-york/lib/nrc-data.ts',
        type: 'registry:lib',
      },
    ],
  },
];
