/**
 * 给 public/ 下的静态资源加上部署 basePath 前缀。
 *
 * 线上部署在 GitHub Pages 子路径 https://rambocode.github.io/cortex-work-release/，
 * next.config.ts 用 NEXT_BASE_PATH 设 basePath；但 basePath 只作用于 Next 自己生成的
 * 链接与 _next/ 资源，**手写的 <img src="/shots/x.png"> 不会被改写**，线上必然 404。
 *
 * next.config.ts 把同一个值再以 NEXT_PUBLIC_BASE_PATH 暴露出来（构建期内联为字面量），
 * 因此本函数在 server 组件与 client 组件里都可用。本地 dev 不设该变量 → 前缀为空。
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
