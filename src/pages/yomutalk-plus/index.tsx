import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import IconExternalLink from '@/components/icons/IconExternalLink';
import LinkButton from '@/components/LinkButton';
import LinkText from '@/components/LinkText';
import { SITE_BASE_URL, SITE_YOMUTALK_PLUS_URL } from '@/constants/site';
import PageHead from '@/features/PageHead';

export const metadata = {
  title: 'よむとーく＋',
  description: 'あのテキスト読み上げアプリっぽいWebアプリ',
  ogImageUrl: new URL('/images/yomutalk-plus/icon.png', SITE_BASE_URL).href,
  ogImageAlt: 'よむとーく＋のアイコン',
  ogImageType: 'image/png',
  ogImageWidth: 256,
  ogImageHeight: 256,
  ogCardType: 'summary',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/yomutalk-plus'>) {
  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container'>
        <a
          className='page-container items-center card p-8'
          href={SITE_YOMUTALK_PLUS_URL}
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/images/yomutalk-plus/icon.png'
            alt='よむとーく＋'
            className='size-32 rounded-lg'
          />
          <h1 className='m-0 text-2xl font-bold'>{metadata.title}</h1>
        </a>
        <div className='sticky top-4'>
          <LinkButton
            variant='contained'
            align='center'
            icon={IconExternalLink}
            external
            href={SITE_YOMUTALK_PLUS_URL}
          >
            よむとーく＋を開く
          </LinkButton>
        </div>
        <section className='flex flex-col gap-2 card'>
          <h2>よむとーく＋について</h2>
          <p>作中に登場するあのテキスト読み上げアプリを再現したWebアプリにいろいろな機能を追加したものです。</p>
          <div className='grid grid-cols-2 gap-2'>
            <img
              src='/images/yomutalk-plus/screen1.png'
              alt='よむとーく＋のスクリーンショット'
            />
            <img
              src='/images/yomutalk-plus/screen2.png'
              alt='よむとーく＋のスクリーンショット'
            />
          </div>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2>主な機能</h2>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>テキストファイルの読み込み・縦書き電子書籍風表示</h3>
            <p>以下の小説ファイルに対応しています。</p>
            <section className='contents'>
              <h4>アプリ内蔵小説</h4>
              <p>アプリ内から追加することができる小説です。</p>
              <ul className='u-list-disc'>
                <li>
                  恋太郎ファミリー 名前一覧
                  <ul className='u-list-disc'>
                    <li>読み上げを簡単に行えるように、恋太郎ファミリーの名前を羅列した小説です。</li>
                    <li>TVアニメ登場彼女まで、コミックス登場彼女までなど、内容の範囲を選択できます。</li>
                    <li>定期的に内容の更新を行い、アプリ内から小説の更新を行なえます。</li>
                  </ul>
                </li>
              </ul>
            </section>
            <section className='contents'>
              <h4>外部ファイル</h4>
              <p>以下の形式の取り込みに対応しています。</p>
              <ul className='u-list-disc'>
                <li>
                  青空文庫形式
                  <ul className='u-list-disc'>
                    <li>
                      <LinkText href='https://www.aozora.gr.jp' external>青空文庫</LinkText>からダウンロードした小説のzipファイルおよびtxtファイルに対応しています。
                    </li>
                  </ul>
                </li>
                <li>通常のtxtファイル</li>
              </ul>
            </section>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>選択した文字の音声による読み上げ</h3>
            <p>表示されている小説内の文字を範囲選択すると、選択した文字が読み上げ待機リストに追加され、読み上げを開始するとリスト内の文字を順番に読み上げます。</p>
            <p>手動での範囲選択のほか、文章のタップによる文の自動選択も可能です。</p>
            <p>読み上げ自動開始設定がオンの場合、リストに文字が追加されたタイミングで読み上げが開始されます。</p>
            <p>デフォルトの端末標準の音声読み上げのほか、読み上げ設定を変更することでVOICEVOXによる音声読み上げにも対応しています。</p>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>ブックマーク機能による即時読み上げ登録</h3>
            <p>読み上げ待機リスト内に存在する文字をブックマークに登録することができます。</p>
            <p>ブックマークに登録された文字は、簡単に読み上げ待機リストに追加することができます。</p>
            <p>フォルダ機能を使用してブックマークを整理することも可能です。</p>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>小説の作成・編集</h3>
            <p>アプリ内で小説を新規作成したり、既存の小説を編集することができます。</p>
            <p>編集を行えないようにロックすることも可能です。</p>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>小説の共有</h3>
            <p>小説をサーバーにアップロードすることで、QRコードや端末の共有メニューを使用して、小説を他の端末やユーザーと共有することができます。</p>
            <p>アップロードされた小説は共有の有効期限が過ぎたものは自動的に削除されます。</p>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3><LinkText href='https://web.dev/articles/what-are-pwas' external>PWA</LinkText>による端末へのインストール</h3>
            <p>よむとーく＋はPWAに対応しており、ブラウザからWebアプリをインストールしてホーム画面への追加やオフライン環境での利用を行うことができます。</p>
            <p>スマートフォン環境ではPWAでの利用を推奨していますが、通常のブラウザ上でも利用することができます。</p>
          </section>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h3>オープンソース</h3>
          <p>よむとーく＋のソースコードは<LinkText href='https://github.com/souhait0614/yomutalk-plus' external>GitHub</LinkText>で公開されています。</p>
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
