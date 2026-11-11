import { objectToSearchParams } from '@/utils/url';

import type { ImeDictGenerateOptions } from './schemas';

export const IME_DICT_FILE_VARIANTS = [
  { id: 'ms-ime', label: 'Microsoft IME用', path: '/api/ime-dict/ms-ime.txt' },
  { id: 'google-ime', label: 'Google IME用', path: '/api/ime-dict/google-ime.txt' },
  { id: 'apple-ime', label: 'Apple IME用', path: '/api/ime-dict/apple-ime.plist' },
] as const;

export function createImeDictDownloadHref(path: string, generateOptions: Partial<ImeDictGenerateOptions>): string {
  return `${path}?${objectToSearchParams(generateOptions).toString()}`;
}

export function createImeDictPreviewHref(generateOptions: Partial<ImeDictGenerateOptions>): string {
  return `/ime-dict/preview?${objectToSearchParams(generateOptions).toString()}`;
}
