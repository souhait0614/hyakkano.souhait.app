'use client';

import { useShowNameRuby } from './hooks';

export function ShowNameRubySetting() {
  const { showNameRuby, setShowNameRuby } = useShowNameRuby();
  return (
    <div className='flex items-center gap-1'>
      <input
        type='checkbox'
        id='showNameRuby'
        checked={showNameRuby}
        onChange={(e) => setShowNameRuby(e.target.checked)}
      />
      <label htmlFor='showNameRuby'>名前にルビを表示する</label>
    </div>
  );
}
