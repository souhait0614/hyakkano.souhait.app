'use client';

import { useContext, useEffect, useMemo, useRef } from 'react';

import IconConfetti from '@/components/icons/IconConfetti';
import { confetti } from '@/utils/confetti';

import type { Character } from './types';
import { TodayDateContext } from './contexts';
import { useFilteredCharacters } from './hooks';

function BirthdayCharactersCard() {
  const todayDate = useContext(TodayDateContext);

  const filteredCharacters = useFilteredCharacters();

  const birthdayCharacters = useMemo(
    () => filteredCharacters.filter((char) => {
      if (!char.birthday) return false;
      const [month, day] = char.birthday;
      return month === todayDate.getMonth() + 1 && day === todayDate.getDate();
    }),
    [filteredCharacters, todayDate],
  );

  const stopConfettiRef = useRef<() => void>(() => {});
  const prevBirthdayCharactersRef = useRef<Character[]>([]);
  useEffect(() => {
    if (birthdayCharacters.length && JSON.stringify(prevBirthdayCharactersRef.current) !== JSON.stringify(birthdayCharacters)) {
      confetti().then((stop) => {
        stopConfettiRef.current = stop;
      });
    }
    prevBirthdayCharactersRef.current = birthdayCharacters;
    return () => {
      stopConfettiRef.current();
    };
  }, [birthdayCharacters]);

  if (birthdayCharacters.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2 card text-center'>
      <div className={`
        flex text-animate-rainbow items-center justify-center gap-2
      `}
      >
        <IconConfetti className='rotate-y-180' />
        <h2 className='text-lg'>本日({todayDate.getMonth() + 1}/{todayDate.getDate()})誕生日</h2>
        <IconConfetti />
      </div>
      <ul className={`
        flex flex-row flex-wrap justify-center gap-4
        *:grow *:text-2xl *:font-bold
      `}
      >
        {birthdayCharacters.map((char) => (
          <li key={char.name}>
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BirthdayCharactersCard;
