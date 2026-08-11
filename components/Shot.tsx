import { asset } from "@/lib/asset";
import { SHOTS, type ShotCode } from "@/lib/shots";

/* =========================================================================
   产品截图框（全站唯一的位图承载组件）
   - 图未到位时渲染占位框：用 aspect-ratio 按真实宽高比撑住高度，
     后续把 lib/shots.ts 的 file 字段填上即可无缝替换，页面不跳版。
   - src 一律经 asset() 加 basePath 前缀，否则子路径部署下必 404。
   - 无 "use client"：不含任何交互与浏览器 API，server 与 client 组件都能用
     （被 client 组件 import 时会一起进客户端包，体积可忽略）。
   ========================================================================= */

export type ShotChrome = "window" | "float" | "plain";

export default function Shot({
  code,
  alt,
  pending,
  chrome = "plain",
  className,
  priority = false,
}: {
  code: ShotCode;
  /** 图片替代文本，来自 dictionary（占位态也用它说明这里将放什么） */
  alt: string;
  /** 占位态给读屏用户的前缀，来自 d.a11y.shotPending */
  pending: string;
  /** plain = 只有描边（默认，适合本身已带窗口栏的整窗截图）；
      window = 额外套一层 mac 窗口栏（只给没有自带 chrome 的裁剪图用，
      否则会出现两层红黄绿灯）；float = 浮层截图，描边更弱 */
  chrome?: ShotChrome;
  className?: string;
  /** 首屏那张关掉懒加载，避免 LCP 被拖慢 */
  priority?: boolean;
}) {
  const meta = SHOTS[code];
  const ratio = `${meta.w} / ${meta.h}`;

  return (
    <figure className={`shot shot--${chrome} ${className ?? ""}`}>
      {chrome === "window" && (
        <div className="shot__bar" aria-hidden>
          <span className="shot__dot" />
          <span className="shot__dot" />
          <span className="shot__dot" />
        </div>
      )}

      <div className="shot__body" style={{ aspectRatio: ratio }}>
        {meta.file ? (
          <img
            className="shot__img"
            src={asset(`/shots/${meta.file}`)}
            alt={alt}
            width={meta.w}
            height={meta.h}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
          />
        ) : (
          // 占位态：读屏读到「产品截图待补：<描述>」，视觉上是一块带说明的虚线框。
          <div className="shot__ph" role="img" aria-label={`${pending}${alt}`}>
            <span className="shot__ph-code mono" aria-hidden>
              {code}
            </span>
            <span className="shot__ph-text" aria-hidden>
              {alt}
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}
