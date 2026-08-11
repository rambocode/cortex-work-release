"use client";

/* =========================================================================
   Deliverables · 产出（client 组件：tab 切换）
   五类交付成品共用一个视口，避免五个同构区块连排把页面拉得过长。
   tab 走标准 tablist / tab / tabpanel 语义，键盘左右方向键可切换。
   截图代号在这里按 tab key 映射——它是结构不是文案，不进 dictionary。
   ========================================================================= */

import { useRef, useState } from "react";

import { Icon, IconCheck } from "@/components/icons";
import Shot from "@/components/Shot";
import type { Dict, IconKey, MakeTab } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import type { ShotCode } from "@/lib/shots";

/** tab → 截图。media（媒体生成）没有截图，用 null 表示只出文字。 */
const TAB_SHOT: Record<MakeTab["key"], ShotCode | null> = {
  slides: "05-slides",
  research: "06-research",
  writing: "07-writing",
  design: "08-design",
  media: null,
};

/** tab → 图标，与 dictionary 的 IconKey 对齐。 */
const TAB_ICON: Record<MakeTab["key"], IconKey> = {
  slides: "slides",
  research: "research",
  writing: "writing",
  design: "design",
  media: "media",
};

export default function Deliverables({ d }: { d: Dict; locale: Locale }) {
  const tabs = d.make.tabs;
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 左右方向键在 tablist 内循环移动焦点并切换（WAI-ARIA 自动激活模式）。
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  const cur = tabs[active];
  const shot = TAB_SHOT[cur.key];

  return (
    <section className="section" id="make" aria-labelledby="make-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">{d.make.eyebrow}</span>
          <h2 className="h2" id="make-title">
            {d.make.title}
          </h2>
          <p className="lead">{d.make.sub}</p>
        </div>

        <div className="mk-tabs">
          <div className="tabbar" role="tablist" aria-label={d.a11y.makeTabs} onKeyDown={onKeyDown}>
            {tabs.map((t, i) => {
              const Glyph = Icon[TAB_ICON[t.key]];
              return (
                <button
                  key={t.key}
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  className="tabbar__tab"
                  role="tab"
                  id={`mk-tab-${t.key}`}
                  aria-selected={i === active}
                  aria-controls={`mk-panel-${t.key}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                >
                  <Glyph />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`mk-panel ${shot ? "" : "mk-panel--noshot"}`}
          role="tabpanel"
          id={`mk-panel-${cur.key}`}
          aria-labelledby={`mk-tab-${cur.key}`}
          // key 让每次切 tab 重新挂载，触发一次淡入
          key={cur.key}
        >
          <div className="mk-panel__copy">
            <h3 className="h3 mk-panel__title">{cur.title}</h3>
            <p className="mk-panel__desc muted">{cur.desc}</p>
            <ul className="checklist mk-panel__list">
              {cur.points.map((p) => (
                <li key={p}>
                  <IconCheck aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {shot ? (
            <div className="mk-panel__media">
              <span className="halo showcase__halo" aria-hidden="true" />
              <Shot code={shot} alt={cur.shotAlt} pending={d.a11y.shotPending} />
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        .mk-tabs {
          display: flex;
          margin-top: clamp(26px, 3.4vw, 40px);
        }
        .mk-panel {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: clamp(26px, 4vw, 60px);
          align-items: center;
          margin-top: clamp(24px, 3.2vw, 40px);
          animation: mkFade 0.4s var(--ease-out) both;
        }
        /* 媒体生成那一档没有截图，文字改为居中窄栏，不留一半空白 */
        .mk-panel--noshot {
          grid-template-columns: 1fr;
          max-width: var(--maxw-narrow);
        }
        @keyframes mkFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
        .mk-panel__title { text-wrap: balance; }
        .mk-panel__desc {
          margin-top: 12px;
          font-size: 1rem;
          line-height: 1.62;
        }
        .mk-panel__list { margin-top: clamp(18px, 2.2vw, 26px); }
        .mk-panel__media { position: relative; }
        .mk-panel__media .shot { position: relative; z-index: 1; }

        @media (max-width: 900px) {
          .mk-panel { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-panel { animation: none; }
        }
      `}</style>
    </section>
  );
}
