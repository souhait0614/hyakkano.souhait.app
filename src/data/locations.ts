import type { Location } from '@/types/Data';

export const SCHOOLS: Location[] = [
  {
    name: { kanji: 'お花の蜜大学附属高等学校', hiragana: 'おはなのみつだいがくふぞくこうとうがっこう' },
    anotherNames: [
      { kanji: 'お花の蜜高校', hiragana: 'おはなのみつこうこう' },
      { kanji: 'お花高', hiragana: 'おはなこう' },
      { kanji: 'お花の蜜学園高等部', hiragana: 'おはなのみつがくえんこうとうぶ' },
    ],
    releaseOriginalChapter: 1,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
  },
  {
    name: { kanji: 'お花の蜜大学附属中学校', hiragana: 'おはなのみつだいがくふぞくちゅうがっこう' },
    anotherNames: [
      { kanji: 'お花の蜜中学校', hiragana: 'おはなのみつちゅうがっこう' },
      { kanji: 'お花中', hiragana: 'おはなちゅう' },
      // NOTE: https://twitter.com/hyakkano/status/1658125167808196608
      { kanji: 'お花の蜜学園中等部', hiragana: 'おはなのみつがくえんちゅうとうぶ' },
    ],
    releaseOriginalChapter: 24,
    releaseOriginalComicsVolume: 4,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 13,
  },
  {
    name: { kanji: '美玲中学校', hiragana: 'みれいちゅうがっこう' },
    anotherNames: undefined,
    releaseOriginalChapter: 40,
    releaseOriginalComicsVolume: 5,
    releaseAnimeSeason: 2,
    releaseAnimeEpisode: 19,
  },
  {
    name: { kanji: 'お花の蜜大学', hiragana: 'おはなのみつだいがく' },
    anotherNames: [
      { kanji: 'お花大', hiragana: 'おはなだい' },
      { kanji: 'お花の蜜学園大学部', hiragana: 'おはなのみつがくえんだいがくぶ' },
    ],
    releaseOriginalChapter: 132,
    releaseOriginalComicsVolume: 16,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  },
];

export const TOWNS: Location[] = [
  {
    name: { kanji: '梳杉町', hiragana: 'すきすぎちょう' },
    anotherNames: undefined,
    releaseOriginalChapter: 1,
    releaseOriginalComicsVolume: 1,
    releaseAnimeSeason: 1,
    releaseAnimeEpisode: 1,
  },
  {
    name: { kanji: '木雷杉町', hiragana: 'きらいすぎちょう' },
    anotherNames: undefined,
    releaseOriginalChapter: 97,
    releaseOriginalComicsVolume: 12,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  },
  {
    name: { kanji: '不津宇町', hiragana: 'ふつうちょう' },
    anotherNames: undefined,
    releaseOriginalChapter: 97,
    releaseOriginalComicsVolume: 12,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  },
  {
    name: { kanji: '度血裸加戸家場酢木町', hiragana: 'どちらかといえばすきちょう' },
    anotherNames: undefined,
    releaseOriginalChapter: 97,
    releaseOriginalComicsVolume: 12,
    releaseAnimeSeason: undefined,
    releaseAnimeEpisode: undefined,
  },
];
