import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    files: ["app/blog/*/page.tsx"],
    rules: {
      // Long-form article prose legitimately contains quotes, and its images mix
      // local and remote sources that cannot use a single Next Image policy.
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
