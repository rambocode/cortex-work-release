/* =========================================================================
   Contact · 「有问题？直接找我」（<section id="contact">）
   两张并排卡片：左 X 私信、右 GitHub Issues。整卡片可点，跳外链。
   卡片头部左侧是头像（X 用渐变字母头像，GitHub 用品牌水母标），右侧是
   平台 logo + 行动 pill；下方一段说明。
   server 组件：无 hooks、不读浏览器 API。

   想换成真实头像：把图片放进 public/，用 lib/asset.ts 的 asset() 拼路径后
   替换 .ct__avatar 里的内容（手写 <img src="/x.png"> 在子路径部署下必然 404）。
   ========================================================================= */

import { JellyMark } from "@/components/brand";
import { IconArrowRight, IconGithub, IconX } from "@/components/icons";
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
                  <span className={`ct__avatar ct__avatar--${c.kind}`} aria-hidden>
                    {/* X 卡片是「人」，用名字首字母；GitHub 卡片是「项目」，用品牌水母标 */}
                    {c.kind === "x" ? c.name.slice(0, 1) : <JellyMark size={26} />}
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
