import type { DataEntries, DataId, Seiyuu, SeiyuuIdBase } from '@/types/Data';

const seiyuusVoiceDramaArray = [
  //#region girlfriends
  ['seiyuu_voice_drama_ueda_reina', {
    name: { kanji: ['上田', '麗奈'], hiragana: ['うえだ', 'れいな'] },
  }],
  ['seiyuu_voice_drama_shiraishi_haruka', {
    name: { kanji: ['白石', '晴香'], hiragana: ['しらいし', 'はるか'] },
  }],
  ['seiyuu_voice_drama_iwami_manaka', {
    name: { kanji: ['石見', '舞菜香'], hiragana: ['いわみ', 'まなか'] },
  }],
  ['seiyuu_voice_drama_suyama_emiri', {
    name: { kanji: ['陶山', '恵実里'], hiragana: ['すやま', 'えみり'] },
  }],
  ['seiyuu_voice_drama_kanemoto_hisako', {
    name: { kanji: ['金元', '寿子'], hiragana: ['かねもと', 'ひさこ'] },
  }],
  //#endregion
] as const satisfies DataEntries<SeiyuuIdBase<'voice_drama'>, Seiyuu>;

export type SeiyuuVoiceDramaId = DataId<typeof seiyuusVoiceDramaArray>;

export const SEIYUUS_VOICE_DRAMA: ReadonlyMap<SeiyuuVoiceDramaId, Seiyuu> = new Map<SeiyuuVoiceDramaId, Seiyuu>(seiyuusVoiceDramaArray);
