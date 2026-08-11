/* =========================================================================
   Capture · 随手接住（server 组件）
   四个主窗口之外的入口。排版：左侧四张带触发键的卡片，右侧快捷回复气泡截图。
   触发键用等宽字体的 kbd 呈现，是这块的识别符号。
   ========================================================================= */

import { Icon } from "@/components/icons";
import Shot from "@/components/Shot";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Capture({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section" id="capture" aria-labelledby="capture-title">
      <div className="container">
        <div className="showcase">
          <div className="showcase__copy">
            <div className="sec-head">
              <span className="eyebrow">{d.capture.eyebrow}</span>
              <h2 className="h2" id="capture-title">
                {d.capture.title}
              </h2>
              <p className="lead">{d.capture.sub}</p>
            </div>

            <ul className="cap-list">
              {d.capture.items.map((it) => {
                const Glyph = Icon[it.icon];
                return (
                  <li className="cap-item" key={it.title}>
                    <span className="pointlist__ico" aria-hidden>
                      <Glyph />
                    </span>
                    <div>
                      <h3 className="cap-item__head">
                        <span className="pointlist__title">{it.title}</span>
                        <kbd className="cap-item__kbd mono">{it.kbd}</kbd>
                      </h3>
                      <p className="pointlist__desc">{it.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 两张浮层截图上下错开：快捷回复气泡在上，闪记浮层在下并向左探出，
              呼应「这些入口都浮在主窗口之外」。 */}
          <div className="showcase__media cap-media">
            <span className="halo showcase__halo" aria-hidden="true" />
            <Shot
              code="12-quick-reply"
              alt={d.capture.shotAlt}
              pending={d.a11y.shotPending}
              chrome="float"
            />
            <Shot
              code="13-notes"
              alt={d.capture.shotAltNotes}
              pending={d.a11y.shotPending}
              chrome="float"
              className="cap-media__aside"
            />
          </div>
        </div>
      </div>

      <style>{`
        .cap-list {
          display: grid;
          gap: clamp(18px, 2vw, 26px);
          margin: clamp(24px, 3vw, 36px) 0 0;
          padding: 0;
          list-style: none;
        }
        .cap-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: start;
        }
        .cap-item__head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin: 0;
        }
        .cap-item__kbd {
          padding: 3px 9px;
          border-radius: var(--r-sm);
          font-size: 0.76rem;
          color: var(--accent-ink);
          background: var(--paper-sink);
          border: 1px solid var(--line);
        }

        .cap-media { position: relative; }
        .cap-media__aside {
          position: absolute;
          z-index: 2;
          left: -6%;
          bottom: -18%;
          width: 74%;
        }
        /* 副图向下探出，给区块补回被吃掉的下方留白 */
        #capture { padding-bottom: clamp(90px, 12vw, 170px); }

        @media (max-width: 900px) {
          .cap-media__aside {
            position: static;
            width: 100%;
            margin-top: 18px;
          }
          #capture { padding-bottom: var(--section-y); }
        }
      `}</style>
    </section>
  );
}
