import type { Metadata } from "next";
import { Locale } from "@/i18n/config";
import {
  formatDate,
  getBlogPosts,
} from "@/app/[locale]/(blog)/blog/post/utils";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  BreadcrumbWithCustomSeparator,
  Container,
  CustomMDX,
  Header,
  ReportViews,
} from "@/components/blog";
import { baseUrl, fetcherUrl } from "@/lib/utils";

type SlugPostPageProps = {
  params: Promise<{ locale: Locale; slug: string; category: string }>;
};

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: SlugPostPageProps) {
  const slug = (await params).slug;
  const locale = (await params).locale;

  let post = getBlogPosts().find((post) => post.slug === slug);

  const t = await getTranslations({ locale, namespace: "BlogPage" });

  if (!post) return;

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime,
      locale: t("Metadata.ogLocale"),
      alternateLocale: ["en_CA", "vi_VN"],
      url: `${baseUrl(t("localeFormat"))}/blog/post/${post?.metadata.category}/${post?.slug}`,
      images: [
        {
          url: t("Metadata.ogImgUrl"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: t("Metadata.ogImgUrl"),
        },
      ],
    },
  } satisfies Metadata;
}

async function SlugPostPage({ params }: SlugPostPageProps) {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "BlogPage" });

  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: t("Metadata.ogImgUrl"),
            url: `${baseUrl(t("localeFormat"))}/blog/post/${post?.metadata.category}/${post?.slug}`,
            author: {
              "@type": "Person",
              name: "Noah Trần Blog",
            },
          }),
        }}
      />
      <ReportViews
        slug={post.slug}
        title={post.metadata.title}
        category={post.metadata.category}
      />
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.metadata.category}
            slug={post.slug}
          />
          <h1 className="title mt-4 text-2xl font-semibold tracking-tighter">
            {post.metadata.title}
          </h1>
          <div className="mb-4 mt-2 flex items-center justify-between text-sm">
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt, t("timeFormat"))}
            </p>
          </div>
        </Container>
      </Header>
      <Container>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </Container>
    </>
  );
}

export default SlugPostPage;
