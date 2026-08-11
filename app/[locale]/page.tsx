import { isLocale, type Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";

import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Scenes from "@/components/sections/Scenes";
import Voice from "@/components/sections/Voice";
import Workspace from "@/components/sections/Workspace";
import Deliverables from "@/components/sections/Deliverables";
import Squad from "@/components/sections/Squad";
import Hands from "@/components/sections/Hands";
import Automation from "@/components/sections/Automation";
import Capture from "@/components/sections/Capture";
import Models from "@/components/sections/Models";
import Features from "@/components/sections/Features";
import Privacy from "@/components/sections/Privacy";
import Download from "@/components/sections/Download";
import Footer from "@/components/sections/Footer";
import { Reveal } from "@/components/ui";

/* =========================================================================
   落地页装配（async server 组件）
   叙事：Hero 总承诺（会听 / 会说 / 会动手的本地 AI 工作站）
   → Scenes 能做什么（App 自己的场景入口，最快建立「它能干活」的印象）
   → Voice 语音（最新最重的差异化）→ Workspace 过程可见
   → Deliverables 产出成品 → Squad 子代理编队 → Hands 动手（含确认红线）
   → Automation 无人值守 → Capture 随手接住 → Models 自带模型
   → Features 其余能力 → Privacy 本地优先 → Download。
   - Hero 首屏直接显示；其余区块用 <Reveal> 进入视口揭示。
   - 锚点 id 全站唯一：scenes / voice / workspace / make / squad / hands /
     automation / capture / models / features / download。
   ========================================================================= */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "zh";
  const d = getDict(loc);

  return (
    <>
      <Nav d={d} locale={loc} />
      <main id="main">
        {/* 首屏直接显示，自身已做错峰入场，无需再包 Reveal */}
        <Hero d={d} locale={loc} />

        <Reveal>
          <Scenes d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Voice d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Workspace d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Deliverables d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Squad d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Hands d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Automation d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Capture d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Models d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Features d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Privacy d={d} locale={loc} />
        </Reveal>
        <Reveal>
          <Download d={d} locale={loc} />
        </Reveal>
      </main>
      <Footer d={d} locale={loc} />
    </>
  );
}
