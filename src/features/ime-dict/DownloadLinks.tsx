'use client';

import { useMemo } from 'react';

import IconDownload from '@/components/icons/IconDownload';
import IconList from '@/components/icons/IconList';
import LinkButton from '@/components/LinkButton';
import { objectToSearchParams } from '@/utils/url';

import { useGenerateOptions } from './hooks';

function DownloadLinks() {
  const { generateOptions } = useGenerateOptions();

  const searchParamsStr = useMemo(() => {
    return objectToSearchParams(generateOptions).toString();
  }, [generateOptions]);

  return (
    <>
      <LinkButton
        download
        align='center'
        icon={IconDownload}
        href={`/api/ime-dict/ms-ime.txt?${searchParamsStr}`}
      >
        Microsoft IME用
      </LinkButton>
      <LinkButton
        download
        align='center'
        icon={IconDownload}
        href={`/api/ime-dict/google-ime.txt?${searchParamsStr}`}
      >
        Google IME用
      </LinkButton>
      <LinkButton
        download
        align='center'
        icon={IconDownload}
        href={`/api/ime-dict/apple-ime.plist?${searchParamsStr}`}
      >
        Apple IME用
      </LinkButton>
      <LinkButton
        align='center'
        icon={IconList}
        to={`/ime-dict/preview?${searchParamsStr}`}
      >
        内容を表示
      </LinkButton>
    </>
  );
}
export default DownloadLinks;
