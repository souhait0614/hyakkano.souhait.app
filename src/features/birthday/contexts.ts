import { TZDateMini } from '@date-fns/tz';
import { startOfDay } from 'date-fns';
import { createContext } from 'react';

import { TIMEZONE } from '@/constants/timezone';

export const TodayDateContext = createContext<Date>(startOfDay(TZDateMini.tz(TIMEZONE)));
