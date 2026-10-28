export const ImeDictItemCategory = {
  title: 'title',
  songTitle: 'songTitle',
  term: 'term',
  characterNameFull: 'characterNameFull',
  characterNameShort: 'characterNameShort',
  characterAnotherNameFull: 'characterAnotherNameFull',
  characterAnotherNameShort: 'characterAnotherNameShort',
  characterNickname: 'characterNickname',
  seiyuuAnimeName: 'seiyuuAnimeName',
  seiyuuVoiceDramaName: 'seiyuuVoiceDramaName',
  locationName: 'locationName',
  locationNameAnother: 'locationNameAnother',
} as const;

export type ImeDictItemCategory = keyof typeof ImeDictItemCategory;

export interface ImeDictItem {
  reading: string;
  word: string;
  category: ImeDictItemCategory;
  comment: string | undefined;
}
