import type { ImeDictItem } from '@/types/ImeDict';

interface ImeDictItemTableProps {
  items: ImeDictItem[];
}
function ImeDictItemTable({ items }: ImeDictItemTableProps) {
  return (
    <table className='common-table grid-cols-[1fr_1fr_2fr] text-sm'>
      <thead>
        <tr>
          <th>読み</th>
          <th>語句</th>
          <th>コメント</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className='select-all'>{item.reading}</td>
            <td className='select-all'>{item.word}</td>
            <td className='select-all'>{item.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ImeDictItemTable;
