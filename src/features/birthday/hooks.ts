import { useContext, useMemo } from 'react';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import type { BirthdayCharacterReleasedLevel, BirthdayCharacterType } from './types';
import { CharactersContext } from './contexts';
import { getShowReleasedLevels } from './utils';

export function useReleasedLevelFilter() {
  const [releasedLevelFilter, setReleasedLevelFilter] = useLocalStorageState<BirthdayCharacterReleasedLevel>('birthday_releasedLevelFilter', 'ANIME');
  return { releasedLevelFilter, setReleasedLevelFilter };
}

export function useTypesFilter() {
  const [typesFilter, setTypesFilter] = useLocalStorageState<BirthdayCharacterType[]>('birthday_typesFilter', ['RENTARO', 'GIRLFRIEND']);
  const toggleTypeFilter = (type: BirthdayCharacterType) => {
    setTypesFilter((prev) => (
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    ));
  };
  return { typesFilter, setTypesFilter, toggleTypeFilter };
}

export function useFilteredCharacters() {
  const characters = useContext(CharactersContext);
  const { releasedLevelFilter } = useReleasedLevelFilter();
  const { typesFilter } = useTypesFilter();
  const showReleasedLevels = useMemo(() => getShowReleasedLevels(releasedLevelFilter), [releasedLevelFilter]);

  const filteredCharacters = useMemo(
    () => characters
      .filter((char) => showReleasedLevels.includes(char.releasedLevel))
      .filter((char) => typesFilter.includes(char.type)),
    [characters, showReleasedLevels, typesFilter],
  );

  return filteredCharacters;
}

export function useShowNameRuby() {
  const [showNameRuby, setShowNameRuby] = useLocalStorageState<boolean>('birthday_showNameRuby', false);
  return { showNameRuby, setShowNameRuby };
}
