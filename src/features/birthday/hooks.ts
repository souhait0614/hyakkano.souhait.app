import { useMemo } from 'react';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import type { CharacterReleasedLevel, CharacterType } from './types';
import { CHARACTERS } from './constants';
import { getShowReleasedLevels } from './utils';

export function useReleasedLevelFilter() {
  const [releasedLevelFilter, setReleasedLevelFilter] = useLocalStorageState<CharacterReleasedLevel>('birthday_releasedLevelFilter', 'ANIME');
  return { releasedLevelFilter, setReleasedLevelFilter };
}

export function useTypesFilter() {
  const [typesFilter, setTypesFilter] = useLocalStorageState<CharacterType[]>('birthday_typesFilter', ['RENTARO', 'GIRLFRIEND']);
  const toggleTypeFilter = (type: CharacterType) => {
    setTypesFilter((prev) => (
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    ));
  };
  return { typesFilter, setTypesFilter, toggleTypeFilter };
}

export function useFilteredCharacters() {
  const { releasedLevelFilter } = useReleasedLevelFilter();
  const { typesFilter } = useTypesFilter();
  const showReleasedLevels = useMemo(() => getShowReleasedLevels(releasedLevelFilter), [releasedLevelFilter]);

  const filteredCharacters = useMemo(
    () => CHARACTERS
      .filter((char) => showReleasedLevels.includes(char.releasedLevel))
      .filter((char) => typesFilter.includes(char.type)),
    [showReleasedLevels, typesFilter],
  );

  return filteredCharacters;
}
