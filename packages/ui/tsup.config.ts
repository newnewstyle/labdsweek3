import { copyFile, readFile, rm, writeFile } from "node:fs/promises";
import { defineConfig } from "tsup";

const BANNER = `"use client";`;

export default defineConfig({
  entry: { index: "src/index.ts" },
  // Bundled so esbuild can compile CSS Modules ("local-css" hashes class names and returns the
  // class map to JS). tsup runs postcss.config.mjs (Tailwind) on each CSS file first.
  bundle: true,
  format: ["esm"],
  target: "es2022",
  loader: { ".css": "local-css" },
  // esbuild drops per-file "use client" directives when bundling, so the whole bundle is marked
  // as a client module. 15 of the 20 components need it anyway; the rest still render fine when
  // imported from Server Components.
  banner: { js: BANNER },
  dts: { entry: { index: "src/index.ts" } },
  sourcemap: true,
  clean: true,
  async onSuccess() {
    // One documented stylesheet: tokens (processed by the consumer's Tailwind) followed by the
    // compiled component CSS that esbuild emitted as dist/index.css.
    const tokens = await readFile("src/styles/tokens.css", "utf8");
    const components = await readFile("dist/index.css", "utf8");
    await writeFile(
      "dist/styles.css",
      `${tokens}\n/* ---- compiled component styles ---- */\n${components}`,
    );
    await copyFile("src/styles/shadcn-tailwind.css", "dist/shadcn-tailwind.css");
    await rm("dist/index.css");
    await rm("dist/index.css.map", { force: true });
  },
});
