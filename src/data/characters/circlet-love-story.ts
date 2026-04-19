import type { Character, CharacterIdBase, DataEntries, DataId } from '@/types/Data';

const circletLoveStoryCharactersEntries = [
  ['character_circlet_love_story_iohime', {
    name: { kanji: ['イオ姫'], hiragana: ['いおひめ'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 3,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 3,
    seiyuuAnimeIds: ['seiyuu_anime_naganawa_maria'],
  }],
  ['character_circlet_love_story_kamakuru', {
    name: { kanji: ['カマクル'], hiragana: ['かまくる'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalChapter: 3,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 3,
    seiyuuAnimeIds: ['seiyuu_anime_kato_wataru'],
  }],
] as const satisfies DataEntries<CharacterIdBase<'circlet_love_story'>, Character>;

export type CircletLoveStoryCharacterId = DataId<typeof circletLoveStoryCharactersEntries>;

export const CIRCLET_LOVE_STORY_CHARACTERS: ReadonlyMap<CircletLoveStoryCharacterId, Character> = new Map<CircletLoveStoryCharacterId, Character>(circletLoveStoryCharactersEntries);
