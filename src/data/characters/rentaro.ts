import type { Character, CharacterIdBase, DataEntries, DataId } from '@/types/Data';

const rentaroCharactersEntries = [
  ['character_rentaro_aijou_rentaro', {
    name: { kanji: ['愛城', '恋太郎'], hiragana: ['あいじょう', 'れんたろう'], shortNameIndex: 1 },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: [5, 1],
    age: 16,
    releaseOriginalChapter: 1,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
    seiyuuAnimeIds: ['seiyuu_anime_kato_wataru'],
    variants: [
      ['zerosai', {
        variantName: { kanji: ['0歳'], hiragana: ['ぜろさい'] },
        anotherNames: undefined,
        nicknames: undefined,
        age: 0,
        releaseOriginalChapter: 1,
        releaseOriginalComicsVolume: 1,
        releaseAnimeSeason: 1,
        releaseAnimeEpisode: 1,
        seiyuuAnimeIds: ['seiyuu_anime_amami_yurina'],
      }],
    ],
  }],
] as const satisfies DataEntries<CharacterIdBase<'rentaro'>, Character>;

export type RentaroCharacterId = DataId<typeof rentaroCharactersEntries>;

export const RENTARO_CHARACTERS: ReadonlyMap<RentaroCharacterId, Character> = new Map<RentaroCharacterId, Character>(rentaroCharactersEntries);
