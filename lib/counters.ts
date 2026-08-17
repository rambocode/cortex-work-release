/* =========================================================================
   下载数 / 用户数计数器（模拟增长，非实时）

   为什么不是真的 GA4 数字：本站是纯静态导出（output:"export"），没有后端，
   而 GA4 Data API 必须用服务端凭证（service account）才能查询——浏览器里
   拿不到。gtag 只负责「上报」，不负责「读回」。所以这里按产品方确认的口径
   走确定性模拟：以 5000 为基数，按天线性增长。

   确定性是硬要求：同一时刻在服务端与客户端必须算出同一个值，否则 React
   hydration 会不匹配。因此这里只用 sin/floor 之类的纯函数，绝不用
   Math.random()。

   想换成真实数字时，把 GA4 的累计值定期写进 BASE_DOWNLOADS 与 EPOCH 即可
   （或加一个 CI 步骤查 Data API 后回写本文件）。
   ========================================================================= */

/** GA4 接入前已有的下载基数。 */
const BASE_DOWNLOADS = 5000;

/** 起算日（UTC）：2026-08-17，即 GA4 接入日。用 UTC 避开时区导致的跳变。 */
const EPOCH = Date.UTC(2026, 7, 17);

/** 日均新增下载。 */
const PER_DAY = 47;

/** 在用的人占累计下载的比例（装了没删的那部分）。 */
const ACTIVE_RATIO = 0.62;

const DAY_MS = 86_400_000;

/** 从起算日到 ts 过了多少天（含小数，保证数字每小时都在慢慢爬）。 */
function daysSince(ts: number): number {
  return Math.max(0, (ts - EPOCH) / DAY_MS);
}

/**
 * 叠在线性增长上的低频起伏，让曲线不至于像直尺一样规整。
 * 两个正弦的导数之和最大约 ±5.3/天，远小于 PER_DAY，故总量严格单调递增
 * ——数字只会往上走，不会因为刷新页面而变小。
 */
function ripple(days: number): number {
  return 9 * Math.sin(days / 3.1) + 4 * Math.sin(days / 1.7);
}

/** 给定时刻的累计下载数。 */
export function downloadsAt(ts: number): number {
  const days = daysSince(ts);
  return BASE_DOWNLOADS + Math.floor(days * PER_DAY + ripple(days));
}

/** 给定时刻的在用人数（跟随下载数按比例走，同样单调）。 */
export function usersAt(ts: number): number {
  return Math.floor(downloadsAt(ts) * ACTIVE_RATIO);
}

/** 一次取齐两个数，供组件消费。 */
export function countersAt(ts: number): { downloads: number; users: number } {
  return { downloads: downloadsAt(ts), users: usersAt(ts) };
}

/**
 * 千分位格式化。
 * 刻意不用 toLocaleString：服务端与浏览器的默认 locale 可能不同（分隔符会
 * 变成空格或点），那会直接引发 hydration 不匹配。手写保证两端字节一致。
 */
export function formatCount(n: number): string {
  const s = String(Math.max(0, Math.floor(n)));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ",";
    out += s[i];
  }
  return out;
}
