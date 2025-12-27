import { ReleasedLevel } from '@/types/ReleasedLevel';

export const RELEASED_LEVELS = [
  ReleasedLevel.anime,
  ReleasedLevel.comics,
  ReleasedLevel.jumpPlus,
  ReleasedLevel.youngJump,
] as const satisfies ReleasedLevel[];
