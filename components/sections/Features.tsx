/* =========================================================================
   Features · 更多能力（server 组件）
   bento 网格：前两格双宽打破均匀感，其余单宽。样式全部复用 globals.css
   的 .bento 原语，本文件不写 scoped CSS。
   ========================================================================= */

import { Icon } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Features({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">{d.features.eyebrow}</span>
          <h2 className="h2" id="features-title">
            {d.features.title}
          </h2>
          <p className="lead">{d.features.sub}</p>
        </div>

        <div className="bento">
          {d.features.items.map((f, i) => {
            const Glyph = Icon[f.icon];
            // 首尾各两格双宽：8 项时正好排成 2+4+2 三行且不留缺口
            // （只出双宽会让末行剩两个空位）。改动条目数时留意这个假设。
            const wide = i < 2 || i >= d.features.items.length - 2;
            return (
              <article className={`bento__cell ${wide ? "bento__cell--wide" : ""}`} key={f.title}>
                <span className="bento__ico" aria-hidden>
                  <Glyph />
                </span>
                <h3 className="bento__title">{f.title}</h3>
                <p className="bento__desc">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
