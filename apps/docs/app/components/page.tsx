import { ComponentsDemo } from "./demo";

export const metadata = { title: "Components · @newnewstyle/ui" };

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-3xl">Interactive components</h1>
      <ComponentsDemo />
    </main>
  );
}
