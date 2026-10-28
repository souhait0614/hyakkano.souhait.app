import type { SeiyuuAnimeId } from '@data/seiyuus/anime';
import { TITLE } from '@data/meta';
import { createTranslator } from 'schummar-translate';

import type { Character, CommonName, Location, PersonName, Seiyuu, Song, Work, WorkId } from '@/types/Data';
import type { ImeDictItem } from '@/types/ImeDict';
import { SongType } from '@/types/Data';
import { ImeDictItemCategory } from '@/types/ImeDict';
import { checkReleasedData, filterReleasedData, joinName, validateShortName } from '@/utils/data';

import type { ImeDictGenerateOptions } from './schemas';
import { IME_DICT_DEFAULT_GENERATE_OPTIONS } from './constants';

const { getTranslator } = createTranslator({
  sourceLocale: 'ja',
  sourceDictionary: {
    format: {
      variantKanji: '{fullName}({variantFullName})',
    },
    comment: {
      characterFullName: `「${TITLE}」に登場する{description}`,
      characterShortName: `「${TITLE}」に登場する{description}、{fullName}`,
      characterAnotherFullName: `「${TITLE}」に登場する{description}、{fullName}の別名`,
      characterAnotherShortName: `「${TITLE}」に登場する{description}、{fullName}の別名、{anotherFullName}`,
      characterNickname: `「${TITLE}」に登場する{description}、{fullName}の愛称`,
      seiyuuAnime: `アニメ「${TITLE}」で{nameStr}を担当した声優`,
    },
  },
} as const);

function createSongComment(song: Song): string {
  if (song.releaseAnimeSeason === undefined) {
    const errorMsg = `楽曲のアニメシーズンが未設定です: ${song.name.kanji}`;
    console.error(errorMsg, song);
    throw new Error(errorMsg);
  }
  switch (song.type) {
    case SongType.animeOpening: {
      return `TVアニメ「${TITLE}」第${song.releaseAnimeSeason}期オープニングテーマ`;
    }
    case SongType.animeEnding: {
      if (song.releaseAnimeEpisode === undefined) {
        return `TVアニメ「${TITLE}」第${song.releaseAnimeSeason}期エンディングテーマ`;
      }
      return `TVアニメ「${TITLE}」第${song.releaseAnimeSeason}期第${song.releaseAnimeEpisode}話エンディングテーマ`;
    }
    case SongType.animeInsertSong: {
      if (song.releaseAnimeEpisode === undefined) {
        const errorMsg = `挿入歌の話数が未設定です: ${song.name.kanji}`;
        console.error(errorMsg, song);
        throw new Error(errorMsg);
      }
      return `TVアニメ「${TITLE}」第${song.releaseAnimeSeason}期第${song.releaseAnimeEpisode}話挿入歌`;
    }
    case SongType.imageSong: {
      if (song.albumName === undefined) {
        const errorMsg = `イメージソングのアルバム名が未設定です: ${song.name.kanji}`;
        console.error(errorMsg, song);
        throw new Error(errorMsg);
      }
      return `TVアニメ「${TITLE}」第${song.releaseAnimeSeason}期イメージソングアルバム「${song.albumName.kanji}」収録曲`;
    }
    default: {
      song.type satisfies never;
      throw new Error(`Unknown song type: ${song.type}`);
    }
  }
}

export async function generateImeDictItems(options?: ImeDictGenerateOptions): Promise<ImeDictItem[]> {
  const t = await getTranslator('ja');
  const opts = { ...IME_DICT_DEFAULT_GENERATE_OPTIONS, ...options };

  const items: ImeDictItem[] = [];
  const targetCharacters: Partial<Record<string, Character>> = {};
  const targetSeiyuusAnime: Partial<Record<SeiyuuAnimeId, { characterIds: ({ id: string; variantId: string | null; })[]; }>> = {};

  function pushCharacterItems(
    characterId: string,
    character: Character,
    comments: {
      fullName: (props: { name: PersonName; }) => string;
      shortName?: (props: { name: PersonName; }) => string;
      anotherFullName?: (props: { name: PersonName; anotherName: PersonName; }) => string;
      anotherShortName?: (props: { name: PersonName; anotherName: PersonName; }) => string;
      nickname?: (props: { name: PersonName; nickname: PersonName; }) => string;
    },
  ) {
    targetCharacters[characterId] = character;
    const { kanji: name, hiragana, shortNameIndex } = character.name;
    const nameStr = joinName(name);
    const hiraganaStr = joinName(hiragana);
    items.push({
      word: nameStr,
      reading: hiraganaStr,
      category: ImeDictItemCategory.characterNameFull,
      comment: comments.fullName({ name: character.name }),
    });

    if (shortNameIndex !== undefined) {
      if (comments.shortName === undefined) {
        const errorMsg = 'shortNameが存在する場合、comments.shortNameは必須です';
        console.error(errorMsg, character);
        throw new Error(errorMsg);
      }
      const { shortName, shortNameHiragana } = validateShortName(name, hiragana, shortNameIndex);
      items.push({
        word: shortName,
        reading: shortNameHiragana,
        category: ImeDictItemCategory.characterNameShort,
        comment: comments.shortName({ name: character.name }),
      });
    }

    if (character.anotherNames) {
      if (comments.anotherFullName === undefined || comments.anotherShortName === undefined) {
        const errorMsg = 'anotherNamesが存在する場合、comments.anotherFullNameとcomments.anotherShortNameは必須です';
        console.error(errorMsg, character);
        throw new Error(errorMsg);
      }
      for (const anotherName of character.anotherNames) {
        const { kanji: anotherNameNames, hiragana: anotherNameHiraganas, shortNameIndex: anotherNameShortNameIndex } = anotherName;
        const anotherNameStr = joinName(anotherNameNames);
        const anotherNameHiraganaStr = joinName(anotherNameHiraganas);
        items.push({
          word: anotherNameStr,
          reading: anotherNameHiraganaStr,
          category: ImeDictItemCategory.characterAnotherNameFull,
          comment: comments.anotherFullName({ name: character.name, anotherName }),
        });

        if (anotherNameShortNameIndex !== undefined) {
          const { shortName, shortNameHiragana } = validateShortName(anotherNameNames, anotherNameHiraganas, anotherNameShortNameIndex);
          items.push({
            word: shortName,
            reading: shortNameHiragana,
            category: ImeDictItemCategory.characterAnotherNameShort,
            comment: comments.anotherShortName({ name: character.name, anotherName }),
          });
        }
      }
    }

    if (character.nicknames) {
      if (comments.nickname === undefined) {
        const errorMsg = 'nicknamesが存在する場合、comments.nicknameは必須です';
        console.error(errorMsg, character);
        throw new Error(errorMsg);
      }
      for (const nickname of character.nicknames) {
        const { kanji: nicknameName, hiragana: nicknameHiragana } = nickname;
        const nicknameStr = joinName(nicknameName);
        const nicknameHiraganaStr = joinName(nicknameHiragana);
        items.push({
          word: nicknameStr,
          reading: nicknameHiraganaStr,
          category: ImeDictItemCategory.characterNickname,
          comment: comments.nickname({ name: character.name, nickname }),
        });
      }
    }

    if (character.seiyuuAnimeIds) {
      for (const seiyuuAnimeId of character.seiyuuAnimeIds) {
        targetSeiyuusAnime[seiyuuAnimeId] ??= { characterIds: [] };
        targetSeiyuusAnime[seiyuuAnimeId].characterIds.push({ id: characterId, variantId: null });
      }
    }

    if (character.variants) {
      for (const [variantCharacterId, variantCharacter] of filterReleasedData(character.variants, opts.releasedLevel)) {
        if (variantCharacter.seiyuuAnimeIds) {
          for (const seiyuuAnimeId of variantCharacter.seiyuuAnimeIds) {
            targetSeiyuusAnime[seiyuuAnimeId] ??= { characterIds: [] };
            targetSeiyuusAnime[seiyuuAnimeId].characterIds.push({ id: characterId, variantId: variantCharacterId });
          }
        }
      }
    }
  }

  function pushSeiyuuItems(
    seiyuu: Seiyuu,
    characterIds: { id: string; variantId: string | null; }[],
    comments: {
      name: (props: { nameStr: string; }) => string;
    },
  ) {
    const { kanji: name, hiragana } = seiyuu.name;
    const characterNames = characterIds.map(({ id, variantId }) => {
      const character = targetCharacters[id];
      if (!character) {
        const errorMsg = `対象のキャラクターが見つかりませんでした: ${id}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      if (variantId) {
        const variantMap = new Map(character.variants);
        const variantCharacter = variantMap.get(variantId);
        if (!variantCharacter) {
          const errorMsg = `対象のバリアントキャラクターが見つかりませんでした: ${variantId}`;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        return t('format.variantKanji', { fullName: joinName(character.name.kanji), variantFullName: joinName(variantCharacter.variantName.kanji) });
      }
      return joinName(character.name.kanji);
    });
    items.push({
      word: joinName(name),
      reading: joinName(hiragana),
      category: 'seiyuuAnimeName',
      comment: comments.name({ nameStr: characterNames.join(',') }),
    });
  }

  function pushLocationNameItems(
    location: Location,
    comments: {
      name: (props: { name: CommonName; }) => string;
      anotherName?: (props: { name: CommonName; }) => string;
    },
  ) {
    const { kanji: name, hiragana } = location.name;
    items.push({
      word: name,
      reading: hiragana,
      category: 'locationName',
      comment: comments.name({ name: location.name }),
    });
    if (location.anotherNames) {
      if (comments.anotherName === undefined) {
        const errorMsg = 'anotherNamesが存在する場合、comments.anotherNameは必須です';
        console.error(errorMsg, location);
        throw new Error(errorMsg);
      }
      for (const anotherName of location.anotherNames) {
        const { kanji: anotherNameName, hiragana: anotherNameHiragana } = anotherName;
        items.push({
          word: anotherNameName,
          reading: anotherNameHiragana,
          category: 'locationNameAnother',
          comment: comments.anotherName({ name: location.name }),
        });
      }
    }
  }

  const rentaroCharacterId = 'character_rentaro_aijou_rentaro';

  // 作品名
  if (opts.title) {
    const { MAIN_WORKS } = await import('@data/works/main');
    const { SPINOFF_WORKS } = await import('@data/works/spinoff');
    const works: ReadonlyMap<WorkId, Work> = new Map([...MAIN_WORKS, ...SPINOFF_WORKS]);
    for (const [, work] of works) {
      const basedOnWork = work.basedOnWorkId === undefined ? undefined : works.get(work.basedOnWorkId);
      if (work.basedOnWorkId !== undefined && basedOnWork === undefined) {
        const errorMsg = `スピンオフ元の作品が見つかりませんでした: ${work.basedOnWorkId}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      items.push({
        word: work.name.kanji,
        reading: work.name.hiragana,
        category: ImeDictItemCategory.title,
        comment: basedOnWork === undefined ? undefined : `「${basedOnWork.name.kanji}」のスピンオフ作品`,
      });
      for (const shortName of work.shortNames ?? []) {
        items.push({
          word: shortName.kanji,
          reading: shortName.hiragana,
          category: ImeDictItemCategory.title,
          comment: `「${work.name.kanji}」の通称`,
        });
      }
    }
  }

  // アニメ楽曲
  if (opts.songs) {
    const { ANIME_SONGS } = await import('@data/songs/anime');
    const { IMAGE_SONGS } = await import('@data/songs/image-songs');
    for (const [, song] of [...ANIME_SONGS, ...IMAGE_SONGS]) {
      items.push({
        word: song.name.kanji,
        reading: song.name.hiragana,
        category: ImeDictItemCategory.songTitle,
        comment: createSongComment(song),
      });
    }
  }

  // キャラ名: 恋太郎
  if (opts.characterRentaro) {
    const { RENTARO_CHARACTERS } = await import('@data/characters/rentaro');
    const rentaroCharacter = RENTARO_CHARACTERS.get(rentaroCharacterId);
    if (!rentaroCharacter) {
      const errorMsg = '主人公のキャラクターデータが見つかりませんでした';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (checkReleasedData(rentaroCharacter, opts.releasedLevel)) {
      pushCharacterItems(rentaroCharacterId, rentaroCharacter, {
        fullName: () => `「${TITLE}」の主人公`,
        shortName: ({ name }) => `「${TITLE}」の主人公、${joinName(name.kanji)}`,
      });
    }
  }

  // キャラ名: 彼女
  if (opts.characterGirlfriends) {
    const { RENTARO_CHARACTERS } = await import('@data/characters/rentaro');
    const rentaroCharacter = RENTARO_CHARACTERS.get(rentaroCharacterId);
    if (!rentaroCharacter) {
      const errorMsg = '主人公のキャラクターデータが見つかりませんでした';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    const { GIRLFRIEND_CHARACTERS } = await import('@data/characters/girlfriends');
    const description = `${joinName(rentaroCharacter.name.kanji)}の彼女`;
    for (const [girlfriendCharacterId, girlfriendCharacter] of filterReleasedData(GIRLFRIEND_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(girlfriendCharacterId, girlfriendCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        shortName: ({ name }) => t('comment.characterShortName', { description, fullName: joinName(name.kanji) }),
        anotherFullName: ({ name }) => t('comment.characterAnotherFullName', { description, fullName: joinName(name.kanji) }),
        anotherShortName: ({ name, anotherName }) => t('comment.characterAnotherShortName', { description, fullName: joinName(name.kanji), anotherFullName: joinName(anotherName.kanji) }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
      });
    }
  }

  // キャラ名: 作者
  if (opts.characterAuthors) {
    const { AUTHOR_CHARACTERS } = await import('@data/characters/authors');
    const nakamuraCharacterId = 'character_author_nakamura_rikito';
    const authorCharacterNakamura = AUTHOR_CHARACTERS.get(nakamuraCharacterId);
    if (!authorCharacterNakamura) {
      const errorMsg = '原作者のキャラクターデータが見つかりませんでした';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (checkReleasedData(authorCharacterNakamura, opts.releasedLevel)) {
      pushCharacterItems(nakamuraCharacterId, authorCharacterNakamura, {
        fullName: () => `漫画「${TITLE}」の原作担当`,
        nickname: () => `漫画「${TITLE}」の原作担当、${joinName(authorCharacterNakamura.name.kanji)}の愛称`,
      });
    }
    const nozawaCharacterId = 'character_author_nozawa_yukiko';
    const authorCharacterNozawa = AUTHOR_CHARACTERS.get(nozawaCharacterId);
    if (!authorCharacterNozawa) {
      const errorMsg = '作画担当のキャラクターデータが見つかりませんでした';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (checkReleasedData(authorCharacterNozawa, opts.releasedLevel)) {
      pushCharacterItems(nozawaCharacterId, authorCharacterNozawa, {
        fullName: () => `漫画「${TITLE}」の作画担当`,
        nickname: () => `漫画「${TITLE}」の作画担当、${joinName(authorCharacterNozawa.name.kanji)}の愛称`,
      });
    }
  }

  // キャラ名: 王冠恋物語登場人物
  if (opts.characterCircletLoveStory) {
    const { CIRCLET_LOVE_STORY_CHARACTERS } = await import('@data/characters/circlet-love-story');
    const description = '小説「王冠恋物語」のキャラクター';
    for (const [circletLoveStoryCharacterId, circletLoveStoryCharacter] of filterReleasedData(CIRCLET_LOVE_STORY_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(circletLoveStoryCharacterId, circletLoveStoryCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
      });
    }
  }

  // キャラ名: ゴリラ連合所属者
  if (opts.characterGoriraAlliance) {
    const { GORIRA_ALLIANCE_CHARACTERS } = await import('@data/characters/gorira-alliance');
    const description = '暴走族「ゴリラ連合」に所属するキャラクター';
    for (const [goriraAllianceCharacterId, goriraAllianceCharacter] of filterReleasedData(GORIRA_ALLIANCE_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(goriraAllianceCharacterId, goriraAllianceCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
      });
    }
  }

  // キャラ名: 寿裸漆区高校女子野球部
  if (opts.characterJurassicHighSchoolBaseballTeam) {
    const { JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS } = await import('@data/characters/jurassic-high-school-baseball-team');
    const description = 'チーム「寿裸漆区高校女子野球部」のキャラクター';
    for (const [jurassicHighSchoolBaseballTeamCharacterId, jurassicHighSchoolBaseballTeamCharacter] of filterReleasedData(JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(jurassicHighSchoolBaseballTeamCharacterId, jurassicHighSchoolBaseballTeamCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
      });
    }
  }

  // キャラ名: ペペペのペン太郎
  if (opts.characterPeppePentaro) {
    const { PEPEPE_PENTAROU_CHARACTERS } = await import('@data/characters/pepepe-pentarou');
    const description = 'アニメ「ペペペのペン太郎」のキャラクター';
    for (const [peppePentaroCharacterId, peppePentaroCharacter] of filterReleasedData(PEPEPE_PENTAROU_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(peppePentaroCharacterId, peppePentaroCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
      });
    }
  }

  // キャラ名: その他
  if (opts.characterOthers) {
    const { OTHER_CHARACTERS } = await import('@data/characters/others');
    const description = 'キャラクター';
    for (const [otherCharacterId, otherCharacter] of filterReleasedData(OTHER_CHARACTERS, opts.releasedLevel)) {
      pushCharacterItems(otherCharacterId, otherCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        shortName: ({ name }) => t('comment.characterShortName', { description, fullName: joinName(name.kanji) }),
        anotherFullName: ({ name }) => t('comment.characterAnotherFullName', { description, fullName: joinName(name.kanji) }),
        anotherShortName: ({ name, anotherName }) => t('comment.characterAnotherShortName', { description, fullName: joinName(name.kanji), anotherFullName: joinName(anotherName.kanji) }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
      });
    }
  }

  // 声優名: アニメ
  if (opts.seiyuusAnime) {
    const { SEIYUUS_ANIME } = await import('@data/seiyuus/anime');
    for (const [seiyuuId, seiyuu] of SEIYUUS_ANIME) {
      const characterIds = targetSeiyuusAnime[seiyuuId]?.characterIds ?? [];
      if (characterIds.length === 0) {
        continue;
      }
      pushSeiyuuItems(seiyuu, characterIds, {
        name: ({ nameStr }) => t('comment.seiyuuAnime', { nameStr }),
      });
    }
  }

  // 場所名: 学校
  if (opts.schools) {
    const { SCHOOLS } = await import('@data/locations/schools');
    for (const [,school] of filterReleasedData(SCHOOLS, opts.releasedLevel)) {
      pushLocationNameItems(school, {
        name: () => `「${TITLE}」に登場する学校`,
        anotherName: ({ name }) => `「${TITLE}」に登場する学校、${name.kanji}`,
      });
    }
  }

  // 場所名: 町
  if (opts.towns) {
    const { TOWNS } = await import('@data/locations/towns');
    for (const [,town] of filterReleasedData(TOWNS, opts.releasedLevel)) {
      pushLocationNameItems(town, {
        name: () => `「${TITLE}」に登場する地名`,
        anotherName: ({ name }) => `「${TITLE}」に登場する地名、${name.kanji}`,
      });
    }
  }

  return items;
}
