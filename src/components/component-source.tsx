import { highlight } from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";
import * as React from "react";

import { getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";

export const ComponentSource = async ({
  name,
  title,
  language,
  className,
}: React.ComponentProps<"div"> & {
  name: string;
  title?: string;
  language?: string;
}) => {
  const item = await getRegistryItem(name);

  let code = item?.files?.[0].content;

  if (!code) {
    return null;
  }

  // Fix imports.
  // Replace @/registry/${style}/ with @/components/.
  code = code.replaceAll(`@/registry/new-york/`, "@/components/");

  const lang = language ?? title?.split(".").pop() ?? "tsx";
  const rendered = await highlight(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <Base.CodeBlock
      className={cn(className)}
      viewportProps={{ className: "max-h-96" }}
      title={title}
      data-line-numbers
    >
      {rendered}
    </Base.CodeBlock>
  );
};
