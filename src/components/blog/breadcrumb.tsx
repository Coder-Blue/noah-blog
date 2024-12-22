import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

type BreadcrumbWithCustomSeparatorProps = {
  category: string;
  slug: string;
};

export default function BreadcrumbWithCustomSeparator({
  category,
  slug,
}: BreadcrumbWithCustomSeparatorProps) {
  const t = useTranslations("BlogPage");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            {t("postPage.breadcrumb.title")}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Link
            href={`/blog/post/${category}`}
            className="transition-colors hover:text-foreground"
          >
            {category}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{slug}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
