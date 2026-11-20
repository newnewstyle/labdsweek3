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
  // Stories import the BUILT @scope/ui (like a real consumer). Tailwind compiles src/styles.css,
  // which pulls in @scope/ui/styles.css (tokens + compiled component CSS).
  viteFinal: (viteConfig) => mergeConfig(viteConfig, { plugins: [tailwindcss()] }),
};

export default config;
