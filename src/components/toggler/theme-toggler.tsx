"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("BlogPage");

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <MonitorIcon className="mr-2 size-4" />
        {t("mainNav.themeToggler.system")}
        {theme === "system" && <CheckIcon className="ms-2 size-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <SunIcon className="mr-2 size-4" />
        {t("mainNav.themeToggler.light")}
        {theme === "light" && <CheckIcon className="ms-2 size-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <MoonIcon className="mr-2 size-4" />
        {t("mainNav.themeToggler.dark")}
        {theme === "dark" && <CheckIcon className="ms-2 size-4" />}
      </DropdownMenuItem>
    </>
  );
}
