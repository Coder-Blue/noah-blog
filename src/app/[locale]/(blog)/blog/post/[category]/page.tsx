import type { Metadata } from "next";
import { getBlogPosts } from "@/app/[locale]/(blog)/blog/post/utils";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { CardCategory, Container, Header } from "@/components/blog";

type CategoryPageProps = {
  params: Promise<{ locale: Locale; category: string }>;
};

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    category: post.metadata.category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = (await params).category;
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: category.toLocaleUpperCase(),
    description: `${t("CategoryMetadata.description")} ${category}`,
  };
}

async function CategoryPage({ params }: CategoryPageProps) {
  const category = (await params).category;

  let posts = getBlogPosts().filter(
    (post) => post.metadata.category === category,
  );

  if (!posts.length) {
    notFound();
  }

  return (
    <>
      <Header>
        <Container>
          <h1 className="title mt-4 text-2xl font-semibold uppercase tracking-wider">
            {posts[0]?.metadata.category}
          </h1>
        </Container>
      </Header>
      <Container>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/post/${post.metadata.category}/${post.slug}`}
              >
                <CardCategory
                  title={post.metadata.title}
                  summary={post.metadata.summary}
                  date={post.metadata.publishedAt}
                />
              </Link>
            ))}
        </div>
      </Container>
    </>
  );
}

export default CategoryPage;
