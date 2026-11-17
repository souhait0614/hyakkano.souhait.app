<script lang="ts">
  import EffectConfetti from '@/components/EffectConfetti.svelte';
  import IconConfetti from '@/components/icons/IconConfetti.svelte';

  import { getBirthdayState } from './state.svelte';

  const state = getBirthdayState();

  const birthdayCharacters = $derived(state.filteredCharacters.filter((character) => {
    if (!character.birthday) return false;
    const [month, day] = character.birthday;
    return month === state.today.getMonth() + 1 && day === state.today.getDate();
  }));

  const birthdayCharactersKey = $derived(birthdayCharacters.map((character) => character.name.kanji.join('')).join(','));
</script>

{#if birthdayCharacters.length > 0}
  <div class='flex flex-col gap-2 card text-center'>
    <div class="flex text-animate-rainbow items-center justify-center gap-2"
    >
      <IconConfetti class='rotate-y-180' />
      <h2 class='text-lg'>本日({state.today.getMonth() + 1}/{state.today.getDate()})誕生日</h2>
      <IconConfetti />
    </div>
    <ul class={`
      flex flex-row flex-wrap justify-center gap-4
      *:grow *:text-2xl *:font-bold
    `}
    >
      {#each birthdayCharacters as character (character.name.kanji.join(''))}
        <li>
          {character.name.kanji.join(' ')}
        </li>
      {/each}
    </ul>
  </div>
  {#key birthdayCharactersKey}
    <EffectConfetti />
  {/key}
{/if}
