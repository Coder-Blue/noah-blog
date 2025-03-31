import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "../../post/utils";
import { baseUrl } from "@/lib/utils";

export async function GET() {
  const t = await getTranslations("Metadata");
  let allBlogs = getBlogPosts();

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }

      return 1;
    })
    .map(
      (post) => `
        <item>
            <title>${post.metadata.title}</title>
            <link>${baseUrl(t("localeFormat"))}/blog/post/${post.metadata.category}/${post.slug}</link>
            <description><![CDATA[${post.metadata.summary || ""}]]></description>
            <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>
    `,
    )
    .join("/n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
            <channel>
                <title>${t("defaultTitle")}</title>
                <link>${baseUrl(t("localeFormat"))}/blog</link>
                <description>${t("rssDescription")}</description>
                ${itemsXml}
            </channel>
        </rss>
    `;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
