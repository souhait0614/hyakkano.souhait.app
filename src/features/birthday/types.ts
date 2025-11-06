import type { CharacterBirthday, Name } from '@/types/Data';

export type BirthdayCharacterReleasedLevel = 'ANIME' | 'COMICS' | 'JUMP_PLUS' | 'YOUNG_JUMP';
export type BirthdayCharacterType = 'RENTARO' | 'GIRLFRIEND' | 'AUTHOR';

export type BirthdayCharacter = {
  name: Name;
  birthday: CharacterBirthday | undefined;
  type: BirthdayCharacterType;
  releasedLevel: BirthdayCharacterReleasedLevel;
} & (
  | { releasedLevel: 'ANIME'; releaseAnimeSeason: number; }
  | { releasedLevel: 'COMICS'; releaseOriginalComicsVolume: number; }
  | { releasedLevel: 'JUMP_PLUS' | 'YOUNG_JUMP'; releaseOriginalEpisode: number; }
) & (
  | { type: 'RENTARO'; }
  | { type: 'GIRLFRIEND'; girlfriendNumber: number; }
  | { type: 'AUTHOR'; }
);

export type BirthdayCharacterTableRow = BirthdayCharacter & {
  daysUntilBirthday: number | undefined;
};
