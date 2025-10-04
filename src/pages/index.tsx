import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import LinkText from '@/components/LinkText';
import { SITE_NAME } from '@/constants/site';
import PageHead from '@/features/PageHead';

import { metadata as pageBirthdayMetadata } from './birthday';

const metadata = {
  title: SITE_NAME,
  description: '100カノ関連の何かを作ったら置く場所です',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/'>) {
  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container h-full justify-center'>
        <h1 className='sr-only'>{metadata.title}</h1>
        <article className='card'>
          <h2><LinkText to='/birthday'>{pageBirthdayMetadata.title}</LinkText></h2>
          <p>{pageBirthdayMetadata.description}</p>
        </article>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
