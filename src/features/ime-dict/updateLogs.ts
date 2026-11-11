import { TITLE_SPINOFF } from '@data/meta';

export type UpdateLog = {
  date: [year: number, month: number, day: number];
  description: string;
};

export const IME_DICT_UPDATE_LOGS: UpdateLog[] = [
  { date: [2026, 10, 28], description: 'コメントに存在した誤記、表記揺れを修正\n(暴走族「ゴリラ連合」→暴走族「呉莉羅連合」)\n(アニメ「ペペペのペン太郎」→TVアニメ「ペペペのペン太郎」)' },
  { date: [2026, 10, 28], description: 'アニメ楽曲・イメージソング、ボイスドラマ版の声優、その他のカテゴリ未分類の用語（恋太郎ファミリー、呉莉羅連合など）に対応' },
  { date: [2026, 10, 15], description: '本編 第258話に登場したキャラクターの名前を正しいものに修正\n(夢→舞)' },
  { date: [2026, 10, 15], description: '本編 第258話までに登場した用語に対応' },
  { date: [2026, 10, 1], description: `${TITLE_SPINOFF} 第9話までに登場した用語に対応` },
  { date: [2026, 9, 17], description: '単行本 27巻までに登場した用語に対応' },
  { date: [2026, 8, 30], description: 'アニメ 第3期までに登場した用語に対応' },
  { date: [2026, 4, 19], description: `${TITLE_SPINOFF}に対応（現状スピンオフ作品として扱っています）` },
  { date: [2026, 3, 24], description: 'キャラクター担当声優の読みに存在した誤字を修正\n(たかおかなね→たかおかのん)' },
];

export function formatUpdateLogDate([year, month, day]: UpdateLog['date']) {
  return {
    dateTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    label: `${String(year).padStart(4, '0')}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
  };
}
