import type { SeiyuuAnimeId } from '@data/seiyuus/anime';

export type CharacterIdBase<T extends string> = `character_${T}_${string}`;
export type CharacterId = CharacterIdBase<string>;
export type SeiyuuIdBase<T extends string> = `seiyuu_${T}_${string}`;
export type LocationIdBase<T extends string> = `location_${T}_${string}`;
export type WorkIdBase<T extends string> = `work_${T}_${string}`;
export type WorkId = WorkIdBase<string>;
export type SongIdBase<T extends string> = `song_${T}_${string}`;

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
  releaseOriginalMainChapter: number | undefined;
  releaseOriginalMainComicsVolume: number | undefined;
  releaseOriginalSpinoffChapter: number | undefined;
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

export interface Work {
  name: CommonName;
  shortNames: CommonName[] | undefined;
  basedOnWorkId: WorkId | undefined;
}

export const SongType = {
  animeOpening: 'animeOpening',
  animeEnding: 'animeEnding',
  animeInsertSong: 'animeInsertSong',
  imageSong: 'imageSong',
} as const;

export type SongType = keyof typeof SongType;

export interface SongCredits {
  lyrics?: string;
  lyricsCooperation?: string;
  composition?: string;
  arrangement?: string;
}

export interface Song {
  name: CommonName;
  type: SongType;
  releaseAnimeSeason: number | undefined;
  releaseAnimeEpisode: number | undefined;
  albumName: CommonName | undefined;
  artistName: string | undefined;
  artistCharacterIds: Array<CharacterId> | undefined;
  credits: SongCredits | undefined;
}

export type DataEntries<T extends string, U> = ReadonlyArray<[id: T, data: U]>;
export type DataId<T extends DataEntries<string, unknown>> = T[number][0];
