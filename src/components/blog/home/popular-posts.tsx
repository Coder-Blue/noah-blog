"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { fetcher, fetcherUrl } from "@/lib/utils";
import SkeletonCards from "@/components/blog/skeleton/posts-skeleton";
import { Icons } from "@/components/icons";

export default function PopularPosts() {
  const t = useTranslations("BlogPage");

  const { data, error, isLoading } = useSWR(
    fetcherUrl(t("localeFormat")),
    fetcher,
  );

  if (error) return <div>{t("swrFetch.errorStatus")}</div>;

  if (isLoading) return <SkeletonCards />;

  return (
    <ul className="overflow-auto">
      {data?.map((post: { category: string; slug: string; title: string }) => (
        <Link
          href={`/blog/post/${post.category}/${post.slug}`}
          key={post.title}
        >
          <li className="group flex cursor-pointer items-center gap-2 py-2">
            <Icons.arrowRight className="size-6 transition-all group-hover:translate-x-1" />
            <p>{post.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
