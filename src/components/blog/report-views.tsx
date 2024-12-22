"use client";

import { useEffect } from "react";
import { Locale } from "@/i18n/config";

type ReportViewsProps = {
  locale: Locale;
  slug: string;
  title: string;
  category: string;
};

export default function ReportViews({
  locale,
  slug,
  title,
  category,
}: ReportViewsProps) {
  useEffect(() => {
    async function postData() {
      try {
        await fetch(
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/${locale}/api/`
            : `${process.env.NEXT_PUBLIC_URL}/${locale}/api/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug, title, category }),
          },
        );
      } catch (error) {
        console.error("Something is up...", error);
      }
    }

    postData();
  }, [slug, title, category]);

  return <></>;
}
