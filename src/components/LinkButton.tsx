import type { ComponentPropsWithRef, FC, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Link } from 'waku';

import type { LinkWithChildren } from '@/types/Link';
import { generateLinkAttributes } from '@/utils/generateLinkAttributes';

const slots = tv({
  slots: {
    anchor: `
      @container block rounded-md
      motion-safe:transition-colors
    `,
    textContainer: `
      flex size-full items-center gap-x-4
      @max-[10rem]:flex-col @max-[10rem]:justify-center
    `,
    text: `
      block w-full max-w-fit overflow-hidden text-nowrap text-ellipsis
      @max-[10rem]:text-xs
    `,
  },
  variants: {
    size: {
      normal: {
        anchor: 'h-12',
        textContainer: `
          px-4
          @max-[10rem]:px-2
        `,
      },
      small: {
        anchor: 'h-8',
        textContainer: 'px-0',
      },
    },
    variant: {
      normal: {
        anchor: `
          bg-primary/0
          hover-focus-active:bg-primary/5 hover-focus-active:text-primary-text
        `,
      },
      active: { anchor: 'bg-primary/15 text-primary-text' },
    },
    align: {
      start: { textContainer: 'justify-start' },
      center: { textContainer: 'justify-center' },
      end: { textContainer: 'justify-end' },
    },
  },
  defaultVariants: {
    size: 'normal',
    variant: 'normal',
    align: 'start',
  },
});

type NavButtonProps = Readonly<
  & LinkWithChildren
  & Pick<
    VariantProps<typeof slots>,
    | 'size'
    | 'variant'
    | 'align'
  >
  & {
    icon?: FC<ComponentPropsWithRef<'svg'>>;
    className?: string;
  }>;

export default function LinkButton({ size, variant, align, children, icon: IconComponent, className, ...linkProps }: NavButtonProps) {
  const { linkAttrs, isExternalLink, isDownloadLink } = generateLinkAttributes(linkProps);
  const { anchor, text, textContainer } = slots({ variant, align, size });

  const LinkComponent = isExternalLink || isDownloadLink
    ? ({ children }: { children: ReactNode; }) => <a className={anchor({ class: className })} {...linkAttrs}>{children}</a>
    : ({ children }: { children: ReactNode; }) => <Link className={anchor({ class: className })} {...linkAttrs}>{children}</Link>;

  return (
    <LinkComponent>
      <div className={textContainer()}>
        {IconComponent && (
          <IconComponent className='size-6' />
        )}
        <span
          className={text()}
        >{children}
        </span>
      </div>
    </LinkComponent>
  );
}
