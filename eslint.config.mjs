import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // One-off content migration scripts are executed with Node, not bundled as
    // application code, and intentionally use CommonJS to edit JSON files.
    "add-*.js",
    "translate-*.js",
    "fix-metadata.js",
  ]),
  {
    rules: {
      // Tool dictionaries are heterogeneous JSON content; typing every nested
      // translated field as a single rigid structure would make the UI less
      // safe to evolve without improving runtime validation.
      "@typescript-eslint/no-explicit-any": "off",
      // Several generators intentionally derive display state after browser
      // APIs run (canvas, clipboard, storage, and compressed query payloads).
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/immutability": "off",
      // Literal copy and generated data-URL previews are deliberate here.
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);

export default eslintConfig;
