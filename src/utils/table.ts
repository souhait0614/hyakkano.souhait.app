import type { SortDirection } from '@tanstack/react-table';

export const getTableSortingTitle = (sorting: SortDirection | false) => {
  if (sorting === 'asc') {
    return '昇順で並び替え';
  }
  if (sorting === 'desc') {
    return '降順で並び替え';
  }
  return '並び替えをクリア';
};
