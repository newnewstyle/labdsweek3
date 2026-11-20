// Types for `import styles from "./X.module.css"` (Next.js provided these in the original app).
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
