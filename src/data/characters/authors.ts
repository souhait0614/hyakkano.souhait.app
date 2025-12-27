import type { Character } from '@/types/Data';

export const AUTHOR_CHARACTERS = [
  {
    name: { kanji: ['中村', '力斗'], hiragana: ['なかむら', 'りきと'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [
      { kanji: ['中村先生'], hiragana: ['なかむらせんせい'] },
      { kanji: ['力斗お兄ちゃん'], hiragana: ['りきとおにいちゃん'] },
    ],
    birthday: [5, 31],
    age: undefined,
    releaseOriginalChapter: undefined,
    releaseOriginalComicsVolume: undefined,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 22,
    animeVoiceActors: undefined,
  },
  {
    name: { kanji: ['野澤', 'ゆき子'], hiragana: ['のざわ', 'ゆきこ'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [
      { kanji: ['野澤先生'], hiragana: ['のざわせんせい'] },
      { kanji: ['ゆき子お姉ちゃん'], hiragana: ['ゆきこおねえちゃん'] },
    ],
    birthday: [4, 17],
    age: undefined,
    releaseOriginalChapter: 69,
    releaseOriginalComicsVolume: 9,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
    animeVoiceActors: undefined,
  },
] as const satisfies Character[];
