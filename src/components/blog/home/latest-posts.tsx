import {
  formatDate,
  getBlogPosts,
} from "@/app/[locale]/(blog)/blog/post/utils";
import { useTranslations } from "next-intl";
import { ArticleFeeds, PaginationControls } from "./pagination-compos";

type LatestPostsProps = {
  page: number | string | undefined;
};

export default function LatestPosts({ page }: LatestPostsProps) {
  let unfilteredPosts = getBlogPosts();
  const t = useTranslations("BlogPage");

  const start = (Number(page) - 1) * 5;
  const end = start + 5;
  let latestPosts = unfilteredPosts.slice(start, end);

  return (
    <>
      <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
        {t("frontPage.title")}
      </h1>
      {latestPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }

          return 1;
        })
        .map((post) => (
          <ArticleFeeds
            key={post.slug}
            href={`/blog/post/${post.metadata.category}/${post.slug}`}
            title={post.metadata.title}
            summary={post.metadata.summary}
            fullTime={formatDate(post.metadata.publishedAt, t("timeFormat"))}
          />
        ))}
      <PaginationControls
        totalPosts={unfilteredPosts.length}
        hasNextPage={end < unfilteredPosts.length}
        hasPrevPage={start > 0}
      />
    </>
  );
}
