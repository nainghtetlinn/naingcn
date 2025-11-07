import { type Registry } from 'shadcn/schema';
import { ui } from './registry-ui';
import { examples } from './registry-examples';

export const registry = {
  name: 'naingcn',
  homepage: 'https://naingcn.vercel.app',
  items: [...ui, ...examples],
} satisfies Registry;
