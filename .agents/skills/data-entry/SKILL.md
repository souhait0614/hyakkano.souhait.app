---
name: data-entry
description: "data/ ディレクトリにデータを追加する。使用場面: 新しいキャラクター、彼女、声優、場所、作品、楽曲などのエンティティを追加するとき。"
argument-hint: "エンティティの種類と名前 (例: 'girlfriend 百瀬百々', 'seiyuu 花澤香菜', 'song 大大大大大好きな君へ♡')"
---

# データエントリ追加

プロジェクトの型安全パターンに従い、`data/` ディレクトリに新しいエントリを追加する。

## 使用場面

- 新しい彼女キャラクターの追加
- 新しい声優の追加
- 新しい場所（学校、町）の追加
- 新しいキャラクター（作者、その他、ゴリラ同盟 等）の追加
- 新しい作品タイトル（本編、スピンオフ 等）の追加
- 新しい楽曲（アニメ主題歌、イメージソング 等）の追加
- 新しい用語（運命の人、組織名 等）の追加

## データカテゴリ

| カテゴリ | ファイル | IDパターン | 型 |
|----------|----------|------------|----|
| 彼女 | `data/characters/girlfriends.ts` | `character_girlfriend_{姓}_{名}` | `GirlfriendCharacter` |
| 恋太郎 | `data/characters/rentaro.ts` | `character_rentaro_{姓}_{名}` | `Character` |
| 作者 | `data/characters/authors.ts` | `character_author_{姓}_{名}` | `Character` |
| その他 | `data/characters/others.ts` | `character_other_{名前}` | `Character` |
| ゴリラ同盟 | `data/characters/gorira-alliance.ts` | `character_gorira_{名前}` | `Character` |
| 声優 (アニメ) | `data/seiyuus/anime.ts` | `seiyuu_anime_{姓}_{名}` | `Seiyuu` |
| 声優 (ボイスドラマ) | `data/seiyuus/voice-drama.ts` | `seiyuu_voice_drama_{姓}_{名}` | `Seiyuu` |
| 学校 | `data/locations/schools.ts` | `location_school_{名前}` | `Location` |
| 町 | `data/locations/towns.ts` | `location_town_{名前}` | `Location` |
| 作品 (本編) | `data/works/main.ts` | `work_main_{slug}` | `Work` |
| 作品 (スピンオフ) | `data/works/spinoff.ts` | `work_spinoff_{slug}` | `Work` |
| 楽曲 (アニメ) | `data/songs/anime.ts` | `song_anime_{slug}` | `Song` |
| 楽曲 (イメージソング) | `data/songs/image-songs.ts` | `song_image_{slug}` | `Song` |
| 用語 | `data/terms/others.ts` | `term_other_{slug}` | `Term` |

## 手順

### 1. エンティティの種類を確認

引数から不明な場合はユーザーに確認:
- カテゴリは？（彼女、声優、場所 等）
- キャラクター名（漢字 + ひらがな）は？
- 誕生日、年齢、彼女番号（該当する場合）は？
- 登場情報（話数、巻数、アニメシーズン/話数）は？

### 2. キャラクターが参照する声優がいる場合、先に声優を追加

アニメ版は `data/seiyuus/anime.ts`、ボイスドラマ版は `data/seiyuus/voice-drama.ts` の適切な `#region` セクションに追加:

```typescript
['seiyuu_anime_{family}_{given}', {
  name: { kanji: ['姓', '名'], hiragana: ['せい', 'めい'] },
}],
```

### 3. データエントリを追加

該当ファイルのエントリ配列の**末尾**に新しいエントリを追加する。

#### キャラクター（彼女）テンプレート:

```typescript
['character_girlfriend_{family}_{given}', {
  name: { kanji: ['姓', '名'], hiragana: ['せい', 'めい'], shortNameIndex: 1 },
  anotherNames: undefined,
  nicknames: undefined,
  birthday: [month, day],
  age: number,
  releaseOriginalMainChapter: number,
  releaseOriginalMainComicsVolume: number,
  releaseOriginalSpinoffChapter: number | undefined,
  releaseAnimeSeason: number | undefined,
  releaseAnimeEpisode: number | undefined,
  seiyuuAnimeIds: ['seiyuu_anime_...'],
  seiyuuVoiceDramaIds: ['seiyuu_voice_drama_...'], // 該当する場合のみ
  girlfriendNumber: number,
}],
```

#### キャラクター（一般）テンプレート:

```typescript
['character_{category}_{name}', {
  name: { kanji: ['姓', '名'], hiragana: ['せい', 'めい'], shortNameIndex: 1 | undefined },
  anotherNames: undefined,
  nicknames: undefined,
  birthday: [month, day] | undefined,
  age: number | undefined,
  releaseOriginalMainChapter: number,
  releaseOriginalMainComicsVolume: number,
  releaseOriginalSpinoffChapter: number | undefined,
  releaseAnimeSeason: number | undefined,
  releaseAnimeEpisode: number | undefined,
  seiyuuAnimeIds: ['seiyuu_anime_...'] | undefined,
  seiyuuVoiceDramaIds: ['seiyuu_voice_drama_...'] | undefined, // 該当する場合のみ
}],
```

#### 場所テンプレート:

```typescript
['location_{category}_{name}', {
  name: { kanji: '名前', hiragana: 'なまえ' },
  anotherNames: [{ kanji: '別名', hiragana: 'べつめい' }] | undefined,
  releaseOriginalMainChapter: number,
  releaseOriginalMainComicsVolume: number,
  releaseOriginalSpinoffChapter: number | undefined,
  releaseAnimeSeason: number | undefined,
  releaseAnimeEpisode: number | undefined,
}],
```

#### 作品テンプレート:

```typescript
['work_{main|spinoff}_{slug}', {
  name: { kanji: '作品名', hiragana: 'さくひんめい' },
  shortNames: [{ kanji: '通称', hiragana: 'つうしょう' }] | undefined,
  basedOnWorkId: 'work_main_{slug}' | undefined,
}],
```

#### 楽曲テンプレート:

```typescript
['song_{anime|image}_{slug}', {
  name: { kanji: '曲名', hiragana: 'きょくめい' },
  type: 'animeOpening' | 'animeEnding' | 'animeInsertSong' | 'imageSong',
  releaseAnimeSeason: number | undefined,
  releaseAnimeEpisode: number | undefined,
  albumName: { kanji: 'アルバム名', hiragana: 'あるばむめい' } | undefined,
  artistName: string | undefined,
  artistCharacterIds: ['character_{...}'] | undefined,
  credits: {
    lyrics?: string,
    lyricsCooperation?: string,
    composition?: string,
    arrangement?: string,
  } | undefined,
}],
```

クレジットは曲によって有無が異なるため、存在する項目のみ記載する。

`artistName` は「恋太郎ファミリー」などのグループ名や、キャラクターデータを持たないアーティスト名（例: 岬なこ）に使用する。個別キャラクターが歌唱する場合は `undefined` にして `artistCharacterIds` のみを設定する。

#### 用語テンプレート:

```typescript
['term_other_{slug}', {
  name: { kanji: '用語', hiragana: 'ようご' },
  description: `「${TITLE}」に続く説明文`,
  releaseOriginalMainChapter: number | undefined,
  releaseOriginalMainComicsVolume: number | undefined,
  releaseOriginalSpinoffChapter: number | undefined,
  releaseAnimeSeason: number | undefined,
  releaseAnimeEpisode: number | undefined,
}],
```

`description` には `「${TITLE}」` から始まる説明文を設定する（`TITLE` は `@data/meta` からimportする）。発売情報が未設定の用語は、設定されるまで常に辞書に含める。

### 4. 検証

`pnpm lint:typescript` を実行して型チェックが通ることを確認する。

## 重要ルール

- **ID**: ローマ字のsnake_caseを使用。姓→名の順。
- **名前配列**: 各要素 = 1単語/パーツ。`kanji: ['花園', '羽香里']` であり `kanji: ['花園羽香里']` ではない。
- **shortNameIndex**: 短縮表示名として使う名前配列のインデックス（通常 `1` で名前部分、短縮名がない場合は `undefined`）。
- **省略ではなくundefined**: オプショナルなフィールドは省略せず明示的に `undefined` を設定する。
- **順序**: 配列の末尾に追加。彼女の場合は girlfriendNumber 順を維持。
- **声優参照**: `seiyuuAnimeIds` は `data/seiyuus/anime.ts`、`seiyuuVoiceDramaIds` は `data/seiyuus/voice-drama.ts` に存在するIDを参照すること。ボイスドラマ声優は該当するキャラクターのみ設定する（省略可）。
- **型安全性**: ファイル末尾の `as const satisfies DataEntries<...>` により、TypeScriptが構造エラーを検出する。
