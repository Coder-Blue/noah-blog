import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCards() {
  return (
    <div className="mt-7 flex flex-col space-y-3">
      <Skeleton className="h-[20px] w-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
