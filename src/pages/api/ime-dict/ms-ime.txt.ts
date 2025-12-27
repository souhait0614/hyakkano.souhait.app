import { Buffer } from 'node:buffer';

import { SITE_BASE_URL, SITE_COPYRIGHT, SITE_NAME } from '@/constants/site';
import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';

const headerTexts = [
  '!Microsoft IME Dictionary Tool',
  '!Version:',
  '!Format:WORDLIST',
  '!DateTime:',
  '',
  `! ${SITE_NAME} ${SITE_COPYRIGHT}`,
  `! ${SITE_BASE_URL}`,
  '',
  '! ----------------------------------------------------------------------------------------------------',
];

export async function GET(): Promise<Response> {
  const items = await generateImeDictItems();
  const body: [reading: string, word: string, type: string, comment?: string][] = items.map(({ reading, word, category, comment }) => {
    let type: string;
    switch (category) {
      case 'TITLE':
        type = '固有名詞';
        break;
      case 'CHARACTER_NAME_FULL':
      case 'CHARACTER_ANOTHERNAME_FULL':
      case 'CHARACTER_NICKNAME':
      case 'CHARACTER_ANIME_VOICE_ACTOR':
        type = '人名';
        break;
      case 'CHARACTER_NAME_SHORT':
      case 'CHARACTER_ANOTHERNAME_SHORT':
        type = '名';
        break;
      case 'LOCATION_NAME':
      case 'LOCATION_NAME_ANOTHER':
        type = '地名';
        break;
      default:
        category satisfies never;
        throw new Error(`Unknown category: ${category}`);
    }
    if (comment) {
      return [reading, word, type, comment] as const;
    } else {
      return [reading, word, type] as const;
    }
  });

  const bodyText = [
    ...headerTexts,
    ...body.map((line) => line.join('\t')),
  ].join('\r\n');

  const buffer = Buffer.from(`${bodyText}\r\n`, 'utf16le');
  return new Response(buffer, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-16le',
      'Content-Disposition': 'attachment; filename=ms-ime.txt',
    },
  });
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
