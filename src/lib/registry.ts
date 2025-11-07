import { promises as fs } from 'fs';
import path from 'path';
import { registryItemSchema } from 'shadcn/schema';

import { Index } from '@/__registry__';

export function getRegistryComponent(name: string) {
  return Index[name]?.component;
}

export async function getRegistryItem(name: string) {
  const item = Index[name];

  if (!item) {
    return null;
  }

  // Fail early before doing expensive file operations.
  const result = registryItemSchema.safeParse(item);
  if (!result.success) {
    return null;
  }

  let files: typeof result.data.files = [];
  for (const file of item.files) {
    const content = await fs.readFile(file.path, 'utf-8');
    const relativePath = path.relative(process.cwd(), file.path);

    files.push({
      ...file,
      path: relativePath,
      content,
    });
  }

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  });

  if (!parsed.success) {
    console.error(parsed.error.message);
    return null;
  }

  return parsed.data;
}
