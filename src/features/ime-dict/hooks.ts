import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import type { ImeDictGenerateOptions } from './schemas';
import { IME_DICT_DEFAULT_GENERATE_OPTIONS } from './constants';

export function useGenerateOptions() {
  const [generateOptions, setGenerateOptions] = useLocalStorageState<ImeDictGenerateOptions>('ime-dict_generateOptions', IME_DICT_DEFAULT_GENERATE_OPTIONS);
  return { generateOptions, setGenerateOptions };
}
