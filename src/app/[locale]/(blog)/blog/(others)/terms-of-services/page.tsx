import type { Metadata } from "next";
import { getTermsOfServices } from "@/app/[locale]/(blog)/blog/post/utils";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { Container, CustomMDX, MainNav } from "@/components/blog";

type TermsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("TermsOfServices.metadata.title"),
    description: t("TermsOfServices.metadata.description"),
  };
}

async function TermsPage({ params }: TermsPageProps) {
  const locale = (await params).locale;

  let post = getTermsOfServices().find(
    (post) => post.slug === "terms-of-services",
  );

  return (
    <Container>
      <MainNav locale={locale} />
      <article className="prose">
        <CustomMDX source={post?.content} />
      </article>
    </Container>
  );
}

export default TermsPage;
