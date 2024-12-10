"use client";

import { useState } from "react";
import { Locale } from "@/i18n/config";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/toggler/language-toggle";
import { cn } from "@/lib/utils";
import { styles } from "./styles";
import { logo } from "@/public/index";
import { LanguagesIcon, MenuIcon } from "lucide-react";

type NavbarProps = {
  locale: Locale;
};

export default function Navbar({ locale }: NavbarProps) {
  const [active, setActive] = useState("");

  const t = useTranslations("LandingPage");

  const navLinks = [
    {
      id: "#about",
      title: t("navbar.about"),
    },
    {
      id: "#work",
      title: t("navbar.work"),
    },
    {
      id: "#contact",
      title: t("navbar.contact"),
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 z-20 flex w-full items-center bg-primary py-5",
        styles.paddingX,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Image src={logo} alt="noah" className="size-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white">
            Noah Trần&nbsp;
            <span className="hidden sm:block">| Sh1ro - Coder Blue</span>
          </p>
        </Link>
        <ul className="hidden list-none flex-row items-center gap-10 sm:flex">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={cn(
                "cursor-pointer text-[18px] font-medium hover:text-white",
                active === link.title ? "text-white" : "text-muted-foreground",
              )}
              onClick={() => setActive(link.title)}
            >
              <Link href={`/${link.id}`}>{link.title}</Link>
            </li>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer border-none bg-transparent"
                >
                  <LanguagesIcon className="size-[1.2rem] object-contain text-muted-foreground" />
                  <span className="sr-only">Toggle Langs</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-4 my-2 min-w-[140px] rounded-xl border-none bg-black-300 p-6 text-white">
                <LanguageToggle locale={locale} />
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer outline-none">
                <MenuIcon className="size-[28px] object-contain text-white" />
                <span className="sr-only">NavMenu</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-4 my-2 min-w-[140px] rounded-xl border-none bg-black-300 p-6 text-white">
              {navLinks.map((link) => (
                <Link key={link.id} href={`/${link.id}`}>
                  <DropdownMenuItem
                    onClick={() => setActive(link.title)}
                    className="cursor-pointer text-[16px] font-medium"
                  >
                    {link.title}
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-[16px] font-medium hover:text-black-200">
                  {t("navbar.languageToggle")}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="mx-7 my-2 rounded-xl border-none bg-black-300 p-6">
                    <LanguageToggle locale={locale} />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
