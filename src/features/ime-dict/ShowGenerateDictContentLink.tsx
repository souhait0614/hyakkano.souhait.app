'use client';

import { useMemo } from 'react';

import LinkText from '@/components/LinkText';
import { objectToSearchParams } from '@/utils/url';

import { useGenerateOptions } from './hooks';

function ShowGenerateDictContentLink() {
  const { generateOptions } = useGenerateOptions();

  const searchParamsStr = useMemo(() => {
    return objectToSearchParams(generateOptions).toString();
  }, [generateOptions]);
  return (
    <p>
      <small>
        <LinkText to={`/ime-dict/preview?${searchParamsStr}`}>(内容を表示)</LinkText>
      </small>
    </p>
  );
}
export default ShowGenerateDictContentLink;
