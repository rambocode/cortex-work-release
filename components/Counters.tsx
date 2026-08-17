"use client";

/* =========================================================================
   下载数 / 在用人数的数字条（Download 区块内）
   数字口径与增长规则见 lib/counters.ts（静态站取不到 GA4 实时值，走模拟增长）。

   为什么要 client 组件：server 组件只在**构建期**跑一次，数字会被冻结在
   构建那一刻。这里的做法是——SSR 输出构建期基线（保证无 JS / 爬虫也看得到
   数字），挂载后再用浏览器当前时间重算并滚动到位。重算放在 useEffect 里，
   首次渲染与 HTML 完全一致，不会触发 hydration 不匹配。
   ========================================================================= */

import { useEffect, useRef, useState } from "react";

import { countersAt, formatCount } from "@/lib/counters";

/** 数字滚动时长（ms）。 */
const DURATION = 900;

/** 缓出曲线：起步快、收尾稳，和站点 --ease-out 的手感一致。 */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Counters({
  baseline,
  downloadsLabel,
  usersLabel,
}: {
  /** 构建期算好的初值，由 server 组件传入，用于 SSR 首帧。 */
  baseline: { downloads: number; users: number };
  downloadsLabel: string;
  usersLabel: string;
}) {
  const [value, setValue] = useState(baseline);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const target = countersAt(Date.now());
    const reduced =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 降低动效偏好、或环境不支持 IO 时，直接落到终值，不做滚动。
    if (reduced || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    // 从终值的 88% 起跳：既有「在涨」的观感，又不会假到从 0 开始数。
    const from = { downloads: Math.floor(target.downloads * 0.88), users: Math.floor(target.users * 0.88) };

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      const k = easeOut(t);
      setValue({
        downloads: Math.floor(from.downloads + (target.downloads - from.downloads) * k),
        users: Math.floor(from.users + (target.users - from.users) * k),
      });
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    // 区块在页面底部，进入视口才滚，否则用户永远看不到这段动画。
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          setValue(from);
          raf = requestAnimationFrame(tick);
          break;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="stats ct-stats" ref={hostRef}>
      <div>
        {/* tabular-nums 见 globals.css .ct-stats：滚动时数字不会左右抖 */}
        <div className="stats__value mono">{formatCount(value.downloads)}</div>
        <div className="stats__label">{downloadsLabel}</div>
      </div>
      <div>
        <div className="stats__value mono">{formatCount(value.users)}</div>
        <div className="stats__label">{usersLabel}</div>
      </div>
    </div>
  );
}
