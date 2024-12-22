"use client";

import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import SkeletonCards from "@/components/blog/skeleton/posts-skeleton";
import { Icons } from "@/components/icons";

type PopularPostsProps = {
  locale: Locale;
};

export default function PopularPosts({ locale }: PopularPostsProps) {
  const { data, error, isLoading } = useSWR(
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${locale}/api/`
      : `${process.env.NEXT_PUBLIC_URL}/${locale}/api/`,
    fetcher,
  );
  const t = useTranslations("BlogPage");

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
