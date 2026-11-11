<script lang="ts">
  import { confetti } from '@/utils/confetti';

  $effect(() => {
    const stopConfetti = confetti();
    return () => {
      stopConfetti();
    };
  });
</script>
