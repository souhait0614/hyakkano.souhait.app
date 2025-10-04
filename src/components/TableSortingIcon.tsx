import type { SortDirection } from '@tanstack/react-table';

import IconArrowDown from './icons/IconArrowDown';
import IconArrowUp from './icons/IconArrowUp';

interface TableSortingIconProps {
  sortingDirection: SortDirection | false;
}
function TableSortingIcon({ sortingDirection }: TableSortingIconProps) {
  if (sortingDirection === 'asc') {
    return <IconArrowUp width={16} height={16} className='text-primary-dark' />;
  }
  if (sortingDirection === 'desc') {
    return <IconArrowDown width={16} height={16} className='text-primary-dark' />;
  }
  return null;
}
export default TableSortingIcon;
