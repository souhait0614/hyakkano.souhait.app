<script lang="ts">
  import type { SortDirection } from '@tanstack/svelte-table';

  import IconArrowDown from './icons/IconArrowDown.svelte';
  import IconArrowUp from './icons/IconArrowUp.svelte';

  type Props = {
    sortingDirection: SortDirection | false;
  };

  let { sortingDirection }: Props = $props();
</script>

{#if sortingDirection === 'asc'}
  <IconArrowUp width={16} height={16} class='text-primary-dark' />
{:else if sortingDirection === 'desc'}
  <IconArrowDown width={16} height={16} class='text-primary-dark' />
{/if}
