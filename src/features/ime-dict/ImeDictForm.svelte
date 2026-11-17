<script lang="ts">
  import { TITLE_SPINOFF } from '@data/meta';
  import { PersistedState } from 'runed';

  import IconDownload from '@/components/icons/IconDownload.svelte';
  import IconList from '@/components/icons/IconList.svelte';
  import LinkButton from '@/components/LinkButton.svelte';
  import { ReleasedLevel } from '@/types/ReleasedLevel';

  import { IME_DICT_DEFAULT_GENERATE_OPTIONS } from './constants';
  import { IME_DICT_FILE_VARIANTS, createImeDictDownloadHref, createImeDictPreviewHref } from './downloadLinks';
  import { generateOptionsKeyLabels, releasedLevelLabels } from './labels';
  import type { ImeDictGenerateOptions, ImeDictGenerateOptionsInput } from './schemas';

  type Props = {
    latestAnimeSeason: number;
    latestAnimeEpisode: number | null;
    latestComicsVolume: number;
    latestJumpPlusMainChapter: number;
    latestJumpPlusSpinoffChapter: number;
    latestYoungJumpMainChapter: number;
    latestYoungJumpSpinoffChapter: number;
  };

  let {
    latestAnimeSeason,
    latestAnimeEpisode,
    latestComicsVolume,
    latestJumpPlusMainChapter,
    latestJumpPlusSpinoffChapter,
    latestYoungJumpMainChapter,
    latestYoungJumpSpinoffChapter,
  }: Props = $props();

  const STORAGE_KEY = 'ime-dict_generateOptions';

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

  const otherTypeInputs = [
    'title',
    'songs',
    'schools',
    'towns',
    'terms',
    'seiyuusAnime',
    'seiyuusVoiceDrama',
  ] as const satisfies (keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel' | 'characterRentaro' | 'characterGirlfriends' | 'characterAuthors' | 'characterCircletLoveStory' | 'characterGoriraAlliance' | 'characterJurassicHighSchoolBaseballTeam' | 'characterPeppePentaro' | 'characterOthers'>)[];

  const releasedLevelFilterOptions = $derived([
    { label: latestAnimeEpisode !== null ? `${releasedLevelLabels.anime} (${latestAnimeSeason}期${latestAnimeEpisode}話および${latestAnimeSeason}期発表済み用語まで)` : `${releasedLevelLabels.anime} (${latestAnimeSeason}期発表済み用語まで)`, value: ReleasedLevel.anime },
    { label: `${releasedLevelLabels.comics} (${latestComicsVolume}巻まで)`, value: ReleasedLevel.comics },
    { label: `${releasedLevelLabels.jumpPlus} (本編${latestJumpPlusMainChapter}話, ${TITLE_SPINOFF} 第${latestJumpPlusSpinoffChapter}話まで)`, value: ReleasedLevel.jumpPlus },
    { label: `${releasedLevelLabels.youngJump} (本編${latestYoungJumpMainChapter}話, ${TITLE_SPINOFF} 第${latestYoungJumpSpinoffChapter}話まで)`, value: ReleasedLevel.youngJump },
  ] satisfies { label: string; value: ReleasedLevel; }[]);

  /**
   * 旧形式 (`voiceActors`) からの移行と、後から追加されたキーの既定値補完
   */
  function migrateGenerateOptions(raw: string): ImeDictGenerateOptions {
    try {
      const { voiceActors, ...rest } = JSON.parse(raw) as Partial<ImeDictGenerateOptions> & { voiceActors?: boolean; };
      return {
        ...IME_DICT_DEFAULT_GENERATE_OPTIONS,
        ...rest,
        ...voiceActors === undefined ? {} : { seiyuusAnime: voiceActors },
      };
    } catch {
      return { ...IME_DICT_DEFAULT_GENERATE_OPTIONS };
    }
  }

  const generateOptions = new PersistedState<ImeDictGenerateOptions>(
    STORAGE_KEY,
    { ...IME_DICT_DEFAULT_GENERATE_OPTIONS },
    { serializer: { serialize: JSON.stringify, deserialize: migrateGenerateOptions } },
  );

  const options = $derived(generateOptions.current);

  function setOption<K extends keyof ImeDictGenerateOptions>(key: K, value: ImeDictGenerateOptions[K]) {
    generateOptions.current = { ...generateOptions.current, [key]: value };
  }

  function toggleOption(key: (typeof characterTypeInputs)[number] | (typeof otherTypeInputs)[number]) {
    setOption(key, !generateOptions.current[key]);
  }

  function setAllOptions(value: boolean) {
    const next = { ...generateOptions.current };
    for (const key of Object.keys(next) as (keyof ImeDictGenerateOptions)[]) {
      if (key === 'releasedLevel') continue;
      next[key] = value;
    }
    generateOptions.current = next;
  }
</script>

<section>
  <h3>辞書に含める範囲</h3>
  <select
    class='w-full'
    value={options.releasedLevel}
    onchange={(event) => setOption('releasedLevel', event.currentTarget.value as ReleasedLevel)}
  >
    {#each releasedLevelFilterOptions as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</section>

<section>
  <h3>辞書に含めるキャラクター名</h3>
  <div class='flex flex-wrap gap-2'>
    {#each characterTypeInputs as input (input)}
      <label class='flex items-center gap-1'>
        <input
          type='checkbox'
          checked={options[input]}
          onchange={() => toggleOption(input)}
        />
        {generateOptionsKeyLabels[input]}
      </label>
    {/each}
  </div>
</section>

<section>
  <h3>辞書に含めるその他の用語</h3>
  <div class='flex flex-wrap gap-2'>
    {#each otherTypeInputs as input (input)}
      <label class='flex items-center gap-1'>
        <input
          type='checkbox'
          checked={options[input]}
          onchange={() => toggleOption(input)}
        />
        {generateOptionsKeyLabels[input]}
      </label>
    {/each}
  </div>
</section>

<div class='flex flex-row justify-end gap-2'>
  <button type='button' onclick={() => setAllOptions(true)}>全て選択</button>
  <button type='button' onclick={() => setAllOptions(false)}>全て解除</button>
</div>

<div class={`
  flex flex-row flex-wrap justify-center
  *:w-1/2
  max-sm:*:w-full
`}
>
  {#each IME_DICT_FILE_VARIANTS as variant (variant.id)}
    <LinkButton
      download
      prefetch={false}
      align='center'
      icon={IconDownload}
      href={createImeDictDownloadHref(variant.path, options)}
      label={variant.label}
    />
  {/each}
  <LinkButton
    prefetch={false}
    align='center'
    icon={IconList}
    to={createImeDictPreviewHref(options)}
    label='内容を表示'
  />
</div>
