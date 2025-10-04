import { useCallback, useMemo, useSyncExternalStore } from 'react';

function parseJson<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return jsonString as T;
  }
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const initialValueString = useMemo(
    () => JSON.stringify(initialValue),
    [initialValue],
  );

  const getSnapshot = useCallback(
    () => window.localStorage.getItem(key) || initialValueString,
    [key, initialValueString],
  );

  const getServerSnapshot = useCallback(
    () => initialValueString,
    [initialValueString],
  );

  const eventName = useMemo(
    () => `local-storage-${key}-change`,
    [key],
  );

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener(eventName, callback);
    return () => {
      window.removeEventListener(eventName, callback);
    };
  }, [eventName]);

  const dataString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const data = useMemo(
    () => parseJson<T>(dataString),
    [dataString],
  );

  const setData = useCallback((newData: T | ((prev: T) => T)) => {
    const nextData = typeof newData === 'function'
      ? (newData as (prev: T) => T)(data)
      : newData;
    window.localStorage.setItem(key, JSON.stringify(nextData));
    window.dispatchEvent(new Event(eventName));
  }, [data, eventName, key]);

  return [data, setData] as const;
}
