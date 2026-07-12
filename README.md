# hyakkano.souhait.app

100カノ関連のツール置き場

## 環境変数

`.env.example` を参考に `.env` ファイルを作成してください。

| 変数名                     | 説明                                           |
| -------------------------- | ---------------------------------------------- |
| `VITE_SITE_URL`            | サイトのベースURL                              |
| `VITE_GOOGLE_CALENDAR_IDS` | Google Calendar の公開カレンダーID（JSON形式） |

## GitHub Secrets

Google Calendar 同期ワークフローで使用するSecrets:

| Secret名                     | 説明                                    |
| ---------------------------- | --------------------------------------- |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Google Cloud サービスアカウントのJSON鍵 |

## GitHub Variables

Google Calendar 同期ワークフローで使用するVariables:

| 変数名                | 説明                                                            |
| --------------------- | --------------------------------------------------------------- |
| `SITE_HOSTNAME`       | サイトのホスト名                                                |
| `GOOGLE_CALENDAR_IDS` | `releasedLevel_type` をキーとしたカレンダーIDのJSONオブジェクト |

### VITE_GOOGLE_CALENDAR_IDS, GOOGLE_CALENDAR_IDS の例

```json
{
  "anime_GIRLFRIEND": "xxxxxxxx@group.calendar.google.com",
  "comics_GIRLFRIEND": "xxxxxxxx@group.calendar.google.com",
  "jumpPlus_GIRLFRIEND": "xxxxxxxx@group.calendar.google.com",
  "youngJump_GIRLFRIEND": "xxxxxxxx@group.calendar.google.com",
  "all_RENTARO": "xxxxxxxx@group.calendar.google.com",
  "all_AUTHOR": "xxxxxxxx@group.calendar.google.com"
}
```
