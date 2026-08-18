import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";
import { siteUrl } from "@/lib/site";
import Analytics from "@/components/Analytics";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "zh";
  const d = getDict(loc);
  return {
    metadataBase: new URL(siteUrl),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `/${loc}`,
      languages: { zh: "/zh", en: "/en", "x-default": "/zh" },
    },
    openGraph: {
      type: "website",
      siteName: d.brand.name,
      title: d.meta.title,
      description: d.meta.description,
      url: `/${loc}`,
      locale: loc === "zh" ? "zh_CN" : "en_US",
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  // 站点恒为深海荧光深色，无主题切换；深色由 globals.css 的 :root 直接提供。
  return (
    <html lang={locale}>
      <body>
        {/* 跳到主内容：键盘聚焦时显形，跳过顶栏直达 <main id="main"> */}
        <a className="skip-link" href="#main">
          {d.a11y.skipToContent}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
