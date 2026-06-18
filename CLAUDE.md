# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

本项目是 **Cortex Desktop 的官方宣传网站**。Cortex Desktop 是一款团队 Agent 桌面应用（Electron + Web），其代码仓库是同级目录 `../cortex-work`（monorepo）。本站的职责就是介绍该产品并引导下载（download/releases/web app 链接），落地页文案与 `../cortex-work` 的真实能力对齐。

Next.js 16 (App Router) + React 19，纯静态营销页，**自身无后端、无数据库**。中英双语 (`/zh`、`/en`)，单页多区块叙事。

包名 `@cortex-work/site`，逻辑上是 `cortex-work` pnpm workspace 成员（依赖版本走 workspace `catalog:`，故 `react`/`typescript` 等不写死版本号；`cortex-work` 里有 `dev:site` / `build:site` turbo 过滤命令）。**结构注意**：workspace 声明了 `site` 成员，但物理上站点不在 `cortex-work/site`，而在其同级的本目录 `cortex-desktop/site`，自带 `node_modules`，可脱离 monorepo 独立运行。

## 常用命令

```bash
pnpm dev          # 开发服务器，默认端口 3100（可用 SITE_PORT 覆盖）
pnpm build        # next build
pnpm start        # 生产模式
pnpm typecheck    # tsc --noEmit —— 提交前的主要验证手段
```

- 在 monorepo 根从外部运行用 `pnpm --filter @cortex-work/site <script>`。
- **没有测试框架、没有 lint 脚本**：`pnpm typecheck` + `pnpm build` 通过即视为绿。改完务必跑 typecheck。
- 路径别名 `@/*` → 本目录根（`@/lib/...`、`@/components/...`）。

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
- `next.config.ts` 把 `/` 重定向到 `/zh`。
- 主题（亮/暗）：`layout.tsx` 头部内联 `themeBootstrap` 脚本在渲染前读 `localStorage['cortex-theme']` + 系统偏好，设 `document.documentElement.dataset.theme`，避免闪烁；`ThemeToggle` 负责切换。暗色由 globals.css 的 `[data-theme="dark"]` 覆盖。
- 部署域名走 `NEXT_PUBLIC_SITE_URL` 环境变量（layout 的 metadata 用）。

## 改动准则

- 动效必须在 `prefers-reduced-motion` 下静默（`.reveal`/`.anim-*` 全局已处理；自定义动画自行加 media query）。
- 移动端必须可用：`clamp()` + grid 工具类 + `@media (max-width: 760px)` 折叠。
- 卡片（`.card`）仅在「本身是交互/可选单元」时用；纯展示用排版 + 留白。
- 语义化 HTML + 可见 `:focus-visible`（全局已提供）。
