'use client';

import type { ComponentPropsWithRef } from 'react';
import { TZDateMini } from '@date-fns/tz';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TIMEZONE } from '@/constants/timezone';

function JstClock(props: Omit<ComponentPropsWithRef<'time'>, 'dateTime'>) {
  const initialDate = TZDateMini.tz(TIMEZONE);
  const [date, setDate] = useState(initialDate);

  const timeoutIdRef = useRef<number | null>(null);
  const setTimer = useCallback((timeout: number) => {
    timeoutIdRef.current = window.setTimeout(() => {
      const now = TZDateMini.tz(TIMEZONE);
      setDate(now);
      setTimer(1000 - now.getMilliseconds());
    }, timeout);
  }, []);

  const formattedJstString = useMemo(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }, [date]);

  useEffect(() => {
    setTimer(1000 - initialDate.getMilliseconds());
    return () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [initialDate, setTimer]);

  return (
    <time {...props} dateTime={date.toISOString()}>{formattedJstString}</time>
  );
}
export default memo(JstClock);
