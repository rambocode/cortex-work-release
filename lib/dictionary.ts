import type { Locale } from "./i18n";

/* =========================================================================
   全站文案 + 类型契约（内容唯一真源）
   区块组件统一接收 { d: Dict; locale: Locale }，只读取这里定义的 key。
   文案原则（落地页）：标题承载意义，支撑句简短克制，产品化语言而非营销腔。
   所有功能描述均对照 ../cortex-work v0.1.58 源码核实：不夸大、不把规划项
   说成已上线、不写团队协作 / Web 版 / Windows / 审计追踪（这几项均未落地）。
   ========================================================================= */

/** 图标键：与 components/icons.tsx 的 icon 映射表一一对应。 */
export type IconKey =
  // 场景与产出
  | "slides"
  | "research"
  | "contract"
  | "incident"
  | "knowledge"
  | "writing"
  | "design"
  | "workflow"
  | "media"
  // 能力
  | "automation"
  | "tasks"
  | "memory"
  | "calendar"
  | "skills"
  | "mcp"
  | "pet"
  | "branch"
  // 随手接住
  | "reply"
  | "notes"
  | "spotlight"
  | "dictation"
  // 动手
  | "computer"
  | "browser"
  | "terminal"
  | "files"
  // 语音 / 工作台 / 子代理
  | "mic"
  | "wave"
  | "timeline"
  | "artifact"
  | "split"
  | "goal"
  | "squad"
  | "role"
  | "auto"
  | "card"
  // 模型与安全
  | "login"
  | "key"
  | "cloud"
  | "gateway"
  | "plug"
  | "lock"
  | "shield"
  | "folder";

/** 联系作者卡片：kind 决定用哪个平台 logo 与哪种头像。 */
export interface ContactCard {
  kind: "x" | "github";
  /** 主标题：X 上是人名，GitHub 上是 owner/repo */
  name: string;
  /** 副标题：@handle 或平台名 */
  handle: string;
  /** 右上角行动 pill 的文案 */
  action: string;
  desc: string;
  href: string;
}

/** 标题 + 一句说明的要点条目（Voice / Workspace / Squad / Hands / Automation 共用）。 */
export interface Point {
  icon: IconKey;
  title: string;
  desc: string;
}

/** 场景 chip：一个能力入口 + 一句真实可跑的示例需求。 */
export interface SceneChip {
  icon: IconKey;
  label: string;
  example: string;
}

/** 产出物 tab：一类交付成品（演示文稿 / 深度研究 / 写作 / 设计稿 / 媒体生成）。 */
export interface MakeTab {
  /** 组件用它挑截图与图标，不参与展示 */
  key: "slides" | "research" | "writing" | "design" | "media";
  label: string;
  title: string;
  desc: string;
  points: string[];
  /** 对应截图的替代文本；media 无截图，留空字符串 */
  shotAlt: string;
}

/** 模型接入形态 tab。 */
export interface ModelTab {
  key: "login" | "apikey" | "cloud" | "gateway" | "custom";
  label: string;
  desc: string;
  /** 该形态下的代表性供应商，纯展示 */
  examples: string[];
}

/** 随手接住的四个入口。 */
export interface CaptureItem {
  icon: IconKey;
  title: string;
  /** 触发方式，等宽字体展示 */
  kbd: string;
  desc: string;
}

/** bento 网格里的一项能力。 */
export interface FeatureItem {
  icon: IconKey;
  title: string;
  desc: string;
}

/** 数字指标（模型区块顶部）。 */
export interface Stat {
  value: string;
  label: string;
}

/** 过程时间线示意图里的一步（CSS 自绘，见 components/mocks/TimelineMock.tsx）。 */
export interface TimelineStep {
  /** think = 思考行 · tool = 工具胶囊 · delegate = 子代理卡 */
  kind: "think" | "tool" | "delegate";
  /** 工具名 / 角色名，等宽展示 */
  name: string;
  /** 参数或摘要 */
  detail: string;
  /** 右侧的耗时或状态 */
  meta: string;
}

export interface Dict {
  meta: { title: string; description: string; ogAlt: string };
  brand: { name: string; tagline: string };
  nav: {
    scenes: string;
    voice: string;
    workspace: string;
    make: string;
    automation: string;
    models: string;
    github: string;
    download: string;
  };
  links: { github: string; releases: string; latest: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    sub: string;
    primary: string;
    secondary: string;
    trust: string[];
    note: string;
    shotAlt: string;
  };
  /** 能做什么：直接沿用 App 落地页的「日常办公 / 设计创意」两组入口 */
  scenes: {
    eyebrow: string;
    title: string;
    sub: string;
    groups: { key: "office" | "creative"; label: string; chips: SceneChip[] }[];
    hint: string;
  };
  voice: {
    eyebrow: string;
    title: string;
    sub: string;
    points: Point[];
    shotAlt: string;
  };
  workspace: {
    eyebrow: string;
    title: string;
    sub: string;
    points: Point[];
    /** 过程时间线是 CSS 自绘示意图（非截图），文案在这里 */
    mock: { summary: string; steps: TimelineStep[]; more: string; caption: string };
    shotAltSplit: string;
  };
  /** 产出物：tab 切换（client 组件） */
  make: { eyebrow: string; title: string; sub: string; tabs: MakeTab[] };
  squad: {
    eyebrow: string;
    title: string;
    sub: string;
    points: Point[];
    extra: string;
    shotAlt: string;
  };
  hands: {
    eyebrow: string;
    title: string;
    sub: string;
    /** 逐次确认红线，单独强调 */
    guard: { title: string; desc: string };
    points: Point[];
    /** 确认框是 CSS 自绘示意图（非截图），文案在这里 */
    mock: {
      badge: string;
      title: string;
      rows: { label: string; value: string }[];
      note: string;
      deny: string;
      allow: string;
      caption: string;
    };
  };
  automation: {
    eyebrow: string;
    title: string;
    sub: string;
    points: Point[];
    shotAlt: string;
  };
  capture: {
    eyebrow: string;
    title: string;
    sub: string;
    items: CaptureItem[];
    shotAlt: string;
    shotAltNotes: string;
  };
  /** 模型接入：tab 切换（client 组件） */
  models: {
    eyebrow: string;
    title: string;
    sub: string;
    stats: Stat[];
    tabs: ModelTab[];
    securityTitle: string;
    security: FeatureItem[];
  };
  features: { eyebrow: string; title: string; sub: string; items: FeatureItem[] };
  privacy: { title: string; items: FeatureItem[] };
  download: {
    eyebrow: string;
    title: string;
    sub: string;
    /** 两个架构按钮 */
    arches: { key: "arm64" | "x64"; label: string; note: string }[];
    cta: string;
    changelog: string;
    note: string;
    requirement: string;
    /** 下载数 / 在用人数的标签；数字本身由 lib/counters.ts 算出 */
    counters: { downloads: string; users: string };
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    cards: ContactCard[];
  };
  footer: {
    tagline: string;
    groups: { title: string; links: { label: string; href: string }[] }[];
    localFirst: string;
    copyright: string;
  };
  /** 无障碍专用文案：地标命名、跳转链接与 tablist 命名 */
  a11y: {
    primaryNav: string;
    footerNav: string;
    skipToContent: string;
    makeTabs: string;
    modelTabs: string;
    /** 截图尚未就位时，占位框对读屏用户的说明前缀 */
    shotPending: string;
  };
}

// 发布与源码统一指向公开的 release 仓库（下载、发布版本、查看 GitHub 全部跟随）。
const GITHUB = "https://github.com/rambocode/cortex-work-release";

// 作者的 X 主页，以及提问 / 报 bug 的 Issues 入口（Contact 区块两张卡片）。
const X_URL = "https://x.com/daveylan2";
const ISSUES = `${GITHUB}/issues`;

const zh: Dict = {
  meta: {
    title: "Cortex Desktop · 会听、会说、会动手的本地 AI 工作站",
    description:
      "开口说话它就接住，让它替你操作本机应用、派一队子代理并行干活，直接产出演示文稿、研究报告与文档。37 家模型供应商随你接，会话、文件与密钥都留在你的 Mac 上。",
    ogAlt: "Cortex Desktop — 会听、会说、会动手的本地 AI 工作站",
  },
  brand: { name: "Cortex Desktop", tagline: "本地 AI 工作站" },
  nav: {
    scenes: "能做什么",
    voice: "语音",
    workspace: "工作台",
    make: "产出",
    automation: "自动化",
    models: "模型",
    github: "GitHub",
    download: "下载",
  },
  links: { github: GITHUB, releases: `${GITHUB}/releases`, latest: `${GITHUB}/releases/latest` },

  hero: {
    eyebrow: "本地优先 · macOS",
    title: "会听，会说，",
    titleAccent: "还会替你动手",
    sub: "Cortex Desktop 不是又一个聊天框。开口跟它说，它听得懂也答得上；让它替你点鼠标、敲键盘操作本机应用；一个人忙不过来时派一队子代理并行干。最后交到你手上的是能直接用的 PPT、研究报告和文档——全程跑在你自己的 Mac 上。",
    primary: "免费下载 macOS 版",
    secondary: "看看它能做什么",
    trust: [
      "内置 Cortex，装完就能用",
      "也能接你本机的 Claude Code 与 Codex",
      "37 家供应商 · 1000+ 模型",
    ],
    note: "macOS · Apple Silicon 与 Intel · 支持自动更新",
    shotAlt: "Cortex Desktop 主窗口：左侧项目与会话列表，中间正在执行的会话，右侧工具栏",
  },

  scenes: {
    eyebrow: "能做什么",
    title: "从一句话，到一份能交出去的东西",
    sub: "下面这些都是应用里现成的入口。点一个场景，补一句你的需求，就能开跑。",
    groups: [
      {
        key: "office",
        label: "日常办公",
        chips: [
          {
            icon: "slides",
            label: "演示文稿",
            example: "做一份新品发布会演讲 PPT，10 页，开场要有冲击力，结尾放行动号召",
          },
          {
            icon: "research",
            label: "深度研究",
            example: "调研 2026 年国内 AI 编程助手的市场格局、主要玩家与商业模式",
          },
          {
            icon: "contract",
            label: "合同审查",
            example: "把这份合同按乙方视角审一遍，逐条标出风险等级和修改建议",
          },
          {
            icon: "incident",
            label: "故障致歉",
            example: "昨晚 23:05 到 01:10 平台无法访问，写一份可以直接发给客户的情况说明",
          },
          {
            icon: "knowledge",
            label: "公司知识库",
            example: "公司的差旅报销标准是怎么规定的？给我出处",
          },
          {
            icon: "writing",
            label: "写作",
            example: "把这份会议纪要扩写成一篇完整的项目复盘，保留原有结论",
          },
          {
            icon: "automation",
            label: "自动化",
            example: "每天早上 9 点帮我总结一遍 AI 新闻，推到飞书",
          },
        ],
      },
      {
        key: "creative",
        label: "设计创意",
        chips: [
          {
            icon: "design",
            label: "设计稿",
            example: "设计一个 SaaS 产品的落地页，深色主题，首屏要有清晰的价值主张",
          },
          {
            icon: "slides",
            label: "演示文稿",
            example: "做一份 6 页的产品介绍 PPT，像素游戏风格排版，配色炫酷丰富",
          },
          {
            icon: "workflow",
            label: "Loop 工作流",
            example: "抓竞品更新 → AI 归纳要点 → 判断是否重要 → 重要的推给我",
          },
        ],
      },
    ],
    hint: "示例取自应用内的场景入口，点开即用。",
  },

  voice: {
    eyebrow: "语音助手",
    title: "不用打字，喊一声就行",
    sub: "一颗悬浮语音球。说完自动发送，回复念完自动重新开麦，可以一直聊下去。",
    points: [
      {
        icon: "mic",
        title: "喊出唤醒词就来",
        desc: "不用点按钮，也不用记快捷键。唤醒识别全程在本地完成，日常环境音不会被传出去。",
      },
      {
        icon: "wave",
        title: "本地识别，边说边出字",
        desc: "内置 SenseVoiceSmall 与流式识别引擎，中英日韩粤都认，说话时文字就在上屏。音频不落盘、不上传。",
      },
      {
        icon: "artifact",
        title: "写一句念一句，随时能打断",
        desc: "不必等整段生成完才开口。它念到一半你直接说话，它立刻停下转去听你的——不会被自己的回声或键盘声误触发。",
      },
      {
        icon: "plug",
        title: "说出来的事真会被执行",
        desc: "语音走的是和打字完全相同的会话管线。你交代的事，它能调用电脑操作、定时任务、日历、MCP 与技能去做，不是只能闲聊。",
      },
    ],
    shotAlt: "浮在桌面上的语音球，上方磨砂浮层正在滚动显示回复内容",
  },

  workspace: {
    eyebrow: "会话工作台",
    title: "它每一步在做什么，你都看得见",
    sub: "大部分 AI 应用只给你一个转圈的图标。这里把中间过程摊开给你看。",
    points: [
      {
        icon: "timeline",
        title: "过程时间线",
        desc: "在想什么、调了哪个工具、派了哪个子代理，按时间线逐步展开，每一步进行到哪里都看得到。",
      },
      {
        icon: "artifact",
        title: "产物就在会话里",
        desc: "生成的网页、图表、SVG 与文档直接渲染成卡片，改一次原地更新并标好版本，全程沙箱隔离，重启还能回看。",
      },
      {
        icon: "split",
        title: "想比对就分屏",
        desc: "把会话拖到当前窗格的上下左右任意一侧就分开，横向数量不限。查资料、比答案不用来回切。",
      },
      {
        icon: "goal",
        title: "目标白板",
        desc: "长任务的目标与进展被整理到右侧白板上，边聊边更新，做到哪一步一目了然，内容随会话一起保存。",
      },
    ],
    mock: {
      summary: "已处理 41 秒 · 9 步 · 读了 3 个文件 · 调用了 6 个工具",
      steps: [
        { kind: "think", name: "思考", detail: "先看看这个项目的目录结构和依赖", meta: "2.4s" },
        { kind: "tool", name: "read", detail: "package.json", meta: "0.1s" },
        { kind: "tool", name: "bash", detail: "rg --files -g '*.ts' | head -40", meta: "0.3s" },
        { kind: "delegate", name: "仓库勘探", detail: "梳理数据层与状态管理的边界", meta: "运行中" },
        { kind: "tool", name: "write", detail: "docs/architecture.md", meta: "0.2s" },
      ],
      more: "查看完整过程",
      caption: "会话过程时间线（示意）",
    },
    shotAltSplit: "同屏并列的多个会话窗格，各自独立对话",
  },

  make: {
    eyebrow: "产出",
    title: "它交给你的是成品，不是一段文字",
    sub: "不用复制粘贴再自己排版。下面每一类都能导出成可以直接用的文件。",
    tabs: [
      {
        key: "slides",
        label: "演示文稿",
        title: "一句话，到一份可以直接放映的 PPT",
        desc: "说清主题，它先给提纲；确认后从 35 套以上的内置模板里挑一套生成，逐页可改。",
        points: [
          "画布上直接拖动、吸附对齐、换图、调层级，撤销重做齐全",
          "自动写演讲者备注，支持双屏放映",
          "导出可编辑的 PPTX，也能出 PDF、PNG 与网页版",
        ],
        shotAlt: "演示文稿编辑器：左侧页面缩略图列表，右侧当前页的深色模板稿",
      },
      {
        key: "research",
        label: "深度研究",
        title: "自动拆解问题，查完还要交叉验证",
        desc: "内置研究引擎会把问题拆成子课题、分头联网检索、互相印证，最后产出一份带引用的完整报告。",
        points: [
          "执行过程实时可见，报告流式输出，不用干等",
          "正文里的引用点一下就能在右栏看原文出处",
          "研究强度与来源范围可调，报告自动归档到所选项目",
        ],
        shotAlt: "深度研究报告面板：正文带引用角标，右侧展开引用原文预览",
      },
      {
        key: "writing",
        label: "写作台",
        title: "写的时候，一直有人陪着你改",
        desc: "把任意本地目录加成写作空间，富文本、实时预览、纯预览、源码四档视图随手切。",
        points: [
          "打字时给灰字续写，⌘K 就地改写选中的段落",
          "助手改稿以行级红绿 diff 呈现，一块一块接受或拒绝",
          "导出 DOCX / PDF / HTML / PNG，选中文字还能生成信息图",
        ],
        shotAlt: "写作台三栏界面，正文中显示行级红绿 diff 与逐块接受、拒绝按钮",
      },
      {
        key: "design",
        label: "设计稿",
        title: "用自然语言描述，出真能用的设计稿",
        desc: "描述你想要的页面或组件，多个方案并行生成，实时预览。",
        points: [
          "多个页面同时生成，边生成边看",
          "画布上的修改会回流到会话，接着聊就能继续改",
          "一键从设计稿生成代码",
        ],
        shotAlt: "设计稿编辑器画布，展示一张生成好的网页设计稿与实时预览",
      },
      {
        key: "media",
        label: "媒体生成",
        title: "图、声、乐、视频，四类都能生成",
        desc: "在会话里直接说要什么，生成结果落进当前工作目录。",
        points: [
          "图片支持参考图改图与质量档位",
          "视频支持首帧、末帧控制",
          "密钥可以直接复用你在「模型」里已经配好的那份",
        ],
        shotAlt: "",
      },
    ],
  },

  squad: {
    eyebrow: "子代理",
    title: "一个人干不完的，就派一队",
    sub: "主 Agent 会自己判断该拆几件事、派给谁，然后并行开跑。",
    points: [
      {
        icon: "squad",
        title: "45 个以上的内置角色",
        desc: "仓库勘探、代码审查、安全审计、事实核查、用户研究……按任务性质挑人，标了只读的角色不会改你的文件。",
      },
      {
        icon: "role",
        title: "也能自己捏一个",
        desc: "起名、选头像、写职责，还能限定它只用哪些工具、跑哪个模型、用多大的思考强度。",
      },
      {
        icon: "auto",
        title: "不想挑就让它自己挑",
        desc: "打开自动角色，AI 按任务类型自动选合适的角色去干活，你不用先想清楚该派谁。",
      },
      {
        icon: "card",
        title: "派出去了也看得见",
        desc: "每个子任务在会话里是一张卡片，实时显示进展；点开就能看它完整的执行记录。",
      },
    ],
    extra: "也可以手动点名：在输入框 @ 上几个角色，它们按你提及的顺序依次发言。",
    shotAlt: "会话中并行运行的多张子代理卡片，各自显示当前进展",
  },

  hands: {
    eyebrow: "动手能力",
    title: "它不只是给建议，它能真的去做",
    sub: "很多事没有 API，只有界面。那就让它像人一样去点。",
    guard: {
      title: "每一次动你的电脑，都要你点「允许」",
      desc: "点击、输入、拖拽、按快捷键、写剪贴板——任何会真实改动电脑的操作都必须逐次确认，即使执行权限选的是「自动执行」也不例外。这条不可让步。",
    },
    points: [
      {
        icon: "computer",
        title: "电脑操作",
        desc: "代你点鼠标、按键盘，直接操作本机上的任意应用，包括那些根本没有 API 的老软件。",
      },
      {
        icon: "browser",
        title: "浏览器",
        desc: "右栏内嵌浏览器，可以让它导航、点击、填表、截图、读页面内容；浏览器自动化程序随安装包自带，不用你先装一堆东西。",
      },
      {
        icon: "terminal",
        title: "终端与文件",
        desc: "内置终端、文件树与 Git 信息条。代码用 Monaco 看，表格能直接改单元格和公式，PDF、DOCX、PPTX 都能预览。",
      },
      {
        icon: "files",
        title: "什么格式都读得懂",
        desc: "23 种文档格式解析，含旧版 Office、RTF、EPUB、ODF；标题、表格与列表结构都保留下来，它读表格类文档不会读串行。",
      },
    ],
    mock: {
      badge: "需要你确认",
      title: "允许 Cortex 操作「Keynote」？",
      rows: [
        { label: "动作", value: "点击" },
        { label: "目标", value: "菜单项「导出为…」" },
        { label: "位置", value: "(1284, 96)" },
      ],
      note: "这一步会真实点在你的屏幕上。不点「允许」就不会发生。",
      deny: "拒绝",
      allow: "允许",
      caption: "电脑操作确认框（示意）",
    },
  },

  automation: {
    eyebrow: "无人值守",
    title: "你不在电脑前，它照样在干活",
    sub: "把重复的事交出去，结果自己会找上门。",
    points: [
      {
        icon: "automation",
        title: "说一句，定时任务就建好了",
        desc: "「每天早上 9 点帮我总结 AI 新闻」——它当场就建好，列表里带「AI 创建」角标。建、改、删、立即运行都得你先点允许。",
      },
      {
        icon: "workflow",
        title: "Loop 可视化工作流",
        desc: "26 种节点搭一条流水线：定时或 Webhook 触发、AI 处理、条件分支、HTTP 请求、子工作流、循环，还能插一个人工审批节点卡住等你点头。",
      },
      {
        icon: "reply",
        title: "结果送到你眼前",
        desc: "企业微信、钉钉、飞书、邮件四个渠道，跑完直接推给你，不用回去翻。",
      },
      {
        icon: "notes",
        title: "没开着窗口也丢不了",
        desc: "运行结果、Loop 播报、任务提醒和可用更新统一进消息中心，保留 60 天，事后照样找得到。",
      },
    ],
    shotAlt: "Loop 工作流画布：触发节点、AI 处理、条件分支与输出节点连成一条完整流水线",
  },

  capture: {
    eyebrow: "随手接住",
    title: "别让手上的事被打断",
    sub: "这四个入口都在主窗口之外，不用先切回来。",
    items: [
      {
        icon: "reply",
        title: "快捷回复",
        kbd: "双击 ⌘",
        desc: "在微信、邮件这些应用里双击 ⌘ 或按住 Fn 说话，弹出一层不抢焦点的候选草稿，回车直接写回输入框。它会学你的语气，约时间时还会带上你日历里的空档。",
      },
      {
        icon: "notes",
        title: "闪记",
        kbd: "⌘⇧N",
        desc: "灵感来了随手记一条。独立浮层窗口，不打断当前会话，也不会挤进会话上下文。",
      },
      {
        icon: "spotlight",
        title: "Spotlight 浮框",
        kbd: "全局热键",
        desc: "一个热键唤起输入框，想到什么直接丢给它，不用先找到窗口。",
      },
      {
        icon: "dictation",
        title: "系统级听写",
        kbd: "全局热键",
        desc: "在任何应用里口述输入，按住说或切换模式都行，转写结果还能由 AI 自动纠正同音字与专有名词。",
      },
    ],
    shotAlt: "第三方聊天窗口上方浮着的快捷回复候选草稿气泡",
    shotAltNotes: "浮在桌面上的闪记输入框，底部可以选归属的项目",
  },

  models: {
    eyebrow: "模型",
    title: "模型你自己接，密钥不出这台机器",
    sub: "内置目录收录了 37 家供应商、1000 多个模型。五种接入方式，挑顺手的那个。",
    stats: [
      { value: "37", label: "家供应商" },
      { value: "1000+", label: "个模型" },
      { value: "5", label: "种接入方式" },
    ],
    tabs: [
      {
        key: "login",
        label: "订阅登录",
        desc: "已经有 Claude、ChatGPT、Copilot 之类的订阅，OAuth 登录一次就能用，不用另外买 API 额度。",
        examples: ["Anthropic", "OpenAI Codex", "GitHub Copilot", "xAI", "OpenRouter", "Kimi"],
      },
      {
        key: "apikey",
        label: "API Key",
        desc: "粘贴即存，一行一保存。每一家都能单独填自建网关或代理地址，不用为了改个地址翻遍设置。",
        examples: ["DeepSeek", "Moonshot Kimi", "Z.AI", "MiniMax", "Qwen", "Groq", "Mistral", "Together"],
      },
      {
        key: "cloud",
        label: "云平台",
        desc: "公司已经在云上开了模型服务，填好凭据与区域即可，模型清单由平台侧给出。",
        examples: ["Amazon Bedrock", "Google Vertex AI", "Azure OpenAI"],
      },
      {
        key: "gateway",
        label: "聚合网关",
        desc: "new-api、one-api 这类网关，填地址加密钥就自动拉回可用模型清单，勾选启用即可，一行 JSON 都不用手写。",
        examples: ["new-api", "one-api", "Vercel AI Gateway", "Cloudflare AI Gateway"],
      },
      {
        key: "custom",
        label: "自定义",
        desc: "目录里没收录的，用预制表单声明协议、地址与模型能力就能接进来，密钥走引用不写死。",
        examples: ["自建推理服务", "私有化部署", "内部网关"],
      },
    ],
    securityTitle: "接进来之后",
    security: [
      {
        icon: "lock",
        title: "密钥进系统钥匙串",
        desc: "配置文件里只留一个引用名，明文不落盘；真正的密钥在发请求那一刻才解出来。",
      },
      {
        icon: "shield",
        title: "能力自动识别",
        desc: "图片输入、上下文长度、推理档位自动判定。判不出来就明确标成未知，绝不替你猜一个。",
      },
      {
        icon: "plug",
        title: "不会偷偷换模型",
        desc: "解析不到你选的那个供应商就当场报错中止。界面上显示的模型，就是实际会跑的模型。",
      },
    ],
  },

  features: {
    eyebrow: "更多",
    title: "剩下这些，也都在包里",
    sub: "不是加购项，装完就有。",
    items: [
      {
        icon: "tasks",
        title: "任务与项目",
        desc: "无限层级子任务、定时提醒、重复规则，外加一个独立的项目管理窗口。任务能一键委派给 Agent 去做，进度自动回写。",
      },
      {
        icon: "memory",
        title: "记忆与「做梦」",
        desc: "空闲时和每天凌晨回放近期对话，提炼出你的画像、偏好与项目背景，自动带进之后每次对话。记忆存成三份 markdown，你能直接打开改。",
      },
      {
        icon: "knowledge",
        title: "公司知识库",
        desc: "接上远端知识库后，回答里会带出引用标记，点一下在右栏看原文，不用自己去翻文档。",
      },
      {
        icon: "calendar",
        title: "系统日历",
        desc: "问「我下周三下午有空吗」，也能让它把评审记进日历——往日历里写之前会先跟你确认。",
      },
      {
        icon: "skills",
        title: "技能与扩展市场",
        desc: "技能库是两栏文件树，模板、脚本都能就地预览编辑；插件与扩展从市场装，跨设备共享。",
      },
      {
        icon: "mcp",
        title: "MCP",
        desc: "既能接你自己的 MCP server（stdio 与 HTTP 都行），也内置了十几个能力域直接交给 Agent 用。",
      },
      {
        icon: "pet",
        title: "桌面宠物",
        desc: "4000 多只可换。它会跟着 Agent 的状态变姿态——思考、执行工具、等你审批、任务失败各不一样，扫一眼就知道进行到哪了。",
      },
      {
        icon: "branch",
        title: "分支、归档与搜索",
        desc: "重新生成走分支，不覆盖原来的回复，翻页对照着看；会话能归档、能全文搜索。",
      },
    ],
  },

  privacy: {
    title: "本地优先，不是一句口号",
    items: [
      {
        icon: "folder",
        title: "数据就在你的硬盘上",
        desc: "会话、闪记、任务、自动化、记忆全在 ~/.cortex-desktop/，Finder 直接打开，都是能读能改的文件。",
      },
      {
        icon: "lock",
        title: "凭据进系统钥匙串",
        desc: "由 macOS 加密保管，配置文件里只有引用名，明文不落盘。",
      },
      {
        icon: "mic",
        title: "语音全程本地",
        desc: "唤醒词识别与本地语音识别都在你的机器上跑，音频零落盘、零上传。",
      },
      {
        icon: "shield",
        title: "权限握在你手里",
        desc: "执行权限分「计划 / 询问 / 自动」三档。选「计划」时，它手里物理上就没有写文件和执行命令的工具。",
      },
    ],
  },

  download: {
    eyebrow: "开始用",
    title: "装上它，先让它替你干一件事",
    sub: "免费下载。安装后在设置里接一个你自己的模型供应商，就能开始。",
    arches: [
      { key: "arm64", label: "Apple Silicon", note: "M 系列芯片的 Mac" },
      { key: "x64", label: "Intel", note: "较早的 Intel Mac" },
    ],
    cta: "下载",
    changelog: "看更新日志",
    note: "macOS · 支持应用内自动更新",
    requirement: "需要自备模型供应商：已有订阅可直接登录，也可以填 API Key。",
    counters: { downloads: "累计下载", users: "在用的人" },
  },

  contact: {
    eyebrow: "找作者",
    title: "有问题？直接找我",
    sub: "一个人做的产品，没有客服工单系统。用着别扭、少个功能、崩了，说一声就行。",
    cards: [
      {
        kind: "x",
        name: "Davey",
        handle: "@daveylan2",
        action: "私信我",
        desc: "Cortex Desktop 的作者。产品进展、新版本和日常都在这里更新，私信一直开着。",
        href: X_URL,
      },
      {
        kind: "github",
        name: "cortex-work-release",
        handle: "GitHub Issues",
        action: "提 Issue",
        desc: "Bug、功能建议、装不上跑不通，都发到 Issues。公开可见，我逐条看、逐条回。",
        href: ISSUES,
      },
    ],
  },

  footer: {
    tagline: "会听、会说、会动手的本地 AI 工作站。",
    groups: [
      {
        title: "产品",
        links: [
          { label: "能做什么", href: "#scenes" },
          { label: "语音助手", href: "#voice" },
          { label: "会话工作台", href: "#workspace" },
          { label: "产出", href: "#make" },
          { label: "子代理", href: "#squad" },
        ],
      },
      {
        title: "能力",
        links: [
          { label: "动手能力", href: "#hands" },
          { label: "自动化", href: "#automation" },
          { label: "随手接住", href: "#capture" },
          { label: "模型接入", href: "#models" },
          { label: "更多能力", href: "#features" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "下载", href: "#download" },
          { label: "找作者", href: "#contact" },
          { label: "GitHub", href: GITHUB },
          { label: "发布版本", href: `${GITHUB}/releases` },
          { label: "反馈问题", href: ISSUES },
        ],
      },
    ],
    localFirst: "本地优先：你的会话、文件与密钥都不离开这台 Mac。",
    copyright: "© 2026 Cortex Desktop",
  },

  a11y: {
    primaryNav: "主导航",
    footerNav: "页脚导航",
    skipToContent: "跳到主内容",
    makeTabs: "产出类型",
    modelTabs: "模型接入方式",
    shotPending: "产品截图待补：",
  },
};

const en: Dict = {
  meta: {
    title: "Cortex Desktop · A local AI workstation that listens, speaks, and acts",
    description:
      "Talk to it out loud. Let it drive the apps on your Mac, dispatch a squad of subagents to work in parallel, and hand you finished decks, research reports, and documents. Bring your own models from 37 providers — your chats, files, and keys never leave the machine.",
    ogAlt: "Cortex Desktop — a local AI workstation that listens, speaks, and acts",
  },
  brand: { name: "Cortex Desktop", tagline: "Local AI workstation" },
  nav: {
    scenes: "What it does",
    voice: "Voice",
    workspace: "Workspace",
    make: "Output",
    automation: "Automation",
    models: "Models",
    github: "GitHub",
    download: "Download",
  },
  links: { github: GITHUB, releases: `${GITHUB}/releases`, latest: `${GITHUB}/releases/latest` },

  hero: {
    eyebrow: "Local-first · macOS",
    title: "It listens, it talks,",
    titleAccent: "and it does the work",
    sub: "Cortex Desktop isn't another chat box. Speak to it and it answers. Let it click and type its way through the apps on your Mac. When one worker isn't enough, it dispatches a squad of subagents in parallel. What you get back is a finished deck, report, or document — produced entirely on your own machine.",
    primary: "Download for macOS",
    secondary: "See what it does",
    trust: [
      "Cortex is built in — works out of the box",
      "Or drive your local Claude Code and Codex",
      "37 providers · 1000+ models",
    ],
    note: "macOS · Apple Silicon and Intel · auto-updates",
    shotAlt:
      "The Cortex Desktop main window: projects and chats on the left, a running session in the middle, tool rail on the right",
  },

  scenes: {
    eyebrow: "What it does",
    title: "From one sentence to something you can actually send",
    sub: "These are real entry points in the app. Pick a scenario, add a line of your own, and it runs.",
    groups: [
      {
        key: "office",
        label: "Everyday work",
        chips: [
          {
            icon: "slides",
            label: "Slide decks",
            example: "Build a 10-slide launch keynote — strong opening, clear call to action at the end",
          },
          {
            icon: "research",
            label: "Deep research",
            example: "Map the 2026 AI coding assistant market: key players, positioning, business models",
          },
          {
            icon: "contract",
            label: "Contract review",
            example: "Review this contract from the supplier's side — flag risk level and edits clause by clause",
          },
          {
            icon: "incident",
            label: "Incident notice",
            example: "The platform was down from 23:05 to 01:10 last night — draft a customer-facing statement",
          },
          {
            icon: "knowledge",
            label: "Company knowledge",
            example: "What's our travel reimbursement policy? Cite the source",
          },
          {
            icon: "writing",
            label: "Writing",
            example: "Turn these meeting notes into a full project retrospective, keep the conclusions intact",
          },
          {
            icon: "automation",
            label: "Automation",
            example: "Every weekday at 9am, summarize AI news and push it to my team chat",
          },
        ],
      },
      {
        key: "creative",
        label: "Design & ideas",
        chips: [
          {
            icon: "design",
            label: "Design mockups",
            example: "Design a SaaS landing page — dark theme, sharp value proposition above the fold",
          },
          {
            icon: "slides",
            label: "Slide decks",
            example: "A 6-slide product intro deck, pixel-game styling, bold color palette",
          },
          {
            icon: "workflow",
            label: "Loop workflows",
            example: "Fetch competitor updates → summarize → judge importance → notify me if it matters",
          },
        ],
      },
    ],
    hint: "Examples taken straight from the scenario shortcuts inside the app.",
  },

  voice: {
    eyebrow: "Voice assistant",
    title: "Skip the typing — just say it",
    sub: "One floating orb. It sends when you stop talking, reopens the mic when it finishes speaking, and keeps the conversation going.",
    points: [
      {
        icon: "mic",
        title: "Wake it with a word",
        desc: "No button, no shortcut to memorize. Wake-word detection runs entirely on device — ambient sound never leaves your Mac.",
      },
      {
        icon: "wave",
        title: "Local transcription, streaming as you speak",
        desc: "SenseVoiceSmall plus a streaming recognizer, covering Chinese, English, Japanese, Korean and Cantonese. Text appears while you talk; audio is never written to disk or uploaded.",
      },
      {
        icon: "artifact",
        title: "It speaks as it writes — cut in anytime",
        desc: "No waiting for the full answer. Start talking mid-sentence and it stops to listen. Its own echo and your keyboard won't trigger a false interrupt.",
      },
      {
        icon: "plug",
        title: "What you say actually gets done",
        desc: "Voice runs through exactly the same session pipeline as typing. It can drive your computer, create scheduled jobs, check your calendar, and call MCP tools and skills — not just chat.",
      },
    ],
    shotAlt: "The voice orb floating on the desktop, with a frosted panel above it streaming the reply",
  },

  workspace: {
    eyebrow: "Session workspace",
    title: "You can see every step it takes",
    sub: "Most AI apps give you a spinner. This one opens up the middle.",
    points: [
      {
        icon: "timeline",
        title: "Process timeline",
        desc: "What it's thinking, which tool it called, which subagent it dispatched — laid out step by step, so you always know where it is.",
      },
      {
        icon: "artifact",
        title: "Artifacts live in the chat",
        desc: "Generated pages, charts, SVGs and documents render as cards right there. Edits update in place and get versioned, all inside a sandbox, and they survive a restart.",
      },
      {
        icon: "split",
        title: "Split the pane to compare",
        desc: "Drag a session to the top, bottom, left or right of any pane to split it — no limit on how many sit side by side. Compare answers without switching tabs.",
      },
      {
        icon: "goal",
        title: "Goal whiteboard",
        desc: "For long jobs, the goal and progress get written onto a whiteboard in the right rail, updated as you go, and saved with the session.",
      },
    ],
    mock: {
      summary: "41s elapsed · 9 steps · 3 files read · 6 tool calls",
      steps: [
        { kind: "think", name: "Thinking", detail: "Let me look at the project layout and its dependencies first", meta: "2.4s" },
        { kind: "tool", name: "read", detail: "package.json", meta: "0.1s" },
        { kind: "tool", name: "bash", detail: "rg --files -g '*.ts' | head -40", meta: "0.3s" },
        { kind: "delegate", name: "Repo explorer", detail: "Map the boundary between data layer and state", meta: "running" },
        { kind: "tool", name: "write", detail: "docs/architecture.md", meta: "0.2s" },
      ],
      more: "View the full run",
      caption: "Session process timeline (illustrative)",
    },
    shotAltSplit: "Several conversation panes side by side on screen, each running its own chat",
  },

  make: {
    eyebrow: "Output",
    title: "What it hands back is a finished file, not a wall of text",
    sub: "No copy-pasting into another app to format it yourself. Every one of these exports to something you can use directly.",
    tabs: [
      {
        key: "slides",
        label: "Slide decks",
        title: "One sentence to a deck you can present",
        desc: "Describe the topic and it drafts an outline first. Approve it and the deck is generated from one of 35+ built-in templates, editable page by page.",
        points: [
          "Drag, snap-align, swap images and reorder layers directly on the canvas, with full undo",
          "Speaker notes written for you, dual-screen presenter mode included",
          "Export to editable PPTX, plus PDF, PNG and a web version",
        ],
        shotAlt: "The slide editor: page thumbnails on the left, the current dark-template slide on the right",
      },
      {
        key: "research",
        label: "Deep research",
        title: "It breaks the question apart, then cross-checks what it finds",
        desc: "The built-in research engine splits your question into sub-topics, searches each one, cross-validates the findings, and produces a full report with citations.",
        points: [
          "Watch it work in real time; the report streams in as it's written",
          "Click any citation to read the original source in the right rail",
          "Tune research depth and source scope; reports archive into the project automatically",
        ],
        shotAlt: "A deep research report with inline citation markers and the source preview expanded alongside",
      },
      {
        key: "writing",
        label: "Writing desk",
        title: "Someone editing alongside you the whole time",
        desc: "Turn any local folder into a writing space, and switch between rich text, live preview, preview-only and source views as you go.",
        points: [
          "Ghost-text continuation while you type; ⌘K rewrites the selection in place",
          "Assistant edits arrive as line-level red/green diffs you accept or reject block by block",
          "Export to DOCX, PDF, HTML or PNG — or turn a selection into an infographic",
        ],
        shotAlt: "The three-column writing desk with line-level red/green diffs and accept/reject controls",
      },
      {
        key: "design",
        label: "Design mockups",
        title: "Describe it in plain language, get a mockup you can use",
        desc: "Describe the page or component you want; several directions generate in parallel with live preview.",
        points: [
          "Multiple pages generate at once, visible as they build",
          "Canvas edits flow back into the conversation so you can keep iterating by chatting",
          "Turn a mockup into code in one click",
        ],
        shotAlt: "The design canvas showing a generated web page mockup with live preview",
      },
      {
        key: "media",
        label: "Media generation",
        title: "Images, speech, music and video",
        desc: "Ask for it in the conversation; the result lands in your current working folder.",
        points: [
          "Image generation supports reference images and quality tiers",
          "Video generation supports first-frame and last-frame control",
          "Reuse the API keys you already configured under Models",
        ],
        shotAlt: "",
      },
    ],
  },

  squad: {
    eyebrow: "Subagents",
    title: "Too much for one worker? Send a squad",
    sub: "The lead agent decides how to split the job and who to hand each piece to, then runs them in parallel.",
    points: [
      {
        icon: "squad",
        title: "45+ built-in roles",
        desc: "Repository explorer, code reviewer, security auditor, fact checker, UX researcher and more. Roles marked read-only can't touch your files.",
      },
      {
        icon: "role",
        title: "Or define your own",
        desc: "Name it, give it an avatar, write its brief — and pin down which tools it may use, which model it runs on, and how hard it should think.",
      },
      {
        icon: "auto",
        title: "Let it pick for you",
        desc: "Turn on automatic roles and it chooses the right specialist for the task type, so you don't have to decide up front.",
      },
      {
        icon: "card",
        title: "Delegated work stays visible",
        desc: "Each subtask shows as a live card in the conversation. Open one to read its full execution log.",
      },
    ],
    extra: "You can also call people out by hand: @-mention several roles and they answer in the order you named them.",
    shotAlt: "Several subagent cards running in parallel inside a conversation, each showing live progress",
  },

  hands: {
    eyebrow: "Hands-on",
    title: "It doesn't just advise — it goes and does it",
    sub: "Plenty of things have no API, only a user interface. So let it click like a person would.",
    guard: {
      title: "Every action on your computer needs your approval",
      desc: "Clicks, keystrokes, drags, shortcuts, clipboard writes — anything that actually changes your machine requires a per-action confirmation, even when the permission mode is set to automatic. That line does not move.",
    },
    points: [
      {
        icon: "computer",
        title: "Computer use",
        desc: "It moves the mouse and types for you, driving any app on your Mac — including the old ones that never shipped an API.",
      },
      {
        icon: "browser",
        title: "Browser",
        desc: "An embedded browser in the right rail lets it navigate, click, fill forms, screenshot and read pages. The automation runtime ships inside the app — nothing to install first.",
      },
      {
        icon: "terminal",
        title: "Terminal and files",
        desc: "Built-in terminal, file tree and Git status bar. Code opens in Monaco, spreadsheets are editable down to cells and formulas, and PDF, DOCX and PPTX all preview inline.",
      },
      {
        icon: "files",
        title: "It can read anything you throw at it",
        desc: "23 document formats parsed, including legacy Office, RTF, EPUB and ODF. Headings, tables and lists keep their structure, so it doesn't misread tabular files.",
      },
    ],
    mock: {
      badge: "Needs your approval",
      title: "Let Cortex control Keynote?",
      rows: [
        { label: "Action", value: "Click" },
        { label: "Target", value: "Menu item “Export as…”" },
        { label: "Position", value: "(1284, 96)" },
      ],
      note: "This will really click on your screen. Nothing happens until you approve.",
      deny: "Deny",
      allow: "Allow",
      caption: "Computer-use confirmation (illustrative)",
    },
  },

  automation: {
    eyebrow: "Unattended",
    title: "Away from your desk? It keeps working",
    sub: "Hand off the repetitive parts and let the results come to you.",
    points: [
      {
        icon: "automation",
        title: "Say it once, the job is scheduled",
        desc: "\"Summarize AI news for me every weekday at 9am\" — it creates the job on the spot, tagged as AI-created in the list. Creating, editing, deleting or running it all need your approval first.",
      },
      {
        icon: "workflow",
        title: "Loop visual workflows",
        desc: "26 node types to build a pipeline: schedule or webhook triggers, AI steps, conditional branches, HTTP requests, sub-workflows and loops — plus a human-approval node that waits for your sign-off.",
      },
      {
        icon: "reply",
        title: "Results find you",
        desc: "Push to WeCom, DingTalk, Lark or email the moment a run finishes, so you're not going back to check.",
      },
      {
        icon: "notes",
        title: "Nothing is lost if the window was closed",
        desc: "Run results, workflow announcements, task reminders and available updates all land in the notification center and stay for 60 days.",
      },
    ],
    shotAlt: "A Loop workflow canvas with trigger, AI step, conditional branch and output nodes wired together",
  },

  capture: {
    eyebrow: "Catch it in passing",
    title: "Don't let it interrupt what you're doing",
    sub: "All four of these live outside the main window — no need to switch back.",
    items: [
      {
        icon: "reply",
        title: "Quick reply",
        kbd: "Double-tap ⌘",
        desc: "Inside any app — chat, email — double-tap ⌘ or hold Fn to speak, and a non-focus-stealing bubble offers draft replies. Hit enter and it types straight into the field. It learns your tone, and pulls open slots from your calendar when you're setting a time.",
      },
      {
        icon: "notes",
        title: "Flash notes",
        kbd: "⌘⇧N",
        desc: "Catch an idea the moment it lands. A separate overlay window — it never interrupts the current session or leaks into its context.",
      },
      {
        icon: "spotlight",
        title: "Spotlight bar",
        kbd: "Global hotkey",
        desc: "One hotkey brings up an input box. Throw a thought at it without hunting for the window.",
      },
      {
        icon: "dictation",
        title: "System-wide dictation",
        kbd: "Global hotkey",
        desc: "Dictate into any app, push-to-talk or toggle mode. Transcripts can be auto-corrected by AI for homophones and proper nouns.",
      },
    ],
    shotAlt: "The quick-reply draft bubble floating above a third-party chat window",
    shotAltNotes: "The flash-note input floating on the desktop, with a project picker along the bottom",
  },

  models: {
    eyebrow: "Models",
    title: "Bring your own models — keys never leave the machine",
    sub: "The built-in catalog covers 37 providers and over 1000 models. Five ways in; take whichever suits you.",
    stats: [
      { value: "37", label: "providers" },
      { value: "1000+", label: "models" },
      { value: "5", label: "ways to connect" },
    ],
    tabs: [
      {
        key: "login",
        label: "Subscription login",
        desc: "Already paying for Claude, ChatGPT or Copilot? Sign in once with OAuth and use it — no separate API credit required.",
        examples: ["Anthropic", "OpenAI Codex", "GitHub Copilot", "xAI", "OpenRouter", "Kimi"],
      },
      {
        key: "apikey",
        label: "API key",
        desc: "Paste and it's saved, one row at a time. Every provider can point at your own gateway or proxy URL without digging through settings.",
        examples: ["DeepSeek", "Moonshot Kimi", "Z.AI", "MiniMax", "Qwen", "Groq", "Mistral", "Together"],
      },
      {
        key: "cloud",
        label: "Cloud platforms",
        desc: "If your company already runs models on a cloud platform, fill in credentials and region — the model list comes from the platform.",
        examples: ["Amazon Bedrock", "Google Vertex AI", "Azure OpenAI"],
      },
      {
        key: "gateway",
        label: "Aggregation gateways",
        desc: "For new-api, one-api and the like: enter the URL and key, and it pulls the available model list back automatically. Tick the ones you want. No hand-written JSON.",
        examples: ["new-api", "one-api", "Vercel AI Gateway", "Cloudflare AI Gateway"],
      },
      {
        key: "custom",
        label: "Custom",
        desc: "Anything the catalog doesn't cover: declare the protocol, endpoint and model capabilities in a prefilled form. Keys stay as references, never inline.",
        examples: ["Self-hosted inference", "On-prem deployments", "Internal gateways"],
      },
    ],
    securityTitle: "Once it's connected",
    security: [
      {
        icon: "lock",
        title: "Keys go into the system keychain",
        desc: "The config file holds only a reference name. Nothing is written in plaintext, and the real key is decrypted at the moment of the request.",
      },
      {
        icon: "shield",
        title: "Capabilities detected, not guessed",
        desc: "Image input, context length and reasoning tiers are resolved automatically. When they can't be determined, they're marked unknown rather than assumed.",
      },
      {
        icon: "plug",
        title: "It won't silently swap your model",
        desc: "If the provider you chose can't be resolved, it fails loudly and stops. The model shown is the model that runs.",
      },
    ],
  },

  features: {
    eyebrow: "More",
    title: "Everything else is in the box too",
    sub: "Not add-ons. Installed with the app.",
    items: [
      {
        icon: "tasks",
        title: "Tasks and projects",
        desc: "Unlimited nested subtasks, timed reminders and repeat rules, plus a dedicated project management window. Delegate any task to an agent and progress writes itself back.",
      },
      {
        icon: "memory",
        title: "Memory that dreams",
        desc: "During idle time and overnight it replays recent conversations, distilling your profile, preferences and project context into every future chat. Memory is stored as three markdown files you can open and edit yourself.",
      },
      {
        icon: "knowledge",
        title: "Company knowledge base",
        desc: "Connect a remote knowledge base and answers come back with citation chips — click one to read the original in the right rail.",
      },
      {
        icon: "calendar",
        title: "System calendar",
        desc: "Ask whether you're free Wednesday afternoon, or have it put the review on your calendar — it always confirms before writing.",
      },
      {
        icon: "skills",
        title: "Skills and extension market",
        desc: "The skill library is a two-pane file tree: templates and scripts preview and edit in place. Plugins and extensions install from the market and sync across machines.",
      },
      {
        icon: "mcp",
        title: "MCP",
        desc: "Connect your own MCP servers over stdio or HTTP, and a dozen-plus built-in capability domains are handed to the agent out of the box.",
      },
      {
        icon: "pet",
        title: "Desktop pet",
        desc: "Over 4000 to choose from. It shifts posture with the agent's state — thinking, running a tool, waiting on your approval, or failed — so a glance tells you where things stand.",
      },
      {
        icon: "branch",
        title: "Branches, archive and search",
        desc: "Regenerating creates a branch instead of overwriting the original, so you can page between them. Sessions archive and full-text search.",
      },
    ],
  },

  privacy: {
    title: "Local-first, and we mean it literally",
    items: [
      {
        icon: "folder",
        title: "Your data sits on your disk",
        desc: "Chats, notes, tasks, automations and memory all live in ~/.cortex-desktop/ — open it in Finder, they're readable, editable files.",
      },
      {
        icon: "lock",
        title: "Credentials in the system keychain",
        desc: "Encrypted by macOS. The config file only ever holds a reference name; nothing lands in plaintext.",
      },
      {
        icon: "mic",
        title: "Voice stays on device",
        desc: "Wake-word detection and local speech recognition both run on your machine. Audio is never written to disk or uploaded.",
      },
      {
        icon: "shield",
        title: "You hold the permissions",
        desc: "Three execution modes: plan, ask, automatic. In plan mode it physically has no tool for writing files or running commands.",
      },
    ],
  },

  download: {
    eyebrow: "Get started",
    title: "Install it and give it one job to do",
    sub: "Free to download. Connect one of your own model providers in settings and you're running.",
    arches: [
      { key: "arm64", label: "Apple Silicon", note: "Macs with M-series chips" },
      { key: "x64", label: "Intel", note: "Older Intel Macs" },
    ],
    cta: "Download",
    changelog: "Read the changelog",
    note: "macOS · in-app auto-updates",
    requirement:
      "Bring your own model provider: sign in with an existing subscription, or paste an API key.",
    counters: { downloads: "Downloads", users: "People using it" },
  },

  contact: {
    eyebrow: "Reach the author",
    title: "Something wrong? Come find me",
    sub: "A one-person product — no support ticket queue. If it feels off, misses a feature, or breaks, just say so.",
    cards: [
      {
        kind: "x",
        name: "Davey",
        handle: "@daveylan2",
        action: "Send a DM",
        desc: "The author of Cortex Desktop. Progress, new releases and day-to-day notes land here; DMs stay open.",
        href: X_URL,
      },
      {
        kind: "github",
        name: "cortex-work-release",
        handle: "GitHub Issues",
        action: "Open an issue",
        desc: "Bugs, feature requests, install problems — all go to Issues. Public, and I read and answer every one.",
        href: ISSUES,
      },
    ],
  },

  footer: {
    tagline: "A local AI workstation that listens, speaks, and acts.",
    groups: [
      {
        title: "Product",
        links: [
          { label: "What it does", href: "#scenes" },
          { label: "Voice assistant", href: "#voice" },
          { label: "Session workspace", href: "#workspace" },
          { label: "Output", href: "#make" },
          { label: "Subagents", href: "#squad" },
        ],
      },
      {
        title: "Capabilities",
        links: [
          { label: "Hands-on", href: "#hands" },
          { label: "Automation", href: "#automation" },
          { label: "Catch it in passing", href: "#capture" },
          { label: "Models", href: "#models" },
          { label: "More", href: "#features" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Download", href: "#download" },
          { label: "Reach the author", href: "#contact" },
          { label: "GitHub", href: GITHUB },
          { label: "Releases", href: `${GITHUB}/releases` },
          { label: "Report an issue", href: ISSUES },
        ],
      },
    ],
    localFirst: "Local-first: your chats, files and keys never leave this Mac.",
    copyright: "© 2026 Cortex Desktop",
  },

  a11y: {
    primaryNav: "Primary navigation",
    footerNav: "Footer navigation",
    skipToContent: "Skip to main content",
    makeTabs: "Output types",
    modelTabs: "Ways to connect a model",
    shotPending: "Product screenshot pending: ",
  },
};

export function getDict(locale: Locale): Dict {
  return locale === "en" ? en : zh;
}
