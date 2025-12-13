import { createTranslator } from 'schummar-translate';

import type { Character, PersonName } from '@/types/Data';
import type { ImeDictItem } from '@/types/ImeDict';
import { AUTHOR_CHARACTERS, CIRCLET_LOVE_STORY_CHARACTERS, GIRLFRIEND_CHARACTERS, GORIRA_ALLIANCE_CHARACTERS, JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS, OTHER_CHARACTERS, PEPEPE_PENTAROU_CHARACTERS, RENTARO_CHARACTER } from '@/data/characters';
import { TITLE, TITLE_HIRAGANA, TITLE_SHORT, TITLE_SHORT_HIRAGANA1, TITLE_SHORT_HIRAGANA2 } from '@/data/meta';
import { joinName, validateShortName } from '@/utils/data';

const RENTARO_NAME = RENTARO_CHARACTER.name.kanji.join('');

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
      schoolFullName: `「${TITLE}」に登場する学校`,
      schoolShortName: `「${TITLE}」に登場する学校、{fullName}`,
      townFullName: `「${TITLE}」に登場する地名`,
      townShortName: `「${TITLE}」に登場する地名、{fullName}`,
    },
  },
} as const);

export async function generateImeDictItems() {
  const t = await getTranslator('ja');

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
      category: 'CHARACTER_NAME_FULL',
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
        category: 'CHARACTER_NAME_SHORT',
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
          category: 'CHARACTER_ANOTHERNAME_FULL',
          comment: comments.anotherFullName({ name: character.name, anotherName }),
        });

        if (anotherNameShortNameIndex !== undefined) {
          const { shortName, shortNameHiragana } = validateShortName(anotherNameNames, anotherNameHiraganas, anotherNameShortNameIndex);
          target.push({
            word: shortName,
            reading: shortNameHiragana,
            category: 'CHARACTER_ANOTHERNAME_SHORT',
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
          category: 'CHARACTER_NICKNAME',
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
          category: 'CHARACTER_ANIME_VOICE_ACTOR',
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
              category: 'CHARACTER_ANIME_VOICE_ACTOR',
              comment: comments.variantAnimeVoiceActor({ name: character.name, variantName: variant.variantName, animeVoiceActor }),
            });
          }
        }
      }
    }
  }

  // タイトル
  items.push({ word: TITLE, reading: TITLE_HIRAGANA, category: 'TITLE', comment: undefined });
  items.push({ word: TITLE_SHORT, reading: TITLE_SHORT_HIRAGANA1, category: 'TITLE', comment: `「${TITLE}」の略称` });
  items.push({ word: TITLE_SHORT, reading: TITLE_SHORT_HIRAGANA2, category: 'TITLE', comment: `「${TITLE}」の略称` });

  // 人名: 恋太郎
  pushCharacterNameItems(items, RENTARO_CHARACTER, {
    fullName: () => `「${TITLE}」の主人公`,
    shortName: () => `「${TITLE}」の主人公、${RENTARO_NAME}`,
    animeVoiceActor: () => t('comment.animeVoiceActor', { fullName: RENTARO_NAME }),
    variantAnimeVoiceActor: ({ variantName }) => t('comment.variantAnimeVoiceActor', { fullName: RENTARO_NAME, variantName: joinName(variantName.kanji) }),
  });

  // 人名: 彼女
  {
    const description = `${RENTARO_NAME}の彼女`;
    for (const girlfriendCharacter of GIRLFRIEND_CHARACTERS) {
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
  {
    const [AUTHOR_CHARACTER_NAKAMURA, AUTHOR_CHARACTER_NOZAWA, ...AUTHOR_CHARACTER_OTHERS] = AUTHOR_CHARACTERS;
    pushCharacterNameItems(items, AUTHOR_CHARACTER_NAKAMURA, {
      fullName: () => `漫画「${TITLE}」の原作担当`,
      nickname: () => `漫画「${TITLE}」の原作担当、${joinName(AUTHOR_CHARACTER_NAKAMURA.name.kanji)}の愛称`,
    });
    pushCharacterNameItems(items, AUTHOR_CHARACTER_NOZAWA, {
      fullName: () => `漫画「${TITLE}」の作画担当`,
      nickname: () => `漫画「${TITLE}」の作画担当、${joinName(AUTHOR_CHARACTER_NOZAWA.name.kanji)}の愛称`,
    });
    // NOTE: 作者網羅チェック
    AUTHOR_CHARACTER_OTHERS satisfies never[];
  }

  // 人名: 王冠恋物語登場人物
  {
    const description = '小説「王冠恋物語」のキャラクター';
    for (const circletLoveStoryCharacter of CIRCLET_LOVE_STORY_CHARACTERS) {
      pushCharacterNameItems(items, circletLoveStoryCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: ゴリラ連合所属者
  {
    const description = '暴走族「ゴリラ連合」に所属するキャラクター';
    for (const goriraAllianceCharacter of GORIRA_ALLIANCE_CHARACTERS) {
      pushCharacterNameItems(items, goriraAllianceCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: 寿裸漆区高校女子野球部
  {
    const description = 'チーム「寿裸漆区高校女子野球部」のキャラクター';
    for (const jurassicHighSchoolBaseballTeamCharacter of JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS) {
      pushCharacterNameItems(items, jurassicHighSchoolBaseballTeamCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        nickname: ({ name }) => t('comment.characterNickname', { description, fullName: joinName(name.kanji) }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  // 人名: ペペペのペン太郎
  {
    const description = 'アニメ「ペペペのペン太郎」のキャラクター';
    for (const peppePentaroCharacter of PEPEPE_PENTAROU_CHARACTERS) {
      pushCharacterNameItems(items, peppePentaroCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
      });
    }
  }

  // 人名: その他
  {
    const description = 'キャラクター';
    for (const otherCharacter of OTHER_CHARACTERS) {
      pushCharacterNameItems(items, otherCharacter, {
        fullName: () => t('comment.characterFullName', { description }),
        animeVoiceActor: ({ name }) => t('comment.animeVoiceActor', { fullName: joinName(name.kanji) }),
      });
    }
  }

  return items;
}
