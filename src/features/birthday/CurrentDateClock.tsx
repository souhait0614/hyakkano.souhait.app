'use client';

import type { ComponentPropsWithRef } from 'react';
import { useContext, useMemo } from 'react';

import { DateContext } from './contexts';

function CurrentDateClock(props: Omit<ComponentPropsWithRef<'time'>, 'dateTime'>) {
  const date = useContext(DateContext);

  const formattedJstString = useMemo(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }, [date]);

  return (
    <time {...props} dateTime={date.toISOString()}>{formattedJstString}</time>
  );
}
export default CurrentDateClock;
