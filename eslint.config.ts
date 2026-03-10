import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const files = [
  '**/*.{js,mjs,ts,tsx}',
];

export default defineConfig(
  gitignore(),
  {
    ignores: [
      // NOTE: waku auto-generated files
      'src/pages.gen.ts',
    ],
  },
  {
    files,
    extends: [
      taiymeConfig.configs.typescript,
      taiymeConfig.configs.react,
      taiymeConfig.configs.stylistic,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: 'readonly',
      },
      parser: tsEslintParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: '19',
      },
    },
    rules: {
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
  {
    files,
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
