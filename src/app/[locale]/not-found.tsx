import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainFont = JetBrains_Mono({
  subsets: ["vietnamese"],
  weight: ["500"],
});

function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <>
      <main className="flex-1">
        <section className="grid h-screen place-content-center">
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            <span className="mr-2 gap-3 text-4xl hover:cursor-pointer hover:text-red-700">
              &#10683;
            </span>{" "}
            {t.rich("title", {
              span: (chunks) => (
                <span className={cn("gap-2 text-4xl", jetbrainFont.className)}>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="mb-4">{t("description")}</p>
          <Link href={"/blog"} className="hover:text-blue-400">
            {t("message")}
          </Link>
        </section>
      </main>
    </>
  );
}

export default NotFound;
