import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { notFound } from "next/navigation";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

const quicksand = Quicksand({ subsets: ["vietnamese"], weight: ["400"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("defaultTitle")}`,
    },
    description: t("description"),
    creator: "Noah Trần",
    authors: [
      {
        name: "Noah Trần",
        url: "https://github.com/Coder-Blue",
      },
    ],
    keywords: [
      "NextJS",
      "React",
      "TailwindCSS",
      "Shadcnui",
      "Threejs",
      "TypeScript",
      "SSR",
      "React19",
      "Noah",
      "sh1ro",
      "Charles",
      "Blog",
    ],
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      alternateLocale: ["en_CA", "vi_VN"],
      url: process.env.NEXT_PUBLIC_URL,
      title: t("defaultTitle"),
      description: t("ogDescription"),
      siteName: t("defaultTitle"),
      images: [
        {
          url: t("ogImgUrl"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("ogDescription"),
      creator: "@not_sh1ro",
      images: [
        {
          url: t("ogImgUrl"),
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

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <html lang={t("lang")} suppressHydrationWarning>
      <body className={quicksand.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
