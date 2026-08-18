import type { Locale } from "./i18n";

// 站点绝对地址唯一真源：CI 传入 GitHub Pages 的仓库子路径，本地回退值只用于开发预览。
// 去除末尾斜杠，避免 sitemap、JSON-LD 与 metadata 生成重复斜杠或丢失子路径。
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cortex-desktop.app").replace(/\/$/, "");

/** 返回带结尾斜杠的语言页绝对 URL，供搜索元数据与结构化数据共用。 */
export function localizedSiteUrl(locale: Locale) {
  return `${siteUrl}/${locale}/`;
}
