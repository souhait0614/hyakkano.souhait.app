<script lang="ts">
  import { format } from 'date-fns';

  import { getBirthdayState } from './state.svelte';

  type Props = {
    class?: string;
  };

  let { class: className }: Props = $props();

  const state = getBirthdayState();

  const formattedJstString = $derived(format(state.now, 'yyyy/MM/dd HH:mm:ss'));
</script>

<time class={className} datetime={state.now.toISOString()}>{formattedJstString}</time>
