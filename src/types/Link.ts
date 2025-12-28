// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { PropsWithChildren } from 'react';
import type { RouteConfig } from 'waku/router';

type Case_InternalLink = Readonly<{
  external?: false;
  download?: false;
  to: RouteConfig['paths'];
  href?: never;
}>;

type Case_ExternalLink = Readonly<{
  external: true;
  download?: false;
  to?: never;
  href: string;
}>;

type Case_DownloadLink = Readonly<{
  external?: boolean;
  download: true;
  to?: never;
  href: string;
}>;

export type Link = Readonly<
  & (
    | Case_InternalLink
    | Case_ExternalLink
    | Case_DownloadLink
  )
  & {
    author?: boolean;
    me?: boolean;
    sponsored?: boolean;
    privacyPolicy?: boolean;
  }
>;

export type LinkWithChildren = Readonly<
  PropsWithChildren<Link>
>;
