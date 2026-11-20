import { copyFile } from "node:fs/promises";
import { defineConfig } from "tsup";

// Unbundled (one output file per source file) so that per-file "use client"
// directives survive the build; esbuild strips module directives when bundling.
// Consequence: relative imports in src/ must use the ".js" extension.
export default defineConfig({
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/test/**"],
  bundle: false,
  format: ["esm"],
  target: "es2022",
  dts: { entry: "src/index.ts" },
  sourcemap: true,
  clean: true,
  async onSuccess() {
    await copyFile("src/styles/globals.css", "dist/styles.css");
  },
});
