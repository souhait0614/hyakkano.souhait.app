import type { Metadata } from '@/types/Metadata';
import { SITE_NAME } from '@/constants/site';

export const HOME_METADATA = {
  title: SITE_NAME,
  description: '100カノ関連の何かを作ったら置く場所です',
} as const satisfies Metadata;

export const BIRTHDAY_METADATA = {
  title: 'キャラクター誕生日一覧',
  description: [
    '残り日数のリアルタイムカウントダウンに対応した恋太郎ファミリーや主要キャラクターの誕生日一覧',
    'Googleカレンダーへの登録にも対応しました',
  ],
} as const satisfies Metadata;

export const IME_DICT_METADATA = {
  title: 'IMEユーザー辞書',
  description: '大量に存在する入力が大変なキャラクターの名前や一部の用語をユーザー辞書としてインポート',
} as const satisfies Metadata;

export const IME_DICT_PREVIEW_METADATA = {
  title: 'IMEユーザー辞書 プレビュー',
  description: 'キャラクターの名前や一部の用語をユーザー辞書として取り込める形式でダウンロードできます',
} as const satisfies Metadata;

export const PRIVACY_METADATA = {
  title: 'プライバシーポリシー',
  description: `${SITE_NAME}の個人情報の取扱いに関して掲載しています。`,
} as const satisfies Metadata;

export const YOMUTALK_PLUS_METADATA = {
  title: 'よむとーく＋',
  description: 'あのテキスト読み上げアプリっぽいWebアプリ',
  ogImageUrl: '/images/yomutalk-plus/icon.png',
  ogImageAlt: 'よむとーく＋のアイコン',
  ogImageType: 'image/png',
  ogImageWidth: 256,
  ogImageHeight: 256,
  ogCardType: 'summary',
} as const satisfies Metadata;
