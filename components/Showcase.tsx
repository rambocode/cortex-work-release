import type { ReactNode } from "react";

import { Icon } from "@/components/icons";
import Shot, { type ShotChrome } from "@/components/Shot";
import type { Dict, Point } from "@/lib/dictionary";
import type { ShotCode } from "@/lib/shots";

/* =========================================================================
   Showcase · 「窄文字栏 + 大图」的区块骨架
   Voice / Squad / Hands / Automation 四块结构完全一致（eyebrow + 标题 + lead
   + 四条要点 + 一张截图），共用这一份，避免像上一版那样把同一套样式在四个
   组件里各抄一遍。差异（左右对调、截图外框形态、额外插槽）走 props。
   纯展示、无状态、无浏览器 API，server / client 组件都能挂。
   ========================================================================= */

export default function Showcase({
  id,
  d,
  eyebrow,
  title,
  sub,
  points,
  shot,
  shotAlt,
  media,
  chrome = "plain",
  flip = false,
  before,
  after,
}: {
  /** 区块锚点 id，全站唯一 */
  id: string;
  /** 只用它取 a11y.shotPending，其余文案由调用方按区块传入 */
  d: Dict;
  eyebrow: string;
  title: string;
  sub: string;
  points: Point[];
  /** 截图代号；传了 media 时忽略 */
  shot?: ShotCode;
  shotAlt?: string;
  /** 用自定义视觉替代截图（如 CSS 自绘示意图）。传了它就不渲染 Shot。 */
  media?: ReactNode;
  chrome?: ShotChrome;
  /** true = 图在左、字在右 */
  flip?: boolean;
  /** 要点列表之前 / 之后的额外内容（如红线强调框、补充说明） */
  before?: ReactNode;
  after?: ReactNode;
}) {
  const titleId = `${id}-title`;

  return (
    <section className="section" id={id} aria-labelledby={titleId}>
      <div className="container">
        <div className={`showcase ${flip ? "showcase--flip" : ""}`}>
          <div className="showcase__copy">
            <div className="sec-head">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="h2" id={titleId}>
                {title}
              </h2>
              <p className="lead">{sub}</p>
            </div>

            {before ? <div className="showcase__slot">{before}</div> : null}

            <ul className="pointlist showcase__points">
              {points.map((p) => {
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

            {after ? <div className="showcase__slot">{after}</div> : null}
          </div>

          <div className="showcase__media">
            {/* 图背后垫一层呼吸光晕，视觉不至于和页面背景糊在一起 */}
            <span className="halo showcase__halo" aria-hidden="true" />
            {media ?? (
              shot ? (
                <Shot code={shot} alt={shotAlt ?? ""} pending={d.a11y.shotPending} chrome={chrome} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
