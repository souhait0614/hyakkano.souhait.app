import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import type { ImeDictGenerateOptions } from './schemas';
import { IME_DICT_DEFAULT_GENERATE_OPTIONS } from './constants';

const STORAGE_KEY = 'ime-dict_generateOptions';

function migrateGenerateOptions() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as Partial<ImeDictGenerateOptions> & { voiceActors?: boolean; };
    let migrated = false;
    if ('voiceActors' in parsed) {
      parsed.seiyuusAnime = parsed.voiceActors || IME_DICT_DEFAULT_GENERATE_OPTIONS.seiyuusAnime;
      delete parsed.voiceActors;
      migrated = true;
    }
    if (!('songs' in parsed)) {
      parsed.songs = IME_DICT_DEFAULT_GENERATE_OPTIONS.songs;
      migrated = true;
    }
    if (migrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {
    // ignore malformed JSON
  }
}

if (typeof window !== 'undefined') {
  migrateGenerateOptions();
}

export function useGenerateOptions() {
  const [generateOptions, setGenerateOptions] = useLocalStorageState<ImeDictGenerateOptions>(STORAGE_KEY, IME_DICT_DEFAULT_GENERATE_OPTIONS);

  return { generateOptions, setGenerateOptions };
}
