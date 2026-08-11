/* =========================================================================
   Voice · 语音助手（server 组件）
   全站最新最重的一块能力，放在场景之后第一个讲。
   截图是浮在桌面上的语音球，用 float 外框（无 mac 窗口条）。
   ========================================================================= */

import Showcase from "@/components/Showcase";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Voice({ d }: { d: Dict; locale: Locale }) {
  return (
    <Showcase
      id="voice"
      d={d}
      eyebrow={d.voice.eyebrow}
      title={d.voice.title}
      sub={d.voice.sub}
      points={d.voice.points}
      shot="02-voice-orb"
      shotAlt={d.voice.shotAlt}
      chrome="float"
      flip
    />
  );
}
