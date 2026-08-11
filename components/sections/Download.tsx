/* =========================================================================
   Download · 收尾大 CTA（<section id="download">，取代旧的 FinalCTA）
   荧光描边大卡 + 背后光晕，内部两个架构按钮（Apple Silicon / Intel）。
   两个按钮都指向 releases/latest：版本号不硬编码进静态站，避免每次发版
   都要改站点；进 release 页后选对应的 .dmg 即可。
   server 组件：无 hooks、不读浏览器 API。
   ========================================================================= */

import { IconArrowRight, IconDownload } from "@/components/icons";
import { Reveal } from "@/components/ui";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Download({ d }: { d: Dict; locale: Locale }) {
  return (
    <section id="download" className="section dl">
      <div className="container container-narrow">
        <Reveal>
          <div className="dl__card">
            <span className="halo dl__halo" aria-hidden="true" />

            <div className="content dl__inner">
              <span className="eyebrow">{d.download.eyebrow}</span>

              <h2 className="h2 dl__title">
                <span className="glow-text">{d.download.title}</span>
              </h2>

              <p className="lead dl__sub">{d.download.sub}</p>

              <div className="dl__arches">
                {d.download.arches.map((a) => (
                  <a
                    key={a.key}
                    className="dl__arch"
                    href={d.links.latest}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="dl__arch-ico" aria-hidden>
                      <IconDownload />
                    </span>
                    <span className="dl__arch-text">
                      <span className="dl__arch-label">{a.label}</span>
                      <span className="dl__arch-note">{a.note}</span>
                    </span>
                  </a>
                ))}
              </div>

              <p className="dl__note muted">{d.download.note}</p>
              <p className="dl__req">{d.download.requirement}</p>

              <a className="btn btn--quiet dl__log" href={d.links.releases} target="_blank" rel="noreferrer">
                {d.download.changelog}
                <IconArrowRight />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        /* 渐变描边：外层 --grad-jelly 打底，内层不透明纸面盖住，留 1px 荧光边 */
        .dl__card {
          position: relative;
          border-radius: var(--r-xl);
          padding: 1px;
          background: var(--grad-jelly);
          box-shadow: var(--shadow-pop);
          overflow: hidden;
        }
        .dl__halo {
          width: 460px;
          height: 460px;
          top: -34%;
          left: 50%;
          transform: translateX(-50%);
        }
        .dl__inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding: clamp(40px, 6vw, 72px) clamp(22px, 5vw, 56px);
          background: var(--paper-solid);
          border-radius: calc(var(--r-xl) - 1px);
        }
        .dl__title { text-wrap: balance; max-width: 20ch; }
        .dl__sub { text-wrap: balance; max-width: 44ch; }

        .dl__arches {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          margin-top: 8px;
        }
        /* 架构按钮比普通 btn 高一档：图标 + 主标 + 副标三段 */
        .dl__arch {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 13px 22px 13px 16px;
          border-radius: var(--r-lg);
          background: var(--clay);
          color: var(--clay-ink);
          box-shadow: 0 1px 2px rgba(20, 18, 12, 0.18), 0 12px 26px -12px rgba(201, 100, 66, 0.65);
          transition: transform 0.18s var(--ease), background 0.2s var(--ease), box-shadow 0.25s var(--ease);
        }
        .dl__arch:hover {
          background: var(--clay-deep);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(20, 18, 12, 0.2), 0 18px 34px -14px rgba(201, 100, 66, 0.75);
        }
        .dl__arch:active { transform: translateY(1px) scale(0.99); }
        /* 第二个架构（Intel）降一级为幽灵按钮，主次分明 */
        .dl__arch:nth-child(2) {
          background: var(--paper-raise);
          color: var(--ink);
          border: 1px solid var(--line-strong);
          box-shadow: var(--shadow-xs);
        }
        .dl__arch:nth-child(2):hover {
          background: var(--paper-raise2);
          border-color: var(--ink-3);
          box-shadow: var(--shadow-card);
        }
        .dl__arch-ico { display: grid; place-items: center; }
        .dl__arch-ico svg { width: 20px; height: 20px; }
        .dl__arch-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.25; }
        .dl__arch-label { font-size: 0.98rem; font-weight: 650; }
        .dl__arch-note { font-size: 0.76rem; opacity: 0.78; }

        .dl__note { margin-top: 4px; font-size: var(--fs-sm); }
        .dl__req {
          max-width: 42ch;
          color: var(--ink-3);
          font-size: var(--fs-sm);
          line-height: 1.6;
        }
        .dl__log { margin-top: 2px; }

        @media (max-width: 480px) {
          .dl__arches { width: 100%; flex-direction: column; }
          .dl__arch { justify-content: center; }
          .dl__arch-text { align-items: center; }
        }
      `}</style>
    </section>
  );
}
