/* =========================================================================
   Automation · 无人值守（server 组件）
   截图是 Loop 工作流画布，图放右侧（与相邻的 Hands 左右交替，避免连排同构）。
   ========================================================================= */

import Showcase from "@/components/Showcase";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Automation({ d }: { d: Dict; locale: Locale }) {
  return (
    <Showcase
      id="automation"
      d={d}
      eyebrow={d.automation.eyebrow}
      title={d.automation.title}
      sub={d.automation.sub}
      points={d.automation.points}
      shot="11-workflow"
      shotAlt={d.automation.shotAlt}
      flip
    />
  );
}
