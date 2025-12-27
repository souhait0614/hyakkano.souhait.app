import { generateImeDictItems } from '@/features/ime-dict/generateImeDictItems';
import { ImeDictItemCategory } from '@/types/ImeDict';

export async function GET(): Promise<Response> {
  const items = await generateImeDictItems();
  const body: [reading: string, word: string, type: string, comment?: string][] = items.map(({ reading, word, category, comment }) => {
    let type: string;
    switch (category) {
      case ImeDictItemCategory.title:
        type = '固有名詞';
        break;
      case ImeDictItemCategory.characterNameFull:
      case ImeDictItemCategory.characterAnotherNameFull:
      case ImeDictItemCategory.characterNickname:
      case ImeDictItemCategory.characterAnimeVoiceActor:
        type = '人名';
        break;
      case ImeDictItemCategory.characterNameShort:
      case ImeDictItemCategory.characterAnotherNameShort:
        type = '名';
        break;
      case ImeDictItemCategory.locationName:
      case ImeDictItemCategory.locationNameAnother:
        type = '地名';
        break;
      default:
        category satisfies never;
        throw new Error(`Unknown category: ${category}`);
    }
    if (comment) {
      return [reading, word, type, comment] as const;
    } else {
      return [reading, word, type] as const;
    }
  });

  const bodyText = body.map((line) => line.join('\t')).join('\n');

  const buffer = Buffer.from(`${bodyText}\n`, 'utf8');
  return new Response(buffer, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename=google-ime.txt',
    },
  });
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
