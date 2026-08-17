import type { ReactElement } from "react";
import type { IconKey } from "@/lib/dictionary";

/* =========================================================================
   内联 SVG 图标库（线性图标）
   统一规范：viewBox 0 0 24 24 · fill none · stroke currentColor ·
   stroke-width 1.7 · 圆角线帽/线接。颜色随父级 currentColor，由调用方控制。
   品牌水母标见 brand.tsx（带渐变填充，不在此处）。

   区块组件不直接 import 具体图标，一律走底部的 Icon 映射表：
   const Glyph = Icon[item.icon]  →  <Glyph className="..." />
   ========================================================================= */

/** 所有线性图标共享的 <svg> 属性，保证线条风格统一。 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
};

type IconProps = { className?: string };
export type IconComponent = (p: IconProps) => ReactElement;

/* ===================== 场景与产出 ===================== */

/** 演示文稿：投影屏 + 底座支架 + 屏内两条内容线。 */
export function IconSlides({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7.5 8.5h6M7.5 11.8h4" />
      <path d="M12 16v4M9 20h6" />
    </svg>
  );
}

/** 深度研究：放大镜，镜内两条文本线，意指「读进去再查」。 */
export function IconResearch({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M8 9h5M8 12h3.5" />
      <path d="M15.4 15.4l4.6 4.6" />
    </svg>
  );
}

/** 合同审查：文档 + 右下印章圆，意指「盖章前先审一遍」。 */
export function IconContract({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 3.5h7.5L18 8v7" />
      <path d="M13 3.5V8h5" />
      <path d="M6 3.5v17h4.5" />
      <path d="M8.6 8h2.6M8.6 11.4h5.4" />
      <circle cx="16.6" cy="17.6" r="3.4" />
    </svg>
  );
}

/** 故障致歉：警示三角 + 感叹号。 */
export function IconIncident({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.8L21 19.5H3L12 3.8z" />
      <path d="M12 9.6v4.2" />
      <path d="M12 16.6h.01" />
    </svg>
  );
}

/** 知识库：合起的书本 + 书脊。 */
export function IconKnowledge({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 4.5h11.5a2.5 2.5 0 0 1 2.5 2.5v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5z" />
      <path d="M5 17a2.5 2.5 0 0 1 2.5-2.5H19" />
      <path d="M9 8h6" />
    </svg>
  );
}

/** 写作：斜置钢笔尖 + 一道下划线。 */
export function IconWriting({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M15.8 3.6l4.6 4.6-10 10-5.8 1.2 1.2-5.8 10-10z" />
      <path d="M14.2 5.2l4.6 4.6" />
    </svg>
  );
}

/** 设计稿：画板方框 + 一支笔的对角线与调色点。 */
export function IconDesign({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" />
      <circle cx="8.2" cy="8.2" r="1.6" />
      <path d="M3.6 17.2l5-5 3.4 3.4 3.2-3.2 5.2 5.2" />
    </svg>
  );
}

/** 工作流：三节点有向图，一进两出。 */
export function IconWorkflow({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.6" y="9.6" width="5.2" height="4.8" rx="1.4" />
      <rect x="16.2" y="3.6" width="5.2" height="4.8" rx="1.4" />
      <rect x="16.2" y="15.6" width="5.2" height="4.8" rx="1.4" />
      <path d="M7.8 12h4.4v-6h4" />
      <path d="M12.2 12v6h4" />
    </svg>
  );
}

/** 媒体生成：图片框 + 播放三角，覆盖图/声/乐/视频四模态。 */
export function IconMedia({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4.4" width="18" height="15.2" rx="2.4" />
      <path d="M10.2 9.6l4.6 2.8-4.6 2.8V9.6z" />
    </svg>
  );
}

/* ===================== 效率与自动化 ===================== */

/** 定时自动化：时钟表盘 + 一段循环回环箭头，意指「按节奏循环执行」。 */
export function IconAutomation({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M20.2 11.2a8 8 0 1 0-1.5 5.6" />
      <path d="M20.4 11.6V7.6M20.4 11.6h-3.4" />
      <path d="M12 7.6V12l2.8 1.7" />
    </svg>
  );
}

/** 任务：三行清单，前两行已打勾。 */
export function IconTasks({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3.4 6.6l1.7 1.7 3-3.2" />
      <path d="M3.4 13l1.7 1.7 3-3.2" />
      <path d="M11 6.4h9.6M11 12.8h9.6M11 19.2h6" />
      <path d="M4 19.2h3.6" />
    </svg>
  );
}

/** 记忆 / 做梦：脑轮廓 + 内部一颗光点。 */
export function IconMemory({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 4.2c-2.5 0-4.2 1.5-4.5 3.4C6 8 5 9.3 5 10.9c0 1.3.7 2.4 1.7 3-.2 1.9 1.3 3.6 3.4 3.6.5 1.3 1.6 2.3 3.1 2.3" />
      <path d="M12 4.2c2.5 0 4.2 1.5 4.5 3.4C18 8 19 9.3 19 10.9c0 1.3-.7 2.4-1.7 3" />
      <path d="M12 4.2v15.6" />
      <circle cx="15.6" cy="16.4" r="2.2" />
    </svg>
  );
}

/** 系统日历：日历外框 + 顶部挂耳 + 一个标记点。 */
export function IconCalendar({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
      <path d="M3.5 9.4h17" />
      <path d="M8 3.5v3M16 3.5v3" />
      <path d="M8.4 13.2h2.2M8.4 16.6h2.2M14 13.2h2.2" />
    </svg>
  );
}

/** 技能：拼图块，意指「按需拼装的能力」。 */
export function IconSkills({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M10 3.6a2 2 0 0 1 4 0c0 .6-.3 1-.3 1.4h4v4c-.4 0-.8-.3-1.4-.3a2 2 0 0 0 0 4c.6 0 1-.3 1.4-.3v4.8h-4.8c0-.4.3-.8.3-1.4a2 2 0 0 0-4 0c0 .6.3 1 .3 1.4H4.7V12c.4 0 .8.3 1.4.3a2 2 0 0 0 0-4c-.6 0-1 .3-1.4.3V5h5.6c0-.4-.3-.8-.3-1.4z" />
    </svg>
  );
}

/** MCP：中心方块 + 三条外接口，意指「统一协议接外部能力」。 */
export function IconMcp({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="8" y="8" width="8" height="8" rx="2" />
      <path d="M12 3.4V8M3.4 12H8M12 16v4.6M16 12h4.6" />
      <circle cx="12" cy="2.6" r="1" />
      <circle cx="2.6" cy="12" r="1" />
      <circle cx="21.4" cy="12" r="1" />
    </svg>
  );
}

/** 桌面宠物：圆脸 + 两只尖耳 + 两点眼睛。 */
export function IconPet({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5.4 8.6L4.4 4l4.2 2.3" />
      <path d="M18.6 8.6L19.6 4l-4.2 2.3" />
      <path d="M12 20.4c4 0 6.6-2.8 6.6-6.6S16 5.8 12 5.8 5.4 8.6 5.4 13.8 8 20.4 12 20.4z" />
      <path d="M9.8 13h.01M14.2 13h.01" />
      <path d="M10.6 16.4c.9.7 1.9.7 2.8 0" />
    </svg>
  );
}

/** 对话分支：主干 + 一条分叉，意指「重生成走分支不覆盖」。 */
export function IconBranch({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="7" cy="5.4" r="2.2" />
      <circle cx="7" cy="18.6" r="2.2" />
      <circle cx="17" cy="12" r="2.2" />
      <path d="M7 7.6v8.8" />
      <path d="M7 12h5.6c1.4 0 2.2 0 2.2 0" />
    </svg>
  );
}

/* ===================== 随手接住 ===================== */

/** 快捷回复：对话气泡 + 折返箭头。 */
export function IconReply({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M20.4 12.6c0 3.8-3.8 6.8-8.4 6.8-1 0-2-.2-2.9-.4L4 20.6l1.5-3.7C4.2 15.7 3.6 14.2 3.6 12.6c0-3.8 3.8-6.8 8.4-6.8s8.4 3 8.4 6.8z" />
      <path d="M13.4 9.8l-2.6 2.6 2.6 2.6" />
      <path d="M10.8 12.4h4.4" />
    </svg>
  );
}

/** 闪记：便签纸 + 右下折角 + 两行字。 */
export function IconNotes({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4.6 4.6h14.8v9.6l-5.2 5.2H4.6V4.6z" />
      <path d="M19.4 14.2h-5.2v5.2" />
      <path d="M8 8.6h8M8 11.8h5" />
    </svg>
  );
}

/** Spotlight 浮框：输入框 + 一枚火花，意指「热键唤起随手输入」。 */
export function IconSpotlight({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.8" y="7" width="18.4" height="10" rx="3" />
      <path d="M6.6 12h6" />
      <path d="M17 9.4c.2 1.3.6 1.7 1.9 1.9-1.3.2-1.7.6-1.9 1.9-.2-1.3-.6-1.7-1.9-1.9 1.3-.2 1.7-.6 1.9-1.9z" />
    </svg>
  );
}

/** 系统级听写：麦克风 + 左右两道扩散弧。 */
export function IconDictation({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="9.6" y="3.4" width="4.8" height="9.6" rx="2.4" />
      <path d="M6.6 11.4a5.4 5.4 0 0 0 10.8 0" />
      <path d="M12 16.8v3.8" />
      <path d="M3.4 8.6a8.6 8.6 0 0 1 .6-2.4M20.6 8.6a8.6 8.6 0 0 0-.6-2.4" />
    </svg>
  );
}

/* ===================== 动手能力 ===================== */

/** 电脑操作：显示器 + 屏内鼠标指针，意指「代你点本机应用」。 */
export function IconComputer({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.8" y="4" width="18.4" height="12.6" rx="2.2" />
      <path d="M9 20.4h6M12 16.6v3.8" />
      <path d="M9.6 7.6l5.4 4.2-2.4.5-.6 2.4-2.4-7.1z" />
    </svg>
  );
}

/** 内嵌浏览器：窗口 + 地址栏 + 一个圆形站点标。 */
export function IconBrowser({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2.4" />
      <path d="M2.8 9h18.4" />
      <circle cx="5.8" cy="6.7" r="0.7" />
      <circle cx="8.2" cy="6.7" r="0.7" />
      <path d="M11.4 6.7h7" />
    </svg>
  );
}

/** 终端：命令行框（提示符 + 光标行）。 */
export function IconTerminal({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="2.8" y="4.6" width="18.4" height="14.8" rx="2.4" />
      <path d="M6.4 9.2l2.4 2.2-2.4 2.2" />
      <path d="M11.4 14h6" />
    </svg>
  );
}

/** 多格式文档：两张叠放的文档，前一张带折角。 */
export function IconFiles({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M8.4 2.8h6L18.6 7v11.4H8.4V2.8z" />
      <path d="M14.4 2.8V7h4.2" />
      <path d="M15.2 18.4v1.4a1.4 1.4 0 0 1-1.4 1.4H6.8a1.4 1.4 0 0 1-1.4-1.4V6.6" />
    </svg>
  );
}

/** 文件夹：本地数据目录。 */
export function IconFolder({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3.2 6.6a2 2 0 0 1 2-2h3.6l2 2.6h6a2 2 0 0 1 2 2v8.2a2 2 0 0 1-2 2H5.2a2 2 0 0 1-2-2V6.6z" />
    </svg>
  );
}

/* ===================== 语音 / 工作台 / 子代理 ===================== */

/** 麦克风。 */
export function IconMic({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="9.6" y="3" width="4.8" height="10.4" rx="2.4" />
      <path d="M6.4 11.6a5.6 5.6 0 0 0 11.2 0" />
      <path d="M12 17.2v3.8M8.8 21h6.4" />
    </svg>
  );
}

/** 声波：五根高低不一的竖条，意指「边说边出字」。 */
export function IconWave({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 10.4v3.2M8 7.4v9.2M12 4.6v14.8M16 7.4v9.2M20 10.4v3.2" />
    </svg>
  );
}

/** 过程时间线：竖轴 + 三个节点与事件行。 */
export function IconTimeline({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 3.6v16.8" />
      <circle cx="6" cy="7" r="1.7" />
      <circle cx="6" cy="12.5" r="1.7" />
      <circle cx="6" cy="18" r="1.7" />
      <path d="M10 7h9M10 12.5h7M10 18h5" />
    </svg>
  );
}

/** 会话产物：卡片 + 右上火花，意指「生成物直接渲染成卡」。 */
export function IconArtifact({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="5.4" width="13.6" height="13.6" rx="2.4" />
      <path d="M6.6 10h6.4M6.6 13.6h4" />
      <path d="M18.6 3c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z" />
    </svg>
  );
}

/** 分屏：外框被一条竖线分成两半，右半再横分。 */
export function IconSplit({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4.4" width="18" height="15.2" rx="2.2" />
      <path d="M12 4.4v15.2" />
      <path d="M12 12h9" />
    </svg>
  );
}

/** 目标白板：靶心三环 + 中心点。 */
export function IconGoal({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="0.9" />
    </svg>
  );
}

/** 子代理编队：三个人形，前一后二。 */
export function IconSquad({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="8" r="2.8" />
      <path d="M7 19.4c0-2.8 2.2-4.8 5-4.8s5 2 5 4.8" />
      <path d="M5.6 7.2a2.2 2.2 0 1 0 .9 4.2" />
      <path d="M18.4 7.2a2.2 2.2 0 1 1-.9 4.2" />
      <path d="M2.8 17.4c0-2 1.2-3.4 3-3.8M21.2 17.4c0-2-1.2-3.4-3-3.8" />
    </svg>
  );
}

/** 自定义角色：单人 + 右下小徽章。 */
export function IconRole({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="10.4" cy="8" r="3.2" />
      <path d="M4.2 19.6c0-3.2 2.8-5.6 6.2-5.6 1 0 2 .2 2.8.6" />
      <circle cx="17.6" cy="17.2" r="3.4" />
      <path d="M16.2 17.2l1 1 2-2.2" />
    </svg>
  );
}

/** 自动挑角色：魔法棒 + 两枚星点。 */
export function IconAuto({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 20l10.6-10.6" />
      <path d="M13 7.4l3.6 3.6" />
      <path d="M17.6 3c.2 1.6.8 2.2 2.4 2.4-1.6.2-2.2.8-2.4 2.4-.2-1.6-.8-2.2-2.4-2.4 1.6-.2 2.2-.8 2.4-2.4z" />
      <path d="M20.4 12.6c.1 1 .5 1.4 1.5 1.5-1 .1-1.4.5-1.5 1.5-.1-1-.5-1.4-1.5-1.5 1-.1 1.4-.5 1.5-1.5z" />
    </svg>
  );
}

/** 委派卡片：一张卡 + 左侧进度点。 */
export function IconCard({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2.4" />
      <circle cx="7.2" cy="9.6" r="1.2" />
      <circle cx="7.2" cy="14.4" r="1.2" />
      <path d="M10.6 9.6h7M10.6 14.4h4.6" />
    </svg>
  );
}

/* ===================== 模型接入与安全 ===================== */

/** 订阅登录：箭头进门，意指 OAuth 登录已有账号。 */
export function IconLogin({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M13.4 3.6h4.6a2 2 0 0 1 2 2v12.8a2 2 0 0 1-2 2h-4.6" />
      <path d="M4 12h10" />
      <path d="M10.6 8.4L14.2 12l-3.6 3.6" />
    </svg>
  );
}

/** API Key：钥匙。 */
export function IconKey({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="7.6" cy="16.4" r="3.6" />
      <path d="M10.2 13.8L19.4 4.6" />
      <path d="M16.4 7.6l2.2 2.2M18.8 5.2l2 2" />
    </svg>
  );
}

/** 云平台。 */
export function IconCloud({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M7.4 18.4a4.4 4.4 0 0 1-.5-8.8 5.6 5.6 0 0 1 10.7 1.4 3.7 3.7 0 0 1-.6 7.4H7.4z" />
    </svg>
  );
}

/** 聚合网关：一进多出的分流节点。 */
export function IconGateway({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="5.6" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <circle cx="18" cy="18.4" r="2.2" />
      <path d="M8.4 12h7.4" />
      <path d="M8 10.6l7.9-4M8 13.4l7.9 4" />
    </svg>
  );
}

/** 自定义供应商 / 接入：插头。 */
export function IconPlug({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M9 3.4v4.2M15 3.4v4.2" />
      <path d="M6.4 7.6h11.2v3.2a5.6 5.6 0 0 1-11.2 0V7.6z" />
      <path d="M12 16.4v4.2" />
    </svg>
  );
}

/** 密钥安全：挂锁。 */
export function IconLock({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="4.6" y="10.4" width="14.8" height="10" rx="2.4" />
      <path d="M8 10.4V7.6a4 4 0 0 1 8 0v2.8" />
      <path d="M12 14.4v2.2" />
    </svg>
  );
}

/** 权限红线：盾牌 + 内部对勾。 */
export function IconShield({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3l7.4 2.8v5.6c0 4.4-3 7.8-7.4 9.6-4.4-1.8-7.4-5.2-7.4-9.6V5.8L12 3z" />
      <path d="M9.2 12.2l2 2 3.6-4" />
    </svg>
  );
}

/* ===================== UI 图标 ===================== */

/** 下载：向下箭头落入托盘。 */
export function IconDownload({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.5v10.5" />
      <path d="M7.8 10l4.2 4.2 4.2-4.2" />
      <path d="M4.5 18.5h15" />
    </svg>
  );
}

/* GitHub 标识见文件末尾「品牌 logo」一节：官方标只有实心版，
   之前这里的线性描边版无人使用，已移除，避免同一个 logo 两种画法。 */

/** 右向箭头：常用于「次要 CTA / 跳转」。 */
export function IconArrowRight({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4.5 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </svg>
  );
}

/** 地球：语言切换。 */
export function IconGlobe({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6c2.4 2.4 3.7 5.4 3.7 8.4s-1.3 6-3.7 8.4c-2.4-2.4-3.7-5.4-3.7-8.4s1.3-6 3.7-8.4z" />
    </svg>
  );
}

/** 对勾：列表要点 / 已完成。 */
export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
    </svg>
  );
}

/** 火花：智能 / 点睛点缀（四角星 + 一小星）。 */
export function IconSparkle({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.2c.5 3.6 1.8 4.9 5.4 5.4-3.6.5-4.9 1.8-5.4 5.4-.5-3.6-1.8-4.9-5.4-5.4 3.6-.5 4.9-1.8 5.4-5.4z" />
      <path d="M18.2 14.4c.2 1.6.8 2.2 2.4 2.4-1.6.2-2.2.8-2.4 2.4-.2-1.6-.8-2.2-2.4-2.4 1.6-.2 2.2-.8 2.4-2.4z" />
    </svg>
  );
}

/* ===================== 品牌 logo（填充型，风格例外） =====================
   X / GitHub 的官方标识只有实心版本，套不进上面 stroke 1.7 的线性规范。
   这两个刻意不走 base 属性、也不进 Icon 映射表（那张表只服务 dictionary 的
   内容图标），仅由 Contact 区块具名 import。 */

/** X（原 Twitter）标识。 */
export function IconX({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

/** GitHub 章鱼猫标识。 */
export function IconGithub({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1 .74 2.02 0 1.46-.01 2.63-.01 2.99 0 .29.2.64.76.53 4.35-1.45 7.5-5.56 7.5-10.41C23.01 5.24 18.27.5 12 .5z" />
    </svg>
  );
}

/* ===================== 图标映射表 ===================== */

/**
 * IconKey -> 图标组件。dictionary 里所有 icon 字段都从这张表取用，
 * 新增 IconKey 时 TypeScript 会在这里报缺失，不会漏实现。
 */
export const Icon: Record<IconKey, IconComponent> = {
  slides: IconSlides,
  research: IconResearch,
  contract: IconContract,
  incident: IconIncident,
  knowledge: IconKnowledge,
  writing: IconWriting,
  design: IconDesign,
  workflow: IconWorkflow,
  media: IconMedia,

  automation: IconAutomation,
  tasks: IconTasks,
  memory: IconMemory,
  calendar: IconCalendar,
  skills: IconSkills,
  mcp: IconMcp,
  pet: IconPet,
  branch: IconBranch,

  reply: IconReply,
  notes: IconNotes,
  spotlight: IconSpotlight,
  dictation: IconDictation,

  computer: IconComputer,
  browser: IconBrowser,
  terminal: IconTerminal,
  files: IconFiles,

  mic: IconMic,
  wave: IconWave,
  timeline: IconTimeline,
  artifact: IconArtifact,
  split: IconSplit,
  goal: IconGoal,
  squad: IconSquad,
  role: IconRole,
  auto: IconAuto,
  card: IconCard,

  login: IconLogin,
  key: IconKey,
  cloud: IconCloud,
  gateway: IconGateway,
  plug: IconPlug,
  lock: IconLock,
  shield: IconShield,
  folder: IconFolder,
};
