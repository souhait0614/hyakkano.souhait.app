import tailwindcss from '@tailwindcss/vite';
import jsxPruneClassName from '@taiyme/vite-plugin-jsx-prune-classname';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    build: {
      emptyOutDir: true,
      minify: 'terser',
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      jsxPruneClassName(),
      tailwindcss(),
    ],
  },
});
