"use client";

import { useEffect } from "react";
import { fetchUrl } from "@/lib/utils";

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
  useEffect(() => {
    async function postData() {
      try {
        await fetch(fetchUrl, {
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
