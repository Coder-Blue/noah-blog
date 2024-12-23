import { formatDate } from "@/app/[locale]/(blog)/blog/post/utils";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardCategoryProps = {
  title: string;
  summary: string;
  date: string;
};

export default function CardCategory({
  title,
  summary,
  date,
}: CardCategoryProps) {
  const t = useTranslations("BlogPage");

  return (
    <Card className="h-[290px] w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          {formatDate(date, t("timeFormat"))}
        </p>
      </CardFooter>
    </Card>
  );
}
