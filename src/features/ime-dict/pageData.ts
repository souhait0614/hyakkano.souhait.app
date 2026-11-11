import { AUTHOR_CHARACTERS } from '@data/characters/authors';
import { CIRCLET_LOVE_STORY_CHARACTERS } from '@data/characters/circlet-love-story';
import { GIRLFRIEND_CHARACTERS } from '@data/characters/girlfriends';
import { GORIRA_ALLIANCE_CHARACTERS } from '@data/characters/gorira-alliance';
import { JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS } from '@data/characters/jurassic-high-school-baseball-team';
import { OTHER_CHARACTERS } from '@data/characters/others';
import { PEPEPE_PENTAROU_CHARACTERS } from '@data/characters/pepepe-pentarou';
import { RENTARO_CHARACTERS } from '@data/characters/rentaro';
import { SCHOOLS } from '@data/locations/schools';
import { TOWNS } from '@data/locations/towns';

import { ReleasedLevel } from '@/types/ReleasedLevel';
import { getLatestReleasedData } from '@/utils/data';

import type { ImeDictGenerateOptions } from './schemas';

export function getLatestImeDictReleasedData() {
  return getLatestReleasedData([
    ...RENTARO_CHARACTERS.values(),
    ...GIRLFRIEND_CHARACTERS.values(),
    ...AUTHOR_CHARACTERS.values(),
    ...CIRCLET_LOVE_STORY_CHARACTERS.values(),
    ...GORIRA_ALLIANCE_CHARACTERS.values(),
    ...JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS.values(),
    ...PEPEPE_PENTAROU_CHARACTERS.values(),
    ...OTHER_CHARACTERS.values(),
    ...SCHOOLS.values(),
    ...TOWNS.values(),
  ]);
}

export const GENERATE_OPTIONS_COMICS_COMMONS = {
  releasedLevel: ReleasedLevel.comics,
  title: true,
  songs: false,
  terms: false,
  characterRentaro: true,
  characterGirlfriends: true,
  characterAuthors: true,
  characterCircletLoveStory: false,
  characterGoriraAlliance: false,
  characterJurassicHighSchoolBaseballTeam: false,
  characterPeppePentaro: false,
  characterOthers: false,
  seiyuusAnime: false,
  seiyuusVoiceDrama: false,
  schools: true,
  towns: true,
} as const satisfies Required<ImeDictGenerateOptions>;

export const GENERATE_OPTIONS_YOUNG_JUMP_ALL = {
  releasedLevel: ReleasedLevel.youngJump,
  title: true,
  songs: true,
  terms: true,
  characterRentaro: true,
  characterGirlfriends: true,
  characterAuthors: true,
  characterCircletLoveStory: true,
  characterGoriraAlliance: true,
  characterJurassicHighSchoolBaseballTeam: true,
  characterPeppePentaro: true,
  characterOthers: true,
  seiyuusAnime: true,
  seiyuusVoiceDrama: true,
  schools: true,
  towns: true,
} as const satisfies Required<ImeDictGenerateOptions>;
