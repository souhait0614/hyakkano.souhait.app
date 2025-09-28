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

  if (external && externalHref) {
    return {
      linkAttrs: {
        ...rest,
        ...omitUndefined({ rel, target }),
        href: externalHref,
      },
      isExternalLink: true,
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
    } as const;
  }

  throw new Error('Invalid link props');
}
