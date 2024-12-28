"use client";

import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type ArticleFeedsProps = {
  href: string;
  title: string;
  summary: string;
  fullTime: string;
};

type PaginationControlsProps = {
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export function ArticleFeeds({
  href,
  title,
  summary,
  fullTime,
}: ArticleFeedsProps) {
  return (
    <article className="my-10 max-w-md text-wrap">
      <Link href={href}>
        <h3 className="py-2 font-bold leading-5 hover:text-blue-400">
          {title}
        </h3>
      </Link>
      <p className="my-5 leading-8">{summary}</p>
      <p className="text-sm text-muted-foreground">{fullTime}</p>
    </article>
  );
}

export function PaginationControls({
  totalPosts,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / 5); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${Number(page) - 1}`}
            className={cn(
              !hasPrevPage && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
        {pageNumbers.map((number, index) => {
          const pageNum = number;
          const isEdgePage =
            pageNum === 1 ||
            (pageNum === totalPosts && pageNum === pageNumbers.length);
          const isNearCurrentPage = Math.abs(pageNum - Number(page)) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            if (index === 1 || number === pageNumbers.length - 2) {
              return (
                <PaginationItem key={pageNum} className="hidden md:block">
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }

            return null;
          }
          return (
            <PaginationItem
              key={pageNum}
              className={cn(
                "hidden md:block",
                pageNum === Number(page) && "pointer-events-none block",
              )}
            >
              <PaginationLink
                href={`?page=${pageNum}`}
                isActive={pageNum === Number(page)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={`?page=${Number(page) + 1}`}
            className={cn(
              !hasNextPage && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
