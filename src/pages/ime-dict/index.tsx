import type { ComponentPropsWithRef } from 'react';
import type { PageProps } from 'waku/router';
import clsx from 'clsx';

import type { ImeDictGenerateOptions } from '@/features/ime-dict/schemas';
import type { Metadata } from '@/types/Metadata';
import IconDownload from '@/components/icons/IconDownload';
import IconList from '@/components/icons/IconList';
import LinkButton from '@/components/LinkButton';
import LinkEmail from '@/components/LinkEmail';
import LinkText from '@/components/LinkText';
import { SITE_CREATOR_SITE_URL } from '@/constants/site';
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
import GenerateOptionsTable from '@/features/ime-dict/GenerateOptionsTable';
import PageHead from '@/features/PageHead';
import { ReleasedLevel } from '@/types/ReleasedLevel';
import { getLatestReleasedData } from '@/utils/data';
import { objectToSearchParams } from '@/utils/url';

function DownloadLinkButtonContainer({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(`
        flex flex-row flex-wrap justify-center
        *:w-1/2
        max-sm:*:w-full
      `, className)}
    />
  );
}

function MsImeDownloadLinkButton(generateOptions: ImeDictGenerateOptions) {
  const searchParamsStr = objectToSearchParams(generateOptions).toString();
  return (
    <LinkButton
      download
      align='center'
      icon={IconDownload}
      href={`/api/ime-dict/ms-ime.txt?${searchParamsStr}`}
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
    >
      Google IME用
    </LinkButton>
  );
}

function AppleImeDownloadLinkButton(generateOptions: ImeDictGenerateOptions) {
  const searchParamsStr = objectToSearchParams(generateOptions).toString();
  return (
    <LinkButton
      download
      align='center'
      icon={IconDownload}
      href={`/api/ime-dict/apple-ime.plist?${searchParamsStr}`}
    >
      Apple IME用
    </LinkButton>
  );
}

function PreviewPageLinkButton(generateOptions: ImeDictGenerateOptions) {
  const searchParamsStr = objectToSearchParams(generateOptions).toString();
  return (
    <LinkButton
      align='center'
      icon={IconList}
      to={`/ime-dict/preview?${searchParamsStr}`}
    >
      内容を表示
    </LinkButton>
  );
}

export const metadata = {
  title: 'IMEユーザー辞書',
  description: '大量に存在する入力が大変なキャラクターの名前や一部の用語をユーザー辞書としてインポート',
} as const satisfies Metadata;

interface UpdateLog {
  date: [year: number, month: number, day: number];
  description: string;
}

const updateLogs: UpdateLog[] = [
  { date: [2026, 1, 8], description: '36人目の彼女に対応' },
  { date: [2026, 3, 24], description: 'キャラクター担当声優の読みに存在した誤字を修正\n(たかおかなね→たかおかのん)' },
  { date: [2026, 3, 28], description: '2026/03/28までに発表されたアニメ第3期に登場するキャラクターの担当声優を反映' },
  { date: [2026, 4, 2], description: '恋太郎ファミリーのファミリーの日常 第1話に登場したキャラクターに対応\n(番外編に現状未対応のため、暫定的に本編245.5話として登録しています)' },
];

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

  const generateOptionsComicsCommons = {
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

  const generateOptionsYoungJumpAll = {
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
        <section className='flex flex-col gap-2 card'>
          <h2>このページについて</h2>
          <p>キャラクターの名前や一部の用語をユーザー辞書としてインポートできる形式でダウンロードできます。</p>
          <p>Microsoft IME、Google IME(Mozc/Google 日本語入力/Gboard)、Apple IME(macOS)に対応しています。</p>
          <p>ユーザー辞書のインポートが行えない環境(iOSなど)でも辞書の内容を表示することで手動で登録を行うことができます。</p>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2>更新履歴</h2>
          <ul className='list-inside list-disc'>
            {updateLogs
              .sort((a, b) => {
                const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2]);
                const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2]);
                return dateB.getTime() - dateA.getTime();
              })
              .map((log) => {
                const [year, month, day] = log.date;
                const dateTimeStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const formattedDateStr = `${String(year).padStart(4, '0')}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
                return (
                  <li
                    key={log.date.join('-')}
                    className='grid grid-cols-[auto_1fr] items-baseline gap-2'
                  >
                    <time dateTime={dateTimeStr} className='text-sm font-bold'>
                      {formattedDateStr}
                    </time>
                    <p className='whitespace-pre-wrap'>{log.description}</p>
                  </li>
                );
              })}
          </ul>
          <p className='text-sm'>更新されたファイルを再度インポートすることで更新分のみを取り込むことができます。</p>
          <p className='text-sm'>語句や読みが修正された場合、お手数ですが該当する修正前の登録内容を削除の上、再度インポートしてください。</p>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2>ダウンロード</h2>
          <p>含まれる用語の範囲や種類が異なるいくつかのバリエーションを用意しています。</p>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>コミックス{latestReleasedData.comicsVolume}巻までの主要な用語</h3>
            <GenerateOptionsTable generateOptions={generateOptionsComicsCommons} />
            <DownloadLinkButtonContainer>
              <MsImeDownloadLinkButton {...generateOptionsComicsCommons} />
              <GoogleImeDownloadLinkButton {...generateOptionsComicsCommons} />
              <AppleImeDownloadLinkButton {...generateOptionsComicsCommons} />
              <PreviewPageLinkButton {...generateOptionsComicsCommons} />
            </DownloadLinkButtonContainer>
          </section>
          <section className='flex flex-col gap-2 card-outlined'>
            <h3>週刊ヤングジャンプ{latestReleasedData.youngJumpChapter}話までのすべての用語</h3>
            <GenerateOptionsTable generateOptions={generateOptionsYoungJumpAll} />
            <DownloadLinkButtonContainer>
              <MsImeDownloadLinkButton {...generateOptionsYoungJumpAll} />
              <GoogleImeDownloadLinkButton {...generateOptionsYoungJumpAll} />
              <AppleImeDownloadLinkButton {...generateOptionsYoungJumpAll} />
              <PreviewPageLinkButton {...generateOptionsYoungJumpAll} />
            </DownloadLinkButtonContainer>
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
            <GenerateOptionsAllSetButtons />
          </div>
          <DownloadLinkButtonContainer>
            <DownloadLinks />
          </DownloadLinkButtonContainer>
        </section>
        <section className='flex flex-col gap-2 card'>
          <h2>注意事項</h2>
          <section className='contents'>
            <h3>辞書に含まれる用語について</h3>
            <p>キャラクター名は各種媒体で姿と名前の両方が描写されているもののみを収録しています。</p>
            <p>公式の情報をもとに作成していますが、誤りが含まれる可能性があります。</p>
            <p>辞書内容に関するお問い合わせは、メール（<LinkEmail user='me' domain='souhait.me' />）または<LinkText external href={SITE_CREATOR_SITE_URL}>管理人の各種SNSアカウント</LinkText>までお願いします。</p>
          </section>
          <section className='contents'>
            <h3>辞書ファイルの利用について</h3>
            <p>辞書ファイルのインポート方法については各IMEの公式ドキュメントなどを参照してください。</p>
            <p>辞書ファイルを利用したことによって生じた問題については責任を負いかねますのでご了承ください。</p>
          </section>
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
