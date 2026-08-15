/* =========================================================================
   Workspace · 会话工作台（server 组件）
   与其它 showcase 的区别：这块有两块视觉（过程时间线示意图 + 四向分屏截图）。
   两张图在同一阅读顺序中独立呈现，避免副图压住时间线内容；窄屏则同宽堆叠。
   所以不复用 Showcase 骨架，单独排版。
   过程时间线用 CSS 自绘（TimelineMock）而非截图，理由见该组件头注。
   ========================================================================= */

import { Icon } from "@/components/icons";
import TimelineMock from "@/components/mocks/TimelineMock";
import Shot from "@/components/Shot";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Workspace({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section" id="workspace" aria-labelledby="workspace-title">
      <div className="container">
        <div className="showcase">
          <div className="showcase__copy">
            <div className="sec-head">
              <span className="eyebrow">{d.workspace.eyebrow}</span>
              <h2 className="h2" id="workspace-title">
                {d.workspace.title}
              </h2>
              <p className="lead">{d.workspace.sub}</p>
            </div>

            <ul className="pointlist showcase__points">
              {d.workspace.points.map((p) => {
                const Glyph = Icon[p.icon];
                return (
                  <li className="pointlist__item" key={p.title}>
                    <span className="pointlist__ico" aria-hidden>
                      <Glyph />
                    </span>
                    <div>
                      <h3 className="pointlist__title">{p.title}</h3>
                      <p className="pointlist__desc">{p.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="showcase__media ws-media">
            <span className="halo showcase__halo" aria-hidden="true" />
            <TimelineMock d={d} />
            {/* 分屏截图沿用同宽窗口框，作为时间线之后的下一块工作台视图。 */}
            <Shot
              code="04-split"
              alt={d.workspace.shotAltSplit}
              pending={d.a11y.shotPending}
              chrome="window"
              className="ws-media__aside"
            />
          </div>
        </div>
      </div>

      <style>{`
        .ws-media { position: relative; }
        /* 两张同宽窗口按「过程 → 分屏结果」连续排列，作为一个完整工作台视图。 */
        .showcase__media.ws-media .ws-media__aside {
          width: 100%;
          margin: clamp(24px, 3vw, 36px) 0 0 auto;
          box-shadow: var(--shadow-pop), 0 0 60px -18px rgba(139, 92, 246, 0.6);
        }

        @media (max-width: 900px) {
          /* 窄屏保持同宽堆叠，确保截图文字仍有足够阅读面积。 */
          .showcase__media.ws-media .ws-media__aside {
            width: 100%;
            margin-top: 18px;
          }
        }
      `}</style>
    </section>
  );
}
