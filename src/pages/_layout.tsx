import '../style.css';

import type { ReactNode } from 'react';

import LinkText from '@/components/LinkText';
import { SITE_COPYRIGHT, SITE_CREATOR_SITE_URL } from '@/constants/site';
import HyakkanoBackGround from '@/features/$HyakkanoBackGround';


type RootLayoutProps = { children: ReactNode; };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className={`
        pointer-events-none fixed inset-0 -z-1
        after:absolute after:inset-0 after:block
        after:bg-linear-(--hyakkano-bg-gradient)
        motion-reduce:hidden
      `}
      >
        <HyakkanoBackGround />
      </div>
      <main className='[grid-area:content]'>
        {children}
      </main>
      <footer className={`
        flex flex-col items-center gap-1 text-center text-text-muted
        [grid-area:footer]
      `}
      >
        <nav className='flex flex-wrap justify-center gap-x-4'>
          <h2 className='sr-only'>ナビゲーション</h2>
          <LinkText to='/'>
            <small>トップページ</small>
          </LinkText>
          <LinkText to='/privacy'>
            <small>プライバシーポリシー</small>
          </LinkText>
          <LinkText external href={SITE_CREATOR_SITE_URL}>
            <small>製作者のサイト</small>
          </LinkText>
        </nav>
        <small>
          このサイトは非公式の個人制作サイトです。公式とは一切関係ありません。
        </small>
        <small>
          {SITE_COPYRIGHT}
        </small>
      </footer>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
