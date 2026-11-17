<script lang="ts">
  import { onMount } from 'svelte';

  import BirthdayCharactersCard from './BirthdayCharactersCard.svelte';
  import Clock from './Clock.svelte';
  import Filters from './Filters.svelte';
  import GoogleCalendarLinks from './GoogleCalendarLinks.svelte';
  import type { CalendarIds } from './googleCalendar';
  import { createBirthdayState, setBirthdayState } from './state.svelte';
  import Table from './Table.svelte';
  import type { BirthdayCharacter } from './types';

  type Props = {
    title: string;
    characters: BirthdayCharacter[];
    calendarIds: CalendarIds;
  };

  let { title, characters, calendarIds }: Props = $props();

  const state = createBirthdayState(() => characters);
  setBirthdayState(state);

  onMount(() => {
    const timer = window.setInterval(() => state.tick(), 1000);
    return () => window.clearInterval(timer);
  });
</script>

<div class='flex flex-wrap items-center justify-between gap-x-2'>
  <h1 class='page-title'>{title}</h1>
  <p class='card px-3 py-2'>
    <Clock class='font-mono' /> <span class='text-xs'>(JST)</span>
  </p>
</div>

<section class='flex flex-col gap-2 card'>
  <h2 class='text-lg'>表示設定</h2>
  <Filters />
</section>

<section class='flex flex-col gap-2 card'>
  <details>
    <summary class='cursor-pointer'>
      <h2 class='inline text-lg'>Googleカレンダーに追加</h2>
    </summary>
    <div class='mt-2 flex flex-col gap-2'>
      <p>Googleカレンダーに登場キャラクターの誕生日を追加できます。</p>
      <p>彼女の誕生日は表示設定に基づいて追加されるカレンダーの種類が変わります。</p>
      <p>キャラクター誕生日一覧に情報が追加された場合、更新は自動で行われます。</p>
      <GoogleCalendarLinks {calendarIds} />
    </div>
  </details>
</section>

<BirthdayCharactersCard />

<section class='card'>
  <h2 class='sr-only'>キャラクター一覧</h2>
  <Table />
</section>
