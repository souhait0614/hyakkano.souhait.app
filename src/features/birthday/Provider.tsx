'use client';

import type { ReactNode } from 'react';
import { TZDateMini } from '@date-fns/tz';
import { addDays, startOfDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TIMEZONE } from '@/constants/timezone';

import { TodayDateContext } from './contexts';

interface ProviderProps {
  children: ReactNode;
}
function Provider({ children }: ProviderProps) {
  const now = useMemo(() => TZDateMini.tz(TIMEZONE), []);
  const [todayDate, setTodayDate] = useState(startOfDay(now));

  const timeoutIdRef = useRef<number | null>(null);
  const setTimer = useCallback((timeout: number) => {
    timeoutIdRef.current = window.setTimeout(() => {
      setTodayDate((prev) => addDays(prev, 1));
      setTimer(24 * 60 * 60 * 1000);
    }, timeout);
  }, []);

  useEffect(() => {
    const tomorrowDate = startOfDay(addDays(now, 1));
    const timeout = tomorrowDate.getTime() - now.getTime();
    setTimer(timeout);
    return () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [now, setTimer]);

  return (
    <TodayDateContext value={todayDate}>
      {children}
    </TodayDateContext>
  );
}
export default Provider;
