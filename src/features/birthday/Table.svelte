<script lang="ts">
  import { TZDateMini } from '@date-fns/tz';
  import {
    createColumnHelper,
    createSortedRowModel,
    createTable,
    functionalUpdate,
    rowSortingFeature,
    tableFeatures,
  } from '@tanstack/svelte-table';
  import clsx from 'clsx';

  import TableSortingIcon from '@/components/TableSortingIcon.svelte';
  import { TIMEZONE } from '@/constants/timezone';
  import type { CharacterBirthday, PersonName } from '@/types/Data';
  import { getTableSortingTitle } from '@/utils/table';

  import { getBirthdayState } from './state.svelte';
  import { getDaysUntilBirthday } from './utils';

  type BirthdayTableRow = {
    name: PersonName;
    girlfriendNumber: number | undefined;
    birthday: CharacterBirthday | undefined;
    daysUntilBirthday: number | undefined;
  };

  const HEADER_LABELS: Record<string, string> = {
    girlfriendNumber: '彼女No.',
    name: '名前',
    birthday: '誕生日',
    daysUntilBirthday: 'あと',
  };

  const features = tableFeatures({
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
  });

  const columnHelper = createColumnHelper<typeof features, BirthdayTableRow>();

  const state = getBirthdayState();

  const data = $derived(state.filteredCharacters.map((character): BirthdayTableRow => ({
    name: character.name,
    girlfriendNumber: character.type === 'GIRLFRIEND' ? character.girlfriendNumber : undefined,
    birthday: character.birthday,
    daysUntilBirthday: getDaysUntilBirthday(character.birthday, state.today),
  })));

  const columns = $derived.by(() => {
    const todayYear = state.today.getFullYear();
    return columnHelper.columns([
      columnHelper.accessor('girlfriendNumber', {
        header: '彼女No.',
        meta: { align: 'right' },
      }),
      columnHelper.accessor('name', {
        header: '名前',
        sortFn: (rowA, rowB) => rowA.original.name.hiragana.join(' ').localeCompare(rowB.original.name.hiragana.join(' '), 'ja'),
      }),
      columnHelper.accessor('birthday', {
        header: '誕生日',
        sortFn: (rowA, rowB) => {
          if (!rowA.original.birthday) return 1;
          if (!rowB.original.birthday) return -1;
          const [monthA, dayA, hourA = 0, minuteA = 0, secondA = 0] = rowA.original.birthday;
          const [monthB, dayB, hourB = 0, minuteB = 0, secondB = 0] = rowB.original.birthday;
          const dateA = new TZDateMini(todayYear, monthA - 1, dayA, hourA, minuteA, secondA, TIMEZONE);
          const dateB = new TZDateMini(todayYear, monthB - 1, dayB, hourB, minuteB, secondB, TIMEZONE);
          return dateA.getTime() - dateB.getTime();
        },
        meta: { tdClassName: 'font-mono' },
      }),
      columnHelper.accessor('daysUntilBirthday', {
        header: 'あと',
        meta: { align: 'right' },
      }),
    ]);
  });

  const table = createTable({
    features,
    get data() {
      return data;
    },
    get columns() {
      return columns;
    },
    state: {
      get sorting() {
        return state.sorting;
      },
    },
    onSortingChange: (updater) => {
      state.setSorting(functionalUpdate(updater, state.sorting));
    },
    sortDescFirst: false,
    getRowId: (row) => row.name.kanji.join(''),
  });

  function formatBirthday(birthday: CharacterBirthday | undefined): string {
    if (!birthday) return '未判明';
    return birthday.length === 2
      ? `${String(birthday[0]).padStart(2, '0')}/${String(birthday[1]).padStart(2, '0')}`
      : `${String(birthday[0]).padStart(2, '0')}/${String(birthday[1]).padStart(2, '0')} ${String(birthday[2]).padStart(2, '0')}:${String(birthday[3]).padStart(2, '0')}:${String(birthday[4]).padStart(2, '0')}`;
  }

  function formatDays(days: number | undefined): string {
    if (days === undefined) return '-';
    return days === 0 ? '本日' : `${days}日`;
  }
</script>

{#snippet nameCell(name: PersonName)}
  {#if state.showNameRuby}
    <span class='[&>ruby:not(:last-child)]:me-[0.25em]'>
      {#each name.kanji as str, index (index)}
        <ruby>
          {str}
          {#if name.hiragana[index]}
            <rp>(</rp><rt>{name.hiragana[index]}</rt><rp>)</rp>
          {/if}
        </ruby>
      {/each}
    </span>
  {:else}
    <span>{name.kanji.join(' ') || '-'}</span>
  {/if}
{/snippet}

<table class={`
  common-table w-full grid-cols-[5.5em_1fr_minmax(4.5em,auto)_3.5em]
  max-sm:text-sm
`}
>
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr>
        {#each headerGroup.headers as header (header.id)}
          <th
            colSpan={header.colSpan}
            class={clsx(
              'flex',
              header.column.columnDef.meta?.align === 'right' && ['justify-end'],
            ) || undefined}
          >
            {#if !header.isPlaceholder}
              <button
                type='button'
                class={clsx(
                  'flex items-center gap-0.5 border-0 p-0 text-nowrap',
                  header.column.getCanSort() && ['cursor-pointer', 'select-none'],
                )}
                onclick={header.column.getToggleSortingHandler()}
                title={header.column.getCanSort() ? getTableSortingTitle(header.column.getNextSortingOrder()) : undefined}
              >
                {#if header.column.columnDef.meta?.align === 'right'}
                  <TableSortingIcon sortingDirection={header.column.getIsSorted()} />
                {/if}
                <span>{HEADER_LABELS[header.column.id] ?? header.column.id}</span>
                {#if header.column.columnDef.meta?.align !== 'right'}
                  <TableSortingIcon sortingDirection={header.column.getIsSorted()} />
                {/if}
              </button>
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row (row.id)}
      <tr>
        <td class='text-end'>{row.original.girlfriendNumber ?? '-'}</td>
        <td>{@render nameCell(row.original.name)}</td>
        <td class='font-mono'>
          {formatBirthday(row.original.birthday)}
        </td>
        <td class='text-end'>{formatDays(row.original.daysUntilBirthday)}</td>
      </tr>
    {/each}
  </tbody>
</table>
