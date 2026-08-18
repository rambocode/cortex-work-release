import type { MetadataRoute } from "next";
import { localizedSiteUrl } from "@/lib/site";

// output:"export" 下，Next.js 16 要求元数据路由显式声明为构建期静态生成。
export const dynamic = "force-static";

// 静态站点只有两个可索引的落地页；显式列出它们让搜索引擎不依赖站内链接发现语言版本。
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: localizedSiteUrl("zh"), changeFrequency: "weekly", priority: 1 },
    { url: localizedSiteUrl("en"), changeFrequency: "weekly", priority: 0.8 },
  ];
}
