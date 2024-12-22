import { Link } from "@/i18n/routing";
import { categories } from "@/constants";
import { Button } from "@/components/ui/button";

export default function TopCategories() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
      {categories.map((category) => (
        <Button
          key={category.title}
          variant={"secondary"}
          asChild
          className="transition-all hover:scale-110"
        >
          <Link href={`/blog/post/${category.href}`}>{category.title}</Link>
        </Button>
      ))}
    </div>
  );
}
