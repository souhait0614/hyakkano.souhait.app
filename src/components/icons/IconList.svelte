
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { NormalIconProps } from '@/types/ComponentProps';
  import Icon from './Icon.svelte';

  let props: NormalIconProps = $props();
</script>

<Icon {...props}>
  <path d='M9 6l11 0' />
  <path d='M9 12l11 0' />
  <path d='M9 18l11 0' />
  <path d='M5 6l0 .01' />
  <path d='M5 12l0 .01' />
  <path d='M5 18l0 .01' />
</Icon>
