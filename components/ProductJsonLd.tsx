import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

// JSON-LD 不会显示在页面上，但会把产品类型、支持平台和官方下载入口明确交给搜索引擎。
// 使用官方的 Releases 链接，避免为 Apple Silicon 与 Intel 两种架构之一做错误的静态指定。
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cortex-desktop.app";

/** 为当前语言页输出可被 Google 等搜索引擎读取的软件产品结构化数据。 */
export default function ProductJsonLd({ d, locale }: { d: Dict; locale: Locale }) {
  // URL 构造不能以 /zh 这种绝对路径交给 new URL，否则会丢掉 Pages 的仓库子路径。
  const localeUrl = `${SITE_URL.replace(/\/$/, "")}/${locale}/`;
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: d.brand.name,
    description: d.meta.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI assistant",
    operatingSystem: "macOS",
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    url: localeUrl,
    downloadUrl: d.links.latest,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: d.links.latest,
    },
    potentialAction: {
      "@type": "DownloadAction",
      target: d.links.latest,
    },
  };

  // 防止将来文案中出现 "<" 时意外闭合 script 标签；这不会改变 JSON-LD 的语义。
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
