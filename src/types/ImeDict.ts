export type ImeDictItemCategory = 'TITLE' | 'CHARACTER_NAME_FULL' | 'CHARACTER_NAME_SHORT' | 'CHARACTER_ANOTHERNAME_FULL' | 'CHARACTER_ANOTHERNAME_SHORT' | 'CHARACTER_NICKNAME' | 'CHARACTER_ANIME_VOICE_ACTOR';

export interface ImeDictItem {
  reading: string;
  word: string;
  category: ImeDictItemCategory;
  comment: string | undefined;
}
