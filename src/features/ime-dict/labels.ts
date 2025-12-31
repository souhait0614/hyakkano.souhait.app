import type { ImeDictGenerateOptionsInput } from './schemas';

export const generateOptionsKeyLabels = {
  title: '作品タイトル',
  characterRentaro: '恋太郎',
  characterGirlfriends: '彼女',
  characterAuthors: '作者',
  characterCircletLoveStory: '王冠恋物語登場キャラクター',
  characterGoriraAlliance: 'ゴリラ連合関係者',
  characterJurassicHighSchoolBaseballTeam: '寿裸漆区高校女子野球部関係者',
  characterPeppePentaro: 'ペペペのペン太郎登場キャラクター',
  characterOthers: 'その他キャラクター',
  voiceActors: 'キャラクターの担当声優',
  schools: '登場する学校',
  towns: '登場する町',
} as const satisfies Record<keyof Omit<ImeDictGenerateOptionsInput, 'releasedLevel'>, string>;
