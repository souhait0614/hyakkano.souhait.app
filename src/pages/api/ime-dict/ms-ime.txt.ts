import type { APIRoute } from 'astro';
import { parse } from 'valibot';

import { SITE_COPYRIGHT, SITE_NAME } from '@/constants/site';
import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';
import { imeDictGenerateOptionsSchema } from '@/features/ime-dict/schemas';
import { createImeDictFileName } from '@/features/ime-dict/utils';
import { ImeDictItemCategory } from '@/types/ImeDict';

export const prerender = false;

function createHeaderTexts(site: URL): string[] {
  return [
    '!Microsoft IME Dictionary Tool',
    '!Version:',
    '!Format:WORDLIST',
    '!DateTime:',
    '',
    `! ${SITE_NAME} ${SITE_COPYRIGHT}`,
    `! ${site.href}`,
    '',
    '! ----------------------------------------------------------------------------------------------------',
  ];
}

function encodeUtf16Le(text: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(new ArrayBuffer(text.length * 2));
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    bytes[index * 2] = code & 0xff;
    bytes[(index * 2) + 1] = code >> 8;
  }
  return bytes;
}

export const GET: APIRoute = async ({ url, site }) => {
  const generateImeDictItemsOptions = parse(imeDictGenerateOptionsSchema, Object.fromEntries(url.searchParams));

  const items = await generateImeDictItems(generateImeDictItemsOptions);
  const body: [reading: string, word: string, type: string, comment?: string][] = items.map(({ reading, word, category, comment }) => {
    let type: string;
    switch (category) {
      case ImeDictItemCategory.title:
      case ImeDictItemCategory.songTitle:
      case ImeDictItemCategory.term:
        type = '固有名詞';
        break;
      case ImeDictItemCategory.characterNameFull:
      case ImeDictItemCategory.characterAnotherNameFull:
      case ImeDictItemCategory.characterNickname:
      case ImeDictItemCategory.seiyuuAnimeName:
      case ImeDictItemCategory.seiyuuVoiceDramaName:
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
    ...createHeaderTexts(site ?? new URL(url.origin)),
    ...body.map((line) => line.join('\t')),
  ].join('\r\n');

  return new Response(encodeUtf16Le(`${bodyText}\r\n`), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-16le',
      'Content-Disposition': `attachment; filename=${createImeDictFileName('ms-ime', 'txt')}`,
    },
  });
};
