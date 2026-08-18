import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { localizedSiteUrl } from "@/lib/site";

/** 为当前语言页输出可被 Google 等搜索引擎读取的软件产品结构化数据。 */
export default function ProductJsonLd({ d, locale }: { d: Dict; locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: d.brand.name,
    description: d.meta.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI assistant",
    operatingSystem: "macOS",
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    url: localizedSiteUrl(locale),
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
