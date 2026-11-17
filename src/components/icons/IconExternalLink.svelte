
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { NormalIconProps } from '@/types/ComponentProps';
  import Icon from './Icon.svelte';

  let props: NormalIconProps = $props();
</script>

<Icon {...props}>
  <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6' />
  <path d='M11 13l9 -9' />
  <path d='M15 4h5v5' />
</Icon>
