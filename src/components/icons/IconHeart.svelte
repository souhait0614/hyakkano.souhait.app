
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { FillableIconProps } from '@/types/ComponentProps';
  import Icon from './Icon.svelte';

  let { filled = false, ...props }: FillableIconProps = $props();
</script>

<Icon
  fill={filled ? 'currentColor' : 'none'}
  stroke={filled ? 'none' : 'currentColor'}
  {...props}
>
  <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
</Icon>
