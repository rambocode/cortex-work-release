# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

本项目是 **Cortex Desktop 的官方宣传网站**。Cortex Desktop 是一款 **macOS 本地 AI 工作站**（Electron），定位「会听、会说、会动手」：语音助手、电脑操作、子代理编队、演示文稿 / 深度研究 / 写作 / 设计稿产出、定时自动化与 Loop 工作流。其代码仓库是同级目录 `../cortex-work`（monorepo）。本站的职责就是介绍该产品并引导下载，落地页文案与 `../cortex-work` 的真实能力逐条对齐。

**改文案前必读的三条边界**（都是产品现状，写错就是虚假宣传）：
- **不宣传团队协作**：`../cortex-work` 的 `personal/layout/WorkspaceTabs.tsx` 里 `TEAM_WORKSPACE_ENABLED = false`，团队工作区未实现。
- **不宣传 Web 版**：`apps/web` 只是无 `desktopBridge` 的开发预览壳，桌面能力全降级，没有可用的线上版本。
- **平台只写 macOS**：`electron-builder.yml` 虽配了 win nsis，但 GitHub Release 实际产物只有 `arm64` / `x64` 的 dmg + zip，没有 Windows 资产。也不要写「即将支持」。
- 另：产品**没有**企业级审计追踪（audit log），只有审批确认、运行历史与消息中心 60 天归档，表述为「每一步可回溯」。

核实能力的两个最佳来源：`../cortex-work/docs/module-map.md`（名词→模块速查表）与 `../cortex-work/apps/desktop/CHANGELOG.md`（面向用户的版本说明）。

Next.js 16 (App Router) + React 19，**静态导出**（`output:"export"`）的纯营销页，**无后端、无数据库**。中英双语 (`/zh`、`/en`)，单页多区块叙事。

**这是一个独立部署仓库**，远程 `git@github.com:rambocode/cortex-work-release.git`，通过 GitHub Actions 构建并发布到 GitHub Pages（子路径 `https://rambocode.github.io/cortex-work-release/`）。该 release 仓库同时持有桌面应用的版本 tag（`v0.1.x`），站点源码与之合并在 `main` 上。

依赖关系：包名 `@cortex-work/site`，源自 `cortex-work` monorepo（依赖版本走 `catalog:`，故 `react`/`typescript` 等不写死版本号）。为让本仓库能**脱离 monorepo 独立 `pnpm install`**，根目录自带一份最小 `pnpm-workspace.yaml` 来解析 `catalog:`（版本须与 `../cortex-work` 的 catalog 保持一致），并自带 `pnpm-lock.yaml`。

## 常用命令

```bash
pnpm install      # 独立安装（本仓库自带 pnpm-workspace.yaml + lockfile，无需 monorepo）
pnpm dev          # 开发服务器，默认端口 3100（可用 SITE_PORT 覆盖）；不设 basePath，走根路径
pnpm build        # next build → 静态导出到 out/
pnpm typecheck    # tsc --noEmit —— 提交前的主要验证手段
```

- **没有测试框架、没有 lint 脚本**：`pnpm typecheck` + `pnpm build` 通过即视为绿。改完务必跑 typecheck。
- 路径别名 `@/*` → 本目录根（`@/lib/...`、`@/components/...`）。
- 复现线上构建（带子路径前缀）：`NEXT_BASE_PATH=/cortex-work-release NEXT_PUBLIC_SITE_URL=https://rambocode.github.io/cortex-work-release pnpm build`。

## 架构与约定（关键，先读这里）

三个文件构成全站的「单一真源」，任何区块组件都只消费它们，**禁止另起设计体系或新增 npm 依赖**：

1. **`lib/dictionary.ts`** — 全站文案 + TypeScript 类型契约。`Dict` interface 定义所有可见文本的 key，`getDict(locale)` 返回对应语言对象。组件内**禁止硬编码任何中英文可见文案**，一律从 `d` 取。新增文案 = 先改 `Dict` 类型再填 zh/en 两份。
2. **`app/globals.css`** — 设计 DNA（design system）。所有颜色/间距/圆角/阴影/字体都是 CSS token（`--clay`、`--glow-*`、`--paper`、`--grad-jelly` 等），配套一套工具类（`.container .section .btn .card .pill .reveal .aurora .halo` 等）和 keyframes。组件**复用既有 class**，不够时才加少量 scoped `<style>`（client 组件）或追加到 globals.css 末尾（server 组件，需顶部注释标明）。
3. **`lib/i18n.ts`** — locale 定义（`zh`/`en`，默认 `zh`）、`isLocale`、`otherLocale`、`localeLabel`。

另有两个小真源：
- **`lib/shots.ts`** — 产品截图登记表。每条只记 `w`/`h`（`<Shot>` 用它算 aspect-ratio 撑住占位框），图到位后补 `file` 字段即可，组件一行都不用改。拍摄清单在根目录 `SHOTS.md`。
- **`lib/asset.ts`** — `asset(path)` 给 `public/` 下的静态资源拼 basePath 前缀。**手写的 `<img src="/xxx">` 不会被 Next 的 basePath 改写，线上必然 404**，所以图片路径一律走它。前缀来自 `next.config.ts` 里 `env.NEXT_PUBLIC_BASE_PATH`（与 `NEXT_BASE_PATH` 同值，构建期内联，server / client 都能读）。

### 组件契约（统一签名）

- 区块组件：`export default function X({ d, locale }: { d: Dict; locale: Locale })`，文件在 `components/sections/`。
- 默认 server 组件；只有需要交互/浏览器 API 时才加 `"use client"`（`Nav`、`Deliverables`、`Models`、`components/ui.tsx` 的 `Reveal`）。
- 图标：`components/icons.tsx` 具名导出内联 SVG（`viewBox 0 0 24 24`、`stroke="currentColor"`、stroke-width 1.7），并在文件末尾用 `Icon: Record<IconKey, IconComponent>` 汇总。dictionary 里的 `icon` 字段一律走这张表；新增 `IconKey` 时 TS 会在表里报缺失。
- 复用组件（非区块）：`components/Shot.tsx`（mac 窗口截图框 + 占位态）、`components/Showcase.tsx`（「窄文字栏 + 大图」骨架，Voice / Squad / Hands / Automation 共用，差异走 `flip` / `chrome` / `before` / `after` props）。**别再把同一套两栏样式在每个区块里各抄一遍**——上一版就是这么积出 1500 行重复 CSS 的。
- 注释一律简体中文。

### 不可让步的 CSS 陷阱（踩过两次）

渐变描边的写法是 `linear-gradient(内层) padding-box, 渐变 border-box`。**内层必须是不透明色**：用 `var(--paper-raise)`（rgba 白 0.045）会让 border-box 的渐变整片透上来，整块变成实心色片，压在上面的图标和文字直接糊掉。见 `.pointlist__ico`、`.guard`。

### 页面装配（`app/[locale]/page.tsx`）

`async` server 组件，`await params` 取 locale → `getDict` → 按叙事顺序渲染，每个区块（Hero 除外）包 `<Reveal>` 做进入视口揭示：

`Nav → Hero → Scenes → Voice → Workspace → Deliverables → Squad → Hands → Automation → Capture → Models → Features → Privacy → Download → Footer`

**锚点 id 全站唯一**：`scenes / voice / workspace / make / squad / hands / automation / capture / models / features / download`（Privacy 是窄条，无 id）。顶栏只放其中 6 个主干（scenes / voice / workspace / make / automation / models），其余在页脚有全量入口——12 个全塞进顶栏会在中等宽度折成两行。

### i18n / 路由机制

- 路由 `app/[locale]/`，`generateStaticParams` 预生成 zh/en，`dynamicParams = false`（非法 locale → `notFound()`）。
- 根路径 `/` → `/zh` 的跳转由 `public/index.html`（meta refresh，相对 `./zh/`）承担。**注意**：`next.config.ts` 的 `redirects()` 在 `output:"export"` 下不生效，故不要改回用 redirects 做根跳转。
- **主题：全站恒为「深海荧光」深色**，没有亮/暗切换（`ThemeToggle` 已删除，globals.css 里也没有 `[data-theme]` 覆盖）。`app/[locale]/opengraph-image.tsx` 的配色必须跟着深色走。
- 部署域名走 `NEXT_PUBLIC_SITE_URL` 环境变量（layout 的 metadata 用）。

## 部署（GitHub Pages，子路径）

`.github/workflows/deploy.yml`：push 到 `main` → `pnpm install --no-frozen-lockfile` → `pnpm build` → 上传 `out/` → `deploy-pages`。仓库 Pages 源已设为 **GitHub Actions**。

子路径部署的几个不可改约定（改错会导致线上资源 404 或样式丢失）：
- `next.config.ts`：`output:"export"` + `basePath`/`assetPrefix` 经 `NEXT_BASE_PATH` 注入（CI 设为 `/cortex-work-release`；本地 dev 不设，走根路径）+ `trailingSlash:true`（每路由导出为 `目录/index.html`）+ `images.unoptimized:true`（导出无图片优化服务）。
- `public/.nojekyll`：禁用 Jekyll，否则 Pages 会忽略 `_next/` 下划线目录 → 全站样式/脚本丢失。
- `public/index.html`：根跳转页（见上）。
- `public/shots/`：产品截图。加图后务必用子路径命令构建一次，并 `grep -o 'src="[^"]*shots[^"]*"' out/zh/index.html` 确认路径带 `/cortex-work-release` 前缀。

## 改动准则

- 动效必须在 `prefers-reduced-motion` 下静默（`.reveal`/`.anim-*` 全局已处理；自定义动画自行加 media query）。
- 移动端必须可用：`clamp()` + grid 工具类 + `@media (max-width: 900px / 760px)` 折叠。Hero 在窄屏**必须文案在前、水母在后**——把品牌插画提到最上面会让首屏只剩一只水母。
- 卡片（`.card`）仅在「本身是交互/可选单元」时用；纯展示用排版 + 留白。
- 语义化 HTML + 可见 `:focus-visible`（全局已提供）。
