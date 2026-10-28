import { TITLE } from '@data/meta';

import type { DataEntries, DataId, Work, WorkIdBase } from '@/types/Data';

const mainWorksEntries = [
  ['work_main_hyakkano', {
    name: { kanji: TITLE, hiragana: 'きみのことがだいだいだいだいだいすきなひゃくにんのかのじょ' },
    shortNames: [
      { kanji: '100カノ', hiragana: 'ひゃくかの' },
      { kanji: '100カノ', hiragana: 'ひゃっかの' },
    ],
    basedOnWorkId: undefined,
  }],
] as const satisfies DataEntries<WorkIdBase<'main'>, Work>;

export type MainWorkId = DataId<typeof mainWorksEntries>;

export const MAIN_WORKS: ReadonlyMap<MainWorkId, Work> = new Map<MainWorkId, Work>(mainWorksEntries);
