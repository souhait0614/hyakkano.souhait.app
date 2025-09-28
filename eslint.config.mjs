// @ts-check

import taiymeConfig from '@taiyme/eslint-config';
import gitignore from 'eslint-config-flat-gitignore';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { getDefaultCallees } from 'eslint-plugin-better-tailwindcss/api/defaults';
import { MatcherType } from 'eslint-plugin-better-tailwindcss/api/types';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @typedef {import('eslint-plugin-better-tailwindcss/api/types').CalleeMatchers} CalleeMatchers */

const files = [
  '**/*.{js,mjs,ts,tsx}',
];

/** @type {CalleeMatchers} */
const TV_BASE_VALUES = [
  'tv',
  [
    {
      match: MatcherType.ObjectValue,
      pathPattern: '^base.*$',
    },
  ],
];

/** @type {CalleeMatchers} */
const TV_SLOT_VALUES = [
  'tv',
  [
    {
      match: MatcherType.ObjectValue,
      pathPattern: '^slots.*$',
    },
  ],
];

// TODO: eslint/configのdefineConfigに移行したいがextendsで謎の型エラーが出るため保留
export default tsEslint.config(
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
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: 'readonly',
      },
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
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
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/style.css',
        callees: [
          ...getDefaultCallees(),
          TV_BASE_VALUES,
          TV_SLOT_VALUES,
        ],
      },
    },
    rules: {
      ...betterTailwindcss.configs.recommended?.rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'warn',
      'better-tailwindcss/no-unregistered-classes': ['error', { detectComponentClasses: true }],
    },
  },
);
