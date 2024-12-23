import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import {
  Container,
  LatestPosts,
  MainNav,
  PopularPosts,
  TopCategories,
} from "@/components/blog";

type BlogMainPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogMainPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("metadataTitle"),
  };
}

async function BlogMainPage({ params }: BlogMainPageProps) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  setRequestLocale(locale);

  return (
    <Container>
      <MainNav locale={locale} />
      <main className="mt-16 flex flex-col items-start justify-evenly md:flex-row">
        <div>
          <LatestPosts />
        </div>
        <div className="h-screen">
          <div>
            <h1 className="mb-4 font-bold">
              {t("frontPage.categories.title")}
            </h1>
            <TopCategories />
          </div>
          <div className="sticky top-0 mt-10">
            <h1 className="mt-4 font-bold">{t("frontPage.posts.title")}</h1>
            <PopularPosts />
          </div>
        </div>
      </main>
    </Container>
  );
}

export default BlogMainPage;
