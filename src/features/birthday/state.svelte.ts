import type { SortingState } from '@tanstack/svelte-table';
import { TZDateMini } from '@date-fns/tz';
import { isSameDay, startOfDay } from 'date-fns';
import { PersistedState } from 'runed';
import { createContext } from 'svelte';

import { TIMEZONE } from '@/constants/timezone';
import { ReleasedLevel } from '@/types/ReleasedLevel';
import { getTargetReleasedLevels } from '@/utils/data';

import type { BirthdayCharacter, BirthdayCharacterType } from './types';

const STORAGE_KEYS = {
  releasedLevel: 'birthday_releasedLevelFilter',
  types: 'birthday_typesFilter',
  showNameRuby: 'birthday_showNameRuby',
  sorting: 'birthday_table_sorting',
} as const;

const DEFAULT_TYPES_FILTER: BirthdayCharacterType[] = ['RENTARO', 'GIRLFRIEND'];
const DEFAULT_SORTING: SortingState = [{ id: 'daysUntilBirthday', desc: false }];

export function createBirthdayState(getCharacters: () => BirthdayCharacter[]) {
  const characters = $derived(getCharacters());

  let now = $state(TZDateMini.tz(TIMEZONE));
  let today = $state(startOfDay(now));

  const releasedLevelFilter = new PersistedState<ReleasedLevel>(STORAGE_KEYS.releasedLevel, ReleasedLevel.anime);
  const typesFilter = new PersistedState<BirthdayCharacterType[]>(STORAGE_KEYS.types, [...DEFAULT_TYPES_FILTER]);
  const showNameRuby = new PersistedState<boolean>(STORAGE_KEYS.showNameRuby, false);
  const sorting = new PersistedState<SortingState>(STORAGE_KEYS.sorting, DEFAULT_SORTING.map((sort) => ({ ...sort })));

  const filteredCharacters = $derived(
    characters
      .filter((character) => getTargetReleasedLevels(releasedLevelFilter.current).includes(character.releasedLevel))
      .filter((character) => typesFilter.current.includes(character.type)),
  );

  return {
    get characters() {
      return characters;
    },
    get now() {
      return now;
    },
    get today() {
      return today;
    },
    get releasedLevelFilter() {
      return releasedLevelFilter.current;
    },
    get typesFilter() {
      return typesFilter.current;
    },
    get showNameRuby() {
      return showNameRuby.current;
    },
    get sorting() {
      return sorting.current;
    },
    get filteredCharacters() {
      return filteredCharacters;
    },
    tick() {
      const next = TZDateMini.tz(TIMEZONE);
      now = next;
      if (!isSameDay(today, next)) {
        today = startOfDay(next);
      }
    },
    setReleasedLevelFilter(value: ReleasedLevel) {
      releasedLevelFilter.current = value;
    },
    toggleTypeFilter(value: BirthdayCharacterType) {
      typesFilter.current = typesFilter.current.includes(value)
        ? typesFilter.current.filter((type) => type !== value)
        : [...typesFilter.current, value];
    },
    setShowNameRuby(value: boolean) {
      showNameRuby.current = value;
    },
    setSorting(value: SortingState) {
      sorting.current = value;
    },
  };
}

export type BirthdayState = ReturnType<typeof createBirthdayState>;

export const [getBirthdayState, setBirthdayState] = createContext<BirthdayState>();
