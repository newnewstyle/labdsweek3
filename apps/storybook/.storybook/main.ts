import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    // Forces :hover / :focus-visible / :active so interaction states can be reviewed side by side.
    "storybook-addon-pseudo-states",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  // Stories import the BUILT @newnewstyle/ui (like a real consumer). Tailwind compiles
  // src/styles.css,
  // which pulls in @newnewstyle/ui/styles.css (tokens + compiled component CSS).
  // `@ui-docs/*` reads the usage docs (<Name>.spec.ts / <Name>.md / SETUP.md) from the package
  // source for the Docs page; keep in sync with `paths` in tsconfig.json.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@ui-docs": fileURLToPath(new URL("../../../packages/ui/src", import.meta.url)),
        },
      },
    }),
};

export default config;
