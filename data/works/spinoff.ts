import { TITLE_SPINOFF } from '@data/meta';

import type { DataEntries, DataId, Work, WorkIdBase } from '@/types/Data';

const spinoffWorksEntries = [
  ['work_spinoff_rentaro_family_no_family_no_nichijou', {
    name: { kanji: TITLE_SPINOFF, hiragana: 'れんたろうふぁみりーのふぁみりーのにちじょう' },
    shortNames: [
      { kanji: '100カゾ', hiragana: 'ひゃくかぞ' },
    ],
    basedOnWorkId: 'work_main_hyakkano',
  }],
] as const satisfies DataEntries<WorkIdBase<'spinoff'>, Work>;

export type SpinoffWorkId = DataId<typeof spinoffWorksEntries>;

export const SPINOFF_WORKS: ReadonlyMap<SpinoffWorkId, Work> = new Map<SpinoffWorkId, Work>(spinoffWorksEntries);
