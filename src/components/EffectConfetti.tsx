import { memo, useEffect } from 'react';

import { confetti } from '@/utils/confetti';

function EffectConfetti() {
  useEffect(() => {
    const stopConfetti = confetti();
    return () => {
      stopConfetti();
    };
  }, []);

  return null;
}
export default memo(EffectConfetti);
