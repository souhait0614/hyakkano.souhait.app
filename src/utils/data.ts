import type { ReleasedInfo } from '@/types/Data';
import { RELEASED_LEVELS } from '@/constants/released-level';
import { JUMP_PLUS_RELEASED_EPISODE } from '@/data/meta';
import { ReleasedLevel } from '@/types/ReleasedLevel';

export function validateShortName(name: string[], hiragana: string[], shortNameIndex: number) {
  if (shortNameIndex < 0) throw new Error(`Short name index ${shortNameIndex} is less than 0 for ${name.join('')}`);
  if (shortNameIndex >= name.length) throw new Error(`Short name index ${shortNameIndex} is out of bounds for ${name.join('')}`);
  if (shortNameIndex >= hiragana.length) throw new Error(`Short name index ${shortNameIndex} is out of bounds for hiragana of ${name.join('')}`);
  const shortName = name[shortNameIndex];
  const shortNameHiragana = hiragana[shortNameIndex];
  if (!shortName) throw new Error(`Short name is empty for ${name.join('')} at index ${shortNameIndex}`);
  if (!shortNameHiragana) throw new Error(`Short name hiragana is empty for ${name.join('')} at index ${shortNameIndex}`);
  return { shortName, shortNameHiragana };
}
export function joinName(name: string[]): string {
  return name.join('');
}

export function getTargetReleasedLevels(releasedLevel: ReleasedLevel) {
  const levelIndex = RELEASED_LEVELS.findIndex((level) => level === releasedLevel);
  return RELEASED_LEVELS.slice(0, levelIndex + 1);
}

export function checkReleasedData(data: ReleasedInfo, releasedLevel: ReleasedLevel): boolean {
  const targetLevels = getTargetReleasedLevels(releasedLevel);
  return targetLevels.some((level) => {
    switch (level) {
      case ReleasedLevel.anime:
        return data.releaseAnimeSeason !== undefined && data.releaseAnimeEpisode !== undefined;
      case ReleasedLevel.comics:
        return data.releaseOriginalComicsVolume !== undefined;
      case ReleasedLevel.jumpPlus:
        return data.releaseOriginalChapter !== undefined && data.releaseOriginalChapter <= JUMP_PLUS_RELEASED_EPISODE;
      case ReleasedLevel.youngJump:
        return data.releaseOriginalChapter !== undefined;
      default:
        level satisfies never;
        return false;
    }
  });
}

export function filterReleasedData<T extends ReleasedInfo>(dataList: T[], releasedLevel: ReleasedLevel): T[] {
  return dataList.filter((data) => checkReleasedData(data, releasedLevel));
}

export function getLatestReleasedData(dataList: ReleasedInfo[]): { animeSeason: number; animeEpisode: number; comicsVolume: number; jumpPlusChapter: number; youngJumpChapter: number; } {
  let animeSeason = 0;
  let animeEpisode = 0;
  let comicsVolume = 0;
  let jumpPlusChapter = 0;
  let youngJumpChapter = 0;

  for (const data of dataList) {
    if (data.releaseAnimeSeason !== undefined && data.releaseAnimeEpisode !== undefined && data.releaseAnimeEpisode > animeEpisode) {
      animeSeason = data.releaseAnimeSeason;
      animeEpisode = data.releaseAnimeEpisode;
    }
    if (data.releaseOriginalComicsVolume !== undefined && data.releaseOriginalComicsVolume > comicsVolume) {
      comicsVolume = data.releaseOriginalComicsVolume;
    }
    if (data.releaseOriginalChapter !== undefined && data.releaseOriginalChapter > youngJumpChapter) {
      youngJumpChapter = data.releaseOriginalChapter;

      if (data.releaseOriginalChapter <= JUMP_PLUS_RELEASED_EPISODE && data.releaseOriginalChapter > jumpPlusChapter) {
        jumpPlusChapter = data.releaseOriginalChapter;
      }
    }
  }

  return { animeSeason, animeEpisode, comicsVolume, jumpPlusChapter, youngJumpChapter } as const;
}
