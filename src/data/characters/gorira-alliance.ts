import type { Character } from '@/types/Data';

// NOTE: Gorillaではないらしい https://100kanojo.fandom.com/wiki/Gorira_Alliance
export const GORIRA_ALLIANCE_CHARACTERS: Character[] = [
  {
    name: { kanji: ['総長'], hiragana: ['そうちょう'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [{ kanji: ['ボスゴリラ'], hiragana: ['ぼすごりら'] }],
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 14,
    releaseOriginalComicsVolume: 2,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
    animeVoiceActors: [{ kanji: ['斉藤', '貴美子'], hiragana: ['さいとう', 'きみこ'] }],
  },
  {
    name: { kanji: ['サブゴリラ'], hiragana: ['さぶごりら'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 14,
    releaseOriginalComicsVolume: 2,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
    animeVoiceActors: [
      { kanji: ['紡木', '吏佐'], hiragana: ['つむぎ', 'りさ'] },
      { kanji: ['黒木', '響'], hiragana: ['くろき', 'ひびき'] },
      { kanji: ['酒井', '美沙乃'], hiragana: ['さかい', 'みさの'] },
      { kanji: ['森谷', '彩子'], hiragana: ['もりや', 'さいこ'] },
    ],
  },
];
