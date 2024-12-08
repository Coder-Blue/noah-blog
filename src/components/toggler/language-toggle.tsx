"use client";

import { startTransition } from "react";
import { Locale, locales, languageNames } from "@/i18n/config";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CheckIcon } from "lucide-react";

type LanguageToggleProps = {
  locale: Locale;
};

export default function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchLanguage(newLocale: string) {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error

        { pathname, params },
        { locale: newLocale },
      );
    });
  }

  return (
    <>
      {locales.map((lang) => (
        <DropdownMenuItem
          key={lang}
          onClick={() => switchLanguage(lang)}
          className="cursor-pointer text-[16px] font-medium text-white"
        >
          {languageNames[lang]}
          {lang === locale && <CheckIcon className="ms-2 size-4" />}
        </DropdownMenuItem>
      ))}
    </>
  );
}
