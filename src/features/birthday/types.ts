export type CharacterReleasedLevel = 'ANIME' | 'COMICS' | 'JUMP_PLUS' | 'YOUNG_JUMP';
export type CharacterType = 'RENTARO' | 'GIRLFRIEND' | 'AUTHOR';

export type CharacterBirthday = [
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number,
];

export type Character = {
  name: string;
  pronunciation: string;
  releasedLevel: CharacterReleasedLevel;
  type: CharacterType;
  birthday: CharacterBirthday | undefined;
  age: number | undefined;
} & (
  | { releasedLevel: 'ANIME'; releaseSeason: number; }
  | { releasedLevel: 'COMICS'; releaseVolume: number; }
  | { releasedLevel: 'JUMP_PLUS' | 'YOUNG_JUMP'; releaseEpisode: number; }
) & (
  | { type: 'RENTARO'; }
  | { type: 'GIRLFRIEND'; girlfriendNumber: number; }
  | { type: 'AUTHOR'; }
);

export type CharacterTableRow = Character & {
  daysUntilBirthday: number | undefined;
};
