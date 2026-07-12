# AGENTS.md

## Project Overview

「君のことが大大大大大好きな100人の彼女」(100カノ) 非公式ファンツールサイト。
誕生日一覧やIME辞書生成などの機能を提供する静的サイト。

## 技術スタック

- **フレームワーク**: [Waku](https://waku.gg/) 0.27 (React Server Components)
- **React**: 19 (RSC + クライアントコンポーネントは `'use client'`)
- **ビルド**: Vite 7
- **言語**: TypeScript 6 (`strict`, `noUncheckedIndexedAccess`)
- **スタイリング**: Tailwind CSS v4 + tailwind-variants + clsx
- **パッケージマネージャー**: pnpm 10 ([mise](https://mise.jdx.dev/) で管理)
- **Node.js**: 24 ([mise](https://mise.jdx.dev/) で管理)

## コマンド

| コマンド      | 用途                                                 |
| ------------- | ---------------------------------------------------- |
| `pnpm dev`    | 開発サーバー起動                                     |
| `pnpm build`  | プロダクションビルド (SSG)                           |
| `pnpm lint`   | 全リンターを並列実行 (tsc, eslint, stylelint)        |
| `pnpm format` | lint問題を自動修正                                   |
| `pnpm deploy` | Cloudflare向けビルド + デプロイ                      |

テストフレームワークは未導入。

## アーキテクチャ

```plaintext
src/
├── pages/          # ファイルベースルーティング (Waku)。各ページは getConfig() で render:'static' を返す
├── features/       # ページ固有の機能コンポーネント (ページごとにグループ化)
├── components/     # 共有UIコンポーネント
├── hooks/          # カスタム React フック
├── constants/      # アプリ全体の定数
├── types/          # 共有型定義
└── utils/          # ユーティリティ関数
data/               # アプリケーションデータ (キャラクター、場所、声優)
```

## 規約

### コンポーネント

- **名前付き関数宣言**で定義 (ESLint強制: `react/function-component-definition`)
- Props: `type` (`interface`ではなく) を `Readonly<>` で囲む
- クライアントコンポーネントはファイル先頭に `'use client'` を記述。サーバーコンポーネントは省略
- 各ページは `metadata` オブジェクト (`satisfies Metadata`) と `getConfig()` (`{ render: 'static' }` を返す) をexport

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

- コンポーネント: PascalCase (`LinkButton.tsx`)
- ページ/ディレクトリ: kebab-case (`ime-dict/`)
- ユーティリティ/フック: camelCase (`useLocalStorageState.ts`)
- データファイル: kebab-case (`circlet-love-story.ts`)

## Git Hooks (Lefthook)

pre-commit で自動実行:

- ESLint: ステージされた `*.{js,mjs,ts,tsx}`
- Stylelint: ステージされた `*.{css,scss}`
- `tsc --noEmit`: ステージされた `*.{ts,tsx}`

## 主要ファイル

- [waku.config.ts](waku.config.ts) – Viteプラグイン (tailwind, tsconfig-paths, jsx-prune-classname)
- [wrangler.jsonc](wrangler.jsonc) – Cloudflare Workers設定
- [src/style.css](src/style.css) – グローバルスタイル、カスタムユーティリティ、テーマ変数
- [data/](data/) – 全アプリケーションデータ (キャラクター、場所、声優)
- [patches/waku.patch](patches/waku.patch) – wakuに適用されるパッチ

## 環境変数

必要な `.env` 変数は [README.md](README.md) を参照 (`VITE_SITE_URL`, `VITE_GOOGLE_CALENDAR_IDS`)。
