import { setRequestLocale } from "next-intl/server";
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
