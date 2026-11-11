<script lang="ts">
  import type { Component } from 'svelte';
  import type { VariantProps } from 'tailwind-variants';
  import { tv } from 'tailwind-variants';

  import type { Link } from '@/types/Link';
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
        contained: {
          anchor: `
            bg-primary text-white
            hover-focus-active:bg-primary-dark
          `,
        },
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

  type Props = Link & Pick<VariantProps<typeof slots>, 'size' | 'variant' | 'align'> & {
    label: string;
    icon?: Component<{ class?: string; }>;
    class?: string;
    /** Astro の prefetch 対象から外したい場合に false を指定する */
    prefetch?: false;
  };

  let { label, size, variant, align, icon: IconComponent, class: className, prefetch, ...linkProps }: Props = $props();

  const { linkAttrs } = $derived(generateLinkAttributes(linkProps));
  const styles = $derived(slots({ variant, align, size }));
</script>

<a
  class={styles.anchor({ class: className })}
  data-astro-prefetch={prefetch === false ? 'false' : undefined}
  {...linkAttrs}
>
  <div class={styles.textContainer()}>
    {#if IconComponent}
      {@const Icon = IconComponent}
      <Icon class='size-6' />
    {/if}
    <span class={styles.text()}>{label}</span>
  </div>
</a>
