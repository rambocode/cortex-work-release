/* =========================================================================
   Hands · 动手能力 / 电脑操作（server 组件）
   这块的论点是「它能真的操作你的电脑」，所以必须把「每步都要你点允许」的
   红线摆在要点之前（before 插槽），而不是藏在小字里——那是产品里写死的约束。
   ========================================================================= */

import Showcase from "@/components/Showcase";
import ConfirmMock from "@/components/mocks/ConfirmMock";
import { IconShield } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Hands({ d }: { d: Dict; locale: Locale }) {
  return (
    <Showcase
      id="hands"
      d={d}
      eyebrow={d.hands.eyebrow}
      title={d.hands.title}
      sub={d.hands.sub}
      points={d.hands.points}
      media={<ConfirmMock d={d} />}
      before={
        <div className="guard">
          <span className="guard__ico" aria-hidden>
            <IconShield />
          </span>
          <div>
            <h3 className="guard__title">{d.hands.guard.title}</h3>
            <p className="guard__desc">{d.hands.guard.desc}</p>
          </div>
        </div>
      }
    />
  );
}
