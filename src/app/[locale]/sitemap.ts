import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { baseUrl } from "@/lib/utils";
import { getBlogPosts } from "./(blog)/blog/post/utils";
import { posts } from "@/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const t = await getTranslations("Metadata");

  let mains = [
    {
      url: `${baseUrl(t("localeFormat"))}`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: 0.5,
      changeFrequency: "yearly",
      images: [t("ogImgUrl")],
    },
  ];

  let blogPage = [
    {
      url: `${baseUrl(t("localeFormat"))}/blog`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: 1,
      changeFrequency: "monthly",
      images: [t("ogBlogImgUrl")],
    },
  ];

  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl(t("localeFormat"))}/blog/post/${post.metadata.category}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = posts.map((route) => ({
    url: `${baseUrl(t("localeFormat"))}${route.href}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...mains, ...blogPage, ...blogs, ...routes];
}
