'use client';

import type { SelectHTMLAttributes } from 'react';
import { useCallback, useMemo } from 'react';

import { TITLE_SPINOFF } from '@/data/meta';
import { ReleasedLevel } from '@/types/ReleasedLevel';

import type { ImeDictGenerateOptionsInput } from './schemas';
import { useGenerateOptions } from './hooks';
import { generateOptionsKeyLabels, releasedLevelLabels } from './labels';

interface GenerateOptionsReleasedLevelSelectorProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  latestAnimeSeason: number;
  latestAnimeEpisode: number;
  latestComicsVolume: number;
  latestJumpPlusMainChapter: number;
  latestJumpPlusSpinoffChapter: number;
  latestYoungJumpMainChapter: number;
  latestYoungJumpSpinoffChapter: number;
}
export function GenerateOptionsReleasedLevelSelector({ latestAnimeSeason, latestAnimeEpisode, latestComicsVolume, latestJumpPlusMainChapter, latestJumpPlusSpinoffChapter, latestYoungJumpMainChapter, latestYoungJumpSpinoffChapter, ...props }: GenerateOptionsReleasedLevelSelectorProps) {
  const { generateOptions, setGenerateOptions } = useGenerateOptions();

  const releasedLevelFilterOptions = useMemo(
    () => [
      { label: `${releasedLevelLabels.anime} (${latestAnimeSeason}期${latestAnimeEpisode}話まで)`, value: ReleasedLevel.anime },
      { label: `${releasedLevelLabels.comics} (${latestComicsVolume}巻まで)`, value: ReleasedLevel.comics },
      { label: `${releasedLevelLabels.jumpPlus} (本編${latestJumpPlusMainChapter}話, ${TITLE_SPINOFF} 第${latestJumpPlusSpinoffChapter}話まで)`, value: ReleasedLevel.jumpPlus },
      { label: `${releasedLevelLabels.youngJump} (本編${latestYoungJumpMainChapter}話, ${TITLE_SPINOFF} 第${latestYoungJumpSpinoffChapter}話まで)`, value: ReleasedLevel.youngJump },
    ] as const satisfies { label: string; value: ReleasedLevel; }[],
    [latestAnimeEpisode, latestAnimeSeason, latestComicsVolume, latestJumpPlusMainChapter, latestJumpPlusSpinoffChapter, latestYoungJumpMainChapter, latestYoungJumpSpinoffChapter],
  );

  return (
    <select
      value={generateOptions.releasedLevel}
      onChange={(e) => setGenerateOptions((prev) => ({ ...prev, releasedLevel: e.target.value as ReleasedLevel }))}
      {...props}
    >
      {releasedLevelFilterOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

const characterTypeInputs = [
  'characterRentaro',
  'characterGirlfriends',
  'characterAuthors',
  'characterCircletLoveStory',
  'characterGoriraAlliance',
  'characterJurassicHighSchoolBaseballTeam',
  'characterPeppePentaro',
  'characterOthers',
] as const satisfies (keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel'>)[];

export function GenerateOptionsCharacterTypeCheckBoxes() {
  const { generateOptions, setGenerateOptions } = useGenerateOptions();

  return (
    <>
      {characterTypeInputs.map((input) => (
        <label key={input} className='flex items-center gap-1'>
          <input
            type='checkbox'
            checked={generateOptions[input]}
            onChange={() => setGenerateOptions((prev) => ({ ...prev, [input]: !prev[input] }))}
          />
          {generateOptionsKeyLabels[input]}
        </label>
      ))}
    </>
  );
}

const otherTypeInputs = [
  'title',
  'schools',
  'towns',
  'seiyuusAnime',
] as const satisfies (keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel' | 'characterRentaro' | 'characterGirlfriends' | 'characterAuthors' | 'characterCircletLoveStory' | 'characterGoriraAlliance' | 'characterJurassicHighSchoolBaseballTeam' | 'characterPeppePentaro' | 'characterOthers'>)[];

export function GenerateOptionsOtherTypeCheckBoxes() {
  const { generateOptions, setGenerateOptions } = useGenerateOptions();

  return (
    <>
      {otherTypeInputs.map((input) => (
        <label key={input} className='flex items-center gap-1'>
          <input
            type='checkbox'
            checked={generateOptions[input]}
            onChange={() => setGenerateOptions((prev) => ({ ...prev, [input]: !prev[input] }))}
          />
          {generateOptionsKeyLabels[input]}
        </label>
      ))}
    </>
  );
}

export function GenerateOptionsAllSetButtons() {
  const { setGenerateOptions } = useGenerateOptions();

  const handleClickAllSelect = useCallback(() => {
    setGenerateOptions((prev) => {
      const newOptions = { ...prev };
      Object.keys(newOptions).forEach((key) => {
        if (key !== 'releasedLevel') {
          newOptions[key as keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel'>] = true;
        }
      });
      return newOptions;
    });
  }, [setGenerateOptions]);
  const handleClickAllDeselect = useCallback(() => {
    setGenerateOptions((prev) => {
      const newOptions = { ...prev };
      Object.keys(newOptions).forEach((key) => {
        if (key !== 'releasedLevel') {
          newOptions[key as keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel'>] = false;
        }
      });
      return newOptions;
    });
  }, [setGenerateOptions]);

  return (
    <>
      <button
        type='button'
        onClick={handleClickAllSelect}
      >
        全て選択
      </button>
      <button
        type='button'
        onClick={handleClickAllDeselect}
      >
        全て解除
      </button>
    </>
  );
}
