
<script lang="ts">
  // SPDX-FileCopyrightText: 2024 taiy https://github.com/taiyme
  // SPDX-License-Identifier: MIT
  import type { VariantProps } from 'tailwind-variants';
  import { tv } from 'tailwind-variants';

  import type { Link } from '@/types/Link';
  import IconExternalLink from '@/components/icons/IconExternalLink.svelte';
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

  type Props = Link & Pick<VariantProps<typeof slots>, 'variant'> & {
    label: string;
    class?: string;
  };

  let { label, variant, class: className, ...linkProps }: Props = $props();

  const { linkAttrs, isExternalLink } = $derived(generateLinkAttributes(linkProps));

  const styles = $derived(slots({
    variant,
    external: isExternalLink,
  }));
</script>

<a class={styles.anchor({ class: className })} {...linkAttrs}>
  <span class={styles.text()}>{label}</span>
  {#if isExternalLink}
    <IconExternalLink class={styles.icon()} />
  {/if}
</a>
