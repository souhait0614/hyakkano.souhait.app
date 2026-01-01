import * as v from 'valibot';

import { ReleasedLevel } from '@/types/ReleasedLevel';

function stringBooleanSchema() {
  return v.pipe(v.string(), v.transform((val) => val === 'true'));
}

export const imeDictGenerateOptionsSchema = v.object({
  releasedLevel: v.fallback(v.enum(ReleasedLevel), ReleasedLevel.anime),
  title: v.fallback(stringBooleanSchema(), false),
  characterRentaro: v.fallback(stringBooleanSchema(), false),
  characterGirlfriends: v.fallback(stringBooleanSchema(), false),
  characterAuthors: v.fallback(stringBooleanSchema(), false),
  characterCircletLoveStory: v.fallback(stringBooleanSchema(), false),
  characterGoriraAlliance: v.fallback(stringBooleanSchema(), false),
  characterJurassicHighSchoolBaseballTeam: v.fallback(stringBooleanSchema(), false),
  characterPeppePentaro: v.fallback(stringBooleanSchema(), false),
  characterOthers: v.fallback(stringBooleanSchema(), false),
  voiceActors: v.fallback(stringBooleanSchema(), false),
  schools: v.fallback(stringBooleanSchema(), false),
  towns: v.fallback(stringBooleanSchema(), false),
});

export type ImeDictGenerateOptionsInput = v.InferInput<typeof imeDictGenerateOptionsSchema>;
export type ImeDictGenerateOptions = v.InferOutput<typeof imeDictGenerateOptionsSchema>;
