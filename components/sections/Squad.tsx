/* =========================================================================
   Squad · 子代理编队（server 组件）
   要点之后补一句「圆桌 @ 调度」，走 Showcase 的 after 插槽。
   ========================================================================= */

import Showcase from "@/components/Showcase";
import { IconSquad } from "@/components/icons";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Squad({ d }: { d: Dict; locale: Locale }) {
  return (
    <Showcase
      id="squad"
      d={d}
      eyebrow={d.squad.eyebrow}
      title={d.squad.title}
      sub={d.squad.sub}
      points={d.squad.points}
      shot="09-subagents"
      shotAlt={d.squad.shotAlt}
      flip
      after={
        <p className="squad-extra">
          <IconSquad aria-hidden />
          {d.squad.extra}
        </p>
      }
    />
  );
}
