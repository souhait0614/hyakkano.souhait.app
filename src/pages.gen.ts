// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as File_BirthdayIndex_getConfig } from './pages/birthday/index';
// prettier-ignore
import type { getConfig as File_ImeDictIndex_getConfig } from './pages/ime-dict/index';
// prettier-ignore
import type { getConfig as File_ImeDictPreview_getConfig } from './pages/ime-dict/preview';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_PrivacyIndex_getConfig } from './pages/privacy/index';
// prettier-ignore
import type { getConfig as File_YomutalkPlusIndex_getConfig } from './pages/yomutalk-plus/index';

// prettier-ignore
type Page =
| ({ path: '/_root' } & GetConfigResponse<typeof File_Root_getConfig>)
| ({ path: '/birthday' } & GetConfigResponse<typeof File_BirthdayIndex_getConfig>)
| ({ path: '/ime-dict' } & GetConfigResponse<typeof File_ImeDictIndex_getConfig>)
| ({ path: '/ime-dict/preview' } & GetConfigResponse<typeof File_ImeDictPreview_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/privacy' } & GetConfigResponse<typeof File_PrivacyIndex_getConfig>)
| ({ path: '/yomutalk-plus' } & GetConfigResponse<typeof File_YomutalkPlusIndex_getConfig>);

// prettier-ignore
type Layout =
| { path: '/' }
| { path: '/birthday' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
