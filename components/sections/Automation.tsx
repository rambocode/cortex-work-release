/* =========================================================================
   Automation · 无人值守区块（定时自动化 × 定时任务清单）
   server 组件：纯展示，无 hooks / 无客户端能力。文案全部取自 d.automation。
   左栏「定时自动化」要点列表（荧光勾）；右栏一张 mock「定时任务」清单卡：
   表头（标题 + 计数）+ 若干任务行（开关 / 名称·节奏 / 三态状态徽标）。
   一抹 aurora 作氛围。视觉论点：clay 橙=动作、glow 蓝紫=智能氛围。
   配套 scoped CSS 见 globals.css 末尾「Automation 定时任务列表」段。
   ========================================================================= */

import { IconCheck } from "@/components/icons";
import { Reveal } from "@/components/ui";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

// 任务清单头部时钟图标（与功能区「定时自动化」同款，inline 以避免新增依赖）。
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.2 11.2a8 8 0 1 0-1.5 5.6" />
      <path d="M20.4 11.6V7.6M20.4 11.6h-3.4" />
      <path d="M12 7.6V12l2.8 1.7" />
    </svg>
  );
}

export default function Automation({ d }: { d: Dict; locale: Locale }) {
  const a = d.automation;

  return (
    <section className="section auto-sec" aria-labelledby="auto-title">
      {/* 一抹蓝紫极光作氛围（z-index:0，置于内容之下） */}
      <span className="aurora" aria-hidden />

      <div className="container content">
        {/* 标题区 */}
        <Reveal className="auto-head">
          <span className="eyebrow">{a.eyebrow}</span>
          <h2 className="h2" id="auto-title" style={{ textWrap: "balance" } as React.CSSProperties}>
            {a.title}
          </h2>
        </Reveal>

        {/* 两列：左定时自动化要点 / 右定时任务清单 */}
        <div className="grid grid-2 auto-grid">
          {/* —— 左：定时自动化要点 —— */}
          <Reveal className="auto-col" i={1}>
            <h3 className="h3">{a.auto.title}</h3>
            <p className="muted auto-desc">{a.auto.desc}</p>
            <ul className="auto-bullets">
              {a.auto.bullets.map((b) => (
                <li key={b}>
                  <span className="auto-check" aria-hidden>
                    <IconCheck />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* —— 右：定时任务清单 mock 卡 —— */}
          <Reveal className="auto-col" i={2}>
            <div className="task-card">
              <div className="task-head">
                <span className="task-head-title">
                  <ClockIcon />
                  {a.tasks.title}
                </span>
                <span className="task-count">{a.tasks.countNote}</span>
              </div>
              {a.tasks.items.map((t) => (
                <div className="task-row" key={t.name}>
                  <span className="task-switch" aria-hidden />
                  <div className="task-main">
                    <div className="task-name">{t.name}</div>
                    <div className="task-sched">{t.sched}</div>
                  </div>
                  <span className={`task-status task-status--${t.status}`}>
                    {t.status === "running" && <span className="task-pulse" aria-hidden />}
                    {t.status === "done" && <IconCheck />}
                    {t.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
