/* =========================================================================
   Contact · 「有问题？直接找我」（<section id="contact">）
   两张并排卡片：左 X 私信、右 GitHub Issues。整卡片可点，跳外链。
   卡片头部左侧是头像（X 用渐变字母头像，GitHub 用品牌水母标），右侧是
   平台 logo + 行动 pill；下方一段说明。
   server 组件：无 hooks、不读浏览器 API。

   换头像：把图片放进 public/，在 dictionary 的卡片上填 avatar 路径即可；
   路径必须经 asset() 拼 basePath，手写 <img src="/x.webp"> 在子路径部署下
   必然 404（见 lib/asset.ts）。
   ========================================================================= */

import { JellyMark } from "@/components/brand";
import { IconArrowRight, IconGithub, IconX } from "@/components/icons";
import { asset } from "@/lib/asset";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Contact({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="sec-head sec-head--center">
          <span className="eyebrow">{d.contact.eyebrow}</span>
          <h2 className="h2" id="contact-title">
            {d.contact.title}
          </h2>
          <p className="lead">{d.contact.sub}</p>
        </div>

        <div className="grid grid-2 ct__grid">
          {d.contact.cards.map((c) => {
            const Logo = c.kind === "x" ? IconX : IconGithub;
            return (
              <a
                key={c.kind}
                className="card card--pad card--hover ct__card"
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="ct__head">
                  <span
                    className={`ct__avatar ct__avatar--${c.kind}${c.avatar ? " ct__avatar--img" : ""}`}
                    aria-hidden
                  >
                    {/* 有头像图就用图；没有则回退——X 卡片用名字首字母，GitHub 卡片用品牌水母标 */}
                    {c.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element -- 静态导出关闭了图片优化，用原生 img 更直接
                      <img src={asset(c.avatar)} alt="" width={46} height={46} loading="lazy" />
                    ) : c.kind === "x" ? (
                      // name 可能是 "@handle" 形式，取首字母前先剥掉 @
                      c.name.replace(/^@/, "").slice(0, 1).toUpperCase()
                    ) : (
                      <JellyMark size={26} />
                    )}
                  </span>

                  <span className="ct__who">
                    <span className="ct__name">{c.name}</span>
                    <span className="ct__handle">{c.handle}</span>
                  </span>

                  <span className="ct__action">
                    <Logo className="ct__logo" />
                    <span className="pill ct__pill">
                      {c.action}
                      <IconArrowRight />
                    </span>
                  </span>
                </div>

                <p className="ct__desc">{c.desc}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
