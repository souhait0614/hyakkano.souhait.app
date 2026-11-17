
<script lang="ts">
  // SPDX-FileCopyrightText: 2020-2024 Paweł Kuna
  // SPDX-License-Identifier: MIT
  import type { NormalIconProps } from '@/types/ComponentProps';
  import Icon from './Icon.svelte';

  let props: NormalIconProps = $props();
</script>

<Icon {...props}>
  <path d='M12 5l0 14' />
  <path d='M18 13l-6 6' />
  <path d='M6 13l6 6' />
</Icon>
