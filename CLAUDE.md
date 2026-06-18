# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

本项目是 **Cortex Desktop 的官方宣传网站**。Cortex Desktop 是一款团队 Agent 桌面应用（Electron + Web），其代码仓库是同级目录 `../cortex-work`（monorepo）。本站的职责就是介绍该产品并引导下载（download/releases/web app 链接），落地页文案与 `../cortex-work` 的真实能力对齐。

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

`CONTRACT.md` 是最初并行实现各组件时的详细契约（视觉论点、每个组件的签名/职责/锚点）。改组件前值得参考，但**注意它已过时**：实际页面区块比契约列的多（见下方装配顺序）。

### 组件契约（统一签名）

- 区块组件：`export default function X({ d, locale }: { d: Dict; locale: Locale })`，文件在 `components/sections/`。
- 默认 server 组件；只有需要交互/浏览器 API 时才加 `"use client"`（如 `Nav`、`components/ui.tsx` 里的 `ThemeToggle`/`Reveal`）。
- 图标：`components/icons.tsx` 具名导出内联 SVG（`viewBox 0 0 24 24`、`stroke="currentColor"`）。
- 注释一律简体中文。

### 页面装配（`app/[locale]/page.tsx`）

`async` server 组件，`await params` 取 locale → `getDict` → 按叙事顺序渲染，每个区块（Hero 除外）包 `<Reveal>` 做进入视口揭示：

`Nav → Hero → SkillShowcase → AccountingShowcase → NotesShowcase → TerminalShowcase → Agents → Features → Automation → FinalCTA → Footer`

**锚点 id 全站唯一**：`skills / accounting / notes / terminal / agents / features / download`。

### i18n / 路由机制

- 路由 `app/[locale]/`，`generateStaticParams` 预生成 zh/en，`dynamicParams = false`（非法 locale → `notFound()`）。
- 根路径 `/` → `/zh` 的跳转由 `public/index.html`（meta refresh，相对 `./zh/`）承担。**注意**：`next.config.ts` 的 `redirects()` 在 `output:"export"` 下不生效，故不要改回用 redirects 做根跳转。
- 主题（亮/暗）：`layout.tsx` 头部内联 `themeBootstrap` 脚本在渲染前读 `localStorage['cortex-theme']` + 系统偏好，设 `document.documentElement.dataset.theme`，避免闪烁；`ThemeToggle` 负责切换。暗色由 globals.css 的 `[data-theme="dark"]` 覆盖。
- 部署域名走 `NEXT_PUBLIC_SITE_URL` 环境变量（layout 的 metadata 用）。

## 部署（GitHub Pages，子路径）

`.github/workflows/deploy.yml`：push 到 `main` → `pnpm install --no-frozen-lockfile` → `pnpm build` → 上传 `out/` → `deploy-pages`。仓库 Pages 源已设为 **GitHub Actions**。

子路径部署的几个不可改约定（改错会导致线上资源 404 或样式丢失）：
- `next.config.ts`：`output:"export"` + `basePath`/`assetPrefix` 经 `NEXT_BASE_PATH` 注入（CI 设为 `/cortex-work-release`；本地 dev 不设，走根路径）+ `trailingSlash:true`（每路由导出为 `目录/index.html`）+ `images.unoptimized:true`（导出无图片优化服务）。
- `public/.nojekyll`：禁用 Jekyll，否则 Pages 会忽略 `_next/` 下划线目录 → 全站样式/脚本丢失。
- `public/index.html`：根跳转页（见上）。

## 改动准则

- 动效必须在 `prefers-reduced-motion` 下静默（`.reveal`/`.anim-*` 全局已处理；自定义动画自行加 media query）。
- 移动端必须可用：`clamp()` + grid 工具类 + `@media (max-width: 760px)` 折叠。
- 卡片（`.card`）仅在「本身是交互/可选单元」时用；纯展示用排版 + 留白。
- 语义化 HTML + 可见 `:focus-visible`（全局已提供）。
