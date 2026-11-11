import type { ReleasedLevel } from '@/types/ReleasedLevel';

import type { BirthdayCharacterType } from './types';

/**
 * releasedLevel × type ごとの公開カレンダーID
 * Google Calendar のカレンダー設定から取得した公開カレンダーIDを設定する
 * 環境変数 VITE_GOOGLE_CALENDAR_IDS に JSON で指定する
 */
export type CalendarKey = `${ReleasedLevel}_GIRLFRIEND` | `all_${'RENTARO' | 'AUTHOR'}`;

export type CalendarIds = Partial<Record<CalendarKey, string>>;

export function parseCalendarIds(raw: string | undefined): CalendarIds {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as CalendarIds;
  } catch {
    return {};
  }
}

export function getSubscribeUrl(calendarId: string): string {
  return `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`;
}

export function createCalendarLinks(releasedLevel: ReleasedLevel, types: BirthdayCharacterType[], calendarIds: CalendarIds) {
  const result: { key: string; label: string; url: string; }[] = [];
  const orderedTypes: BirthdayCharacterType[] = ['GIRLFRIEND', 'RENTARO', 'AUTHOR'];
  for (const type of orderedTypes) {
    if (!types.includes(type)) continue;
    const key: CalendarKey = type === 'GIRLFRIEND' ? `${releasedLevel}_GIRLFRIEND` : `all_${type}`;
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
}
