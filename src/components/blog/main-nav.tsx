"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";
import Toggler from "@/components/toggler";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { logo } from "@/public/index";

type MainNavProps = {
  className?: string;
  locale: Locale;
};

type ListItemProps = {
  title: string;
  href: string;
  className?: string;
  children: ReactNode;
};

export default function MainNav({ className, locale }: MainNavProps) {
  const t = useTranslations("BlogPage");

  const posts: { title: string; href: string; description: string }[] = [
    {
      title: t("mainNav.life.title"),
      href: "/blog/post/life",
      description: t("mainNav.life.description"),
    },
    {
      title: t("mainNav.philosophy.title"),
      href: "/blog/post/philosophy",
      description: t("mainNav.philosophy.description"),
    },
    {
      title: t("mainNav.faq.title"),
      href: "/blog/post/faq",
      description: t("mainNav.faq.description"),
    },
    {
      title: "React",
      href: "/blog/post/react",
      description: t("mainNav.react.description"),
    },
    {
      title: "Svelte",
      href: "/blog/post/svelte",
      description: t("mainNav.svelte.description"),
    },
    {
      title: t("mainNav.tools.title"),
      href: "/blog/post/tools",
      description: t("mainNav.tools.description"),
    },
  ];

  return (
    <div
      className={cn(
        "z-50 flex flex-col items-start justify-start pt-10 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <Link href={"/blog"}>
        <div className="flex items-center gap-2">
          <Image src={logo} alt="NoahLogo" className="size-6 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold">
            Noah Trần&#39;s Blog
          </p>
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={"/"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("mainNav.about")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{t("mainNav.title")}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {posts.map((post) => (
                  <ListItem
                    key={post.title}
                    title={post.title}
                    href={post.href}
                  >
                    {post.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex w-20 items-center justify-between">
        <Toggler locale={locale} />
        <Link href={"/blog/rss"}>
          <Icons.rss className="size-6" />
        </Link>
      </div>
    </div>
  );
}

function ListItem({ title, href, className, children }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
