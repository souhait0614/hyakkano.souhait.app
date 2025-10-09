import tailwindcss from '@tailwindcss/vite';
import jsxPruneClassName from '@taiyme/vite-plugin-jsx-prune-classname';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    build: {
      emptyOutDir: true,
      minify: 'terser',
    },
    plugins: [
      tsconfigPaths(),
      jsxPruneClassName(),
      tailwindcss(),
    ],
  },
});
