'use client';

import { useContext, useMemo } from 'react';

import EffectConfetti from '@/components/EffectConfetti';
import IconConfetti from '@/components/icons/IconConfetti';

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

  const birthdayCharactersKey = useMemo(
    () => birthdayCharacters.map((char) => char.name).join(','),
    [birthdayCharacters],
  );

  if (birthdayCharacters.length === 0) {
    return null;
  }

  return (
    <>
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
            <li key={char.name.kanji.join('')}>
              {char.name.kanji.join(' ')}
            </li>
          ))}
        </ul>
      </div>
      <EffectConfetti key={birthdayCharactersKey} />
    </>
  );
}
export default BirthdayCharactersCard;
