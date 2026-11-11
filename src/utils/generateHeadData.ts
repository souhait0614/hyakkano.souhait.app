// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { AllUnionFields } from 'type-fest';

import type { Metadata } from '@/types/Metadata';
import { getOgDefault } from '@/constants/og';
import { SITE_NAME } from '@/constants/site';

export function generateHeadData(metadata: AllUnionFields<Metadata>, pathname: string, site: URL) {
  const { noIndex = false } = metadata;

  const title = metadata.title || SITE_NAME;

  const description = metadata.description || null;

  const titleWithSiteName = (
    title === SITE_NAME
      ? title
      : `${title} - ${SITE_NAME}`
  );

  // 静的ページの `Astro.url.pathname` は末尾スラッシュ付きになるが、
  // Cloudflare の html_handling (drop-trailing-slash) ではリダイレクトされるURLになるため正規化する
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  const canonicalUrl = (
    noIndex
      ? null
      : new URL(normalizedPathname, site).href
  );

  const ogDefault = getOgDefault(site);

  const og = (() => {
    const url = canonicalUrl;
    const siteName = SITE_NAME;
    const locale = 'ja_JP';

    const type = metadata.ogType ?? ogDefault.ogType;
    const cardType = metadata.ogCardType ?? ogDefault.ogCardType;

    const hasCustomImage = (
      metadata.ogImageUrl != null
      && metadata.ogImageAlt != null
      && metadata.ogImageType != null
      && metadata.ogImageWidth != null
      && metadata.ogImageHeight != null
    );

    const imageUrl = hasCustomImage ? metadata.ogImageUrl : ogDefault.ogImageUrl;
    const imageAlt = hasCustomImage ? metadata.ogImageAlt : ogDefault.ogImageAlt;
    const imageType = hasCustomImage ? metadata.ogImageType : ogDefault.ogImageType;
    const imageWidth = hasCustomImage ? metadata.ogImageWidth : ogDefault.ogImageWidth;
    const imageHeight = hasCustomImage ? metadata.ogImageHeight : ogDefault.ogImageHeight;

    return {
      type,
      cardType,
      url,
      siteName,
      locale,
      // サイト内の相対パスも指定できるように site を基準に解決する
      imageUrl: new URL(imageUrl, site).href,
      imageAlt,
      imageType,
      imageWidth,
      imageHeight,
    } as const;
  })();

  return {
    noIndex,
    title,
    titleWithSiteName,
    description,
    canonicalUrl,
    og,
  } as const;
}
