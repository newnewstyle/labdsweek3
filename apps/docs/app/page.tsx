import { Button } from "@scope/ui";

// Server Component on purpose: verifies @scope/ui exports render under the App Router.
export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <h1 className="text-3xl font-semibold">@scope/ui</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button asChild variant="outline">
            <a href="https://ui.shadcn.com">As link</a>
          </Button>
        </div>
      </section>

      <section className="dark flex flex-wrap items-center gap-3 rounded-lg bg-background p-6">
        <Button>Dark default</Button>
        <Button variant="secondary">Dark secondary</Button>
        <Button variant="outline">Dark outline</Button>
      </section>
    </main>
  );
}
