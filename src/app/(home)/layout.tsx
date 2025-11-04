import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: "main",
          text: "Components",
          url: "/docs/components",
          active: "url",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
