import * as React from "react";

import { ComponentSource } from "@/components/component-source";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRegistryComponent } from "@/lib/registry";

export const ComponentPreview = ({
  name,
}: React.ComponentProps<"div"> & {
  name: string;
}) => {
  const Component = getRegistryComponent(name);

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  return (
    <Tabs
      className="relative w-full"
      defaultValue="preview"
    >
      <TabsList className="justify-start gap-4 rounded-none bg-transparent px-0">
        <TabsTrigger
          value="preview"
          className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-primary dark:data-[state=active]:border-primary hover:text-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-primary dark:data-[state=active]:border-primary hover:text-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex h-96 w-full justify-center items-center border rounded-xl p-2">
          <React.Suspense fallback={<Skeleton className="size-full" />}>
            <Component />
          </React.Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <ComponentSource
          name={name}
          className="my-0"
        />
      </TabsContent>
    </Tabs>
  );
};
