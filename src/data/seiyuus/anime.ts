import type { DataEntries, DataId, Seiyuu, SeiyuuIdBase } from '@/types/Data';

const seiyuusAnimeArray = [
  //#region rentaro
  ['seiyuu_anime_kato_wataru', {
    name: { kanji: ['加藤', '渉'], hiragana: ['かとう', 'わたる'] },
  }],
  ['seiyuu_anime_amami_yurina', {
    name: { kanji: ['天海', '由梨奈'], hiragana: ['あまみ', 'ゆりな'] },
  }],
  //#endregion
  //#region girlfriends
  ['seiyuu_anime_hondo_kaede', {
    name: { kanji: ['本渡', '楓'], hiragana: ['ほんど', 'かえで'] },
  }],
  ['seiyuu_anime_tomita_miyu', {
    name: { kanji: ['富田', '美憂'], hiragana: ['とみた', 'みゆ'] },
  }],
  ['seiyuu_anime_naganawa_maria', {
    name: { kanji: ['長縄', 'まりあ'], hiragana: ['ながなわ', 'まりあ'] },
  }],
  ['seiyuu_anime_seto_asami', {
    name: { kanji: ['瀬戸', '麻沙美'], hiragana: ['せと', 'あさみ'] },
  }],
  ['seiyuu_anime_asai_ayaka', {
    name: { kanji: ['朝井', '彩加'], hiragana: ['あさい', 'あやか'] },
  }],
  ['seiyuu_anime_uesaka_sumire', {
    name: { kanji: ['上坂', 'すみれ'], hiragana: ['うえさか', 'すみれ'] },
  }],
  ['seiyuu_anime_shindou_amane', {
    name: { kanji: ['進藤', 'あまね'], hiragana: ['しんどう', 'あまね'] },
  }],
  ['seiyuu_anime_mimori_suzuko', {
    name: { kanji: ['三森', 'すずこ'], hiragana: ['みもり', 'すずこ'] },
  }],
  ['seiyuu_anime_takahashi_rie', {
    name: { kanji: ['高橋', '李依'], hiragana: ['たかはし', 'りえ'] },
  }],
  ['seiyuu_anime_lynn', {
    name: { kanji: ['Lynn'], hiragana: ['りん'] },
  }],
  ['seiyuu_anime_takao_kanon', {
    name: { kanji: ['高尾', '奏音'], hiragana: ['たかお', 'かのん'] },
  }],
  ['seiyuu_anime_ishihara_kaori', {
    name: { kanji: ['石原', '夏織'], hiragana: ['いしはら', 'かおり'] },
  }],
  ['seiyuu_anime_taketatsu_ayana', {
    name: { kanji: ['竹達', '彩奈'], hiragana: ['たけたつ', 'あやな'] },
  }],
  //#endregion
  //#region gorira alliance
  ['seiyuu_anime_saitou_kimiko', {
    name: { kanji: ['斉藤', '貴美子'], hiragana: ['さいとう', 'きみこ'] },
  }],
  ['seiyuu_anime_tsumugi_risa', {
    name: { kanji: ['紡木', '吏佐'], hiragana: ['つむぎ', 'りさ'] },
  }],
  ['seiyuu_anime_kuroki_hibiki', {
    name: { kanji: ['黒木', '響'], hiragana: ['くろき', 'ひびき'] },
  }],
  ['seiyuu_anime_sakai_misano', {
    name: { kanji: ['酒井', '美沙乃'], hiragana: ['さかい', 'みさの'] },
  }],
  ['seiyuu_anime_moriya_saiko', {
    name: { kanji: ['森谷', '彩子'], hiragana: ['もりや', 'さいこ'] },
  }],
  //#endregion
  //#region jurassic high school baseball team
  ['seiyuu_anime_kanda_mika', {
    name: { kanji: ['神田', 'みか'], hiragana: ['かんだ', 'みか'] },
  }],
  ['seiyuu_anime_nikerei_faranaze', {
    name: { kanji: ['ニケライ', '・', 'ファラナーゼ'], hiragana: ['にけらい', '', 'ふぁらなーぜ'] },
  }],
  ['seiyuu_anime_kawase_maki', {
    name: { kanji: ['河瀬', '茉希'], hiragana: ['かわせ', 'まき'] },
  }],
  ['seiyuu_anime_okada_sachiko', {
    name: { kanji: ['岡田', '幸子'], hiragana: ['おかだ', 'さちこ'] },
  }],
  ['seiyuu_anime_kawamura_umino', {
    name: { kanji: ['川村', '海乃'], hiragana: ['かわむら', 'うみの'] },
  }],
  ['seiyuu_anime_izumi_chihiro', {
    name: { kanji: ['伊澄', 'ちひろ'], hiragana: ['いすみ', 'ちひろ'] },
  }],
  ['seiyuu_anime_sanai_runa', {
    name: { kanji: ['佐内', '瑠奈'], hiragana: ['さない', 'るな'] },
  }],
  ['seiyuu_anime_kamimoto_ayaka', {
    name: { kanji: ['神本', '綾華'], hiragana: ['かみもと', 'あやか'] },
  }],
  ['seiyuu_anime_satou_hinata', {
    name: { kanji: ['佐藤', '日向'], hiragana: ['さとう', 'ひなた'] },
  }],
  ['seiyuu_anime_hashi_sayaka', {
    name: { kanji: ['羽紫', 'さや花'], hiragana: ['はし', 'さやか'] },
  }],
  ['seiyuu_anime_abe_natsuko', {
    name: { kanji: ['阿部', '菜摘子'], hiragana: ['あべ', 'なつこ'] },
  }],
  ['seiyuu_anime_aoki_hina', {
    name: { kanji: ['青木', '陽菜'], hiragana: ['あおき', 'ひな'] },
  }],
  //#endregion
  //#region others
  ['seiyuu_anime_amano_satomi', {
    name: { kanji: ['天野', '聡美'], hiragana: ['あまの', 'さとみ'] },
  }],
  ['seiyuu_anime_yamada_misuzu', {
    name: { kanji: ['山田', '美鈴'], hiragana: ['やまだ', 'みすず'] },
  }],
  ['seiyuu_anime_shutou_yukina', {
    name: { kanji: ['首藤', '志奈'], hiragana: ['しゅとう', 'ゆきな'] },
  }],
  ['seiyuu_anime_chiba_shigeru', {
    name: { kanji: ['千葉', '繁'], hiragana: ['ちば', 'しげる'] },
  }],
  ['seiyuu_anime_kujira', {
    name: { kanji: ['くじら'], hiragana: ['くじら'] },
  }],
  ['seiyuu_anime_sakakibara_yuuki', {
    name: { kanji: ['榊原', '優希'], hiragana: ['さかきはら', 'ゆうき'] },
  }],
  ['seiyuu_anime_kawai_haruna', {
    name: { kanji: ['河井', '晴菜'], hiragana: ['かわい', 'はるな'] },
  }],
  ['seiyuu_anime_yamane_masashi', {
    name: { kanji: ['山根', '雅史'], hiragana: ['やまね', 'まさし'] },
  }],
  // TODO: 羽香里の父の名前が判明したら追加
  // ['seiyuu_anime_ishida_akira', {
  //   name: { kanji: ['石田', '彰'], hiragana: ['いしだ', 'あきら'] },
  // }],
  ['seiyuu_anime_igoma_yurie', {
    name: { kanji: ['伊駒', 'ゆりえ'], hiragana: ['いごま', 'ゆりえ'] },
  }],
  ['seiyuu_anime_konishi_katsuyuki', {
    name: { kanji: ['小西', '克幸'], hiragana: ['こにし', 'かつゆき'] },
  }],
  ['seiyuu_anime_tanaka_fumiya', {
    name: { kanji: ['田中', '文哉'], hiragana: ['たなか', 'ふみや'] },
  }],
  //#endregion
] as const satisfies DataEntries<SeiyuuIdBase<'anime'>, Seiyuu>;

export type SeiyuuAnimeId = DataId<typeof seiyuusAnimeArray>;

export const SEIYUUS_ANIME: ReadonlyMap<SeiyuuAnimeId, Seiyuu> = new Map<SeiyuuAnimeId, Seiyuu>(seiyuusAnimeArray);
