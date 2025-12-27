import type { ReactNode } from 'react';

import type { BirthdayCharacter, BirthdayCharacterType } from '@/features/birthday/types';
import type { Character, GirlfriendCharacter } from '@/types/Data';
import { AUTHOR_CHARACTERS, GIRLFRIEND_CHARACTERS, RENTARO_CHARACTER } from '@/data/characters';
import { JUMP_PLUS_RELEASED_EPISODE } from '@/data/meta';
import CharactersProvider from '@/features/birthday/CharactersProvider';


function getReleasedLevel(character: Character) {
  if ('releaseAnimeSeason' in character && character.releaseAnimeSeason !== undefined) {
    return {
      releasedLevel: 'ANIME' as const,
      releaseAnimeSeason: character.releaseAnimeSeason,
    };
  }
  if ('releaseOriginalComicsVolume' in character && character.releaseOriginalComicsVolume !== undefined) {
    return {
      releasedLevel: 'COMICS' as const,
      releaseOriginalComicsVolume: character.releaseOriginalComicsVolume,
    };
  }
  if ('releaseOriginalEpisode' in character && character.releaseOriginalChapter !== undefined) {
    if (character.releaseOriginalChapter <= JUMP_PLUS_RELEASED_EPISODE) {
      return {
        releasedLevel: 'JUMP_PLUS' as const,
        releaseOriginalEpisode: character.releaseOriginalChapter,
      };
    }
    return {
      releasedLevel: 'YOUNG_JUMP' as const,
      releaseOriginalEpisode: character.releaseOriginalChapter,
    };
  }
  throw new Error('Invalid character released level');
}

function makeCharacter(type: BirthdayCharacterType, character: Character | GirlfriendCharacter): BirthdayCharacter {
  if (type === 'GIRLFRIEND') {
    if (!('girlfriendNumber' in character)) throw new Error('Invalid girlfriend character');
    return {
      type,
      name: character.name,
      birthday: character.birthday,
      girlfriendNumber: character.girlfriendNumber,
      ...getReleasedLevel(character),
    };
  }
  return {
    type,
    name: character.name,
    birthday: character.birthday,
    ...getReleasedLevel(character),
  };
}

export default function BirthdayLayout({ children }: { children: ReactNode; }) {
  const characters = [
    makeCharacter('RENTARO', RENTARO_CHARACTER),
    ...GIRLFRIEND_CHARACTERS.map((character) => makeCharacter('GIRLFRIEND', character)),
    ...AUTHOR_CHARACTERS.map((character) => makeCharacter('AUTHOR', character)),
  ];

  return (
    <CharactersProvider value={characters}>
      {children}
    </CharactersProvider>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
