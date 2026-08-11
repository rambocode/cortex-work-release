/* =========================================================================
   产品截图登记表（唯一真源）
   站点部署在 GitHub Pages 子路径下，静态导出后裸 "/shots/x.webp" 会 404，
   所以路径一律经 asset() 加 basePath 前缀，不要在组件里手写 src。

   工作流：
   1. 截图需求写在根目录 SHOTS.md（交给拍摄者的清单）。
   2. 原图压成 webp 后落进 public/shots/：
      magick 原图.png -resize '1500x>' -strip -quality 88 public/shots/名字.webp
      （UI 截图用 webp 而非 png：同画质下小一个数量级，文字也不会像 jpeg 那样糊边）
   3. 在下表补/改一行，w、h 填**压缩后**的真实像素——它用于算 aspect-ratio 与
      <img> 的 width/height，填错会在图片加载时跳版。组件不用动。
   4. 只填 w/h 不填 file = 尚未拍摄，<Shot> 渲染带说明的占位框。

   ⚠️ 03（会话过程时间线）与 10（电脑操作确认框）不在这张表里：
   这两处改成了 CSS 自绘示意图，见 components/mocks/。原因见 SHOTS.md 末尾。
   ========================================================================= */

export interface ShotMeta {
  /** 像素宽高，只用于算 aspect-ratio 与 <img> 的 width/height 属性 */
  w: number;
  h: number;
  /** public/shots/ 下的文件名；未填 = 尚未拍摄，渲染占位框 */
  file?: string;
}

// 先用 satisfies 拿到字面量 key（供 ShotCode 联合类型），再显式标注导出，
// 否则 TS 会把每项收窄成 { w; h }，读 file 时报「属性不存在」。
const SHOT_LIST = {
  "01-workspace": { w: 2320, h: 1294, file: "01-workspace.webp" },
  "02-voice-orb": { w: 1500, h: 974, file: "02-voice-orb.webp" },
  "04-split": { w: 1000, h: 799, file: "04-split.webp" },
  "05-slides": { w: 1500, h: 1201, file: "05-slides.webp" },
  "06-research": { w: 1400, h: 1400, file: "06-research.webp" },
  "07-writing": { w: 1500, h: 941, file: "07-writing.webp" },
  "08-design": { w: 1500, h: 948, file: "08-design.webp" },
  "09-subagents": { w: 1400, h: 1549, file: "09-subagents.webp" },
  "11-workflow": { w: 1500, h: 941, file: "11-workflow.webp" },
  "12-quick-reply": { w: 1172, h: 845, file: "12-quick-reply.webp" },
  "13-notes": { w: 1500, h: 740, file: "13-notes.webp" },
} satisfies Record<string, ShotMeta>;

export type ShotCode = keyof typeof SHOT_LIST;

export const SHOTS: Record<ShotCode, ShotMeta> = SHOT_LIST;
