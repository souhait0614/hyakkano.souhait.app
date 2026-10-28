import { ReleasedLevel } from '@/types/ReleasedLevel';

import type { ImeDictGenerateOptions } from './schemas';


export const IME_DICT_DEFAULT_GENERATE_OPTIONS: ImeDictGenerateOptions = {
  releasedLevel: ReleasedLevel.anime,
  title: true,
  songs: false,
  terms: false,
  characterRentaro: true,
  characterGirlfriends: true,
  characterAuthors: false,
  characterCircletLoveStory: false,
  characterGoriraAlliance: false,
  characterJurassicHighSchoolBaseballTeam: false,
  characterPeppePentaro: false,
  characterOthers: false,
  seiyuusAnime: false,
  seiyuusVoiceDrama: false,
  schools: false,
  towns: false,
};
