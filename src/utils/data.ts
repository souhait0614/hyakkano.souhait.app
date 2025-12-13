export function validateShortName(name: string[], hiragana: string[], shortNameIndex: number) {
  if (shortNameIndex < 0) throw new Error(`Short name index ${shortNameIndex} is less than 0 for ${name.join('')}`);
  if (shortNameIndex >= name.length) throw new Error(`Short name index ${shortNameIndex} is out of bounds for ${name.join('')}`);
  if (shortNameIndex >= hiragana.length) throw new Error(`Short name index ${shortNameIndex} is out of bounds for hiragana of ${name.join('')}`);
  const shortName = name[shortNameIndex];
  const shortNameHiragana = hiragana[shortNameIndex];
  if (!shortName) throw new Error(`Short name is empty for ${name.join('')} at index ${shortNameIndex}`);
  if (!shortNameHiragana) throw new Error(`Short name hiragana is empty for ${name.join('')} at index ${shortNameIndex}`);
  return { shortName, shortNameHiragana };
}
export function joinName(name: string[]): string {
  return name.join('');
}
