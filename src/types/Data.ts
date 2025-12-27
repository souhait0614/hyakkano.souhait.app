export interface CommonName {
  kanji: string;
  hiragana: string;
}

export interface PersonName {
  kanji: string[];
  hiragana: string[];
}

export interface PersonNameWithShortNameIndex extends PersonName {
  shortNameIndex: number | undefined;
}

export type CharacterBirthday = [
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number,
];

export interface ReleasedInfo {
  releaseOriginalChapter: number | undefined;
  releaseOriginalComicsVolume: number | undefined;
  releaseAnimeSeason: number | undefined;
  releaseAnimeEpisode: number | undefined;
}

export interface VariantCharacter extends ReleasedInfo {
  variantName: PersonName;
  anotherNames: Array<PersonNameWithShortNameIndex> | undefined;
  nicknames: Array<PersonName> | undefined;
  age: number | undefined;
  animeVoiceActors: Array<PersonName> | undefined;
}

export interface Character extends ReleasedInfo {
  name: PersonNameWithShortNameIndex;
  anotherNames: Array<PersonNameWithShortNameIndex> | undefined;
  nicknames: Array<PersonName> | undefined;
  birthday: CharacterBirthday | undefined;
  age: number | undefined;
  animeVoiceActors: Array<PersonName> | undefined;
  variants?: Array<VariantCharacter> | undefined;
}

export interface GirlfriendCharacter extends Character {
  girlfriendNumber: number;
}

export interface Location extends ReleasedInfo {
  name: CommonName;
  anotherNames: CommonName[] | undefined;
}
