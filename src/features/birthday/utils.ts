import { TZDateMini } from '@date-fns/tz';
import { addYears, differenceInDays } from 'date-fns';

import type { CharacterBirthday } from '@/types/Data';
import { TIMEZONE } from '@/constants/timezone';

import type { BirthdayCharacterReleasedLevel } from './types';
import { CHARACTER_RELEASED_LEVELS } from './constants';

export function getDaysUntilBirthday(birthday: CharacterBirthday | undefined, today: Date): number | undefined {
  if (!birthday) return undefined;

  const [month, day] = birthday;
  let nextBirthday = new TZDateMini(today.getFullYear(), month - 1, day, TIMEZONE);
  if (nextBirthday < today) {
    nextBirthday = addYears(nextBirthday, 1);
  }
  return differenceInDays(nextBirthday, today);
}

export function getShowReleasedLevels(releasedLevel: BirthdayCharacterReleasedLevel) {
  const levelIndex = CHARACTER_RELEASED_LEVELS.findIndex((level) => level === releasedLevel);
  return CHARACTER_RELEASED_LEVELS.slice(0, levelIndex + 1);
}
