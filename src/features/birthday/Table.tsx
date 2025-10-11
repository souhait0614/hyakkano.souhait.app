'use client';

import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { TZDateMini } from '@date-fns/tz';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';

import TableSortingIcon from '@/components/TableSortingIcon';
import { TIMEZONE } from '@/constants/timezone';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { getTableSortingTitle } from '@/utils/table';

import type { CharacterBirthday, CharacterTableRow } from './types';
import { TodayDateContext } from './contexts';
import { useFilteredCharacters } from './hooks';
import { getDaysUntilBirthday } from './utils';

function Table() {
  const todayDate = useContext(TodayDateContext);

  const columns = useMemo(() => {
    const todayYear = todayDate.getFullYear();
    return [
      {
        accessorKey: 'girlfriendNumber',
        header: '彼女No.',
        cell: (info) => info.getValue() ?? '-',
        meta: { align: 'right' },
      },
      {
        accessorKey: 'name',
        header: '名前',
        sortingFn: (rowA, rowB) => rowA.original.pronunciation.localeCompare(rowB.original.pronunciation, 'ja'),
      },
      // {
      //   accessorKey: 'age',
      //   header: '年齢',
      //   cell: (info) => info.getValue() ?? '-',
      //   sortingFn: (rowA, rowB) => {
      //     const ageA = rowA.original.age ?? Number.MAX_SAFE_INTEGER;
      //     const ageB = rowB.original.age ?? Number.MAX_SAFE_INTEGER;
      //     return ageA - ageB;
      //   },
      //   meta: { align: 'right' },
      // },
      {
        accessorKey: 'birthday',
        header: '誕生日',
        sortingFn: (rowA, rowB) => {
          if (!rowA.original.birthday) return 1;
          if (!rowB.original.birthday) return -1;
          const [monthA, dayA, hourA = 0, minuteA = 0, secondA = 0] = rowA.original.birthday;
          const [monthB, dayB, hourB = 0, minuteB = 0, secondB = 0] = rowB.original.birthday;
          const dateA = new TZDateMini(todayYear, monthA - 1, dayA, hourA, minuteA, secondA, TIMEZONE);
          const dateB = new TZDateMini(todayYear, monthB - 1, dayB, hourB, minuteB, secondB, TIMEZONE);
          return dateA.getTime() - dateB.getTime();
        },
        cell: (info) => {
          const birthday = info.getValue<CharacterBirthday | undefined>();
          if (!birthday) return '未判明';
          return birthday.length === 2
            ? `${String(birthday[0]).padStart(2, '0')}/${String(birthday[1]).padStart(2, '0')}`
            : `${String(birthday[0]).padStart(2, '0')}/${String(birthday[1]).padStart(2, '0')} ${String(birthday[2]).padStart(2, '0')}:${String(birthday[3]).padStart(2, '0')}:${String(birthday[4]).padStart(2, '0')}`;
        },
      },
      {
        accessorKey: 'daysUntilBirthday',
        header: 'あと',
        cell: (info) => {
          const days = info.getValue<number | undefined>();
          if (days === undefined) return '-';
          return days === 0 ? '本日' : `${days}日`;
        },
        meta: { align: 'right' },
      },
    ] as const satisfies ColumnDef<CharacterTableRow>[];
  }, [todayDate]);

  const filteredCharacters = useFilteredCharacters();

  const data = useMemo<CharacterTableRow[]>(
    () => filteredCharacters
      .map((char) => ({
        ...char,
        daysUntilBirthday: getDaysUntilBirthday(char.birthday, todayDate),
      })),
    [filteredCharacters, todayDate],
  );

  const [sorting, setSorting] = useLocalStorageState<SortingState>('birthday_table_sorting', [
    { id: 'daysUntilBirthday', desc: false },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    sortDescFirst: false,
    getRowId: (row) => row.name,
  });

  return (
    <table className={`
      w-full grid-cols-[5.5em_1fr_minmax(4.5em,auto)_3.5em]
      max-sm:text-sm
    `}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={clsx(
                    'flex',
                    header.column.columnDef.meta?.align === 'right' && [
                      'justify-end',
                    ],
                  ) || undefined}
                >
                  {header.isPlaceholder ? null : (
                    <button
                      className={
                        clsx(
                          'flex items-center gap-0.5 border-0 p-0 text-nowrap',
                          header.column.getCanSort() && [
                            'cursor-pointer',
                            'select-none',
                          ],
                        )
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? getTableSortingTitle(header.column.getNextSortingOrder())
                          : undefined
                      }
                    >
                      {header.column.columnDef.meta?.align === 'right' && <TableSortingIcon sortingDirection={header.column.getIsSorted()} />}
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      {header.column.columnDef.meta?.align !== 'right' && <TableSortingIcon sortingDirection={header.column.getIsSorted()} />}
                    </button>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx(
                    cell.column.columnDef.meta?.align === 'right' && [
                      'text-end',
                    ],
                  ) || undefined}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
