import { AUTHOR_CHARACTERS } from '@data/characters/authors';
import { GIRLFRIEND_CHARACTERS } from '@data/characters/girlfriends';
import { RENTARO_CHARACTERS } from '@data/characters/rentaro';
import { JUMP_PLUS_RELEASE_MAIN_CHAPTER } from '@data/meta';

import type { Character, GirlfriendCharacter } from '@/types/Data';
import { ReleasedLevel } from '@/types/ReleasedLevel';

import type { BirthdayCharacter, BirthdayCharacterType } from './types';

// TODO: そのうちcheckReleasedDataとかfilterReleasedDataを使って処理を共通化する
function getReleasedLevel(character: Character) {
  if (character.releaseAnimeSeason !== undefined) {
    return {
      releasedLevel: ReleasedLevel.anime,
      releaseAnimeSeason: character.releaseAnimeSeason,
    };
  }
  if (character.releaseOriginalMainComicsVolume !== undefined) {
    return {
      releasedLevel: ReleasedLevel.comics,
      releaseOriginalComicsVolume: character.releaseOriginalMainComicsVolume,
    };
  }
  if (character.releaseOriginalMainChapter !== undefined) {
    if (character.releaseOriginalMainChapter <= JUMP_PLUS_RELEASE_MAIN_CHAPTER) {
      return {
        releasedLevel: ReleasedLevel.jumpPlus,
        releaseOriginalChapter: character.releaseOriginalMainChapter,
      };
    }
    return {
      releasedLevel: ReleasedLevel.youngJump,
      releaseOriginalChapter: character.releaseOriginalMainChapter,
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

export function getBirthdayCharacters(): BirthdayCharacter[] {
  return [
    ...Array.from(RENTARO_CHARACTERS.values()).map((character) => makeCharacter('RENTARO', character)),
    ...Array.from(GIRLFRIEND_CHARACTERS.values()).map((character) => makeCharacter('GIRLFRIEND', character)),
    ...Array.from(AUTHOR_CHARACTERS.values()).map((character) => makeCharacter('AUTHOR', character)),
  ];
}
