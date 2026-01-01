import type { CharacterBirthday, PersonName } from '@/types/Data';
import type { ReleasedLevel } from '@/types/ReleasedLevel';

export type BirthdayCharacterType = 'RENTARO' | 'GIRLFRIEND' | 'AUTHOR';

export type BirthdayCharacter = {
  name: PersonName;
  birthday: CharacterBirthday | undefined;
  type: BirthdayCharacterType;
  releasedLevel: ReleasedLevel;
} & (
  | { releasedLevel: typeof ReleasedLevel.anime; releaseAnimeSeason: number; }
  | { releasedLevel: typeof ReleasedLevel.comics; releaseOriginalComicsVolume: number; }
  | { releasedLevel: typeof ReleasedLevel.jumpPlus | typeof ReleasedLevel.youngJump; releaseOriginalChapter: number; }
) & (
  | { type: 'RENTARO'; }
  | { type: 'GIRLFRIEND'; girlfriendNumber: number; }
  | { type: 'AUTHOR'; }
);

export type BirthdayCharacterTableRow = BirthdayCharacter & {
  daysUntilBirthday: number | undefined;
};
