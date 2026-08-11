/* =========================================================================
   Hero · 首屏主视觉（server 组件，动效全部交给 CSS）
   结构：氛围层（aurora + neuron-field）→ 上半两列（左文案 / 右品牌水母）
   → 下半通栏大图（SHOT-01 主窗口截图，压在水母光晕之上）。
   改版要点：首屏的主角从「模拟演示卡」换成真实产品截图，水母退为品牌光源。
   - 一切可见文案来自 d（Dict），不硬编码中英文。
   - 自定义入场动效在本文件 scoped <style> 内，并在 reduced-motion 下静默。
   ========================================================================= */

import { IconArrowRight, IconDownload, IconCheck } from "@/components/icons";
import Jellyfish from "@/components/Jellyfish";
import Shot from "@/components/Shot";
import { Reveal } from "@/components/ui";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Hero({ d }: { d: Dict; locale: Locale }) {
  return (
    <section className="section hero">
      {/* —— 底层氛围：极光 + 神经元星点，绝对定位铺底（z-index:0）—— */}
      <div className="aurora" aria-hidden="true" />
      <div className="neuron-field hero__field" aria-hidden="true" />

      <div className="container content">
        {/* —— 上半：左文案 / 右品牌水母 —— */}
        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal i={0}>
              <span className="eyebrow">{d.hero.eyebrow}</span>
            </Reveal>

            <Reveal i={1}>
              {/* 标题两行：主句 + 荧光点睛词（点睛词块级独占一行，
                  中英文均自然换行 + balance，避免强制 <br/> 在英文下产生参差） */}
              <h1 className="display hero__title" style={{ textWrap: "balance" }}>
                {d.hero.title}
                <span className="hero__accent">{d.hero.titleAccent}</span>
              </h1>
            </Reveal>

            <Reveal i={2}>
              <p className="lead hero__lead">{d.hero.sub}</p>
            </Reveal>

            <Reveal i={3}>
              <div className="hero__actions">
                {/* 主 CTA：下载（动作 = 陶土橙） */}
                <a className="btn btn--primary btn--lg" href="#download">
                  <IconDownload />
                  {d.hero.primary}
                </a>
                {/* 次 CTA：往下看能力总览（原「Web 版」入口已下线，不留死链） */}
                <a className="btn btn--ghost btn--lg" href="#scenes">
                  {d.hero.secondary}
                  <IconArrowRight />
                </a>
              </div>
            </Reveal>

            <Reveal i={4}>
              <ul className="hero__trust">
                {d.hero.trust.map((t) => (
                  <li key={t}>
                    <IconCheck aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* 右列：品牌水母 + 呼吸光晕。纯氛围，不拦截交互。 */}
          <div className="hero__art" aria-hidden="true">
            <span className="halo anim-halo hero__halo" />
            <Jellyfish className="anim-drift hero__jelly" />
          </div>
        </div>

        {/* —— 下半：通栏主截图。首屏 LCP，关掉懒加载。 —— */}
        <div className="hero__stage">
          <span className="halo hero__stage-halo" aria-hidden="true" />
          <Shot
            code="01-workspace"
            alt={d.hero.shotAlt}
            pending={d.a11y.shotPending}
            className="hero__shot"
            priority
          />
          <p className="hero__note muted">{d.hero.note}</p>
        </div>
      </div>

      <style>{`
        .hero {
          /* 首屏给足上方留白，避免被 sticky 顶栏遮挡 */
          padding-top: clamp(84px, 12vw, 156px);
          padding-bottom: clamp(40px, 6vw, 88px);
          overflow: hidden;
        }
        /* 收一点神经元星点的不透明度，作底纹而非主体 */
        .hero__field { opacity: 0.42; }

        .hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          align-items: center;
          gap: clamp(28px, 5vw, 64px);
        }

        .hero__copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(16px, 2.2vw, 24px);
        }
        /* 比全局 .display 略收一档：避免英文长标题在桌面下排成四行 */
        .hero__title {
          margin-top: 4px;
          font-size: clamp(2.3rem, 1.4rem + 3.4vw, 4rem);
        }
        /* 荧光点睛词独占一行 + 流光（shimmer）渐变文字 */
        .hero__accent {
          display: block;
          background: linear-gradient(100deg, #8fd2ff, #9a6bff 50%, #c084fc, #8fd2ff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 7s linear infinite;
        }
        .hero__lead { max-width: 36em; }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .hero__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 22px;
          margin: 2px 0 0;
          padding: 0;
          list-style: none;
          font-size: var(--fs-sm);
          color: var(--ink-2);
        }
        .hero__trust li {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .hero__trust svg {
          width: 15px;
          height: 15px;
          color: var(--glow-cyan);
        }

        /* 右列主视觉：水母与光晕居中叠放，一次性入场淡入（非滚动触发）。 */
        .hero__art {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(260px, 30vw, 400px);
          pointer-events: none;
          animation: heroArtIn 0.9s var(--ease-out) both;
        }
        @keyframes heroArtIn {
          from { opacity: 0; transform: translateY(8px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        .hero__jelly {
          position: relative;
          z-index: 1;
          width: clamp(240px, 28vw, 380px);
          height: auto;
          opacity: 0.95;
        }
        .hero__halo {
          width: clamp(320px, 40vw, 500px);
          height: clamp(320px, 40vw, 500px);
          z-index: 0;
        }

        /* —— 通栏主截图舞台 —— */
        .hero__stage {
          position: relative;
          margin-top: clamp(34px, 5vw, 70px);
          animation: heroStageIn 1s var(--ease-out) 0.2s both;
        }
        @keyframes heroStageIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: none; }
        }
        /* 截图背后的大范围冷光，把图从深色背景里托起来 */
        .hero__stage-halo {
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: min(96%, 1000px);
          height: 62%;
          filter: blur(46px);
          opacity: 0.7;
        }
        .hero__shot { position: relative; z-index: 1; }
        .hero__note {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          text-align: center;
          font-size: var(--fs-sm);
          color: var(--ink-3);
        }

        /* —— 移动端（≤860px）：单列。文案必须排在水母前面——把水母提到最上面
           会让首屏只剩一只水母，用户得滚动才知道这是什么产品。 —— */
        @media (max-width: 860px) {
          .hero__grid {
            grid-template-columns: 1fr;
            gap: clamp(18px, 5vw, 30px);
          }
          .hero__art {
            min-height: auto;
            padding-block: 10px;
          }
          .hero__jelly { width: clamp(150px, 38vw, 210px); opacity: 0.82; }
          .hero__halo {
            width: clamp(200px, 52vw, 290px);
            height: clamp(200px, 52vw, 290px);
          }
          .hero__actions { width: 100%; }
          .hero__stage { margin-top: clamp(22px, 6vw, 40px); }
        }

        /* globals.css 的 reduced-motion 只静默了 .anim-* 与 .reveal，
           本区块新增的一次性入场与流光需要单独屏蔽。 */
        @media (prefers-reduced-motion: reduce) {
          .hero__art,
          .hero__stage,
          .hero__accent { animation: none; }
        }
      `}</style>
    </section>
  );
}
