import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";

import "../src/styles.css";

const preview: Preview = {
  decorators: [
    // Same dark-mode mechanism as the package: data-theme on <html>.
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
    // Show accessibility violations in the a11y panel without failing anything yet.
    a11y: { test: "todo" },
  },
  tags: ["autodocs"],
};

export default preview;
