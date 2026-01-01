export const ReleasedLevel = {
  anime: 'anime',
  comics: 'comics',
  jumpPlus: 'jumpPlus',
  youngJump: 'youngJump',
} as const;

export type ReleasedLevel = keyof typeof ReleasedLevel;
