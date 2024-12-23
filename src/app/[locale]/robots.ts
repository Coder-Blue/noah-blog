import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { baseUrl } from "@/lib/utils";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const t = await getTranslations("Metadata");

  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl(t("localeFormat"))}/sitemap.xml`,
  };
}
