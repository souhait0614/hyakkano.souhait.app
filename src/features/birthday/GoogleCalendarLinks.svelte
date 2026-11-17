<script lang="ts">
  import IconCalendarPlus from '@/components/icons/IconCalendarPlus.svelte';
  import LinkButton from '@/components/LinkButton.svelte';

  import { createCalendarLinks } from './googleCalendar';
  import type { CalendarIds } from './googleCalendar';
  import { getBirthdayState } from './state.svelte';

  type Props = {
    calendarIds: CalendarIds;
  };

  let { calendarIds }: Props = $props();

  const state = getBirthdayState();

  const links = $derived(createCalendarLinks(state.releasedLevelFilter, state.typesFilter, calendarIds));
</script>

{#if links.length > 0}
  <div class={`
    flex flex-row flex-wrap justify-center
    *:w-full
  `}
  >
    {#each links as link (link.key)}
      <LinkButton
        external
        align='center'
        icon={IconCalendarPlus}
        href={link.url}
        label={`${link.label}を追加`}
      />
    {/each}
  </div>
{/if}
