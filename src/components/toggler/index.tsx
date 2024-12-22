"use client";

import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import LanguageToggle from "./language-toggle";
import ThemeToggler from "./theme-toggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LanguagesIcon, MonitorIcon, SettingsIcon } from "lucide-react";

type TogglerProps = {
  locale: Locale;
};

export default function Toggler({ locale }: TogglerProps) {
  const t = useTranslations("BlogPage");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent"
        >
          <SettingsIcon className="size-[1.2rem]" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LanguagesIcon className="mr-2 size-4" />
            {t("mainNav.languageToggle")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <LanguageToggle locale={locale} />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MonitorIcon className="mr-2 size-4" />
            {t("mainNav.themeToggler.title")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ThemeToggler />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
