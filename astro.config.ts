import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

// NOTE: astro.config では astro:env が使えないため Vite の loadEnv で読み込む
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL,
  // Cloudflare の html_handling (drop-trailing-slash) に合わせる
  trailingSlash: 'never',
  // MPA のページ遷移を高速化する
  prefetch: {
    prefetchAll: true,
  },
  env: {
    schema: {
      GOOGLE_CALENDAR_IDS: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
  // NOTE: セッションは使わず、画像はビルド時にのみ最適化する（Cloudflareのバインディングを増やさない）
  // prerender は Node 上で実行する（Cloudflare 固有APIに依存しないため）
  adapter: cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' }),
  session: false,
  integrations: [
    svelte(),
  ],
  vite: {
    build: {
      minify: 'terser',
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      tailwindcss(),
    ],
  },
});
