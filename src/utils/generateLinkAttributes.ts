// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { Link } from '@/types/Link';

interface LinkAttributes {
  href: string;
  target?: string;
  rel?: string;
  download?: true;
}

export function generateLinkAttributes(
  {
    to: internalHref,
    href: externalHref,
    external = false,
    download = false,
    author = false,
    me = false,
    sponsored = false,
    privacyPolicy = false,
  }: Link,
): { linkAttrs: LinkAttributes; isExternalLink: boolean; isDownloadLink: boolean; } {
  const rel = Object.entries({
    noopener: external,
    noreferrer: external,
    external,
    author,
    me,
    sponsored,
    privacyPolicy,
  }).flatMap(([k, v]) => (v ? [k] : [])).join(' ') || undefined;

  const target = external ? '_blank' : undefined;

  if (download && externalHref) {
    return {
      linkAttrs: { href: externalHref, rel, target, download: true },
      isExternalLink: external,
      isDownloadLink: true,
    } as const;
  }

  if (external && externalHref) {
    return {
      linkAttrs: { href: externalHref, rel, target },
      isExternalLink: true,
      isDownloadLink: false,
    } as const;
  }

  if (!external && internalHref) {
    return {
      linkAttrs: { href: internalHref, rel },
      isExternalLink: false,
      isDownloadLink: false,
    } as const;
  }

  throw new Error('Invalid link props');
}
