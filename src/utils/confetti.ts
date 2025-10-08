import type { Options } from 'canvas-confetti';

const defaults: Options = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min: number, max: number) {
  return (Math.random() * (max - min)) + min;
}

async function confettiFunction(particleCount: number) {
  const _confetti = (await import('canvas-confetti')).default;
  // since particles fall down, start a bit higher than random
  _confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  _confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
}

export function confetti() {
  const duration = 10000;
  const animationEnd = Date.now() + duration;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return window.clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confettiFunction(particleCount);
  }, 250);

  const stopConfetti = () => {
    window.clearInterval(interval);
  };

  confettiFunction(50);

  return stopConfetti;
}
