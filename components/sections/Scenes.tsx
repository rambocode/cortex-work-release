/* =========================================================================
   Scenes · 能做什么（server 组件）
   形式刻意做成「清单表」而非卡片网格：左侧能力 pill + 右侧一句真实可跑的需求，
   密度高、扫读快，也和页面其余区块（大图 / tab / bento）拉开形式差异。
   内容直接对齐 App 落地页的场景分层（日常办公 / 设计创意）。
   ========================================================================= */

import { Icon } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Scenes({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section" id="scenes" aria-labelledby="scenes-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">{d.scenes.eyebrow}</span>
          <h2 className="h2" id="scenes-title">
            {d.scenes.title}
          </h2>
          <p className="lead">{d.scenes.sub}</p>
        </div>

        <div className="scene-groups">
          {d.scenes.groups.map((g) => (
            <div className="scene-group" key={g.key}>
              <h3 className="scene-group__label">{g.label}</h3>
              <ul className="scene-list">
                {g.chips.map((c) => {
                  const Glyph = Icon[c.icon];
                  return (
                    <li className="scene-row" key={`${g.key}-${c.label}`}>
                      <span className="scene-row__name">
                        <Glyph />
                        {c.label}
                      </span>
                      {/* 引号用排版字符，示例本身取自 App 内的场景示例 prompt */}
                      <span className="scene-row__eg">「{c.example}」</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="scene-hint muted">{d.scenes.hint}</p>
      </div>

      <style>{`
        .scene-groups {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          gap: clamp(26px, 3.6vw, 56px);
          margin-top: clamp(32px, 4.4vw, 56px);
        }
        .scene-group__label {
          margin: 0 0 4px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
          font-size: var(--fs-sm);
          font-weight: 650;
          letter-spacing: 0.02em;
          color: var(--ink-2);
        }
        .scene-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .scene-row {
          display: grid;
          grid-template-columns: minmax(112px, auto) minmax(0, 1fr);
          gap: 8px 18px;
          align-items: baseline;
          padding: 13px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .scene-row__name {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 650;
          font-size: 0.95rem;
          white-space: nowrap;
        }
        .scene-row__name svg {
          width: 17px;
          height: 17px;
          color: var(--jelly-top);
          flex: none;
        }
        .scene-row__eg {
          color: var(--ink-3);
          font-size: 0.92rem;
          line-height: 1.6;
        }
        .scene-hint {
          margin-top: clamp(20px, 2.6vw, 30px);
          font-size: var(--fs-sm);
          color: var(--ink-3);
        }

        @media (max-width: 900px) {
          .scene-groups { grid-template-columns: 1fr; }
        }
        /* 窄屏：能力名与示例改上下堆叠，避免示例被挤成一列字 */
        @media (max-width: 560px) {
          .scene-row { grid-template-columns: 1fr; gap: 6px; }
          .scene-row__eg { padding-left: 25px; }
        }
      `}</style>
    </section>
  );
}
