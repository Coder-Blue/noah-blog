import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import { Footer } from "@/components/blog";

type BlogLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogLayoutProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    description: t("Metadata.description"),
    creator: "Noah Trần",
    authors: [
      {
        name: "Noah Trần",
        url: "https://github.com/Coder-Blue",
      },
    ],
    keywords: ["Blog", "Rss", "Xml", "React", "Svelte", "Noah"],
    openGraph: {
      type: "website",
      locale: t("Metadata.ogLocale"),
      alternateLocale: ["en_CA", "vi_VN"],
      url: `${process.env.NEXT_PUBLIC_URL}/${t("localeFormat")}/blog/`,
      title: t("Metadata.defaultTitle"),
      description: t("Metadata.description"),
      siteName: t("Metadata.defaultTitle"),
      images: [
        {
          url: t("Metadata.ogImgUrl"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("Metadata.defaultTitle"),
      description: t("Metadata.description"),
      creator: "@not_sh1ro",
      images: [
        {
          url: t("Metadata.ogImgUrl"),
        },
      ],
    },
    icons: {
      icon: "/favicon/favicon.ico",
      shortcut: "/favicon/favicon-16x16.png",
      apple: "/favicon/apple-touch-icon.png",
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
