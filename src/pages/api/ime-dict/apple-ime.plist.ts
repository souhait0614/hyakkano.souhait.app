import { parse } from 'valibot';

import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';
import { imeDictGenerateOptionsSchema } from '@/features/ime-dict/schemas';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const generateImeDictItemsOptions = parse(imeDictGenerateOptionsSchema, Object.fromEntries(url.searchParams));

  const items = await generateImeDictItems(generateImeDictItemsOptions);

  const dictEntries = items.map(({ reading, word }) => {
    return `<dict>\n<key>phrase</key>\n<string>${escapeXml(word)}</string>\n<key>shortcut</key>\n<string>${escapeXml(reading)}</string>\n</dict>`;
  });

  const plistContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '<array>',
    ...dictEntries,
    '</array>',
    '</plist>',
    '',
  ].join('\n');

  return new Response(plistContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Content-Disposition': 'attachment; filename=apple-ime.plist',
    },
  });
}
