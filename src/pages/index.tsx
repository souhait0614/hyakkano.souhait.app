import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import { SITE_NAME } from '@/constants/site';
import PageHead from '@/features/PageHead';

const metadata = {
  title: SITE_NAME,
  description: '100カノ関連の何かを作ったら置く場所です',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/'>) {
  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div>
        <h1 className='sr-only'>{metadata.title}</h1>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
