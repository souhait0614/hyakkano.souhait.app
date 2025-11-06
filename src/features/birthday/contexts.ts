import { TZDateMini } from '@date-fns/tz';
import { startOfDay } from 'date-fns';
import { createContext } from 'react';

import { TIMEZONE } from '@/constants/timezone';

import type { BirthdayCharacter } from './types';

export const CharactersContext = createContext<BirthdayCharacter[]>([]);

const now = TZDateMini.tz(TIMEZONE);
export const DateContext = createContext<Date>(now);
export const TodayDateContext = createContext<Date>(startOfDay(now));
