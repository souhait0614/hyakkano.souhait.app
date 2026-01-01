// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { Link } from '@/types/Link';

function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
}

export function generateLinkAttributes<T extends Link>(
  {
    to: internalHref,
    href: externalHref,
    external = false,
    download = false,
    author = false,
    me = false,
    ...rest
  }: T,
) {
  const target = external ? '_blank' : undefined;
  const rel = Object.entries({
    noopener: external,
    noreferrer: external,
    external,
    author,
    me,
  }).flatMap(([k, v]) => (v ? [k] : [])).join(' ') || undefined;

  if (download && externalHref) {
    return {
      linkAttrs: {
        ...rest,
        ...omitUndefined({ rel, target }),
        href: externalHref,
        download: true,
      },
      isExternalLink: external,
      isDownloadLink: true,
    } as const;
  }

  if (external && externalHref) {
    return {
      linkAttrs: {
        ...rest,
        ...omitUndefined({ rel, target }),
        href: externalHref,
      },
      isExternalLink: true,
      isDownloadLink: false,
    } as const;
  }

  if (!external && internalHref) {
    return {
      linkAttrs: {
        ...rest,
        ...omitUndefined({ rel, target }),
        to: internalHref,
      },
      isExternalLink: false,
      isDownloadLink: false,
    } as const;
  }

  throw new Error('Invalid link props');
}
