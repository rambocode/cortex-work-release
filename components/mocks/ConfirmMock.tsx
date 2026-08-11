import { IconShield } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";

/* =========================================================================
   电脑操作逐次确认框 · CSS 自绘示意图
   取代原 SHOT-10。这是全页最重要的信任证据（「AI 能动你的电脑，但每一步
   都要你点允许」），自绘可以把动作 / 目标 / 坐标三行摆清楚，比一张压缩过
   的浅色截图更读得懂。文案来自 d.hands.mock，标题注明「示意」。
   ========================================================================= */

export default function ConfirmMock({ d }: { d: Dict }) {
  const m = d.hands.mock;

  return (
    <figure className="cfm">
      <div className="cfm__card">
        <div className="cfm__head">
          <span className="cfm__ico" aria-hidden>
            <IconShield />
          </span>
          <div>
            <span className="cfm__badge">{m.badge}</span>
            <h3 className="cfm__title">{m.title}</h3>
          </div>
        </div>

        <dl className="cfm__rows">
          {m.rows.map((r) => (
            <div className="cfm__row" key={r.label}>
              <dt>{r.label}</dt>
              <dd className="mono">{r.value}</dd>
            </div>
          ))}
        </dl>

        <p className="cfm__note">{m.note}</p>

        <div className="cfm__actions">
          <span className="cfm__btn cfm__btn--deny">{m.deny}</span>
          <span className="cfm__btn cfm__btn--allow">{m.allow}</span>
        </div>
      </div>

      <figcaption className="cfm__cap">{m.caption}</figcaption>
    </figure>
  );
}
