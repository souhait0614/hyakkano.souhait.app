'use client';

import { useMemo } from 'react';

import type { ReleasedLevel } from '@/types/ReleasedLevel';
import IconCalendarPlus from '@/components/icons/IconCalendarPlus';
import LinkButton from '@/components/LinkButton';

import type { BirthdayCharacterType } from './types';
import { useReleasedLevelFilter, useTypesFilter } from './hooks';

/**
 * releasedLevel × type ごとの公開カレンダーID
 * Google Calendar のカレンダー設定から取得した公開カレンダーIDを設定する
 * 環境変数 VITE_GOOGLE_CALENDAR_IDS に JSON で指定する
 */
type CalendarKey = `${ReleasedLevel}_GIRLFRIEND` | `all_${'RENTARO' | 'AUTHOR'}`;

function getCalendarIds(): Partial<Record<CalendarKey, string>> {
  try {
    return JSON.parse(import.meta.env.VITE_GOOGLE_CALENDAR_IDS || '{}');
  } catch {
    return {};
  }
}

function getSubscribeUrl(calendarId: string): string {
  return `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`;
}

export default function GoogleCalendarLinks() {
  const { releasedLevelFilter } = useReleasedLevelFilter();
  const { typesFilter } = useTypesFilter();
  const calendarIds = useMemo(() => getCalendarIds(), []);

  const links = useMemo(() => {
    const result: { key: string; label: string; url: string; }[] = [];
    const orderedTypes: BirthdayCharacterType[] = ['GIRLFRIEND', 'RENTARO', 'AUTHOR'];
    for (const type of orderedTypes) {
      if (!typesFilter.includes(type)) continue;
      const key: CalendarKey = type === 'GIRLFRIEND' ? `${releasedLevelFilter}_GIRLFRIEND` : `all_${type}`;
      const calendarId = calendarIds[key];
      if (!calendarId) continue;
      const typeLabel = type === 'GIRLFRIEND' ? '彼女' : type === 'RENTARO' ? '恋太郎' : '作者';
      result.push({
        key,
        label: `${typeLabel}の誕生日`,
        url: getSubscribeUrl(calendarId),
      });
    }
    return result;
  }, [releasedLevelFilter, typesFilter, calendarIds]);

  if (links.length === 0) return null;

  return (
    <div className={`
      flex flex-row flex-wrap justify-center
      *:w-full
    `}
    >
      {links.map((link) => (
        <LinkButton
          key={link.key}
          external
          align='center'
          icon={IconCalendarPlus}
          href={link.url}
        >
          {link.label}を追加
        </LinkButton>
      ))}
    </div>
  );
}
