import type { Metadata } from "next";
import { getPrivacyPolicy } from "@/app/[locale]/(blog)/blog/post/utils";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { Container, CustomMDX, MainNav } from "@/components/blog";

type PrivacyPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("PrivacyPolicy.metadata.title"),
    description: t("PrivacyPolicy.metadata.description"),
  };
}

async function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = (await params).locale;

  let post = getPrivacyPolicy().find((post) => post.slug === "privacy-policy");

  return (
    <Container>
      <MainNav locale={locale} />
      <article className="prose">
        <CustomMDX source={post?.content} />
      </article>
    </Container>
  );
}

export default PrivacyPage;
