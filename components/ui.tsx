"use client";

// 站点通用客户端小工具：语言开关、进入视口揭示动画。
// 注：Reveal 需要浏览器能力，故整文件标记为客户端组件；
// LangSwitch 本身无客户端依赖（仅 next/link），在客户端组件中同样可正常工作。
// （站点恒为深海荧光深色，已移除主题切换 ThemeToggle。）

import Link from "next/link";
import { useEffect, useState } from "react";

import { IconGlobe } from "@/components/icons";
import { localeLabel, otherLocale, type Locale } from "@/lib/i18n";

/* ===================== 语言开关 ===================== */
// 链接到「另一种」语言的首页，文案显示目标语言名。
export function LangSwitch({ locale }: { locale: Locale }) {
  const target = otherLocale(locale);
  return (
    <Link className="btn btn--quiet" href={`/${target}`} aria-label={`Switch language to ${localeLabel[target]}`}>
      <IconGlobe />
      {localeLabel[target]}
    </Link>
  );
}

/* ===================== 进入视口揭示 ===================== */
// 包裹任意内容，元素进入视口时给根 div 加 is-visible 触发 .reveal 动画。
// 一次性：触发后即 disconnect。SSR 安全（无 IO 时直接显示，由全局 reduced-motion 兜底静默）。
export function Reveal({
  children,
  className,
  i,
}: {
  children: React.ReactNode;
  className?: string;
  i?: number;
}) {
  // 用 callback ref 拿到真实 DOM 节点并挂 IntersectionObserver。
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    // 环境不支持 IntersectionObserver 时（极端老环境 / 测试），直接显示，保证内容不丢。
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            io.disconnect(); // 一次性触发
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      className={`reveal ${className ?? ""}`}
      // --i 控制 .reveal 的 stagger 延迟（见 globals.css）。
      style={{ ["--i" as string]: i ?? 0 } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
