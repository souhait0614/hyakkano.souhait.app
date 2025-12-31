import type { PageProps } from 'waku/router';

import type { ImeDictGenerateOptions } from '@/features/ime-dict/schemas';
import type { Metadata } from '@/types/Metadata';
import IconDownload from '@/components/icons/IconDownload';
import LinkButton from '@/components/LinkButton';
import LinkText from '@/components/LinkText';
import { AUTHOR_CHARACTERS } from '@/data/characters/authors';
import { CIRCLET_LOVE_STORY_CHARACTERS } from '@/data/characters/circlet-love-story';
import { GIRLFRIEND_CHARACTERS } from '@/data/characters/girlfriends';
import { GORIRA_ALLIANCE_CHARACTERS } from '@/data/characters/gorira-alliance';
import { JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS } from '@/data/characters/jurassic-high-school-baseball-team';
import { OTHER_CHARACTERS } from '@/data/characters/others';
import { PEPEPE_PENTAROU_CHARACTERS } from '@/data/characters/pepepe-pentarou';
import { RENTARO_CHARACTER } from '@/data/characters/rentaro';
import { SCHOOLS } from '@/data/locations/schools';
import { TOWNS } from '@/data/locations/towns';
import DownloadLinks from '@/features/ime-dict/DownloadLinks';
import { GenerateOptionsAllSetButtons, GenerateOptionsCharacterTypeCheckBoxes, GenerateOptionsOtherTypeCheckBoxes, GenerateOptionsReleasedLevelSelector } from '@/features/ime-dict/GenerateOptionsForms';
import { generateOptionsKeyLabels } from '@/features/ime-dict/labels';
import ShowGenerateDictContentLink from '@/features/ime-dict/ShowGenerateDictContentLink';
import PageHead from '@/features/PageHead';
import { ReleasedLevel } from '@/types/ReleasedLevel';
import { getLatestReleasedData } from '@/utils/data';
import { objectToSearchParams } from '@/utils/url';

function MsImeDownloadLinkButton(generateOptions: ImeDictGenerateOptions) {
  const searchParamsStr = objectToSearchParams(generateOptions).toString();
  return (
    <LinkButton
      download
      align='center'
      icon={IconDownload}
      href={`/api/ime-dict/ms-ime.txt?${searchParamsStr}`}
      className='grow'
    >
      Microsoft IME用
    </LinkButton>
  );
}

function GoogleImeDownloadLinkButton(generateOptions: ImeDictGenerateOptions) {
  const searchParamsStr = objectToSearchParams(generateOptions).toString();
  return (
    <LinkButton
      download
      align='center'
      icon={IconDownload}
      href={`/api/ime-dict/google-ime.txt?${searchParamsStr}`}
      className='grow'
    >
      Google IME用
    </LinkButton>
  );
}

function GenerateOptionsLabels({ releasedLevel, ...generateOptions }: ImeDictGenerateOptions) {
  const labels: string[] = Object.entries(generateOptions).flatMap(([key, value]) => {
    if (value === true) {
      return [generateOptionsKeyLabels[key as keyof Omit<ImeDictGenerateOptions, 'releasedLevel'>]];
    } else {
      return [];
    }
  });
  const searchParamsStr = objectToSearchParams({ releasedLevel, ...generateOptions }).toString();

  return <p><small>内容: {labels.join(', ')} <LinkText to={`/ime-dict/preview?${searchParamsStr}`}>(内容を表示)</LinkText></small></p>;
}

export const metadata = {
  title: 'IMEユーザー辞書',
  description: 'キャラクターの名前や一部の用語をユーザー辞書として取り込める形式でダウンロードできます',
} as const satisfies Metadata;

export default function Page(pageProps: PageProps<'/ime-dict'>) {
  const latestReleasedData = getLatestReleasedData([
    RENTARO_CHARACTER,
    ...GIRLFRIEND_CHARACTERS,
    ...AUTHOR_CHARACTERS,
    ...CIRCLET_LOVE_STORY_CHARACTERS,
    ...GORIRA_ALLIANCE_CHARACTERS,
    ...JURASSIC_HIGH_SCHOOL_BASEBALL_TEAM_CHARACTERS,
    ...PEPEPE_PENTAROU_CHARACTERS,
    ...OTHER_CHARACTERS,
    ...SCHOOLS,
    ...TOWNS,
  ]);

  const searchParamsComicsCommons = {
    releasedLevel: ReleasedLevel.comics,
    title: true,
    characterRentaro: true,
    characterGirlfriends: true,
    characterAuthors: true,
    characterCircletLoveStory: false,
    characterGoriraAlliance: false,
    characterJurassicHighSchoolBaseballTeam: false,
    characterPeppePentaro: false,
    characterOthers: false,
    voiceActors: false,
    schools: true,
    towns: true,
  } satisfies Required<ImeDictGenerateOptions>;

  const searchParamsYoungJumpAll = {
    releasedLevel: ReleasedLevel.youngJump,
    title: true,
    characterRentaro: true,
    characterGirlfriends: true,
    characterAuthors: true,
    characterCircletLoveStory: true,
    characterGoriraAlliance: true,
    characterJurassicHighSchoolBaseballTeam: true,
    characterPeppePentaro: true,
    characterOthers: true,
    voiceActors: true,
    schools: true,
    towns: true,
  } satisfies Required<ImeDictGenerateOptions>;

  return (
    <>
      <PageHead metadata={metadata} pageProps={pageProps} />
      <div className='page-container'>
        <h1 className='page-title'>{metadata.title}</h1>
        <p>キャラクターの名前や一部の用語をユーザー辞書としてインポートできる形式でダウンロードできます。</p>
        <p>Microsoft IMEとGoogle IME(Mozc/Google 日本語入力/Gboard)に対応しています。</p>
        <p>ユーザー辞書のインポートが行えない環境(iOSなど)でも辞書の内容を表示することで手動で登録を行うことができます。</p>
        <section className='flex flex-col gap-2 card'>
          <h2>ダウンロード</h2>
          <p>含まれる用語の範囲や種類が異なるいくつかのバリエーションを用意しています。</p>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>コミックス{latestReleasedData.comicsVolume}巻までの主要な用語</h3>
            <GenerateOptionsLabels {...searchParamsComicsCommons} />
            <div className='flex'>
              <MsImeDownloadLinkButton {...searchParamsComicsCommons} />
              <GoogleImeDownloadLinkButton {...searchParamsComicsCommons} />
            </div>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>週刊ヤングジャンプ{latestReleasedData.youngJumpChapter}話までのすべての用語</h3>
            <GenerateOptionsLabels {...searchParamsYoungJumpAll} />
            <div className='flex'>
              <MsImeDownloadLinkButton {...searchParamsYoungJumpAll} />
              <GoogleImeDownloadLinkButton {...searchParamsYoungJumpAll} />
            </div>
          </section>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2>用語の範囲と種類を設定してダウンロード</h2>
          <p>手動で用語の範囲や種類を設定してユーザー辞書を生成・ダウンロードできます。</p>
          <p>設定はブラウザに保存され、次回表示時にも反映されます。</p>
          <section>
            <h3>辞書に含める範囲</h3>
            <GenerateOptionsReleasedLevelSelector
              className='w-full'
              latestAnimeEpisode={latestReleasedData.animeEpisode}
              latestAnimeSeason={latestReleasedData.animeSeason}
              latestComicsVolume={latestReleasedData.comicsVolume}
              latestJumpPlusChapter={latestReleasedData.jumpPlusChapter}
              latestYoungJumpChapter={latestReleasedData.youngJumpChapter}
            />
          </section>
          <section>
            <h3>辞書に含めるキャラクター名</h3>
            <div className='flex flex-wrap gap-2'>
              <GenerateOptionsCharacterTypeCheckBoxes />
            </div>
          </section>
          <section>
            <h3>辞書に含めるその他の用語</h3>
            <div className='flex flex-wrap gap-2'>
              <GenerateOptionsOtherTypeCheckBoxes />
            </div>
          </section>
          <div className='flex flex-row justify-end gap-2'>
            <ShowGenerateDictContentLink />
            <GenerateOptionsAllSetButtons />
          </div>
          <div className={`
            flex
            *:grow
          `}
          >
            <DownloadLinks />
          </div>
        </section>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    render: 'static',
  } as const;
}
