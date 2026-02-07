'use client';

import type { ReactNode } from 'react';
import { TZDateMini } from '@date-fns/tz';
import { isSameDay, startOfDay } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TIMEZONE } from '@/constants/timezone';

import { DateContext, TodayDateContext } from './contexts';

interface ProviderProps {
  children: ReactNode;
}
function DateProvider({ children }: ProviderProps) {
  const initialDate = useMemo(() => TZDateMini.tz(TIMEZONE), []);
  const [date, setDate] = useState(initialDate);
  const [todayDate, setTodayDate] = useState(startOfDay(initialDate));

  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = TZDateMini.tz(TIMEZONE);
      setDate(now);
      setTodayDate((prev) => (isSameDay(prev, now) ? prev : startOfDay(now)));
      timeoutIdRef.current = window.setTimeout(tick, 1000 - now.getMilliseconds());
    };
    timeoutIdRef.current = window.setTimeout(tick, 1000 - initialDate.getMilliseconds());
    return () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [initialDate]);

  return (
    <DateContext value={date}>
      <TodayDateContext value={todayDate}>
        {children}
      </TodayDateContext>
    </DateContext>
  );
}
export default DateProvider;
