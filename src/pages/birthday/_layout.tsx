import type { ReactNode } from 'react';

import type { BirthdayCharacter, BirthdayCharacterType } from '@/features/birthday/types';
import type { Character, GirlfriendCharacter } from '@/types/Data';
import { AUTHOR_CHARACTERS, GIRLFRIEND_CHARACTERS, RENTARO_CHARACTER } from '@/data/characters';
import { JUMP_PLUS_RELEASED_EPISODE } from '@/data/meta';
import CharactersProvider from '@/features/birthday/CharactersProvider';
import { ReleasedLevel } from '@/types/ReleasedLevel';


function getReleasedLevel(character: Character) {
  if (character.releaseAnimeSeason !== undefined) {
    return {
      releasedLevel: ReleasedLevel.anime,
      releaseAnimeSeason: character.releaseAnimeSeason,
    };
  }
  if (character.releaseOriginalComicsVolume !== undefined) {
    return {
      releasedLevel: ReleasedLevel.comics,
      releaseOriginalComicsVolume: character.releaseOriginalComicsVolume,
    };
  }
  if (character.releaseOriginalChapter !== undefined) {
    if (character.releaseOriginalChapter <= JUMP_PLUS_RELEASED_EPISODE) {
      return {
        releasedLevel: ReleasedLevel.jumpPlus,
        releaseOriginalChapter: character.releaseOriginalChapter,
      };
    }
    return {
      releasedLevel: ReleasedLevel.youngJump,
      releaseOriginalChapter: character.releaseOriginalChapter,
    };
  }
  throw new Error(`Invalid character released level: ${character.name.kanji.join('')}`);
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
