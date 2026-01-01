import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import LinkEmail from '@/components/LinkEmail';
import LinkText from '@/components/LinkText';
import { SITE_CREATOR_SITE_URL, SITE_NAME, SITE_REPO_URL } from '@/constants/site';
import PageHead from '@/features/PageHead';

import { metadata as pageBirthdayMetadata } from './birthday';
import { metadata as pageImeDictMetadata } from './ime-dict';

const metadata = {
  title: SITE_NAME,
  description: '100カノ関連の何かを作ったら置く場所です',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/'>) {
  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container h-full'>
        <h1 className='page-title'>{metadata.title}</h1>
        <div className='flex grow flex-col justify-center gap-4'>
          <article className='card'>
            <h2><LinkText to='/birthday'>{pageBirthdayMetadata.title}</LinkText></h2>
            <p>{pageBirthdayMetadata.description}</p>
          </article>
          <article className='card'>
            <h2><LinkText to='/ime-dict'>{pageImeDictMetadata.title}</LinkText></h2>
            <p>{pageImeDictMetadata.description}</p>
          </article>
        </div>
        <section className='card'>
          <h2 className='text-lg'>このサイトについて</h2>
          <p>管理人が趣味で制作した100カノに関連した細々としたアプリを置く非公式のサイトです。</p>
          <p><strong>公式とは一切関係ありません。</strong></p>
          <p>サイトに関するお問い合わせは、メール（<LinkEmail user='me' domain='souhait.me' />）または<LinkText external href={SITE_CREATOR_SITE_URL}>管理人の各種SNSアカウント</LinkText>までお願いします。</p>
          <p>このサイトのソースコードは<LinkText external href={SITE_REPO_URL}>GitHub</LinkText>で公開されています。</p>
        </section>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
