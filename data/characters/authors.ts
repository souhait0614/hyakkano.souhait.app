import type { Character, CharacterIdBase, DataEntries, DataId } from '@/types/Data';

const authorCharactersEntries = [
  ['character_author_nakamura_rikito', {
    name: { kanji: ['中村', '力斗'], hiragana: ['なかむら', 'りきと'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [
      { kanji: ['中村先生'], hiragana: ['なかむらせんせい'] },
      { kanji: ['力斗お兄ちゃん'], hiragana: ['りきとおにいちゃん'] },
    ],
    birthday: [5, 31],
    age: undefined,
    releaseOriginalMainChapter: undefined,
    releaseOriginalMainComicsVolume: undefined,
    releaseOriginalSpinoffChapter: 1,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 22,
    seiyuuAnimeIds: undefined,
  }],
  ['character_author_nozawa_yukiko', {
    name: { kanji: ['野澤', 'ゆき子'], hiragana: ['のざわ', 'ゆきこ'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [
      { kanji: ['野澤先生'], hiragana: ['のざわせんせい'] },
      { kanji: ['ゆき子お姉ちゃん'], hiragana: ['ゆきこおねえちゃん'] },
    ],
    birthday: [4, 17],
    age: undefined,
    releaseOriginalMainChapter: 69,
    releaseOriginalMainComicsVolume: 9,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
    seiyuuAnimeIds: undefined,
  }],
] as const satisfies DataEntries<CharacterIdBase<'author'>, Character>;

export type AuthorCharacterId = DataId<typeof authorCharactersEntries>;

export const AUTHOR_CHARACTERS: ReadonlyMap<AuthorCharacterId, Character> = new Map<AuthorCharacterId, Character>(authorCharactersEntries);
