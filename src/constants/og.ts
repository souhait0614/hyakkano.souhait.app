// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { OpenGraph } from '@/types/OpenGraph';
import { SITE_NAME } from '@/constants/site';

type OgDefault = {
  ogType: NonNullable<OpenGraph['ogType']>;
  ogCardType: NonNullable<OpenGraph['ogCardType']>;
  ogImageUrl: string;
  ogImageAlt: string;
  ogImageType: string;
  ogImageWidth: number;
  ogImageHeight: number;
};

export function getOgDefault(site: URL): OgDefault {
  return {
    ogType: 'website',
    ogCardType: 'summary',
    ogImageUrl: new URL('/open-graph.png', site).href,
    ogImageAlt: `${SITE_NAME}のロゴ`,
    ogImageType: 'image/png',
    ogImageWidth: 384,
    ogImageHeight: 384,
  };
}
