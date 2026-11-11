# AGENTS.md

## Project Overview

「君のことが大大大大大好きな100人の彼女」(100カノ) 非公式ファンツールサイト。
誕生日一覧やIME辞書生成などの機能を提供する静的サイト。

## 技術スタック

- **フレームワーク**: [Astro](https://astro.build/) 7 (SSG + 必要箇所のみオンデマンドレンダリング)
- **UI**: [Svelte 5](https://svelte.dev/) アイランド (`$state` / `$derived` / `$props` のルーンを使用)
- **ビルド**: Vite 8
- **言語**: TypeScript 6 (`strict`, `noUncheckedIndexedAccess`)
- **スタイリング**: Tailwind CSS v4 + tailwind-variants + clsx
- **パッケージマネージャー**: pnpm 12 ([mise](https://mise.jdx.dev/) で管理)
- **Node.js**: 26 ([mise](https://mise.jdx.dev/) で管理)

## コマンド

| コマンド        | 用途                                                          |
| --------------- | ------------------------------------------------------------- |
| `pnpm dev`      | 開発サーバー起動                                              |
| `pnpm build`    | プロダクションビルド (静的ページ + オンデマンドルート)        |
| `pnpm preview`  | ビルド結果のプレビュー                                        |
| `pnpm lint`     | 全リンターを並列実行 (tsc, astro check, svelte-check, eslint, stylelint) |
| `pnpm format`   | lint問題を自動修正                                            |
| `pnpm deploy`   | Cloudflare向けビルド + デプロイ                               |

テストフレームワークは未導入。

## アーキテクチャ

```plaintext
src/
├── pages/          # ファイルベースルーティング (Astro)。既定は静的生成
│   └── api/        # オンデマンドAPIルート (export const prerender = false)
├── layouts/        # Layout.astro (head・背景・フッター)
├── features/       # ページ固有の機能 (アイランドは *.svelte)
├── components/     # 共有UI (Svelte。client:* を付けなければHTMLのみ出力)
├── constants/      # アプリ全体の定数 (ページmetadataは page-metadata.ts)
├── types/          # 共有型定義
└── utils/          # ユーティリティ関数
data/               # アプリケーションデータ (キャラクター、場所、声優、作品、楽曲)
```

## 規約

### コンポーネント

- 共有UIは Svelte コンポーネントとして実装する。`client:*` を付けずに `.astro` から使うと JS を出力しない
- インタラクティブな部分だけをアイランドとして切り出し、`.astro` から `client:load` / `client:visible` で読み込む
- ページ内で状態を共有する場合は Svelte の `createContext`（または `setContext` / `getContext`）を使う（アイランド間では共有されない）
- アイランドはファーストビュー内なら `client:load`、それ以外は `client:visible` にする
- 画像は `src/assets/` に置いて `astro:assets` の `<Image />` を使う（`public/` はOG画像など最適化不要なものだけ）
- ブラウザに永続化する状態は [runed](https://runed.dev/) の `PersistedState` を使う（`$state` + localStorage の自前実装はしない）
- `$props()` の型は `type Props = { ... }` で定義する
- ページは既定で静的。リクエスト依存のページ・APIのみ `export const prerender = false` を記述する
- ページの `<head>` は Layout に任せ、`src/constants/page-metadata.ts` の metadata を渡す

### インポート

- パスエイリアスを使用: `@/*` → `src/*`、`@data/*` → `data/*`
- `import type { ... }` と値のimportを分離 (`verbatimModuleSyntax`)

### スタイリング

- Tailwind CSS v4 構文 (`@theme`, `@utility`, `@custom-variant`)
- tailwind-variants の `tv()` でコンポーネントのバリアント/スロットを定義
- `clsx` で条件付きクラス合成
- カスタムユーティリティは [src/style.css](src/style.css) に定義: `card`, `page-container`, `page-title` 等

### データ

- データファイルは型安全のため `as const satisfies DataEntries<Id, Type>` を使用
- IDは `category_group_name` パターン (例: `character_girlfriend_hanazono_hakari`)
- `ReadonlyMap<Id, Data>` としてexport

### ファイル命名

- Svelteコンポーネント: PascalCase (`LinkButton.svelte`)
- Astroコンポーネント: PascalCase (`Layout.astro`)、ページは kebab-case (`ime-dict/index.astro`)
- ユーティリティ/フック: camelCase (`localStorageState.svelte.ts`)
- データファイル: kebab-case (`circlet-love-story.ts`)

## Git Hooks (Lefthook)

pre-commit で自動実行:

- ESLint: ステージされた `*.{js,mjs,ts,tsx,astro,svelte}`
- Stylelint: ステージされた `*.{css,scss}`
- `tsc --noEmit`: ステージされた `*.{ts,tsx}`
- `astro check`: ステージされた `*.astro`
- `svelte-check`: ステージされた `*.svelte`

## 主要ファイル

- [astro.config.ts](astro.config.ts) – Astro設定 (Svelte・Cloudflareアダプタ・Tailwind・tsconfig paths)
- [svelte.config.js](svelte.config.js) – Svelteのプリプロセス設定
- [wrangler.jsonc](wrangler.jsonc) – Cloudflare Workers設定
- [eslint.config.ts](eslint.config.ts) – ESLint設定 (Astro / Svelte対応)
- [src/style.css](src/style.css) – グローバルスタイル、カスタムユーティリティ、テーマ変数
- [data/](data/) – 全アプリケーションデータ (キャラクター、場所、声優、作品、楽曲)

## 環境変数

必要な `.env` 変数は [README.md](README.md) を参照 (`SITE_URL`, `GOOGLE_CALENDAR_IDS`)。

- `SITE_URL` は `astro.config.ts` の `site` として読み込む（canonical / OG URL の基準）
- `GOOGLE_CALENDAR_IDS` は `astro:env` のスキーマで型付けし、`astro:env/server` から読み取ってアイランドへpropsとして渡す
- クライアントへ公開したくない値は `astro:env` の `context: 'server'` で宣言する（`VITE_` prefixは使わない）
