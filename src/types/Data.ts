import type { SeiyuuAnimeId } from '@/data/seiyuus/anime';

export type CharacterIdBase<T extends string> = `character_${T}_${string}`;
export type SeiyuuIdBase<T extends string> = `seiyuu_${T}_${string}`;
export type LocationIdBase<T extends string> = `location_${T}_${string}`;

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
  seiyuuAnimeIds: Array<SeiyuuAnimeId> | undefined;
}

export interface Character extends ReleasedInfo {
  name: PersonNameWithShortNameIndex;
  anotherNames: Array<PersonNameWithShortNameIndex> | undefined;
  nicknames: Array<PersonName> | undefined;
  birthday: CharacterBirthday | undefined;
  age: number | undefined;
  seiyuuAnimeIds: Array<SeiyuuAnimeId> | undefined;
  variants?: Array<[id: string, VariantCharacter]> | undefined;
}

export interface GirlfriendCharacter extends Character {
  girlfriendNumber: number;
}

export interface Location extends ReleasedInfo {
  name: CommonName;
  anotherNames: CommonName[] | undefined;
}
export interface Seiyuu {
  name: PersonName;
}

export type DataEntries<T extends string, U> = ReadonlyArray<[id: T, data: U]>;
export type DataId<T extends DataEntries<string, unknown>> = T[number][0];
