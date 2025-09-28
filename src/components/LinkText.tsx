// SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
// SPDX-License-Identifier: MIT

import type { ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Link } from 'waku';

import type { LinkWithChildren } from '@/types/Link';
import IconExternalLink from '@/components/icons/IconExternalLink';
import { generateLinkAttributes } from '@/utils/generateLinkAttributes';

const slots = tv({
  slots: {
    anchor: 'group/LinkText',
    text: 'group-hover/LinkText:underline',
    icon: 'mt-[-0.125em] mr-[0.125em] inline size-[0.85em] align-middle',
  },
  variants: {
    variant: {
      primary: {
        anchor: 'text-primary-text',
      },
    },
    external: {
      true: {
        text: 'mr-[0.125em]',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type LinkTextProps = Readonly<
  & LinkWithChildren
  & Pick<
    VariantProps<typeof slots>,
    | 'variant'
  >
> & {
  className?: string;
};

export default function LinkText({ children, variant, className, ...linkProps }: LinkTextProps) {
  const { linkAttrs, isExternalLink } = generateLinkAttributes(linkProps);

  const { anchor, text, icon } = slots({
    variant,
    external: isExternalLink,
  });

  const LinkComponent = isExternalLink
    ? ({ children }: { children: ReactNode; }) => <a className={anchor({ class: className })} {...linkAttrs}>{children}</a>
    : ({ children }: { children: ReactNode; }) => <Link className={anchor({ class: className })} {...linkAttrs}>{children}</Link>;

  return (
    <LinkComponent>
      <span className={text()}>
        {children}
      </span>
      {isExternalLink && (
        <IconExternalLink
          className={icon()}
        />
      )}
    </LinkComponent>
  );
}
