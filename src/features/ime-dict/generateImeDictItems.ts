import { createTranslator } from 'schummar-translate';

import type { Character, CommonName, Location, PersonName } from '@/types/Data';
import type { ImeDictItem } from '@/types/ImeDict';
import { TITLE, TITLE_HIRAGANA, TITLE_SHORT, TITLE_SHORT_HIRAGANA1, TITLE_SHORT_HIRAGANA2 } from '@/data/meta';
import { ImeDictItemCategory } from '@/types/ImeDict';
import { ReleasedLevel } from '@/types/ReleasedLevel';
import { checkReleasedData, filterReleasedData, joinName, validateShortName } from '@/utils/data';

const { getTranslator } = createTranslator({
  sourceLocale: 'ja',
  sourceDictionary: {
    comment: {
      characterFullName: `「${TITLE}」に登場する{description}`,
      characterShortName: `「${TITLE}」に登場する{description}、{fullName}`,
      characterAnotherFullName: `「${TITLE}」に登場する{description}、{fullName}の別名`,
      characterAnotherShortName: `「${TITLE}」に登場する{description}、{fullName}の別名、{anotherFullName}`,
      characterNickname: `「${TITLE}」に登場する{description}、{fullName}の愛称`,
      animeVoiceActor: `アニメ「${TITLE}」で{fullName}を担当した声優`,
      variantAnimeVoiceActor: `アニメ「${TITLE}」で{fullName}({variantName})を担当した声優`,
    },
  },
} as const);

export interface ImeDictGenerateOptions {
  releasedLevel?: ReleasedLevel;
  title?: boolean;
  rentaro?: boolean;
  girlfriends?: boolean;
  authors?: boolean;
  circletLoveStory?: boolean;
  goriraAlliance?: boolean;
  jurassicHighSchoolBaseballTeam?: boolean;
  peppePentaro?: boolean;
  others?: boolean;
  schools?: boolean;
  towns?: boolean;
}

const DEFAULT_OPTIONS: Required<ImeDictGenerateOptions> = {
  releasedLevel: ReleasedLevel.anime,
  title: true,
  rentaro: true,
  girlfriends: true,
  authors: false,
  circletLoveStory: false,
  goriraAlliance: false,
  jurassicHighSchoolBaseballTeam: false,
  peppePentaro: false,
  others: false,
  schools: false,
  towns: false,
};

export async function generateImeDictItems(options: ImeDictGenerateOptions = DEFAULT_OPTIONS): Promise<ImeDictItem[]> {
  const t = await getTranslator('ja');
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const items: ImeDictItem[] = [];

  function pushCharacterNameItems(
    target: ImeDictItem[],
    character: Character,
    comments: {
      fullName: (props: { name: PersonName; }) => string;
      shortName?: (props: { name: PersonName; }) => string;
      anotherFullName?: (props: { name: PersonName; anotherName: PersonName; }) => string;
      anotherShortName?: (props: { name: PersonName; anotherName: PersonName; }) => string;
      nickname?: (props: { name: PersonName; nickname: PersonName; }) => string;
      animeVoiceActor?: (props: { name: PersonName; animeVoiceActor: PersonName; }) => string;
      variantAnimeVoiceActor?: (props: { name: PersonName; variantName: PersonName; animeVoiceActor: PersonName; }) => string;
    },
  ) {
    const { kanji: name, hiragana, shortNameIndex } = character.name;
    const nameStr = joinName(name);
    const hiraganaStr = joinName(hiragana);
    target.push({
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
      target.push({
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
        target.push({
          word: anotherNameStr,
          reading: anotherNameHiraganaStr,
          category: ImeDictItemCategory.characterAnotherNameFull,
          comment: comments.anotherFullName({ name: character.name, anotherName }),
        });

        if (anotherNameShortNameIndex !== undefined) {
          const { shortName, shortNameHiragana } = validateShortName(anotherNameNames, anotherNameHiraganas, anotherNameShortNameIndex);
          target.push({
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
        target.push({
          word: nicknameStr,
          reading: nicknameHiraganaStr,
          category: ImeDictItemCategory.characterNickname,
          comment: comments.nickname({ name: character.name, nickname }),
        });
      }
    }

    if (character.animeVoiceActors) {
      if (comments.animeVoiceActor === undefined) {
        const errorMsg = 'animeVoiceActorsが存在する場合、comments.animeVoiceActorは必須です';
        console.error(errorMsg, character);
        throw new Error(errorMsg);
      }
      for (const animeVoiceActor of character.animeVoiceActors) {
        const { kanji: animeVoiceActorName, hiragana: animeVoiceActorHiragana } = animeVoiceActor;
        const animeVoiceActorNameStr = joinName(animeVoiceActorName);
        const animeVoiceActorHiraganaStr = joinName(animeVoiceActorHiragana);
        target.push({
          word: animeVoiceActorNameStr,
          reading: animeVoiceActorHiraganaStr,
          category: ImeDictItemCategory.characterAnimeVoiceActor,
          comment: comments.animeVoiceActor({ name: character.name, animeVoiceActor }),
        });
      }
    }

    if (character.variants) {
      for (const variant of character.variants) {
        if (variant.animeVoiceActors) {
          if (comments.variantAnimeVoiceActor === undefined) {
            const errorMsg = 'variants[number].animeVoiceActorsが存在する場合、comments.variantAnimeVoiceActorは必須です';
            console.error(errorMsg, character);
            throw new Error(errorMsg);
          }
          for (const animeVoiceActor of variant.animeVoiceActors) {
            const { kanji: animeVoiceActorName, hiragana: animeVoiceActorHiragana } = animeVoiceActor;
            const animeVoiceActorNameStr = joinName(animeVoiceActorName);
            const animeVoiceActorHiraganaStr = joinName(animeVoiceActorHiragana);
            target.push({
              word: animeVoiceActorNameStr,
              reading: animeVoiceActorHiraganaStr,
              category: ImeDictItemCategory.characterAnimeVoiceActor,
              comment: comments.variantAnimeVoiceActor({ name: character.name, variantName: variant.variantName, animeVoiceActor }),
            });
          }
        }
      }
    }
  }

  function pushLocationNameItems(
    target: ImeDictItem[],
    location: Location,
    comments: {
      name: (props: { name: CommonName; }) => string;
      anotherName?: (props: { name: CommonName; }) => string;
    },
  ) {
    const { kanji: name, hiragana } = location.name;
    target.push({
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
        target.push({
          word: anotherNameName,
          reading: anotherNameHiragana,
          category: 'locationNameAnother',
          comment: comments.anotherName({ name: location.name }),
        });
      }
    }
  }

  // タイトル
  if (opts.title) {
    items.push({ word: TITLE, reading: TITLE_HIRAGANA, category: ImeDictItemCategory.title, comment: undefined });
    items.push({ word: TITLE_SHORT, reading: TITLE_SHORT_HIRAGANA1, category: ImeDictItemCategory.title, comment: `「${TITLE}」の略称` });
    items.push({ word: TITLE_SHORT, reading: TITLE_SHORT_HIRAGANA2, category: ImeDictItemCategory.title, comment: `「${TITLE}」の略称` });
  }

  // 人名: 恋太郎
  if (opts.rentaro) {
    const { RENTARO_CHARACTER } = await import('@/data/characters/rentaro');
    if (checkReleasedData(RENTARO_CHARACTER, opts.releasedLevel)) {
      pushCharacterNameItems(items, RENTARO_CHARACTER, {
        fullName: () => `「${TITLE}」の主人公`,
        shortName: ({ name }) => `「${TITLE}」の主人公、${joinName(name.kanji)}`,
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
        variantAnimeVoiceActor: ({ name, variantName }) => t('comment.variantAnimeVoiceActor', { fullName: joinName(name.kanji), variantName: joinName(variantName.kanji) }),
      });
    }
  }

  // 人名: 彼女
  if (opts.girlfriends) {
    const { RENTARO_CHARACTER } = await import('@/data/characters/rentaro');
    const { GIRLFRIEND_CHARACTERS } = await import('@/data/characters/girlfriends');
    const description = `${joinName(RENTARO_CHARACTER.name.kanji)}の彼女`;
    for (const girlfriendCharacter of filterReleasedData(GIRLFRIEND_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, girlfriendCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        shortName: ({ name }) => t('comment.characterShortName', { description, fullName: joinName(name.kanji) }),
        anotherFullName: ({ name }) => t('comment.characterAnotherFullName', { description, fullName: joinName(name.kanji) }),
        anotherShortName: ({ name, anotherName }) => t('comment.characterAnotherShortName', { description, fullName: joinName(name.kanji), anotherFullName: joinName(anotherName.kanji) }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
        variantAnimeVoiceActor: ({ name, variantName }) => t('comment.variantAnimeVoiceActor', { fullName: joinName(name.kanji), variantName: joinName(variantName.kanji) }),
      });
    }
  }

  // 人名: 作者
  if (opts.authors) {
    const { AUTHOR_CHARACTERS } = await import('@/data/characters/authors');
    const [AUTHOR_CHARACTER_NAKAMURA, AUTHOR_CHARACTER_NOZAWA, ...AUTHOR_CHARACTER_OTHERS] = AUTHOR_CHARACTERS;
    if (checkReleasedData(AUTHOR_CHARACTER_NAKAMURA, opts.releasedLevel)) {
      pushCharacterNameItems(items, AUTHOR_CHARACTER_NAKAMURA, {
        fullName: () => `漫画「${TITLE}」の原作担当`,
        nickname: () => `漫画「${TITLE}」の原作担当、${joinName(AUTHOR_CHARACTER_NAKAMURA.name.kanji)}の愛称`,
      });
    }
    if (checkReleasedData(AUTHOR_CHARACTER_NOZAWA, opts.releasedLevel)) {
      pushCharacterNameItems(items, AUTHOR_CHARACTER_NOZAWA, {
        fullName: () => `漫画「${TITLE}」の作画担当`,
        nickname: () => `漫画「${TITLE}」の作画担当、${joinName(AUTHOR_CHARACTER_NOZAWA.name.kanji)}の愛称`,
      });
    }
    // NOTE: 作者網羅チェック
    AUTHOR_CHARACTER_OTHERS satisfies never[];
  }

  // 人名: 王冠恋物語登場人物
  if (opts.circletLoveStory) {
    const { CIRCLET_LOVE_STORY_CHARACTERS } = await import('@/data/characters/circlet-love-story');
    const description = '小説「王冠恋物語」のキャラクター';
    for (const circletLoveStoryCharacter of filterReleasedData(CIRCLET_LOVE_STORY_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, circletLoveStoryCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: ゴリラ連合所属者
  if (opts.goriraAlliance) {
    const { GORIRA_ALLIANCE_CHARACTERS } = await import('@/data/characters/gorira-alliance');
    const description = '暴走族「ゴリラ連合」に所属するキャラクター';
    for (const goriraAllianceCharacter of filterReleasedData(GORIRA_ALLIANCE_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, goriraAllianceCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: 寿裸漆区高校女子野球部
  if (opts.jurassicHighSchoolBaseballTeam) {
    const { JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS } = await import('@/data/characters/jurassic-high-school-baseball-team');
    const description = 'チーム「寿裸漆区高校女子野球部」のキャラクター';
    for (const jurassicHighSchoolBaseballTeamCharacter of filterReleasedData(JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, jurassicHighSchoolBaseballTeamCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: ペペペのペン太郎
  if (opts.peppePentaro) {
    const { PEPEPE_PENTAROU_CHARACTERS } = await import('@/data/characters/pepepe-pentarou');
    const description = 'アニメ「ペペペのペン太郎」のキャラクター';
    for (const peppePentaroCharacter of filterReleasedData(PEPEPE_PENTAROU_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, peppePentaroCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
      });
    }
  }

  // 人名: その他
  if (opts.others) {
    const { OTHER_CHARACTERS } = await import('@/data/characters/others');
    const description = 'キャラクター';
    for (const otherCharacter of filterReleasedData(OTHER_CHARACTERS, opts.releasedLevel)) {
      pushCharacterNameItems(items, otherCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        shortName: ({ name }) => t('comment.characterShortName', { description, fullName: joinName(name.kanji) }),
        anotherFullName: ({ name }) => t('comment.characterAnotherFullName', { description, fullName: joinName(name.kanji) }),
        anotherShortName: ({ name, anotherName }) => t('comment.characterAnotherShortName', { description, fullName: joinName(name.kanji), anotherFullName: joinName(anotherName.kanji) }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
        variantAnimeVoiceActor: ({ name, variantName }) => t('comment.variantAnimeVoiceActor', { fullName: joinName(name.kanji), variantName: joinName(variantName.kanji) }),
      });
    }
  }

  // 場所名: 学校
  if (opts.schools) {
    const { SCHOOLS } = await import('@/data/locations/schools');
    for (const school of filterReleasedData(SCHOOLS, opts.releasedLevel)) {
      pushLocationNameItems(items, school, {
        name: () => `「${TITLE}」に登場する学校`,
        anotherName: ({ name }) => `「${TITLE}」に登場する学校、${name.kanji}`,
      });
    }
  }

  // 場所名: 町
  if (opts.towns) {
    const { TOWNS } = await import('@/data/locations/towns');
    for (const town of filterReleasedData(TOWNS, opts.releasedLevel)) {
      pushLocationNameItems(items, town, {
        name: () => `「${TITLE}」に登場する地名`,
        anotherName: ({ name }) => `「${TITLE}」に登場する地名、${name.kanji}`,
      });
    }
  }

  return items;
}
