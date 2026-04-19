import type { Character, CharacterIdBase, DataEntries, DataId } from '@/types/Data';

// NOTE: https://100kanojo.fandom.com/wiki/Pentarou
const pepepePentarouCharactersEntries = [
  ['character_pepepe_pentarou_pentarou', {
    name: { kanji: ['ペン太郎'], hiragana: ['ぺんたろう'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 29,
    releaseOriginalComicsVolume: 4,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 16,
    seiyuuAnimeIds: undefined,
  }],
  ['character_pepepe_pentarou_kajikimaguronosuke', {
    name: { kanji: ['カジキマグロ之助'], hiragana: ['かじきまぐろのすけ'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 91,
    releaseOriginalComicsVolume: 11,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
    seiyuuAnimeIds: undefined,
  }],
  ['character_pepepe_pentarou_samezaemon', {
    name: { kanji: ['サメ左衛門'], hiragana: ['さめざえもん'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 91,
    releaseOriginalComicsVolume: 11,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
    seiyuuAnimeIds: undefined,
  }],
] as const satisfies DataEntries<CharacterIdBase<'pepepe_pentarou'>, Character>;

export type PepepePentarouCharacterId = DataId<typeof pepepePentarouCharactersEntries>;

export const PEPEPE_PENTAROU_CHARACTERS: ReadonlyMap<PepepePentarouCharacterId, Character> = new Map<PepepePentarouCharacterId, Character>(pepepePentarouCharactersEntries);
