import type { PageProps } from 'waku/router';
import { parse } from 'valibot';

import type { Metadata } from '@/types/Metadata';
import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';
import ImeDictItemTable from '@/features/ime-dict/ImeDictItemTable';
import { imeDictGenerateOptionsSchema } from '@/features/ime-dict/schemas';
import PageHead from '@/features/PageHead';

export const metadata = {
  title: 'IMEユーザー辞書 プレビュー',
  description: 'キャラクターの名前や一部の用語をユーザー辞書として取り込める形式でダウンロードできます',
} as const satisfies Metadata;

export default async function Page(pageProps: PageProps<'/ime-dict/preview'>) {
  const urlSearchParams = new URLSearchParams(pageProps.query);
  const generateImeDictItemsOptions = parse(imeDictGenerateOptionsSchema, Object.fromEntries(urlSearchParams));
  const imeDictItems = await generateImeDictItems(generateImeDictItemsOptions);

  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container'>
        <h1 className='page-title'>IMEユーザー辞書 プレビュー</h1>
        <div className='card'>
          <ImeDictItemTable items={imeDictItems} />
        </div>
      </div>
    </>
  );
}


export function getConfig() {
  return {
    render: 'dynamic',
  } as const;
}
