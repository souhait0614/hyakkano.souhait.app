/**
 * Google Calendar に誕生日イベントを同期するスクリプト
 * GIRLFRIEND は releasedLevel ごとに4カレンダー、RENTARO/AUTHOR は各1カレンダーの計6パターンを管理する
 */

import { AUTHOR_CHARACTERS } from '@data/characters/authors';
import { GIRLFRIEND_CHARACTERS } from '@data/characters/girlfriends';
import { RENTARO_CHARACTERS } from '@data/characters/rentaro';
import { JUMP_PLUS_RELEASE_MAIN_CHAPTER } from '@data/meta';
import { google } from 'googleapis';

// --- Types ---

type ReleasedLevel = 'anime' | 'comics' | 'jumpPlus' | 'youngJump';
type CharacterType = 'GIRLFRIEND' | 'RENTARO' | 'AUTHOR';

interface CalendarEvent {
  summary: string;
  month: number;
  day: number;
}

interface Character {
  name: { kanji: string[]; };
  birthday?: [number, number, ...number[]] | undefined;
  releaseAnimeSeason?: number;
  releaseOriginalMainComicsVolume?: number;
  releaseOriginalMainChapter?: number;
  girlfriendNumber?: number;
}

// --- Calendar ID mapping ---

type CalendarKey = `${ReleasedLevel}_GIRLFRIEND` | `all_${'RENTARO' | 'AUTHOR'}`;

function getCalendarIds(): Record<CalendarKey, string> {
  const ids = process.env.GOOGLE_CALENDAR_IDS;
  if (!ids) throw new Error('GOOGLE_CALENDAR_IDS environment variable is not set');
  return JSON.parse(ids) as Record<CalendarKey, string>;
}

// --- Character data processing ---

function getReleasedLevel(character: Character): ReleasedLevel {
  if (character.releaseAnimeSeason !== undefined) return 'anime';
  if (character.releaseOriginalMainComicsVolume !== undefined) return 'comics';
  if (character.releaseOriginalMainChapter !== undefined) {
    if (character.releaseOriginalMainChapter <= JUMP_PLUS_RELEASE_MAIN_CHAPTER) return 'jumpPlus';
    return 'youngJump';
  }
  throw new Error(`Invalid character released level: ${character.name.kanji.join('')}`);
}

function getTargetReleasedLevels(releasedLevel: ReleasedLevel): ReleasedLevel[] {
  const levels: ReleasedLevel[] = ['anime', 'comics', 'jumpPlus', 'youngJump'];
  const index = levels.indexOf(releasedLevel);
  return levels.slice(0, index + 1);
}

function collectEvents(): Map<CalendarKey, CalendarEvent[]> {
  const eventsMap = new Map<CalendarKey, CalendarEvent[]>();
  const releasedLevels: ReleasedLevel[] = ['anime', 'comics', 'jumpPlus', 'youngJump'];

  // GIRLFRIEND は releasedLevel ごと
  for (const level of releasedLevels) {
    eventsMap.set(`${level}_GIRLFRIEND`, []);
  }
  // RENTARO/AUTHOR は all で1つずつ
  eventsMap.set('all_RENTARO', []);
  eventsMap.set('all_AUTHOR', []);

  interface CharacterEntry { character: Character; type: CharacterType; }
  const allCharacters: CharacterEntry[] = [
    ...Array.from(RENTARO_CHARACTERS.values()).map((c) => ({ character: c as unknown as Character, type: 'RENTARO' as const })),
    ...Array.from(GIRLFRIEND_CHARACTERS.values()).map((c) => ({ character: c as unknown as Character, type: 'GIRLFRIEND' as const })),
    ...Array.from(AUTHOR_CHARACTERS.values()).map((c) => ({ character: c as unknown as Character, type: 'AUTHOR' as const })),
  ];

  for (const { character, type } of allCharacters) {
    if (!character.birthday) continue;
    const [month, day] = character.birthday;
    if (!month || !day) continue;

    const name = character.name.kanji.join('');

    if (type === 'RENTARO' || type === 'AUTHOR') {
      const key: CalendarKey = `all_${type}`;
      const events = eventsMap.get(key);
      if (events) events.push({ summary: `${name} 誕生日`, month, day });
    } else {
      const charLevel = getReleasedLevel(character);
      for (const level of releasedLevels) {
        const targetLevels = getTargetReleasedLevels(level);
        if (!targetLevels.includes(charLevel)) continue;
        const key: CalendarKey = `${level}_GIRLFRIEND`;
        const events = eventsMap.get(key);
        if (events) events.push({ summary: `${name} 誕生日`, month, day });
      }
    }
  }

  return eventsMap;
}

// --- Google Calendar API ---

async function getAuthClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!credentials) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return auth;
}

async function syncCalendar(calendarId: string, events: CalendarEvent[]) {
  const auth = await getAuthClient();
  const calendar = google.calendar({ version: 'v3', auth });

  // 既存のイベントを取得
  const existingEventsResponse = await calendar.events.list({
    calendarId,
    maxResults: 2500,
    singleEvents: false,
  });
  const existingEvents = existingEventsResponse.data.items ?? [];

  // 既存イベントをsummary+dateでマップ化
  const existingMap = new Map<string, string>();
  for (const event of existingEvents) {
    if (event.summary && event.start?.date && event.id) {
      const key = `${event.summary}_${event.start.date}`;
      existingMap.set(key, event.id);
    }
  }

  // 新規イベントの期待セットを生成
  const expectedKeys = new Set<string>();
  for (const event of events) {
    // 毎年繰り返しの終日イベント: 開始日は2020年を基準にする
    const startDate = `2020-${String(event.month).padStart(2, '0')}-${String(event.day).padStart(2, '0')}`;
    const key = `${event.summary}_${startDate}`;
    expectedKeys.add(key);

    if (!existingMap.has(key)) {
      // 新規作成
      await calendar.events.insert({
        calendarId,
        requestBody: {
          summary: event.summary,
          start: { date: startDate },
          end: { date: startDate },
          recurrence: ['RRULE:FREQ=YEARLY'],
          description: `https://${process.env.SITE_HOSTNAME}/birthday`,
          transparency: 'transparent',
        },
      });
      console.log(`  Created: ${event.summary} (${event.month}/${event.day})`);
    }
  }

  // 不要なイベントを削除
  for (const [key, eventId] of existingMap) {
    if (!expectedKeys.has(key)) {
      await calendar.events.delete({ calendarId, eventId });
      console.log(`  Deleted: ${key}`);
    }
  }
}

// --- Main ---

async function main() {
  const calendarIds = getCalendarIds();
  const eventsMap = collectEvents();

  for (const [key, events] of eventsMap) {
    const calendarId = calendarIds[key];
    if (!calendarId) {
      console.warn(`No calendar ID for ${key}, skipping`);
      continue;
    }
    console.log(`Syncing ${key} (${events.length} events) -> ${calendarId}`);
    await syncCalendar(calendarId, events);
  }

  console.log('Done!');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
