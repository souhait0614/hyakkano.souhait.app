import type { DataEntries, DataId, Location, LocationIdBase } from '@/types/Data';

export const townsEntries = [
  ['location_town_sukisugi', {
    name: { kanji: '梳杉町', hiragana: 'すきすぎちょう' },
    anotherNames: undefined,
    releaseOriginalMainChapter: 1,
    releaseOriginalMainComicsVolume: 1,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
  }],
  ['location_town_kiraisugi', {
    name: { kanji: '木雷杉町', hiragana: 'きらいすぎちょう' },
    anotherNames: undefined,
    releaseOriginalMainChapter: 97,
    releaseOriginalMainComicsVolume: 12,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  }],
  ['location_town_futsuu', {
    name: { kanji: '不津宇町', hiragana: 'ふつうちょう' },
    anotherNames: undefined,
    releaseOriginalMainChapter: 97,
    releaseOriginalMainComicsVolume: 12,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  }],
  ['location_town_docherakakotokebasuki', {
    name: { kanji: '度血裸加戸家場酢木町', hiragana: 'どちらかといえばすきちょう' },
    anotherNames: undefined,
    releaseOriginalMainChapter: 97,
    releaseOriginalMainComicsVolume: 12,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  }],
] as const satisfies DataEntries<LocationIdBase<'town'>, Location>;

export type TownLocationId = DataId<typeof townsEntries>;

export const TOWNS: ReadonlyMap<TownLocationId, Location> = new Map<TownLocationId, Location>(townsEntries);
