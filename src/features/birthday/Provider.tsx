'use client';

import type { ReactNode } from 'react';
import { TZDateMini } from '@date-fns/tz';
import { isSameDay, startOfDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TIMEZONE } from '@/constants/timezone';

import { DateContext, TodayDateContext } from './contexts';

interface ProviderProps {
  children: ReactNode;
}
function Provider({ children }: ProviderProps) {
  const initialDate = useMemo(() => TZDateMini.tz(TIMEZONE), []);
  const [date, setDate] = useState(initialDate);
  const [todayDate, setTodayDate] = useState(startOfDay(initialDate));

  const timeoutIdRef = useRef<number | null>(null);
  const setTimer = useCallback((timeout: number) => {
    timeoutIdRef.current = window.setTimeout(() => {
      const now = TZDateMini.tz(TIMEZONE);
      setDate(now);
      setTodayDate((prev) => (isSameDay(prev, now) ? prev : startOfDay(now)));
      setTimer(1000 - now.getMilliseconds());
    }, timeout);
  }, []);

  useEffect(() => {
    setTimer(1000 - initialDate.getMilliseconds());
    return () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [initialDate, setTimer]);

  return (
    <DateContext value={date}>
      <TodayDateContext value={todayDate}>
        {children}
      </TodayDateContext>
    </DateContext>
  );
}
export default Provider;
