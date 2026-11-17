import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';
import astro from 'eslint-plugin-astro';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const files = [
  '**/*.{js,mjs,ts,tsx}',
];

const svelteFiles = [
  '**/*.svelte',
  '**/*.svelte.ts',
];

export default defineConfig(
  gitignore(),
  {
    ignores: [
      // NOTE: build outputs and generated files
      '.astro/',
      '.wrangler/',
      'dist/',
    ],
  },
  {
    files,
    extends: [
      taiymeConfig.configs.typescript,
      taiymeConfig.configs.stylistic,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tsEslintParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Astro
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tsEslintParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  // Svelte
  ...svelte.configs['flat/recommended'],
  {
    files: svelteFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tsEslintParser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
  // Tailwind
  {
    files: [
      ...files,
      '**/*.astro',
      ...svelteFiles,
    ],
    extends: [betterTailwindcss.configs.recommended],
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/style.css',
      },
    },
    rules: {
      'better-tailwindcss/no-unknown-classes': ['error', { detectComponentClasses: true }],
    },
  },
);
