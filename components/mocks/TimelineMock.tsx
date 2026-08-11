import { IconCheck, IconSparkle, IconSquad } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";

/* =========================================================================
   会话过程时间线 · CSS 自绘示意图
   取代原 SHOT-03：真实截图是浅色主题且内容需要大面积打码，贴到深色站上
   既刺眼又什么都读不出。这里按产品的真实结构自绘一份深色示意图——
   摘要行 + 竖轴 + 三类步骤（思考 / 工具胶囊 / 子代理卡）+ 完整过程入口。
   文案全部来自 d.workspace.mock，标题里注明「示意」，不冒充截图。
   ========================================================================= */

export default function TimelineMock({ d }: { d: Dict }) {
  const m = d.workspace.mock;

  return (
    <figure className="tlm">
      <div className="tlm__bar" aria-hidden>
        <span className="shot__dot" />
        <span className="shot__dot" />
        <span className="shot__dot" />
      </div>

      <div className="tlm__body">
        <p className="tlm__summary">{m.summary}</p>

        <ol className="tlm__steps">
          {m.steps.map((s, i) => (
            <li className={`tlm__step tlm__step--${s.kind}`} key={`${s.kind}-${i}`}>
              <span className="tlm__node" aria-hidden>
                {s.kind === "think" ? (
                  <IconSparkle />
                ) : s.kind === "delegate" ? (
                  <IconSquad />
                ) : (
                  <IconCheck />
                )}
              </span>

              <span className="tlm__row">
                <span className="tlm__name mono">{s.name}</span>
                <span className="tlm__detail mono">{s.detail}</span>
                <span className="tlm__meta mono">{s.meta}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="tlm__more">{m.more}</p>
      </div>

      <figcaption className="tlm__cap">{m.caption}</figcaption>
    </figure>
  );
}
