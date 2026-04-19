import type { ReleasedInfo } from '@/types/Data';
import { RELEASED_LEVELS } from '@/constants/released-level';
import { JUMP_PLUS_RELEASE_MAIN_CHAPTER, JUMP_PLUS_RELEASE_SPINOFF_CHAPTER } from '@/data/meta';
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
      case ReleasedLevel.anime: {
        return data.releaseAnimeSeason !== undefined && data.releaseAnimeEpisode !== undefined;
      }
      case ReleasedLevel.comics: {
        return data.releaseOriginalMainComicsVolume !== undefined;
      }
      case ReleasedLevel.jumpPlus: {
        const mainChapterReleased = data.releaseOriginalMainChapter !== undefined && data.releaseOriginalMainChapter <= JUMP_PLUS_RELEASE_MAIN_CHAPTER;
        const spinoffChapterReleased = data.releaseOriginalSpinoffChapter !== undefined && data.releaseOriginalSpinoffChapter <= JUMP_PLUS_RELEASE_SPINOFF_CHAPTER;
        return mainChapterReleased || spinoffChapterReleased;
      }
      case ReleasedLevel.youngJump: {
        const mainChapterReleasedYoungJump = data.releaseOriginalMainChapter !== undefined;
        const spinoffChapterReleasedYoungJump = data.releaseOriginalSpinoffChapter !== undefined;
        return mainChapterReleasedYoungJump || spinoffChapterReleasedYoungJump;
      }
      default: {
        level satisfies never;
        return false;
      }
    }
  });
}

export function filterReleasedData<T extends string, U extends ReleasedInfo>(dataList: ReadonlyMap<T, U> | [T, U][], releasedLevel: ReleasedLevel): [T, U][] {
  return Array.from(dataList).filter(([, data]) => checkReleasedData(data, releasedLevel));
}

export function getLatestReleasedData(dataList: ReleasedInfo[]): { animeSeason: number; animeEpisode: number; comicsVolume: number; jumpPlusMainChapter: number; jumpPlusSpinoffChapter: number; youngJumpMainChapter: number; youngJumpSpinoffChapter: number; } {
  let animeSeason = 0;
  let animeEpisode = 0;
  let comicsVolume = 0;
  let jumpPlusMainChapter = 0;
  let jumpPlusSpinoffChapter = 0;
  let youngJumpMainChapter = 0;
  let youngJumpSpinoffChapter = 0;

  for (const data of dataList) {
    if (data.releaseAnimeSeason !== undefined && data.releaseAnimeEpisode !== undefined && data.releaseAnimeEpisode > animeEpisode) {
      animeSeason = data.releaseAnimeSeason;
      animeEpisode = data.releaseAnimeEpisode;
    }
    if (data.releaseOriginalMainComicsVolume !== undefined && data.releaseOriginalMainComicsVolume > comicsVolume) {
      comicsVolume = data.releaseOriginalMainComicsVolume;
    }
    if (data.releaseOriginalMainChapter !== undefined && data.releaseOriginalMainChapter > jumpPlusMainChapter && data.releaseOriginalMainChapter <= JUMP_PLUS_RELEASE_MAIN_CHAPTER) {
      jumpPlusMainChapter = data.releaseOriginalMainChapter;
    }
    if (data.releaseOriginalSpinoffChapter !== undefined && data.releaseOriginalSpinoffChapter > jumpPlusSpinoffChapter && data.releaseOriginalSpinoffChapter <= JUMP_PLUS_RELEASE_SPINOFF_CHAPTER) {
      jumpPlusSpinoffChapter = data.releaseOriginalSpinoffChapter;
    }
    if (data.releaseOriginalMainChapter !== undefined && data.releaseOriginalMainChapter > youngJumpMainChapter) {
      youngJumpMainChapter = data.releaseOriginalMainChapter;
    }
    if (data.releaseOriginalSpinoffChapter !== undefined && data.releaseOriginalSpinoffChapter > youngJumpSpinoffChapter) {
      youngJumpSpinoffChapter = data.releaseOriginalSpinoffChapter;
    }
  }

  return { animeSeason, animeEpisode, comicsVolume, jumpPlusMainChapter, jumpPlusSpinoffChapter, youngJumpMainChapter, youngJumpSpinoffChapter } as const;
}
