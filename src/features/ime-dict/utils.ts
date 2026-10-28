import { TZDateMini } from '@date-fns/tz';
import { format } from 'date-fns';

import { TIMEZONE } from '@/constants/timezone';

export function createImeDictFileName(baseName: string, extension: string): string {
  const date = format(TZDateMini.tz(TIMEZONE), 'yyyyMMdd');
  return `hyakkano-${baseName}-${date}.${extension}`;
}
