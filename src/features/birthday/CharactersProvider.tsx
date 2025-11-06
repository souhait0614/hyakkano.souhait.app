'use client';

import type { ReactNode } from 'react';

import type { BirthdayCharacter } from './types';
import { CharactersContext } from './contexts';

interface ProviderProps {
  value: BirthdayCharacter[];
  children: ReactNode;
}
function CharactersProvider({ value, children }: ProviderProps) {
  return (
    <CharactersContext value={value}>
      {children}
    </CharactersContext>
  );
}
export default CharactersProvider;
