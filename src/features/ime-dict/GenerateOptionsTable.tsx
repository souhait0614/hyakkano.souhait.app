import type { ImeDictGenerateOptions } from './schemas';
import { generateOptionsKeyLabels, releasedLevelLabels } from './labels';

interface GenerateOptionsTableProps {
  generateOptions: Partial<ImeDictGenerateOptions>;
  showReleasedLevel?: boolean;
}
function GenerateOptionsTable({ generateOptions: { releasedLevel, ...generateOptions }, showReleasedLevel = false }: GenerateOptionsTableProps) {
  const labels: string[] = Object.entries(generateOptions).flatMap(([key, value]) => {
    if (value === true) {
      return [generateOptionsKeyLabels[key as keyof Omit<ImeDictGenerateOptions, 'releasedLevel'>]];
    } else {
      return [];
    }
  });

  return (
    <table className='block text-sm'>
      <tbody className='contents'>
        {showReleasedLevel && releasedLevel && (
          <tr className='flex'>
            <th className={`
              block w-min whitespace-nowrap
              after:content-[":"]
            `}
            >範囲
            </th>
            <td className='block'>
              {releasedLevelLabels[releasedLevel]}
            </td>
          </tr>
        )}
        <tr className='flex'>
          <th className={`
            block w-min whitespace-nowrap
            after:content-[":"]
          `}
          >内容
          </th>
          <td className='block'>
            <ul className={`
              flex flex-row flex-wrap gap-x-0.5
              *:block *:not-last:after:content-[","]
            `}
            >
              {labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default GenerateOptionsTable;
