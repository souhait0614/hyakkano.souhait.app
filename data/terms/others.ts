import { TITLE } from '@data/meta';

import type { DataEntries, DataId, Term, TermIdBase } from '@/types/Data';

const otherTermsEntries = [
  ['term_other_unmei_no_hito', {
    name: { kanji: '運命の人', hiragana: 'うんめいのひと' },
    description: `「${TITLE}」において人がこの世に生まれた時に定められる“最高の恋愛パートナー”`,
    releaseOriginalMainChapter: 1,
    releaseOriginalMainComicsVolume: 1,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
  }],
  ['term_other_circlet_love_story', {
    name: { kanji: '王冠恋物語', hiragana: 'さーくれっとらぶすとーりー' },
    description: `「${TITLE}」に登場する小説`,
    releaseOriginalMainChapter: 3,
    releaseOriginalMainComicsVolume: 1,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 3,
  }],
  ['term_other_gorira_rengo', {
    name: { kanji: '呉莉羅連合', hiragana: 'ごりられんごう' },
    description: `「${TITLE}」に登場する暴走族`,
    releaseOriginalMainChapter: 14,
    releaseOriginalMainComicsVolume: 2,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
  }],
  ['term_other_rentaro_family', {
    name: { kanji: '恋太郎ファミリー', hiragana: 'れんたろうふぁみりー' },
    description: `「${TITLE}」において愛城恋太郎とその彼女たち全員をまとめて指す呼称`,
    releaseOriginalMainChapter: 14,
    releaseOriginalMainComicsVolume: 2,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
  }],
  ['term_other_pepepe_no_pentarou', {
    name: { kanji: 'ペペペのペン太郎', hiragana: 'ぺぺぺのぺんたろう' },
    description: `「${TITLE}」に登場するTVアニメ`,
    releaseOriginalMainChapter: 75,
    releaseOriginalMainComicsVolume: 9,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 3,
    releaseAnimeEpisode: 32,
  }],
  ['term_other_honki_group', {
    name: { kanji: '本気グループ', hiragana: 'ほんきぐるーぷ' },
    description: `「${TITLE}」に登場する企業グループ`,
    releaseOriginalMainChapter: 77,
    releaseOriginalMainComicsVolume: 9,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 3,
    releaseAnimeEpisode: 33,
  }],
] as const satisfies DataEntries<TermIdBase<'other'>, Term>;

export type OtherTermId = DataId<typeof otherTermsEntries>;

export const OTHER_TERMS: ReadonlyMap<OtherTermId, Term> = new Map<OtherTermId, Term>(otherTermsEntries);
