import {
  formatDate,
  getBlogPosts,
} from "@/app/[locale]/(blog)/blog/post/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function LatestPosts() {
  let latestPosts = getBlogPosts();
  const t = useTranslations("BlogPage");

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
          <article key={post.slug} className="my-10 max-w-md text-wrap">
            <Link href={`/blog/post/${post.metadata.category}/${post.slug}`}>
              <h3 className="py-2 font-bold leading-5 hover:text-blue-400">
                {post.metadata.title}
              </h3>
            </Link>
            <p className="my-5 leading-8">{post.metadata.summary}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.metadata.publishedAt, t("timeFormat"))}
            </p>
          </article>
        ))}
    </>
  );
}
