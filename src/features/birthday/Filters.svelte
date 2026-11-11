<script lang="ts">
  import { ReleasedLevel } from '@/types/ReleasedLevel';

  import type { BirthdayCharacterType } from './types';
  import { getBirthdayState } from './state.svelte';

  const state = getBirthdayState();

  const releasedLevelFilterOptions = $derived.by(() => {
    let animeSeason = 0;
    let comicsVolume = 0;
    let jumpPlusEpisode = 0;
    let youngJumpVolume = 0;
    for (const character of state.characters) {
      if (character.releasedLevel === ReleasedLevel.anime) {
        if (!animeSeason || character.releaseAnimeSeason > animeSeason) {
          animeSeason = character.releaseAnimeSeason;
        }
      } else if (character.releasedLevel === ReleasedLevel.comics) {
        if (!comicsVolume || character.releaseOriginalComicsVolume > comicsVolume) {
          comicsVolume = character.releaseOriginalComicsVolume;
        }
      } else if (character.releasedLevel === ReleasedLevel.jumpPlus || character.releasedLevel === ReleasedLevel.youngJump) {
        if (!youngJumpVolume || character.releaseOriginalChapter > youngJumpVolume) {
          youngJumpVolume = character.releaseOriginalChapter;
        }
        if (character.releasedLevel === ReleasedLevel.jumpPlus) {
          if (!jumpPlusEpisode || character.releaseOriginalChapter > jumpPlusEpisode) {
            jumpPlusEpisode = character.releaseOriginalChapter;
          }
        }
      }
    }
    return [
      { label: `TVアニメ登場キャラ (~${animeSeason}期)`, value: ReleasedLevel.anime },
      { label: `コミックス登場キャラ (~${comicsVolume}巻)`, value: ReleasedLevel.comics },
      { label: `少年ジャンプ＋登場キャラ (~${jumpPlusEpisode}話)`, value: ReleasedLevel.jumpPlus },
      { label: `週刊ヤングジャンプ登場キャラ (~${youngJumpVolume}話)`, value: ReleasedLevel.youngJump },
    ] as const satisfies { label: string; value: ReleasedLevel; }[];
  });

  const typesFilterInputs = [
    { label: '彼女を表示', value: 'GIRLFRIEND' },
    { label: '恋太郎を表示', value: 'RENTARO' },
    { label: '作者を表示', value: 'AUTHOR' },
  ] as const satisfies { label: string; value: BirthdayCharacterType; }[];
</script>

<div class='flex flex-col gap-0.5'>
  <select
    id='releasedLevel'
    class='max-sm:text-sm'
    value={state.releasedLevelFilter}
    onchange={(event) => state.setReleasedLevelFilter(event.currentTarget.value as ReleasedLevel)}
  >
    {#each releasedLevelFilterOptions as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if state.releasedLevelFilter === ReleasedLevel.jumpPlus || state.releasedLevelFilter === ReleasedLevel.youngJump}
    <p class='text-sm'>※コミックス未登場のキャラクターは基本的に誕生日が未判明です。</p>
  {/if}
</div>

<div class='flex flex-wrap gap-2'>
  {#each typesFilterInputs as input (input.value)}
    <label class='flex items-center gap-1'>
      <input
        type='checkbox'
        id={`type-${input.value}`}
        checked={state.typesFilter.includes(input.value)}
        onchange={() => state.toggleTypeFilter(input.value)}
      />
      {input.label}
    </label>
  {/each}
</div>

<div class='flex flex-wrap gap-2'>
  <div class='flex items-center gap-1'>
    <input
      type='checkbox'
      id='showNameRuby'
      checked={state.showNameRuby}
      onchange={(event) => state.setShowNameRuby(event.currentTarget.checked)}
    />
    <label for='showNameRuby'>名前にルビを表示する</label>
  </div>
</div>
