'use client';

import type { CharacterReleasedLevel, CharacterType } from './types';
import { CHARACTERS } from './constants';
import { useReleasedLevelFilter, useTypesFilter } from './hooks';

const [latestAnimeSeason, latestComicsVolume, latestJumpPlusEpisode, latestYoungJumpVolume] = (() => {
  let animeSeason = 0;
  let comicsVolume = 0;
  let jumpPlusEpisode = 0;
  let youngJumpVolume = 0;
  for (const character of CHARACTERS) {
    if (character.releasedLevel === 'ANIME') {
      if (!animeSeason || character.releaseSeason > animeSeason) {
        animeSeason = character.releaseSeason;
      }
    } else if (character.releasedLevel === 'COMICS') {
      if (!comicsVolume || character.releaseVolume > comicsVolume) {
        comicsVolume = character.releaseVolume;
      }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (character.releasedLevel === 'JUMP_PLUS' || character.releasedLevel === 'YOUNG_JUMP') {
      if (!youngJumpVolume || character.releaseEpisode > youngJumpVolume) {
        youngJumpVolume = character.releaseEpisode;
      }
      if (character.releasedLevel === 'JUMP_PLUS') {
        if (!jumpPlusEpisode || character.releaseEpisode > jumpPlusEpisode) {
          jumpPlusEpisode = character.releaseEpisode;
        }
      }
    }
  }
  return [animeSeason, comicsVolume, jumpPlusEpisode, youngJumpVolume] as const;
})();

const releasedLevelFilterOptions = [
  { label: `TVアニメ登場キャラ (~${latestAnimeSeason}期)`, value: 'ANIME' },
  { label: `コミックス登場キャラ (~${latestComicsVolume}巻)`, value: 'COMICS' },
  { label: `少年ジャンプ＋登場キャラ (~${latestJumpPlusEpisode}話)`, value: 'JUMP_PLUS' },
  { label: `週刊ヤングジャンプ登場キャラ (~${latestYoungJumpVolume}話)`, value: 'YOUNG_JUMP' },
] as const satisfies { label: string; value: CharacterReleasedLevel; }[];

export function ReleasedLevelFilterSelect() {
  const { releasedLevelFilter, setReleasedLevelFilter } = useReleasedLevelFilter();
  return (
    <div className='flex flex-col gap-0.5'>
      <select
        id='releasedLevel'
        value={releasedLevelFilter}
        onChange={(e) => setReleasedLevelFilter(e.target.value as CharacterReleasedLevel)}
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
      {(releasedLevelFilter === 'JUMP_PLUS' || releasedLevelFilter === 'YOUNG_JUMP') && (
        <p className='text-sm'>※コミックス未登場のキャラクターは基本的に誕生日が未判明です。</p>
      )}
    </div>
  );
}

const typesFilterInputs = [
  { label: '彼女を表示', value: 'GIRLFRIEND' },
  { label: '恋太郎を表示', value: 'RENTARO' },
  { label: '作者を表示', value: 'AUTHOR' },
] as const satisfies { label: string; value: CharacterType; }[];

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
