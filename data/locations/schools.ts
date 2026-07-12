import type { DataEntries, DataId, Location, LocationIdBase } from '@/types/Data';

const schoolsEntries = [
  ['location_school_ohananomitsu_high', {
    name: { kanji: 'お花の蜜大学附属高等学校', hiragana: 'おはなのみつだいがくふぞくこうとうがっこう' },
    anotherNames: [
      { kanji: 'お花の蜜高校', hiragana: 'おはなのみつこうこう' },
      { kanji: 'お花高', hiragana: 'おはなこう' },
      { kanji: 'お花の蜜学園高等部', hiragana: 'おはなのみつがくえんこうとうぶ' },
    ],
    releaseOriginalMainChapter: 1,
    releaseOriginalMainComicsVolume: 1,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
  }],
  ['location_school_ohananomitsu_middle', {
    name: { kanji: 'お花の蜜大学附属中学校', hiragana: 'おはなのみつだいがくふぞくちゅうがっこう' },
    anotherNames: [
      { kanji: 'お花の蜜中学校', hiragana: 'おはなのみつちゅうがっこう' },
      { kanji: 'お花中', hiragana: 'おはなちゅう' },
      // NOTE: https://twitter.com/hyakkano/status/1658125167808196608
      { kanji: 'お花の蜜学園中等部', hiragana: 'おはなのみつがくえんちゅうとうぶ' },
    ],
    releaseOriginalMainChapter: 24,
    releaseOriginalMainComicsVolume: 4,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 13,
  }],
  ['location_school_mirei_middle', {
    name: { kanji: '美玲中学校', hiragana: 'みれいちゅうがっこう' },
    anotherNames: undefined,
    releaseOriginalMainChapter: 40,
    releaseOriginalMainComicsVolume: 5,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 19,
  }],
  ['location_school_ohananomitsu_university', {
    name: { kanji: 'お花の蜜大学', hiragana: 'おはなのみつだいがく' },
    anotherNames: [
      { kanji: 'お花大', hiragana: 'おはなだい' },
      { kanji: 'お花の蜜学園大学部', hiragana: 'おはなのみつがくえんだいがくぶ' },
    ],
    releaseOriginalMainChapter: 132,
    releaseOriginalMainComicsVolume: 16,
    releaseOriginalSpinoffChapter: undefined,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  }],
] as const satisfies DataEntries<LocationIdBase<'school'>, Location>;

export type SchoolLocationId = DataId<typeof schoolsEntries>;

export const SCHOOLS: ReadonlyMap<SchoolLocationId, Location> = new Map<SchoolLocationId, Location>(schoolsEntries);
