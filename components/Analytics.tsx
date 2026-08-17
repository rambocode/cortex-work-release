import Script from "next/script";

// Google Analytics 4 埋点。静态导出（output:"export"）下走 next/script 的 afterInteractive，
// 脚本标签会内联进导出的 HTML，无需后端。ID 可用 NEXT_PUBLIC_GA_ID 覆盖，留空则整体不渲染。
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-EK2513PG3C";

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
