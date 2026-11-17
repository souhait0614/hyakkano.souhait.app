
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { NormalIconProps } from '@/types/ComponentProps';
  import Icon from './Icon.svelte';

  let props: NormalIconProps = $props();
</script>

<Icon {...props}>
  <path d='M4 5h2' />
  <path d='M5 4v2' />
  <path d='M11.5 4l-.5 2' />
  <path d='M18 5h2' />
  <path d='M19 4v2' />
  <path d='M15 9l-1 1' />
  <path d='M18 13l2 -.5' />
  <path d='M18 19h2' />
  <path d='M19 18v2' />
  <path d='M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z' />
</Icon>
