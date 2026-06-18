import type { NextConfig } from "next";

/* =========================================================================
   静态导出（GitHub Pages）
   - output:"export" 产出纯静态 out/，Pages 直接托管。
   - 子路径部署：仓库 Pages 地址为 /cortex-work-release，故用 NEXT_BASE_PATH
     注入 basePath/assetPrefix（本地 dev 不设此变量 → 走根路径，不影响开发）。
   - trailingSlash:true → 每个路由导出为 目录/index.html，子路径托管更稳。
   - images.unoptimized：静态导出无优化服务，必须关。
   - 注意：redirects() 在 output:"export" 下不生效，根路径 / → /zh 的跳转
     改由 public/index.html（meta refresh）承担。
   ========================================================================= */
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
