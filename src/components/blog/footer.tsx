"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { createSubscriber } from "@/lib/actions";
import Image from "next/image";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "./submit-button";
import { Icons } from "@/components/icons";
import { logo } from "@/public/index";

export default function Footer() {
  const initialState = { message: "", errors: {} };

  const [state, dispatch] = useActionState(createSubscriber, initialState);

  const t = useTranslations("BlogPage");

  const posts: { title: string; href: string }[] = [
    {
      title: t("mainNav.life.title"),
      href: "/blog/post/life",
    },
    {
      title: t("mainNav.philosophy.title"),
      href: "/blog/post/philosophy",
    },
    {
      title: t("mainNav.faq.title"),
      href: "/blog/post/faq",
    },
    {
      title: "React",
      href: "/blog/post/react",
    },
    {
      title: "Svelte",
      href: "/blog/post/svelte",
    },
    {
      title: t("mainNav.tools.title"),
      href: "/blog/post/tools",
    },
  ];

  return (
    <footer className="mt-10 bg-gray-100 py-8 dark:bg-[#262626]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="BlogLogo" className="size-6" />
              <span className="text-md font-semibold">Noah Trần</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("frontPage.footer.description")}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/sh1ro_code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <Icons.x className="size-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
              <Link
                href="https://github.com/Coder-Blue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Icons.github className="size-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">
              {t("frontPage.footer.mainLabel")}
            </h3>
            <ul className="space-y-2 text-sm">
              {posts.map((post) => (
                <li key={post.title}>
                  <Link
                    href={post.href}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">
              {t("frontPage.footer.link.label")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:trananhquan1009@gmail.com"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {t("frontPage.footer.link.contactLabel")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/terms-of-services"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {t("frontPage.footer.link.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/privacy-policy"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {t("frontPage.footer.link.policy")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Coder-Blue/noah-blog"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Github Repo
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {t("frontPage.footer.link.sitemapLabel")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold">
              {t("frontPage.footer.newletter.title")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("frontPage.footer.newletter.description")}
            </p>
            <Form action={dispatch}>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t(
                    "frontPage.footer.newletter.emailInput.placeholder",
                  )}
                  className="flex-1"
                  defaultValue=""
                  aria-describedby="email-error"
                />
                <SubmitButton />
              </div>
              <div
                id="email-error"
                aria-label="polite"
                aria-atomic="true"
                className="px-1"
              >
                {state?.errors?.email && (
                  <p
                    key={state.errors.email[0]}
                    className="text-xs text-red-500"
                  >
                    {state.errors.email[0]}
                  </p>
                )}
                {!state?.errors?.email && (
                  <p className="text-xs text-green-500">{state?.message}</p>
                )}
              </div>
            </Form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-black-300 dark:text-gray-400">
          &copy; 2024 Noah Trần. {t("frontPage.footer.newletter.right")}.
        </div>
      </div>
    </footer>
  );
}
