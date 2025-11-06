export interface Name {
  name: string[];
  hiragana: string[];
}

export type CharacterBirthday = [
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number,
];

export interface Character {
  name: Name;
  anotherNames: Array<Name> | undefined;
  nicknames: Array<Name> | undefined;
  birthday: CharacterBirthday | undefined;
  age: number | undefined;
  releaseOriginalEpisode: number | undefined;
  releaseOriginalComicsVolume: number | undefined;
  releaseAnimeSeason: number | undefined;
  animeVoiceActors: Array<Name> | undefined;
}

export interface GirlfriendCharacter extends Character {
  girlfriendNumber: number;
}
