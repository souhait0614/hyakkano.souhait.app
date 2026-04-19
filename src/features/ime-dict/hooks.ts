import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import type { ImeDictGenerateOptions } from './schemas';
import { IME_DICT_DEFAULT_GENERATE_OPTIONS } from './constants';

const STORAGE_KEY = 'ime-dict_generateOptions';

function migrateVoiceActorsToSeiyuusAnime() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as ImeDictGenerateOptions & { voiceActors?: boolean; };
    if ('voiceActors' in parsed) {
      parsed.seiyuusAnime = parsed.voiceActors || IME_DICT_DEFAULT_GENERATE_OPTIONS.seiyuusAnime;
      delete parsed.voiceActors;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {
    // ignore malformed JSON
  }
}

if (typeof window !== 'undefined') {
  migrateVoiceActorsToSeiyuusAnime();
}

export function useGenerateOptions() {
  const [generateOptions, setGenerateOptions] = useLocalStorageState<ImeDictGenerateOptions>(STORAGE_KEY, IME_DICT_DEFAULT_GENERATE_OPTIONS);

  return { generateOptions, setGenerateOptions };
}
