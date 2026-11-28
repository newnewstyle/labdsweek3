import { copyFile, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { defineConfig, type Plugin } from "vite"

import pkg from "./package.json" with { type: "json" }

/*
 * Library build: one output file per source file (preserveModules), so consumers' bundlers drop
 * the components they don't use, together with their CSS.
 *
 * - CSS Modules: Vite runs postcss.config.mjs (Tailwind @apply/@reference) on each *.module.css,
 *   scopes class names as `<Component>_<class>` and emits one .css file per component.
 * - injectCss (below) adds `import "./X.css"` to the JS file that owns that CSS, so importing a
 *   component brings its styles; package.json `sideEffects` keeps those imports.
 * - Every JS file starts with exactly one "use client" (added in injectCss): the bundler drops
 *   per-file directives, and most components need it anyway; the rest still render from Server
 *   Components.
 * - dist/styles.css is only the tokens (processed by the consumer's Tailwind); component CSS no
 *   longer goes there. Type declarations come from `tsc -p tsconfig.build.json`.
 */

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  "react/jsx-runtime",
]
const isExternal = (id: string) =>
  external.some((dep) => id === dep || id.startsWith(`${dep}/`))

/** Starts every JS chunk with "use client" and `import "./x.css"` for the CSS it owns. */
function injectCss(): Plugin {
  return {
    name: "inject-component-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        // A component's CSS can load before the app's `@import "tailwindcss"` (Next.js does
        // this). Declaring Tailwind's layer order first keeps `components` above `base`
        // (preflight), whichever file the browser sees first.
        if (asset.type === "asset" && asset.fileName.endsWith(".css") && asset.fileName.startsWith("components/"))
          asset.source = `${LAYER_ORDER}\n${asset.source}`
      }
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue
        const dir = path.posix.dirname(chunk.fileName)
        const imports = [...(chunk.viteMetadata?.importedCss ?? [])].map((file) => {
          let rel = path.posix.relative(dir, file)
          if (!rel.startsWith(".")) rel = `./${rel}`
          return `import "${rel}";\n`
        })
        // exactly one "use client", first; files that kept their own directive would get two
        const body = chunk.code.replace(/^(\s*["']use client["'];?\s*)+/, "")
        chunk.code = `${BANNER}\n${imports.join("")}${body}`
      }
    },
  }
}

/** dist/styles.css = tokens only; shadcn-tailwind.css ships beside it. */
function writeStyles(): Plugin {
  return {
    name: "write-styles",
    apply: "build",
    async closeBundle() {
      const tokens = await readFile("src/styles/tokens.css", "utf8")
      await writeFile("dist/styles.css", tokens)
      await copyFile("src/styles/shadcn-tailwind.css", "dist/shadcn-tailwind.css")
    },
  }
}

const BANNER = `"use client";`
const LAYER_ORDER = "@layer theme, base, components, utilities;"

export default defineConfig({
  plugins: [injectCss(), writeStyles()],
  css: {
    modules: {
      // Same names as the earlier bundled build (Button_button), readable in DevTools.
      generateScopedName: (local, filename) =>
        `${path.basename(filename).replace(/\.module\.css.*$/, "")}_${local}`,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    minify: false,
    sourcemap: true,
    cssCodeSplit: true,
    lib: { entry: "src/index.ts", formats: ["es"] },
    rollupOptions: {
      external: isExternal,
      // The source "use client" directives are expected to be dropped; injectCss re-adds them.
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
        warn(warning)
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        // components/Button/Button.css, not Button.module.css: a consumer's bundler treats
        // *.module.css as a CSS Module and drops a bare `import "./X.module.css"` (nothing reads
        // its class map), losing the styles.
        assetFileNames: (info) => {
          const src = info.originalFileNames?.[0]
          if (src?.endsWith(".module.css"))
            return src.replace(/^src\//, "").replace(/\.module\.css$/, ".css")
          return "[name][extname]"
        },
      },
    },
  },
})
