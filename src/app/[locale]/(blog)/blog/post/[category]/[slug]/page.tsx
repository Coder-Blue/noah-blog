import { Locale } from "@/i18n/config";
import {
  formatDate,
  getBlogPosts,
} from "@/app/[locale]/(blog)/blog/post/utils";
import { notFound } from "next/navigation";
import {
  BreadcrumbWithCustomSeparator,
  Container,
  CustomMDX,
  Header,
  ReportViews,
} from "@/components/blog";

type SlugPostPageProps = {
  params: Promise<{ locale: Locale; slug: string; category: string }>;
};

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function SlugPostPage({ params }: SlugPostPageProps) {
  const slug = (await params).slug;

  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
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
              {formatDate(post.metadata.publishedAt)}
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
