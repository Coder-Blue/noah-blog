"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { fetcherUrl } from "@/lib/utils";

type ReportViewsProps = {
  slug: string;
  title: string;
  category: string;
};

export default function ReportViews({
  slug,
  title,
  category,
}: ReportViewsProps) {
  const t = useTranslations("BlogPage");

  useEffect(() => {
    async function postData() {
      try {
        await fetch(fetcherUrl(t("localeFormat")), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug, title, category }),
        });
      } catch (error) {
        console.error("Something is up...", error);
      }
    }

    postData();
  }, [slug, title, category]);

  return <></>;
}
