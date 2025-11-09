import { type Registry } from 'shadcn/schema';
import { examples } from './registry-examples';
import { lib } from './registry-lib';
import { ui } from './registry-ui';

export const registry = {
  name: 'naingcn',
  homepage: 'https://naingcn.vercel.app',
  items: [...ui, ...lib, ...examples],
} satisfies Registry;
