'use client';

import { useContext, useMemo } from 'react';

import { ReleasedLevel } from '@/types/ReleasedLevel';

import type { BirthdayCharacterType } from './types';
import { CharactersContext } from './contexts';
import { useReleasedLevelFilter, useTypesFilter } from './hooks';

export function ReleasedLevelFilterSelect() {
  const characters = useContext(CharactersContext);
  const { releasedLevelFilter, setReleasedLevelFilter } = useReleasedLevelFilter();

  const [latestAnimeSeason, latestComicsVolume, latestJumpPlusEpisode, latestYoungJumpVolume] = useMemo(() => {
    let animeSeason = 0;
    let comicsVolume = 0;
    let jumpPlusEpisode = 0;
    let youngJumpVolume = 0;
    for (const character of characters) {
      if (character.releasedLevel === ReleasedLevel.anime) {
        if (!animeSeason || character.releaseAnimeSeason > animeSeason) {
          animeSeason = character.releaseAnimeSeason;
        }
      } else if (character.releasedLevel === ReleasedLevel.comics) {
        if (!comicsVolume || character.releaseOriginalComicsVolume > comicsVolume) {
          comicsVolume = character.releaseOriginalComicsVolume;
        }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (character.releasedLevel === ReleasedLevel.jumpPlus || character.releasedLevel === ReleasedLevel.youngJump) {
        if (!youngJumpVolume || character.releaseOriginalEpisode > youngJumpVolume) {
          youngJumpVolume = character.releaseOriginalEpisode;
        }
        if (character.releasedLevel === ReleasedLevel.jumpPlus) {
          if (!jumpPlusEpisode || character.releaseOriginalEpisode > jumpPlusEpisode) {
            jumpPlusEpisode = character.releaseOriginalEpisode;
          }
        }
      }
    }
    return [animeSeason, comicsVolume, jumpPlusEpisode, youngJumpVolume] as const;
  }, [characters]);

  const releasedLevelFilterOptions = useMemo(
    () => [
      { label: `TVアニメ登場キャラ (~${latestAnimeSeason}期)`, value: ReleasedLevel.anime },
      { label: `コミックス登場キャラ (~${latestComicsVolume}巻)`, value: ReleasedLevel.comics },
      { label: `少年ジャンプ＋登場キャラ (~${latestJumpPlusEpisode}話)`, value: ReleasedLevel.jumpPlus },
      { label: `週刊ヤングジャンプ登場キャラ (~${latestYoungJumpVolume}話)`, value: ReleasedLevel.youngJump },
    ] as const satisfies { label: string; value: ReleasedLevel; }[],
    [latestAnimeSeason, latestComicsVolume, latestJumpPlusEpisode, latestYoungJumpVolume],
  );

  return (
    <div className='flex flex-col gap-0.5'>
      <select
        id='releasedLevel'
        value={releasedLevelFilter}
        onChange={(e) => setReleasedLevelFilter(e.target.value as ReleasedLevel)}
        className='max-sm:text-sm'
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
      {(releasedLevelFilter === ReleasedLevel.jumpPlus || releasedLevelFilter === ReleasedLevel.youngJump) && (
        <p className='text-sm'>※コミックス未登場のキャラクターは基本的に誕生日が未判明です。</p>
      )}
    </div>
  );
}

const typesFilterInputs = [
  { label: '彼女を表示', value: 'GIRLFRIEND' },
  { label: '恋太郎を表示', value: 'RENTARO' },
  { label: '作者を表示', value: 'AUTHOR' },
] as const satisfies { label: string; value: BirthdayCharacterType; }[];

export function TypesFilterCheckboxes() {
  const { typesFilter, toggleTypeFilter } = useTypesFilter();
  return (
    <>
      {typesFilterInputs.map((input) => (
        <label key={input.value} className='flex items-center gap-1'>
          <input
            type='checkbox'
            id={`type-${input.value}`}
            checked={typesFilter.includes(input.value)}
            onChange={() => toggleTypeFilter(input.value)}
          />
          {input.label}
        </label>
      ))}
    </>
  );
}
