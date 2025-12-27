import type { Character } from '@/types/Data';

export const RENTARO_CHARACTER: Character = {
  name: { kanji: ['愛城', '恋太郎'], hiragana: ['あいじょう', 'れんたろう'], shortNameIndex: 1 },
  anotherNames: undefined,
  nicknames: undefined,
  birthday: [5, 1],
  age: 16,
  releaseOriginalChapter: 1,
  releaseOriginalComicsVolume: 1,
  releaseAnimeSeason: 1,
  releaseAnimeEpisode: 1,
  animeVoiceActors: [{ kanji: ['加藤', '渉'], hiragana: ['かとう', 'わたる'] }],
  variants: [{
    variantName: { kanji: ['0歳'], hiragana: ['ぜろさい'] },
    anotherNames: undefined,
    nicknames: undefined,
    age: 0,
    releaseOriginalChapter: 1,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
    animeVoiceActors: [{ kanji: ['天海', '由梨奈'], hiragana: ['あまみ', 'ゆりな'] }],
  }],
} as const;
