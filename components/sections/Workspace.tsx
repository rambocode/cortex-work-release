/* =========================================================================
   Workspace · 会话工作台（server 组件）
   与其它 showcase 的区别：这块有两块视觉（过程时间线示意图 + 四向分屏截图），
   桌面下小图叠在大图右下角制造层次，窄屏改为上下堆叠。
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
            {/* 副图：分屏。桌面下右下角叠放，窄屏落回正常流。 */}
            <Shot
              code="04-split"
              alt={d.workspace.shotAltSplit}
              pending={d.a11y.shotPending}
              className="ws-media__aside"
            />
          </div>
        </div>
      </div>

      <style>{`
        .ws-media { position: relative; }
        .ws-media__aside {
          position: absolute;
          z-index: 2;
          right: -4%;
          bottom: -12%;
          width: 56%;
          box-shadow: var(--shadow-pop), 0 0 60px -18px rgba(139, 92, 246, 0.6);
        }
        /* 叠放会吃掉下方留白，给区块补回来 */
        #workspace { padding-bottom: clamp(80px, 11vw, 160px); }

        @media (max-width: 900px) {
          .ws-media__aside {
            position: static;
            width: 100%;
            margin-top: 18px;
          }
          #workspace { padding-bottom: var(--section-y); }
        }
      `}</style>
    </section>
  );
}
