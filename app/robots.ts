import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// output:"export" 下，Next.js 16 要求元数据路由显式声明为构建期静态生成。
export const dynamic = "force-static";

// GitHub Pages 没有动态路由或登录页，允许抓取全部静态资源与语言页，并声明 sitemap 的绝对地址。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
