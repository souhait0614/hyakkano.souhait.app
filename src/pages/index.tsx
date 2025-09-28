import type { PageProps } from 'waku/router';

import { SITE_NAME } from '@/constants/site';
import PageHead from '@/features/PageHead';

export default function Page(pageProps: PageProps<'/'>) {
  return (
    <>
      <PageHead metadata={{ title: SITE_NAME, description: '100カノ関連の何かを作ったら置く場所です' }} pageProps={pageProps} />
      <div>
        <h1 className='sr-only'>{SITE_NAME}</h1>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
