import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import BirthdayCharactersCard from '@/features/birthday/BirthdayCharactersCard';
import CurrentDateClock from '@/features/birthday/CurrentDateClock';
import DateProvider from '@/features/birthday/DateProvider';
import { ReleasedLevelFilterSelect, TypesFilterCheckboxes } from '@/features/birthday/Filters';
import { ShowNameRubySetting } from '@/features/birthday/Settings';
import Table from '@/features/birthday/Table';
import PageHead from '@/features/PageHead';

export const metadata = {
  title: 'キャラクター誕生日一覧',
  description: '残り日数のリアルタイムカウントダウンに対応した恋太郎ファミリーや主要キャラクターの誕生日一覧',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/birthday'>) {
  return (
    <DateProvider>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container'>
        <div className='flex flex-wrap items-center justify-between gap-x-2'>
          <h1 className='page-title'>{metadata.title}</h1>
          <p className='card px-3 py-2'>
            <CurrentDateClock className='font-mono' suppressHydrationWarning />
            {' '}
            <span className='text-xs'>(JST)</span>
          </p>
        </div>
        <section className='flex flex-col gap-2 card'>
          <h2 className='text-lg'>表示設定</h2>
          <ReleasedLevelFilterSelect />
          <div className='flex flex-wrap gap-2'>
            <TypesFilterCheckboxes />
          </div>
          <div className='flex flex-wrap gap-2'>
            <ShowNameRubySetting />
          </div>
        </section>
        <BirthdayCharactersCard />
        <section className='card'>
          <h2 className='sr-only'>キャラクター一覧</h2>
          <Table />
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2 className='text-lg'>このページについて</h2>
          <p>原作133話やコミックスカバー下などの情報をもとに、登場キャラクターの誕生日を一覧で表示しています。</p>
          <p>誕生日までの残り日数は端末の日時設定に基づき日本標準時(JST)で計算され、このページを表示したまま午前0時(JST)を迎えると自動的に再計算されます。</p>
          <p>表示設定やテーブルの並び替えはブラウザに保存され、次回表示時にも反映されます。</p>
        </section>
      </div>
    </DateProvider>
  );
}

export function getConfig() {
  return {
    render: 'dynamic',
  } as const;
}
