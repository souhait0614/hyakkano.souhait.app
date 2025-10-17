// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { PageProps } from 'waku/router';

import type { Metadata } from '@/types/Metadata';
import { generateHeadData } from '@/utils/generateHeadData';

interface PageHeadProps<T extends PageProps<string>> {
  metadata: Metadata;
  pageProps: T;
}
export default function PageHead<T extends PageProps<string>>({ metadata, pageProps }: PageHeadProps<T>) {
  const {
    noIndex,
    title,
    titleWithSiteName,
    description,
    canonicalUrl,
    og,
  } = generateHeadData(metadata, pageProps);

  return (
    <>
      {noIndex && (<meta name='robots' content='noindex' />)}
      {description && (<meta name='description' content={description} />)}
      <title>{titleWithSiteName}</title>
      <meta property='og:title' content={title} />
      {description && (<meta property='og:description' content={description} />)}
      <meta property='og:url' content={og.url ?? undefined} />
      <meta property='og:site_name' content={og.siteName} />
      <meta property='og:locale' content={og.locale} />
      <meta property='og:image' content={og.imageUrl} />
      <meta property='og:image:alt' content={og.imageAlt} />
      <meta property='og:image:type' content={og.imageType} />
      <meta property='og:image:width' content={og.imageWidth.toString()} />
      <meta property='og:image:height' content={og.imageHeight.toString()} />
      <meta property='og:type' content={og.type} />
      <meta name='twitter:card' content={og.cardType} />
      {canonicalUrl && (<link rel='canonical' href={canonicalUrl} />)}
      {!noIndex && (
        <>
          <meta name='twitter:site' content='@ElectronicsBot' />
          <meta name='twitter:creator' content='@ElectronicsBot' />
          <meta name='twitter:site' content='@souhait_100kano' />
          <meta name='twitter:creator' content='@souhait_100kano' />
          <link rel='me' href='https://submarin.online/@souhait' />
          <link rel='me' href='https://msk.kitazawa.me/@souhait' />
          <link rel='me' href='https://mk.shrimpia.network/@souhait' />
        </>
      )}
    </>
  );
}
