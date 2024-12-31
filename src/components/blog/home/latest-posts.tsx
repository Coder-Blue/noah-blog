import {
  formatDate,
  getBlogPosts,
} from "@/app/[locale]/(blog)/blog/post/utils";
import { useTranslations } from "next-intl";
import { ArticleFeeds, PaginationControls } from "./pagination-compos";

type LatestPostsProps = {
  page: string;
};

export default function LatestPosts({ page }: LatestPostsProps) {
  let unfilteredPosts = getBlogPosts();
  const t = useTranslations("BlogPage");

  const start = (Number(page) - 1) * 5;
  const end = start + 5;

  let latestPosts = unfilteredPosts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }

    return 1;
  });

  return (
    <>
      <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
        {t("frontPage.title")}
      </h1>
      {latestPosts.slice(start, end).map((post) => (
        <ArticleFeeds
          key={post.slug}
          href={`/blog/post/${post.metadata.category}/${post.slug}`}
          title={post.metadata.title}
          summary={post.metadata.summary}
          fullTime={formatDate(post.metadata.publishedAt, t("timeFormat"))}
        />
      ))}
      <PaginationControls
        totalPosts={unfilteredPosts.length || 1}
        hasNextPage={end < unfilteredPosts.length}
        hasPrevPage={start > 0}
      />
    </>
  );
}
