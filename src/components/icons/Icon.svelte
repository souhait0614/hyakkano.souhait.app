
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { Snippet } from 'svelte';
  import type { NormalIconProps } from '@/types/ComponentProps';

  let { children, ...props }: NormalIconProps & { children?: Snippet; } = $props();
</script>

<svg
  xmlns='http://www.w3.org/2000/svg'
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  stroke-width='2'
  stroke-linecap='round'
  stroke-linejoin='round'
  role='img'
  aria-hidden='true'
  {...props}
>
  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
  {@render children?.()}
</svg>
