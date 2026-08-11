"use client";

/* =========================================================================
   Models · 模型接入（client 组件：tab 切换）
   五种接入形态与 App 设置 → 模型 里的分区一一对应。无截图：设置页截图信息
   密度低、说服力弱，这里用「指标条 + tab 说明 + 供应商 chips」自绘更清楚。
   ========================================================================= */

import { useRef, useState } from "react";

import { Icon } from "@/components/icons";
import type { Dict, IconKey, ModelTab } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

/** tab → 图标，与 dictionary 的 IconKey 对齐（结构映射，不进 dictionary）。 */
const TAB_ICON: Record<ModelTab["key"], IconKey> = {
  login: "login",
  apikey: "key",
  cloud: "cloud",
  gateway: "gateway",
  custom: "plug",
};

export default function Models({ d }: { d: Dict; locale: Locale }) {
  const tabs = d.models.tabs;
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  const cur = tabs[active];

  return (
    <section className="section" id="models" aria-labelledby="models-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">{d.models.eyebrow}</span>
          <h2 className="h2" id="models-title">
            {d.models.title}
          </h2>
          <p className="lead">{d.models.sub}</p>
        </div>

        <div className="stats">
          {d.models.stats.map((s) => (
            <div key={s.label}>
              <div className="stats__value mono">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="md-tabs">
          <div className="tabbar" role="tablist" aria-label={d.a11y.modelTabs} onKeyDown={onKeyDown}>
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
                  id={`md-tab-${t.key}`}
                  aria-selected={i === active}
                  aria-controls={`md-panel-${t.key}`}
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
          className="md-panel card card--pad"
          role="tabpanel"
          id={`md-panel-${cur.key}`}
          aria-labelledby={`md-tab-${cur.key}`}
          key={cur.key}
        >
          <p className="md-panel__desc">{cur.desc}</p>
          <ul className="md-panel__egs">
            {cur.examples.map((e) => (
              <li className="pill" key={e}>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="md-sec-title">{d.models.securityTitle}</h3>
        <ul className="md-sec">
          {d.models.security.map((s) => {
            const Glyph = Icon[s.icon];
            return (
              <li className="pointlist__item" key={s.title}>
                <span className="pointlist__ico" aria-hidden>
                  <Glyph />
                </span>
                <div>
                  <h4 className="pointlist__title">{s.title}</h4>
                  <p className="pointlist__desc">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        .md-tabs {
          display: flex;
          margin-top: clamp(28px, 3.6vw, 44px);
        }
        .md-panel {
          margin-top: 16px;
          animation: mdFade 0.4s var(--ease-out) both;
        }
        @keyframes mdFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .md-panel__desc {
          max-width: 62ch;
          color: var(--ink-2);
          font-size: 1rem;
          line-height: 1.62;
        }
        .md-panel__egs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
        }

        .md-sec-title {
          margin-top: clamp(38px, 5vw, 64px);
          font-size: var(--fs-sm);
          font-weight: 650;
          letter-spacing: 0.02em;
          color: var(--ink-2);
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }
        .md-sec {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2.6vw, 34px);
          margin: clamp(22px, 2.8vw, 32px) 0 0;
          padding: 0;
          list-style: none;
        }

        @media (max-width: 900px) {
          .md-sec { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .md-panel { animation: none; }
        }
      `}</style>
    </section>
  );
}
