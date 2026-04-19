import type { Character, CharacterIdBase, DataEntries, DataId } from '@/types/Data';

// NOTE: Gorillaではないらしい https://100kanojo.fandom.com/wiki/Gorira_Alliance
const goriraAllianceCharactersEntries = [
  ['character_gorira_alliance_souchou', {
    name: { kanji: ['総長'], hiragana: ['そうちょう'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: [{ kanji: ['ボスゴリラ'], hiragana: ['ぼすごりら'] }],
    birthday: undefined,
    age: undefined,
    releaseOriginalMainChapter: 14,
    releaseOriginalMainComicsVolume: 2,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
    seiyuuAnimeIds: ['seiyuu_anime_saitou_kimiko'],
  }],
  ['character_gorira_alliance_sabugorira', {
    name: { kanji: ['サブゴリラ'], hiragana: ['さぶごりら'], shortNameIndex: undefined },
    anotherNames: undefined,
    nicknames: undefined,
    birthday: undefined,
    age: undefined,
    releaseOriginalMainChapter: 14,
    releaseOriginalMainComicsVolume: 2,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 9,
    seiyuuAnimeIds: ['seiyuu_anime_tsumugi_risa', 'seiyuu_anime_kuroki_hibiki', 'seiyuu_anime_sakai_misano', 'seiyuu_anime_moriya_saiko'],
  }],
] as const satisfies DataEntries<CharacterIdBase<'gorira_alliance'>, Character>;

export type GoriraAllianceCharacterId = DataId<typeof goriraAllianceCharactersEntries>;

export const GORIRA_ALLIANCE_CHARACTERS: ReadonlyMap<GoriraAllianceCharacterId, Character> = new Map<GoriraAllianceCharacterId, Character>(goriraAllianceCharactersEntries);
