import type { BirthdayCharacterReleasedLevel } from './types';

export const CHARACTER_RELEASED_LEVELS = [
  'ANIME',
  'COMICS',
  'JUMP_PLUS',
  'YOUNG_JUMP',
] as const satisfies BirthdayCharacterReleasedLevel[];
