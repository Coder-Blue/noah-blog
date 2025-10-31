"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/hoc";
import { github, instagram } from "@/public/index";
import { Icons } from "@/components/icons";
import { HeartIcon } from "lucide-react";

function Footer() {
  const t = useTranslations("LandingPage");

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 border-t border-black-300 px-5 pb-3 pt-7 sm:px-10">
      <div className="flex gap-2 text-white-500">
        <Link href="/blog/terms-of-services">
          <p>{t("footer.terms")}</p>
        </Link>
        <p> | </p>
        <Link href="/blog/privacy-policy">
          <p>{t("footer.policy")}</p>
        </Link>
      </div>
      <div className="flex gap-3">
        <Link
          href="https://facebook.com/noah.tran1109"
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-black-200 bg-black-300"
        >
          <Icons.facebook className="size-1/2 text-white" />
        </Link>
        <Link
          href="https://github.com/Coder-Blue"
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-black-200 bg-black-300"
        >
          <Image src={github} alt="GitHub connect" className="size-1/2" />
        </Link>
        <Link
          href="https://instagram.com/noah_muted"
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-black-200 bg-black-300"
        >
          <Image src={instagram} alt="IG connect" className="size-1/2" />
        </Link>
        <Link
          href="https://x.com/sh1ro_code"
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-black-200 bg-black-300"
        >
          <Icons.x className="size-1/2 text-white" />
        </Link>
        <Link
          href="https://locket.cam/sh1ro"
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-black-200 bg-black-300"
        >
          <HeartIcon className="size-1/2 text-white" />
        </Link>
      </div>
      <p className="text-white-500">
        &copy; 2024 Noah Trần. {t("footer.right")}
      </p>
    </section>
  );
}

export default SectionWrapper(Footer, "");
