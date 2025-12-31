import { Buffer } from 'node:buffer';

import { parse } from 'valibot';

import { SITE_BASE_URL, SITE_COPYRIGHT, SITE_NAME } from '@/constants/site';
import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';
import { imeDictGenerateOptionsSchema } from '@/features/ime-dict/schemas';
import { ImeDictItemCategory } from '@/types/ImeDict';

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

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const generateImeDictItemsOptions = parse(imeDictGenerateOptionsSchema, Object.fromEntries(url.searchParams));

  const items = await generateImeDictItems(generateImeDictItemsOptions);
  const body: [reading: string, word: string, type: string, comment?: string][] = items.map(({ reading, word, category, comment }) => {
    let type: string;
    switch (category) {
      case ImeDictItemCategory.title:
        type = '固有名詞';
        break;
      case ImeDictItemCategory.characterNameFull:
      case ImeDictItemCategory.characterAnotherNameFull:
      case ImeDictItemCategory.characterNickname:
      case ImeDictItemCategory.characterAnimeVoiceActor:
        type = '人名';
        break;
      case ImeDictItemCategory.characterNameShort:
      case ImeDictItemCategory.characterAnotherNameShort:
        type = '名';
        break;
      case ImeDictItemCategory.locationName:
      case ImeDictItemCategory.locationNameAnother:
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
