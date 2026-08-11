/* =========================================================================
   Privacy · 本地优先（server 组件）
   窄条形式：一行标题 + 四列要点，段距用 .section-sm 收紧，
   作为「能力叙事」与「下载」之间的一道信任垫脚石。
   ========================================================================= */

import { Icon } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Privacy({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section-sm pv" aria-labelledby="privacy-title">
      <div className="container">
        <hr className="divider" />
        <div className="pv__inner">
          <h2 className="h3 pv__title" id="privacy-title">
            {d.privacy.title}
          </h2>
          <ul className="pv__list">
            {d.privacy.items.map((it) => {
              const Glyph = Icon[it.icon];
              return (
                <li className="pv__item" key={it.title}>
                  <span className="pv__ico" aria-hidden>
                    <Glyph />
                  </span>
                  <h3 className="pv__item-title">{it.title}</h3>
                  <p className="pv__item-desc">{it.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style>{`
        .pv__inner {
          display: grid;
          grid-template-columns: minmax(0, 0.6fr) minmax(0, 2fr);
          gap: clamp(24px, 3.6vw, 56px);
          align-items: start;
          padding-top: clamp(34px, 4.4vw, 56px);
        }
        .pv__title { text-wrap: balance; }
        .pv__list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(20px, 2.6vw, 32px);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .pv__ico {
          display: inline-grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          color: var(--glow-cyan);
          background: rgba(54, 200, 220, 0.1);
          border: 1px solid rgba(54, 200, 220, 0.18);
        }
        .pv__ico svg { width: 16px; height: 16px; }
        .pv__item-title {
          margin-top: 11px;
          font-size: 0.97rem;
          font-weight: 650;
        }
        .pv__item-desc {
          margin-top: 6px;
          color: var(--ink-3);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .pv__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .pv__list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
